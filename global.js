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
    
    // Trava e Destrava Absoluta para Dispositivos Móveis
    if (menu.classList.contains('open')) {
        document.body.dataset.scrollY = window.scrollY; // Guarda onde estavas
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
    } else {
        const voltaOndeEstavas = document.body.dataset.scrollY || '0';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(voltaOndeEstavas));
    }
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
    
    // Solta a armadilha do fundo caso se clique num link lá dentro
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflow = '';

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
        document.body.style.overflow = ''; // Destrava a tela
    }
});

// ────── CÓDIGO A SUBSTITUIR EM: global.js ──────

// Função robusta e invencível de Tempo Real
function iniciarTempoRealPedidos() {
    if (!window.supabaseClient) return;

    // PREVENÇÃO VITAL: Bloqueia a abertura se já existir (O canal FICA VIVO PARA SEMPRE).
    if (window.canalPedidosTempoReal) {
        return; 
    }

    // Cria e subscreve no canal UMA ÚNICA VEZ
    window.canalPedidosTempoReal = window.supabaseClient.channel('pedidos-em-tempo-real')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos' }, (payload) => {
         console.log('📦 ENCOMENDA MÁGICA RECEBIDA (Realtime):', payload);
         
         // 1. Atualizar Memória dos Pedidos (Aba Vendas) MAGICAMENTE!
         if (typeof todosOsPedidos !== 'undefined') {
             if (payload.eventType === 'INSERT') {
                 // Adiciona sem clonar repetidas
                 const exists = todosOsPedidos.find(p => p.id === payload.new.id);
                 if (!exists) todosOsPedidos.unshift(payload.new); 
             } else if (payload.eventType === 'UPDATE') {
                 const i = todosOsPedidos.findIndex(p => p.id === payload.new.id);
                 if (i !== -1) todosOsPedidos[i] = payload.new;
             }
         }

         // 2. Atualizar Memória do Dashboard Principal (Home) MAGICAMENTE!
         if (typeof memDashboard !== 'undefined' && memDashboard.pendentes) {
             if (payload.eventType === 'INSERT' && payload.new.status === 'pendente') {
                  const exists = memDashboard.pendentes.find(p => p.id === payload.new.id);
                  if (!exists) memDashboard.pendentes.unshift(payload.new);
             } else if (payload.eventType === 'UPDATE') {
                  if (payload.new.status !== 'pendente') {
                       memDashboard.pendentes = memDashboard.pendentes.filter(p => p.id !== payload.new.id);
                  }
             }
         }

         const rotaAtual = window.location.hash.replace('#', '') || 'dashboard';
         
         // 3. RENDERIZA OS ECRÃS EM TEMPO REAL SEM NUNCA PRECISAR CARREGAR SÍMBOLOS
         if (rotaAtual === 'vendas' && typeof renderizarListaPedidos === 'function') {
             const btnTudo = document.querySelector('.filtro-btn.active');
             renderizarListaPedidos(btnTudo ? btnTudo.dataset.filter : 'tudo');
         } 
         else if (rotaAtual === 'dashboard' && typeof renderizarPendentesDashboard === 'function' && typeof memDashboard !== 'undefined') {
             // Força o desenho puramente visual para atualizar o ecrã instantâneo da Home.
             renderizarPendentesDashboard(memDashboard.pendentes);
         } 
         else {
             // Limpa variáveis se o utilizador está despido numa outra aba, assim vai recarregar do banco fresco
             if (typeof dashboardCarregado !== 'undefined') dashboardCarregado = false;
             if (typeof pedidosCarregados !== 'undefined') pedidosCarregados = false;
         }
      })
      .subscribe();
}

// 4. Inicia APENAS UMA VEZ DE FORMA SILENCIOSA. 
// A tua UI vai sempre funcionar nas sombras quando houver encomendas
setTimeout(() => {
    iniciarTempoRealPedidos();
}, 2000);
