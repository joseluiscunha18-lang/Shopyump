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
    </template>
`);

// Injeta o modal globalmente fora do template para funcionar também no Dashboard de forma fluída
if (!document.getElementById('modal-pedido')) {
    document.body.insertAdjacentHTML('beforeend', `
        <div id="modal-pedido" class="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 flex items-end">
            <div id="modal-pedido-content" class="bg-white dark:bg-navy-900 w-full rounded-t-[32px] pt-5 pb-8 px-6 transform translate-y-full transition-transform duration-300 ease-out max-h-[85vh] flex flex-col gap-4 relative shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
                <div class="w-12 h-1.5 bg-slate-200 dark:bg-navy-700 rounded-full mx-auto absolute top-3 left-1/2 -translate-x-1/2"></div>
                
                <div class="flex justify-between items-center mt-3 border-b border-slate-50 dark:border-navy-800 pb-4">
                    <h3 class="text-[13px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Detalhes da Encomenda</h3>
                    <button onclick="fecharModalPedido()" class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 dark:bg-navy-800 text-slate-500 dark:text-slate-400 active:scale-90 transition-all border border-slate-100 dark:border-navy-700">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
                
                <div id="modal-pedido-corpo" class="overflow-y-auto no-scrollbar pb-6 space-y-4">
                </div>
            </div>
        </div>
    `);
}

// Lógica de Vendas/Pedidos
let todosOsPedidos = [];
let pedidosCarregados = false; // Variável para controlar o cache

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'vendas') {
        if (!pedidosCarregados) {
            carregarHistoricoPedidos();
        } else {
            // Se já temos na memória, mostramos imediatamente sem tela de 'carregando...'
            const btnTudo = document.querySelector('.filtro-btn.active');
            filtrarPedidos(btnTudo ? btnTudo.dataset.filter : 'tudo');
        }
    }
});

// ────── CÓDIGO A SUBSTITUIR EM: pedidos.js ──────

// 1. Torna a alteração de status INSTANTÂNEA, sem spinners!
async function alterarStatusPedido(id, novoStatus) {
    // A. Mágica Otimista: Atualiza a interface instantaneamente!
    const index = todosOsPedidos.findIndex(p => p.id === id);
    if (index !== -1) {
        todosOsPedidos[index].status = novoStatus;
    }
    
    // Esconde o modal e atualiza a grelha sem carregar absolutamente nada da internet!
    fecharModalPedido();
    const btnTudo = document.querySelector('.filtro-btn.active');
    if (btnTudo) {
         filtrarPedidos(btnTudo.dataset.filter);
    } else {
         renderizarListaPedidos('tudo');
    }

    try {
        // B. Altera de facto no Supabase silenciosamente por trás
        const { error } = await window.supabaseClient
            .from('pedidos')
            .update({ status: novoStatus })
            .eq('id', id);
            
        if (error) throw error;
        
        // C. Limpa também no Dashboard principal (Home) para não perder sincronia
        if (typeof memDashboard !== 'undefined' && memDashboard.pendentes) {
             memDashboard.pendentes = memDashboard.pendentes.filter(p => p.id !== id);
        }
        
    } catch(e) {
        console.error(e);
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('Erro ao atualizar status');
    }
}
// ────── CÓDIGO A SUBSTITUIR EM: pedidos.js ──────

// 2. Torna o Histórico mais rápido a carregar e SEPARA A UI DO BANCO DE DADOS!
async function carregarHistoricoPedidos() {
    const lista = document.getElementById('lista-pedidos-historico');
    if (!lista) return;

    // Só exibe spinner de processamento se a lista realmente estiver vazia
    if (todosOsPedidos.length === 0) {
        lista.innerHTML = '<div class="py-6 text-center text-slate-400 text-sm flex flex-col items-center"><i class="fas fa-circle-notch fa-spin text-2xl mb-2"></i>Carregando pedidos...</div>';
    }

    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (!userId) {
            lista.innerHTML = '<p class="text-center text-slate-400 py-4">A sua sessão expirou. Atualize a página.</p>';
            return;
        }

        // Recolhe o URL da Loja pela RAM se já existir
        let lojaId = window.lojaIdAtivaDashboard;
        if (!lojaId) {
             const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', userId).maybeSingle();
             if (loja) {
                 lojaId = loja.id;
                 window.lojaIdAtivaDashboard = loja.id; // Guarda para que os próximos acessos sejam instantâneos!
             }
        }

        if (!lojaId) {
            lista.innerHTML = '<p class="text-center text-slate-400 py-4">Nenhuma loja encontrada conectada a si.</p>';
            return;
        }

        const { data: pedidos, error } = await window.supabaseClient
            .from('pedidos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });

        if (error) throw error; // Se a Supabase falhar, atira erro!

        // Se passamos, os dados estão saudáveis! Guardamos na memória "cache"
        todosOsPedidos = pedidos || [];
        pedidosCarregados = true; 
        
    } catch (e) {
        console.error("Erro na base de dados ao carregar pedidos:", e);
        lista.innerHTML = '<div class="py-6 text-center text-red-500 text-sm flex flex-col items-center"><i class="fas fa-exclamation-triangle text-2xl mb-2"></i>Erro ao descarregar da nuvem. Tende de novo.</div>';
        return; // Pára aqui apenas se os dados da Internet falharem
    }

    // =========================================================
    // MÁGICA: Renderizar Interface (UI) FORA da operação do Banco de Dados.
    // Assim, falhas visuais deixam de travar toda a máquina de leitura!
    // =========================================================
    try {
        const btnTudo = document.querySelector('.filtro-btn.active');
        const filtroAtual = btnTudo ? btnTudo.dataset.filter : 'tudo';
        
        // Garante compatibilidade caso esteja a usar `filtrarPedidos` ou `renderizarListaPedidos`
        if (typeof filtrarPedidos === 'function') {
             filtrarPedidos(filtroAtual);
        } else if (typeof renderizarListaPedidos === 'function') {
             renderizarListaPedidos(filtroAtual);
        } else {
             lista.innerHTML = '<p class="text-center text-red-500 py-4 font-bold">Aviso: Função de mostrar e desenhar os bilhetes visuais em falta.</p>';
        }
    } catch (erroInterface) {
        // Se houver um typo na parte da Interface, fica retido aqui visualmente sem corromper a base!
        console.error("Erro no JavaScript ao desenhar pedidos na tela:", erroInterface);
        lista.innerHTML = '<p class="text-center text-amber-500 py-4">Os dados carregaram bem, mas ocorreu um erro a desenhá-los na tela. (Ver Console)</p>';
    }
}
// pedidos-fix.js - Ficheiro com as funções de renderização em falta para a página de vendas

// 1. Função para Filtrar Pedidos (chamada pelos botões no topo da página de vendas)
window.filtrarPedidos = function(filtro) {
    // Atualizar feedback visual dos botões
    const botoes = document.querySelectorAll('.filtro-btn');
    botoes.forEach(btn => {
        if (btn.dataset.filter === filtro) {
            btn.classList.add('active', 'bg-[#0F172A]', 'text-white');
            btn.classList.remove('bg-slate-200', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-400');
        } else {
            btn.classList.remove('active', 'bg-[#0F172A]', 'text-white');
            btn.classList.add('bg-slate-200', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-400');
        }
    });

    // Chamar a função principal de desenho
    renderizarListaPedidos(filtro);
};

// 2. Função para Renderizar e Desenhar os Bilhetes/Cards de Pedidos
window.renderizarListaPedidos = function(filtro) {
    const lista = document.getElementById('lista-pedidos-historico');
    if (!lista) return;

    // Filtrar a lista global que vem do Supabase (guardada em todosOsPedidos)
    const basePedidos = typeof todosOsPedidos !== 'undefined' ? todosOsPedidos : window.todosOsPedidos || [];
    let pedidosFiltrados = [...basePedidos];
    if (filtro && filtro !== 'tudo') {
        pedidosFiltrados = pedidosFiltrados.filter(p => p.status === filtro);
    }

    // Se estiver vazio, mostrar mensagem amigável
    if (pedidosFiltrados.length === 0) {
        lista.innerHTML = `
            <div class="py-12 flex flex-col items-center justify-center text-center gap-3 fade-in">
                <div class="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-navy-700 rounded-[20px] flex items-center justify-center text-slate-300 dark:text-slate-500 mb-2 shadow-sm">
                    <i class="fa-solid fa-receipt text-2xl"></i>
                </div>
                <h4 class="text-[14px] font-bold text-slate-900 dark:text-white">Nenhum pedido encontrado</h4>
                <p class="text-[12px] text-slate-500 mt-1 max-w-[220px] leading-relaxed mx-auto">
                    ${filtro === 'pendente' ? 'Não tens pedidos pendentes neste momento.' : 'Ainda não recebeste nenhum pedido nesta categoria.'}
                </p>
            </div>
        `;
        return;
    }

    // Desenhar os bilhetes (cards)
    let html = '';
    pedidosFiltrados.forEach(p => {
        const data = new Date(p.created_at);
        const dataFormatada = data.toLocaleDateString('pt-MZ');
        const horaFormatada = data.toLocaleTimeString('pt-MZ', {hour: '2-digit', minute: '2-digit'});
        
        let statusCorBg = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
        let statusIcone = 'fa-clock';
        let statusTexto = 'Pendente';
        
        switch(p.status?.toLowerCase()) {
            case 'confirmado':
                statusCorBg = 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20';
                statusIcone = 'fa-check';
                statusTexto = 'Confirmado';
                break;
            case 'cancelado':
                statusCorBg = 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-500 border border-red-200 dark:border-red-500/20';
                statusIcone = 'fa-times';
                statusTexto = 'Cancelado';
                break;
            case 'enviado':
                statusCorBg = 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20';
                statusIcone = 'fa-truck';
                statusTexto = 'Enviado';
                break;
            case 'concluido':
                statusCorBg = 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-500 border border-purple-200 dark:border-purple-500/20';
                statusIcone = 'fa-check-double';
                statusTexto = 'Concluído';
                break;
        }

        const qtdItens = p.itens ? p.itens.length : 0;
        const totalNum = parseFloat(p.total) || 0;

        html += `
            <div onclick="abrirModalPedido('${p.id}')" class="bg-white dark:bg-navy-900 p-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100/80 dark:border-navy-800 transition-all duration-300 hover:shadow-lg active:scale-[0.98] cursor-pointer mb-3 fade-in group">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center gap-3.5">
                        <div class="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:scale-105 transition-transform">
                            <i class="fa-solid fa-box-open"></i>
                        </div>
                        <div>
                            <h4 class="text-[14px] font-bold text-slate-900 dark:text-white leading-tight">${p.cliente_nome || 'Cliente Anónimo'}</h4>
                            <p class="text-[11px] font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                                <span>${dataFormatada}</span>
                                <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                <span>${horaFormatada}</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-between items-end pt-3 border-t border-slate-50 dark:border-navy-800/50">
                    <div class="px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${statusCorBg}">
                        <i class="fa-solid ${statusIcone}"></i> ${statusTexto}
                    </div>
                    
                    <div class="text-right">
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">${qtdItens} item(s)</p>
                        <p class="text-[15px] font-black text-slate-900 dark:text-white tracking-tight">${totalNum.toLocaleString('pt-MZ')} <span class="text-[9px] text-slate-400 uppercase tracking-widest ml-0.5">MT</span></p>
                    </div>
                </div>
            </div>
        `;
    });

    lista.innerHTML = html;
};

// 3. Funções do Modal de Pedido (mostrar pormenores ao clicar no bilhete)
window.abrirModalPedido = function(id) {
    // 1. Procura primeiro na página de vendas
    let basePedidos = typeof todosOsPedidos !== 'undefined' ? todosOsPedidos : window.todosOsPedidos || [];
    let pedido = basePedidos.find(p => p.id === id);
    
    // 2. Se não encontrar (porque o utilizador está no Dashboard), procura na memória da Home
    if (!pedido && typeof memDashboard !== 'undefined' && memDashboard.pendentes) {
        pedido = memDashboard.pendentes.find(p => p.id === id);
    }

    if (!pedido) {
        console.error("Pedido não encontrado na memória.");
        return;
    }

    const modal = document.getElementById('modal-pedido');
    const content = document.getElementById('modal-pedido-content');
    const corpo = document.getElementById('modal-pedido-corpo');
    if (!modal || !content || !corpo) return;

    const data = new Date(pedido.created_at);
    const dataFormatada = data.toLocaleDateString('pt-MZ');
    const horaFormatada = data.toLocaleTimeString('pt-MZ', {hour: '2-digit', minute: '2-digit'});

    let htmlItens = '';
    if (pedido.itens && pedido.itens.length > 0) {
        pedido.itens.forEach(item => {
            htmlItens += `
                <div class="flex justify-between items-center py-2.5 border-b border-slate-50 dark:border-navy-800/50 last:border-0">
                    <div>
                        <p class="text-xs font-bold text-slate-800 dark:text-white">${item.nome}</p>
                        <p class="text-[10px] text-slate-500 font-medium mt-0.5">${item.quantidade}x ${parseFloat(item.preco).toLocaleString('pt-MZ')} MT</p>
                    </div>
                    <p class="text-[13px] font-black text-slate-900 dark:text-white">${(item.quantidade * item.preco).toLocaleString('pt-MZ')} MT</p>
                </div>
            `;
        });
    } else {
        htmlItens = '<p class="text-xs text-slate-500">Nenhum detalhe de itens disponível.</p>';
    }

    let acoesHtml = '';
    if (pedido.status === 'pendente') {
        acoesHtml = `
            <div class="flex gap-2 mt-5">
                <button onclick="alterarStatusPedido('${pedido.id}', 'confirmado')" class="flex-1 bg-[#0F172A] text-white h-12 rounded-xl text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all shadow-md">
                    Confirmar
                </button>
                <button onclick="alterarStatusPedido('${pedido.id}', 'cancelado')" class="w-1/3 bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 h-12 rounded-xl text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all">
                    Cancelar
                </button>
            </div>
        `;
    } else if (pedido.status === 'confirmado') {
         acoesHtml = `
            <div class="mt-5">
                <button onclick="alterarStatusPedido('${pedido.id}', 'enviado')" class="w-full bg-blue-500 text-white h-12 rounded-xl text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all shadow-md">
                    Marcar como Enviado
                </button>
            </div>
        `;
    } else if (pedido.status === 'enviado') {
         acoesHtml = `
            <div class="mt-5">
                <button onclick="alterarStatusPedido('${pedido.id}', 'concluido')" class="w-full bg-purple-500 text-white h-12 rounded-xl text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all shadow-md">
                    Concluir Entrega
                </button>
            </div>
        `;
    }

    const whatsAppUrl = pedido.cliente_telefone ? `https://wa.me/${pedido.cliente_telefone.replace(/[^0-9]/g, '')}` : '#';

    corpo.innerHTML = `
        <div class="bg-slate-50 dark:bg-navy-800/30 p-5 rounded-[20px] mb-5 border border-slate-100 dark:border-navy-700/50">
            <h4 class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Detalhes do Cliente</h4>
            <p class="text-[15px] font-bold text-slate-900 dark:text-white mb-3">${pedido.cliente_nome || 'N/A'}</p>
            
            <div class="flex gap-2 mb-4">
                ${pedido.cliente_telefone ? `
                    <a href="${whatsAppUrl}" target="_blank" class="flex-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                        <i class="fab fa-whatsapp text-sm"></i> WhatsApp
                    </a>
                ` : ''}
                ${pedido.cliente_telefone ? `
                    <a href="tel:${pedido.cliente_telefone}" class="flex-1 bg-white dark:bg-navy-700 border border-slate-200 dark:border-navy-600 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                        <i class="fas fa-phone"></i> Ligar
                    </a>
                ` : ''}
            </div>

            <div class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 font-medium">
                <p class="flex gap-2"><span class="w-4 text-center opacity-50"><i class="fas fa-map-marker-alt"></i></span> <span>${pedido.cliente_morada || 'Não informada'}</span></p>
                <p class="flex gap-2"><span class="w-4 text-center opacity-50"><i class="fas fa-calendar-alt"></i></span> <span>${dataFormatada} - ${horaFormatada}</span></p>
            </div>
        </div>

        <div>
            <h4 class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Itens Adquiridos</h4>
            <div class="bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 rounded-[20px] p-4 shadow-sm">
                ${htmlItens}
            </div>
        </div>

        <div class="flex justify-between items-center p-5 bg-slate-900 dark:bg-slate-800 text-white rounded-[20px] shadow-lg mt-5 border border-slate-800 dark:border-slate-700">
            <span class="text-[10px] font-black uppercase tracking-widest opacity-70">Total Pago</span>
            <span class="text-xl font-black">${parseFloat(pedido.total || 0).toLocaleString('pt-MZ')} <span class="text-[10px] uppercase tracking-widest opacity-70 ml-1">MT</span></span>
        </div>

        ${acoesHtml}
    `;

    modal.classList.remove('pointer-events-none');
    modal.classList.add('opacity-100');
    setTimeout(() => {
        content.classList.remove('translate-y-full');
    }, 10);
};

window.fecharModalPedido = function() {
    const modal = document.getElementById('modal-pedido');
    const content = document.getElementById('modal-pedido-content');
    if (!modal || !content) return;

    content.classList.add('translate-y-full');
    setTimeout(() => {
        modal.classList.remove('opacity-100');
        modal.classList.add('pointer-events-none');
    }, 300);
};

