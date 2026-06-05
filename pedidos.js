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
let canalTempoRealPedidos = null; // Guardião de Tempo Real SEGURO e ISOLADO

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'vendas') {
        if (!pedidosCarregados) {
            carregarHistoricoPedidos();
        } else {
            // Se já temos memória, mostra imediatamente os pedidos gravados
            const btnTudo = document.querySelector('.filtro-btn.active');
            filtrarPedidos(btnTudo ? btnTudo.dataset.filter : 'tudo');
        }
    }
});

async function carregarHistoricoPedidos() {
    const lista = document.getElementById('lista-pedidos-historico');
    if (!lista) return;

    if (todosOsPedidos.length === 0) {
        lista.innerHTML = '<div class="py-6 text-center text-slate-400 text-sm flex flex-col items-center"><i class="fas fa-circle-notch fa-spin text-2xl mb-2"></i>A carregar pedidos...</div>';
    }

    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (!userId) {
            lista.innerHTML = '<p class="text-center text-slate-400 py-4">Sessão expirada.</p>';
            return;
        }

        // Recupera a loja da Memória, ou faz um pedido instantâneo se for a primeira vez
        let lojaId = null;
        if (typeof window.lojaIdAtivaDashboard !== 'undefined') {
            lojaId = window.lojaIdAtivaDashboard;
        }

        if (!lojaId) {
            const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', userId).maybeSingle();
            if (loja) {
                lojaId = loja.id;
                window.lojaIdAtivaDashboard = loja.id;
            }
        }

        if (!lojaId) {
            lista.innerHTML = '<p class="text-center text-slate-400 py-4">A tua loja não foi encontrada.</p>';
            return;
        }

        // Vai à Base de Dados buscar todos os pedidos
        const { data: pedidos, error } = await window.supabaseClient
            .from('pedidos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Guarda-os no CACHE Seguro
        todosOsPedidos = pedidos || [];
        pedidosCarregados = true; 
        
        const btnTudo = document.querySelector('.filtro-btn.active');
        filtrarPedidos(btnTudo ? btnTudo.dataset.filter : 'tudo');

        // 🔥 ACTIVA O TEMPO REAL (Mas agora de forma Blindada e 100% Segura só no Painel)
        configurarTempoRealDashboard(lojaId);

    } catch (e) {
        console.error("Erro ao carregar pedidos:", e);
        lista.innerHTML = '<p class="text-center text-red-400 py-4">Erro ao carregar histórico.</p>';
    }
}

// Motor Seguro de Atualização de Tempo Real Restrito ao Lojista
function configurarTempoRealDashboard(lojaId) {
    if (!window.supabaseClient || canalTempoRealPedidos) return;

    canalTempoRealPedidos = window.supabaseClient.channel('dash-pedidos-vendas')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos' }, (payload) => {
         
         // 1. Atualizar Memória Local Magicamente
         if (payload.eventType === 'INSERT') {
             // Certifica-se que o pedido Realtime é mesmo desta Loja
             if (payload.new.loja_id === lojaId) {
                 const existe = todosOsPedidos.find(p => p.id === payload.new.id);
                 if (!existe) todosOsPedidos.unshift(payload.new); 
             }
         } else if (payload.eventType === 'UPDATE') {
             const idx = todosOsPedidos.findIndex(p => p.id === payload.new.id);
             if (idx !== -1) todosOsPedidos[idx] = payload.new;
         }

         // 2. Refrescar a UI do utilizador imediatamente (se na visualização)
         const rotaAtual = window.location.hash.replace('#', '') || 'dashboard';
         if (rotaAtual === 'vendas' && typeof renderizarListaPedidos === 'function') {
             const btnTudo = document.querySelector('.filtro-btn.active');
             renderizarListaPedidos(btnTudo ? btnTudo.dataset.filter : 'tudo');
         }

         // 3. Forçar Descarte de Cache no Dashboard para Atualizar as Contagens Gerais
         if (typeof dashboardCarregado !== 'undefined') dashboardCarregado = false;
      })
      .subscribe();
}

// ✨ Magia Otimista: Status Instantâneo (Trocas Sem "Loading")
async function alterarStatusPedido(id, novoStatus) {
    // 1. Atualiza Visualmente no momento EXATO do Clique
    const idx = todosOsPedidos.findIndex(p => p.id === id);
    if (idx !== -1) todosOsPedidos[idx].status = novoStatus;
    
    if (typeof fecharModalPedido === 'function') fecharModalPedido();
    
    const btnTudo = document.querySelector('.filtro-btn.active');
    filtrarPedidos(btnTudo ? btnTudo.dataset.filter : 'tudo');

    // Despistar Cache Central
    if (typeof dashboardCarregado !== 'undefined') dashboardCarregado = false;

    // 2. Executar no Background silenciosamente
    try {
        const { error } = await window.supabaseClient
            .from('pedidos')
            .update({ status: novoStatus })
            .eq('id', id);
        
        if (error) console.error("Erro DB:", error);
    } catch(e) {
        console.error(e);
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('Houve uma quebra de net, tentaremos validar em breve.');
    }
}
