document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-vendas">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-4">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="text-xl font-bold text-slate-900 dark:text-white">Pedidos</h2>
                    <div class="flex gap-2" id="pedidos-filtros">
                        <button onclick="filtrarPedidos('tudo')" class="px-3 py-1 rounded-full text-xs font-bold bg-[#0F172A] text-white filtro-btn active" data-filter="tudo">Todos</button>
                        <button onclick="filtrarPedidos('pendente')" class="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 filtro-btn" data-filter="pendente">Pendentes</button>
                    </div>
                </div>

                <div class="sf-card p-6">
                    <div class="flex justify-between items-center mb-5">
                       <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Histórico de Pedidos</h3>
                       <button onclick="carregarHistoricoPedidos()" class="text-slate-400 hover:text-slate-600"><i class="fas fa-sync-alt"></i></button>
                    </div>
                    <div class="space-y-3" id="lista-pedidos-historico">
                        <div class="py-6 text-center text-slate-400 text-sm flex flex-col items-center">
                             <i class="fas fa-circle-notch fa-spin text-2xl mb-2"></i>
                             Carregando pedidos...
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="modal-pedido" class="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 flex items-end">
            <div id="modal-pedido-content" class="bg-white dark:bg-navy-900 w-full rounded-t-3xl pt-5 pb-8 px-6 transform translate-y-full transition-transform duration-300 ease-out max-h-[85vh] flex flex-col gap-4 relative">
                <div class="w-10 h-1.5 bg-slate-200 rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2"></div>
                
                <div class="flex justify-between items-center mt-2 border-b border-slate-100 pb-3">
                    <h3 class="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Detalhes do Pedido</h3>
                    <button onclick="fecharModalPedido()" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 active:scale-90 transition-transform">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
                
                <div id="modal-pedido-corpo" class="overflow-y-auto no-scrollbar pb-6 space-y-4">
                    </div>
            </div>
        </div>
    </template>
