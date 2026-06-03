document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-pedidos">
        <div class="bg-white min-h-[100dvh] pb-32 animate-fade-in relative z-20">
            <div class="px-5 pt-28 pb-6 bg-[#F9F7F5] dark:bg-[#020617] rounded-b-[40px] shadow-sm mb-6">
                <h1 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Pedidos</h1>
                <p class="text-sm font-medium text-slate-500 mt-1">Gerencie e valide as encomendas.</p>
                
                <div class="flex gap-2.5 mt-6 overflow-x-auto no-scrollbar pb-2">
                    <button onclick="filtrarPedidos('Tudo', this)" class="btn-filtro-pedido px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-slate-900 text-white shadow-md active:scale-95 whitespace-nowrap">Todos</button>
                    <button onclick="filtrarPedidos('Pendente', this)" class="btn-filtro-pedido px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-95 whitespace-nowrap">Pendente</button>
                    <button onclick="filtrarPedidos('Confirmado', this)" class="btn-filtro-pedido px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-95 whitespace-nowrap">Confirmado</button>
                    <button onclick="filtrarPedidos('Cancelado', this)" class="btn-filtro-pedido px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-95 whitespace-nowrap">Cancelado</button>
                </div>
            </div>

            <div class="px-5" id="lista-pedidos-completa">
                <div class="text-center py-10"><i class="fas fa-spinner fa-spin text-2xl text-slate-400"></i><p class="text-xs text-slate-500 mt-3">A carregar pedidos...</p></div>
            </div>
            
            <div id="modal-pedido-detalhes" class="fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 flex items-end sm:items-center sm:justify-center">
                <div id="modal-pedido-content" class="bg-white dark:bg-navy-900 w-full sm:w-[400px] rounded-t-[32px] sm:rounded-3xl pt-3 pb-8 px-6 transform translate-y-full sm:translate-y-4 sm:scale-95 transition-all duration-300 ease-out max-h-[90vh] flex flex-col relative shadow-2xl">
                    <div class="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4 sm:hidden"></div>
                    <div class="flex justify-between items-center mb-5">
                        <h3 class="text-base font-black tracking-tight text-slate-900 dark:text-white">Detalhes do Pedido</h3>
                        <button onclick="fecharDetalhesPedido()" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 active:scale-90 transition-transform">
                            <i class="fas fa-times text-sm"></i>
                        </button>
                    </div>
                    
                    <div id="conteudo-modal-detalhes" class="flex-1 overflow-y-auto no-scrollbar space-y-5 pb-6">
                        <!-- Renderizado via JS -->
                    </div>
                </div>
            </div>
        </div>
    </template>
