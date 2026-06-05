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