`);

// Lógica de Vendas/Pedidos
let todosOsPedidos = [];

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'vendas') {
        carregarHistoricoPedidos();
    }
});

async function carregarHistoricoPedidos() {
    const lista = document.getElementById('lista-pedidos-historico');
    if (!lista) return;

    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (!userId) return;

        const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', userId).maybeSingle();
        
        if (!loja) {
            lista.innerHTML = '<p class="text-center text-slate-400 py-4">Loja não encontrada.</p>';
            return;
        }

        const { data: pedidos, error } = await window.supabaseClient
            .from('pedidos')
            .select('*')
            .eq('loja_id', loja.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        todosOsPedidos = pedidos || [];
        filtrarPedidos('tudo');

    } catch (e) {
        console.error("Erro ao carregar pedidos:", e);
        lista.innerHTML = '<p class="text-center text-red-400 py-4">Erro ao carregar histórico.</p>';
    }
}

function filtrarPedidos(filtro) {
    const botoes = document.querySelectorAll('.filtro-btn');
    botoes.forEach(btn => {
        if (btn.dataset.filter === filtro) {
            btn.className = "px-3 py-1 rounded-full text-xs font-bold bg-[#0F172A] text-white filtro-btn active";
        } else {
            btn.className = "px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 filtro-btn";
        }
    });

    renderizarListaPedidos(filtro);
}

function renderizarListaPedidos(filtro) {
    const lista = document.getElementById('lista-pedidos-historico');
    if (!lista) return;

    let pedidosFiltrados = todosOsPedidos;
    if (filtro !== 'tudo') {
        pedidosFiltrados = todosOsPedidos.filter(p => {
            const st = p.status ? p.status.toLowerCase() : 'pendente';
            return st === filtro;
        });
    }

    if (pedidosFiltrados.length === 0) {
        lista.innerHTML = '<div class="py-8 text-center text-slate-400 text-xs font-medium bg-slate-50 dark:bg-slate-800 rounded-xl">Sem pedidos para este filtro.</div>';
        return;
    }

    let html = '';
    pedidosFiltrados.forEach(p => {
        const st = (p.status || 'pendente').toLowerCase();
        let badgeColor = '';
        let statusLabel = '';
        if (st === 'pendente') { badgeColor = 'bg-orange-100 text-orange-600'; statusLabel = 'Pendente'; }
        else if (st === 'confirmado') { badgeColor = 'bg-emerald-100 text-emerald-600'; statusLabel = 'Confirmado'; }
        else if (st === 'cancelado') { badgeColor = 'bg-red-100 text-red-600'; statusLabel = 'Cancelado'; }
        else { badgeColor = 'bg-slate-100 text-slate-600'; statusLabel = st; }
        
        let descItens = p.itens && p.itens.length > 0 ? p.itens[0].nome : 'Itens';
        if(p.itens && p.itens.length > 1) descItens += ` (+${p.itens.length - 1})`;

        const data = new Date(p.created_at).toLocaleDateString('pt-MZ');

        html += `
            <div onclick="abrirDetalhesPedido('${p.id}')" class="flex flex-col gap-2 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 relative">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-[13px] font-bold text-slate-900 dark:text-white line-clamp-1">${p.cliente_nome}</p>
                        <p class="text-[11px] text-slate-500 font-medium">${descItens}</p>
                    </div>
                    <span class="text-sm font-black text-emerald-600 text-right">${p.total.toLocaleString('pt-MZ')} <span class="text-[9px]">MT</span></span>
                </div>
                <div class="flex justify-between items-center mt-1">
                    <span class="text-[9px] font-bold ${badgeColor} px-2 py-0.5 rounded-full uppercase">${statusLabel}</span>
                    <span class="text-[9px] text-slate-400 font-bold">${data}</span>
                </div>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 text-slate-300 pointer-events-none transition-opacity">
                    <i class="fas fa-chevron-right text-xs"></i>
                </div>
            </div>
        `;
    });

    lista.innerHTML = html;
}

function abrirDetalhesPedido(id) {
    const p = todosOsPedidos.find(x => x.id === id);
    if (!p) return;

    const st = (p.status || 'pendente').toLowerCase();
    
    let itensHtml = '';
    if (p.itens && p.itens.length > 0) {
        p.itens.forEach(i => {
           let obs = [];
           if(i.corSelecionada) obs.push(i.corSelecionada);
           if(i.tamanhoSelecionado) obs.push(i.tamanhoSelecionado);
           itensHtml += `
              <div class="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 py-2 last:border-0">
                  <div class="flex gap-3 items-center w-full">
                     <span class="text-xs font-black bg-slate-100 w-6 h-6 flex items-center justify-center rounded-lg">${i.quantidade}x</span>
                     <div class="flex-1">
                        <p class="text-[12px] font-semibold text-slate-800 dark:text-white leading-tight">${i.nome}</p>
                        ${obs.length > 0 ? `<p class="text-[10px] text-slate-400 mt-0.5">${obs.join(' • ')}</p>` : ''}
                     </div>
                     <span class="text-[12px] font-bold text-slate-900 dark:text-slate-300">${(i.preco * i.quantidade).toLocaleString('pt-MZ')} MT</span>
                  </div>
              </div>
           `;
        });
    }

    const data = new Date(p.created_at).toLocaleString('pt-MZ');
    const msgWpp = encodeURIComponent(`Olá ${p.cliente_nome}, sobre a sua encomenda...`);

    const corpo = document.getElementById('modal-pedido-corpo');
    corpo.innerHTML = `
        <div class="flex justify-between items-start bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
            <div>
                <p class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Cliente</p>
                <p class="text-sm font-bold text-slate-900 dark:text-white">${p.cliente_nome}</p>
                <p class="text-[12px] font-medium text-slate-600 mt-0.5">${p.cliente_telefone}</p>
                ${p.cliente_endereco ? `<p class="text-[11px] text-slate-500 mt-2 line-clamp-2"><i class="fas fa-map-marker-alt"></i> ${p.cliente_endereco}</p>` : ''}
            </div>
            <a href="https://wa.me/${p.cliente_telefone}?text=${msgWpp}" target="_blank" class="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                <i class="fab fa-whatsapp text-lg"></i>
            </a>
        </div>

        <div>
            <p class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Produtos (${p.itens ? p.itens.length : 0})</p>
            <div class="bg-white dark:bg-navy-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-2">
                ${itensHtml}
            </div>
        </div>

        <div class="flex justify-between items-center bg-[#0F172A] text-white p-4 rounded-2xl">
            <span class="text-xs font-bold uppercase tracking-wider">Total</span>
            <span class="text-lg font-black tracking-tight">${p.total.toLocaleString('pt-MZ')} MT</span>
        </div>

        <div>
            <p class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 mt-2">Alterar Status</p>
            <div class="grid grid-cols-3 gap-2">
                <button onclick="alterarStatusPedido('${p.id}', 'pendente')" class="py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${st === 'pendente' ? 'bg-orange-100 text-orange-600 ring-1 ring-orange-500' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}">Pendente</button>
                <button onclick="alterarStatusPedido('${p.id}', 'confirmado')" class="py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${st === 'confirmado' ? 'bg-emerald-100 text-emerald-600 ring-1 ring-emerald-500' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}">Confirmado</button>
                <button onclick="alterarStatusPedido('${p.id}', 'cancelado')" class="py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${st === 'cancelado' ? 'bg-red-100 text-red-600 ring-1 ring-red-500' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}">Cancelado</button>
            </div>
        </div>
        <p class="text-center text-[9px] text-slate-400 mt-2 font-semibold">Realizado em ${data}</p>
    `;

    const modal = document.getElementById('modal-pedido');
    const content = document.getElementById('modal-pedido-content');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => content.classList.remove('translate-y-full'), 10);
}

function fecharModalPedido() {
    const modal = document.getElementById('modal-pedido');
    const content = document.getElementById('modal-pedido-content');
    content.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('opacity-0', 'pointer-events-none'), 300);
}

async function alterarStatusPedido(id, novoStatus) {
    try {
        const { error } = await window.supabaseClient
            .from('pedidos')
            .update({ status: novoStatus })
            .eq('id', id);
        if (!error) {
            fecharModalPedido();
            const btnTudo = document.querySelector('.filtro-btn.active');
            carregarHistoricoPedidos().then(() => {
                if (btnTudo) filtrarPedidos(btnTudo.dataset.filter);
            });
            if (typeof carregarDadosLojaDashboard === 'function') {
                carregarDadosLojaDashboard();
            }
        }
    } catch(e) {
        console.error(e);
        alert('Erro ao atualizar status');
    }
}