`);

let todosOsPedidos = [];
let filtroStatusConsulta = 'Tudo';

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'pedidos') {
        carregarTodosPedidos();
    }
});

async function carregarTodosPedidos() {
    const lista = document.getElementById('lista-pedidos-completa');
    if(!lista) return;

    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id || 'demo_user_id';
        
        const { data: loja } = await window.supabaseClient.from('lojas').select('id, whatsapp').limit(1).maybeSingle();
        if(!loja) return;
        
        // Mantém para o zap
        window.lojaWhatsappPedidos = loja.whatsapp ? loja.whatsapp.replace(/\D/g, '') : '';
        
        const { data: pedidos, error } = await window.supabaseClient
            .from('pedidos')
            .select('*')
            .eq('loja_id', loja.id)
            .order('created_at', { ascending: false });

        if (error) { console.error(error); return; }
        todosOsPedidos = pedidos || [];
        renderizarPedidosLista();
        
    } catch (err) {
        console.error(err);
    }
}

function filtrarPedidos(status, btn) {
    filtroStatusConsulta = status;
    const botoes = document.getElementsByClassName('btn-filtro-pedido');
    for(let b of botoes) {
        b.className = "btn-filtro-pedido px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-95 whitespace-nowrap";
    }
    btn.className = "btn-filtro-pedido px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-slate-900 text-white shadow-md active:scale-95 whitespace-nowrap";
    renderizarPedidosLista();
}

function renderizarPedidosLista() {
    const lista = document.getElementById('lista-pedidos-completa');
    if(!lista) return;
    
    let db = todosOsPedidos;
    if (filtroStatusConsulta !== 'Tudo') db = db.filter(p => p.status === filtroStatusConsulta);
    
    if (db.length === 0) {
        lista.innerHTML = \`<div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p class="text-sm font-bold text-slate-400">Nenhum pedido encontrado.</p>
        </div>\`;
        return;
    }

    let html = '<div class="space-y-4">';
    db.forEach(p => {
        const d = new Date(p.created_at).toLocaleDateString('pt-PT', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
        
        let corRef = p.status === 'Pendente' ? 'bg-orange-100 text-orange-600 border-orange-200' : 
                     p.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-red-100 text-red-600 border-red-200';
                     
        html += \`
            <div onclick="abrirDetalhesPedido('\${p.id}')" class="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-xs font-bold text-slate-900 line-clamp-1 truncate max-w-[150px]">\${p.cliente_nome}</p>
                        <p class="text-[10px] text-slate-400 mt-0.5">\${d}</p>
                    </div>
                    <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border \${corRef}">\${p.status}</span>
                </div>
                <div class="flex justify-between items-end border-t border-slate-50 pt-3">
                    <div class="text-[11px] text-slate-500 font-medium">
                        \${p.itens ? p.itens.length : 0} items
                    </div>
                    <span class="text-sm font-black text-slate-900">\${p.total.toLocaleString('pt-MZ')} MT</span>
                </div>
            </div>
        \`;
    });
    html += '</div>';
    lista.innerHTML = html;
}

function abrirDetalhesPedido(id) {
    const p = todosOsPedidos.find(x => x.id == id);
    if(!p) return;
    
    document.getElementById('modal-pedido-detalhes').classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('modal-pedido-content').classList.remove('translate-y-full', 'sm:translate-y-4', 'sm:scale-95');
    
    let htmlItens = '';
    if (p.itens && p.itens.length > 0) {
        p.itens.forEach(i => {
            htmlItens += \`
                <div class="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <img src="\${i.imagem}" class="w-10 h-10 object-cover rounded-lg bg-white">
                    <div class="flex-1">
                        <p class="text-xs font-bold text-slate-800 line-clamp-1">\${i.nome}</p>
                        <p class="text-[10px] text-slate-500">\${i.quantidade}x \${i.preco} MT</p>
                    </div>
                </div>
            \`;
        });
    }

    document.getElementById('conteudo-modal-detalhes').innerHTML = \`
        <div class="flex flex-col gap-5">
            <div class="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                <div>
                    <p class="text-[10px] uppercase font-black text-slate-400 tracking-widest">Total a Pagar</p>
                    <p class="text-xl font-black text-slate-900">\${p.total.toLocaleString('pt-MZ')} MT</p>
                </div>
                <div class="text-right">
                    <p class="text-[10px] uppercase font-black text-slate-400 tracking-widest">Status</p>
                    <select onchange="atualizarStatusPedido('\${p.id}', this.value)" class="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none mt-0.5 text-slate-700">
                        <option value="Pendente" \${p.status === 'Pendente'?'selected':''}>Pendente</option>
                        <option value="Confirmado" \${p.status === 'Confirmado'?'selected':''}>Confirmado</option>
                        <option value="Cancelado" \${p.status === 'Cancelado'?'selected':''}>Cancelado</option>
                    </select>
                </div>
            </div>

            <div>
                <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">Cliente</h4>
                <div class="text-sm font-semibold text-slate-700 space-y-1">
                    <p><i class="far fa-user text-slate-400 w-5"></i> \${p.cliente_nome}</p>
                    <p><i class="fas fa-phone-alt text-slate-400 w-5"></i> \${p.cliente_telefone}</p>
                    \${p.cliente_endereco ? \`<p><i class="far fa-map text-slate-400 w-5"></i> \${p.cliente_endereco}</p>\` : ''}
                </div>
            </div>

            <div>
                <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">Carrinho</h4>
                <div class="space-y-2">
                    \${htmlItens}
                </div>
            </div>

            <button onclick="chamarWhatsappCliente('\${p.cliente_telefone}', '\${p.cliente_nome}')" class="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-[0.98] transition-transform">
                <i class="fab fa-whatsapp text-lg"></i> Falar no WhatsApp
            </button>
        </div>
    \`;
}

function fecharDetalhesPedido() {
    document.getElementById('modal-pedido-content').classList.add('translate-y-full', 'sm:translate-y-4', 'sm:scale-95');
    setTimeout(() => {
        document.getElementById('modal-pedido-detalhes').classList.add('opacity-0', 'pointer-events-none');
    }, 200);
}

async function atualizarStatusPedido(id, novoStatus) {
    try {
        const { error } = await window.supabaseClient.from('pedidos').update({ status: novoStatus }).eq('id', id);
        if(!error) {
            let p = todosOsPedidos.find(x => x.id == id);
            if(p) p.status = novoStatus;
            renderizarPedidosLista();
            
            // Toast
            const toast = document.getElementById('toast-sucesso');
            const msg = document.getElementById('toast-msg');
            if(toast && msg) {
                msg.innerText = "Status Atualizado!";
                toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-24');
                setTimeout(() => toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-24'), 2500);
            }
        }
    } catch { }
}

function chamarWhatsappCliente(tel, nome) {
    let cleanTel = tel.replace(/\D/g, '');
    let text = \`Olá \${nome}, somos da loja e estamos a entrar em contacto sobre o teu pedido...\`;
    window.open(\`https://wa.me/\${cleanTel}?text=\${encodeURIComponent(text)}\`, '_blank');
}
