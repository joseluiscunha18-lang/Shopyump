// global.js - Funções partilhadas por todas as páginas

// ─── Dark Mode ───────────────────────────────────────────────────────────────
function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function toggleSidebar() {
    const menu = document.getElementById('menuZ');
    const overlay = document.getElementById('overlay');
    if (!menu) return;
    menu.classList.toggle('open');
    overlay && overlay.classList.toggle('show');
}

// ─── Modo Novato ─────────────────────────────────────────────────────────────
function toggleModoNovato() {
    const bola = document.getElementById('toggle-novato-bola');
    const parent = bola?.parentElement;
    const ativo = parent?.classList.contains('bg-emerald-500');
    if (ativo) {
        parent.classList.remove('bg-emerald-500');
        parent.classList.add('bg-slate-300', 'dark:bg-slate-700');
        bola.classList.remove('translate-x-4');
    } else {
        parent.classList.add('bg-emerald-500');
        parent.classList.remove('bg-slate-300', 'dark:bg-slate-700');
        bola.classList.add('translate-x-4');
    }
}

// ─── Toast / Notificação ─────────────────────────────────────────────────────
function mostrarNotificacao(msg, fecharId) {
    const toast = document.getElementById('toast-sucesso');
    const msgEl = document.getElementById('toast-msg');
    if (!toast) return;
    if (msgEl) msgEl.textContent = msg || 'Atualizado';
    toast.classList.remove('-translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
        toast.classList.add('-translate-y-24', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
        if (fecharId) {
            const el = document.getElementById(fecharId);
            if (el) el.classList.remove('open');
        }
    }, 2800);
}

// ─── Navegação SPA ───────────────────────────────────────────────────────────
function navegarAnimado(pagina) {
    // Fecha sidebar se aberta
    const menu = document.getElementById('menuZ');
    const overlay = document.getElementById('overlay');
    if (menu) menu.classList.remove('open');
    if (overlay) overlay.classList.remove('show');

    // Animação de saída
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateX(-20px)';
    document.body.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    setTimeout(() => {
        SPA.navegar(pagina);
    }, 200);
}

// ─── Scroll: Header Inteligente ───────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ─── Fechar sidebar ao clicar fora (mobile) ───────────────────────────────────
document.addEventListener('click', (e) => {
    const menu = document.getElementById('menuZ');
    const overlay = document.getElementById('overlay');
    if (overlay && overlay.classList.contains('show') && e.target === overlay) {
        menu.classList.remove('open');
        overlay.classList.remove('show');
    }
});

// Substitua o código de escuta global por este:

// Função robusta para iniciar a conexão em Tempo Real
function iniciarTempoRealPedidos() {
    if (!window.supabaseClient) return;

    // Se já existe um canal aberto, evitamos duplicar
    if (window.canalPedidosTempoReal) {
        window.supabaseClient.removeChannel(window.canalPedidosTempoReal);
    }

    // Cria e subscreve no canal
    window.canalPedidosTempoReal = window.supabaseClient.channel('pedidos-em-tempo-real')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos' }, (payload) => {
         console.log('📦 Novo sinal em tempo real (Pedidos):', payload);
         
         // 1. Atualizar Memória dos Pedidos (Página Vendas)
         if (typeof todosOsPedidos !== 'undefined') {
             if (payload.eventType === 'INSERT') {
                 todosOsPedidos.unshift(payload.new); 
             } else if (payload.eventType === 'UPDATE') {
                 const i = todosOsPedidos.findIndex(p => p.id === payload.new.id);
                 if (i !== -1) todosOsPedidos[i] = payload.new;
             }
         }

         const rotaAtual = window.location.hash.replace('#', '') || 'dashboard';
         
         // 2. Com base na rota atual, decide o que atualizar na interface
         if (rotaAtual === 'vendas' && typeof renderizarListaPedidos === 'function') {
             // Se estivermos na aba Vendas, atualizamos apenas as listas instantaneamente
             const btnTudo = document.querySelector('.filtro-btn.active');
             renderizarListaPedidos(btnTudo ? btnTudo.dataset.filter : 'tudo');
         } 
         else if (rotaAtual === 'dashboard' && typeof window.forcarAtualizacaoDashboard === 'function') {
             // Se estivermos no Dashboard, forçamos o refresh do dashboard
             window.forcarAtualizacaoDashboard();
         } 
         else {
             // Se o utilizador estiver noutra página qualquer (ex: Produtos), 
             // limpamos os caches para re-carregar do zero da próxima vez que ele for ao Dashboard ou Pedidos
             if (typeof dashboardCarregado !== 'undefined') dashboardCarregado = false;
             if (typeof pedidosCarregados !== 'undefined') pedidosCarregados = false;
         }
      })
      .subscribe((status) => {
          console.log("📡 Status do Supabase Realtime:", status);
      });
}

// ----------------------------------------------------------------------
// EXTREMAMENTE IMPORTANTE: Aciona o Tempo Real de forma Segura
// ----------------------------------------------------------------------

// 1. Iniciar quando uma página é carregada via SPA (garante que inicializa na navegação)
document.addEventListener('spa:page-loaded', () => {
    iniciarTempoRealPedidos();
});

// 2. Executa apenas se o window já carregou e o utilizador existir na sessão atual 
setTimeout(() => {
    iniciarTempoRealPedidos();
}, 2000); // 2 segundos após a inicialização dá tempo do Supabase carregar a Sessão do Utilizador
