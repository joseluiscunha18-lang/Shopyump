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

// Ouve as atualizações do banco de dados no Supabase e atualiza silenciosamente
if (window.supabaseClient) {
    // 1. Tenta remover conexões antigas para não duplicar avisos
    window.supabaseClient.removeAllChannels();

    window.supabaseClient.channel('pedidos-em-tempo-real')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos' }, (payload) => {
         
         // 2. Atualiza a lista da página "Vendas/Pedidos" na Memória
         if (typeof todosOsPedidos !== 'undefined') {
             if (payload.eventType === 'INSERT') {
                 // Só mete no fim se não existir ainda (evita duplicação)
                 if (!todosOsPedidos.some(p => p.id === payload.new.id)) {
                     todosOsPedidos.unshift(payload.new); 
                 }
             } else if (payload.eventType === 'UPDATE') {
                 const i = todosOsPedidos.findIndex(p => p.id === payload.new.id);
                 if (i !== -1) todosOsPedidos[i] = payload.new;
             } else if (payload.eventType === 'DELETE') {
                 todosOsPedidos = todosOsPedidos.filter(p => p.id !== payload.old.id);
             }
         }

         // 3. LÓGICA INFALÍVEL: Verifica que ecrã está visível AGORA pelos elementos HTML
         const taNaVendas = document.getElementById('lista-pedidos-historico') !== null;
         const taNoDashboard = document.getElementById('stat-pedidos') !== null;
         
         // Se estiver ativamente na página de Pedidos:
         if (taNaVendas && typeof renderizarListaPedidos === 'function') {
             const btnTudo = document.querySelector('.filtro-btn.active');
             renderizarListaPedidos(btnTudo ? btnTudo.dataset.filter : 'tudo');
         } 
         
         // Se estiver ativamente no Dashboard Inicial (Home):
         if (taNoDashboard && typeof window.forcarAtualizacaoDashboard === 'function') {
             // Força a recarregar e pintar o número novo em tempo real
             window.forcarAtualizacaoDashboard();
         } else {
             // Pede para forçar atualização recarregando do zero caso o utilizador entre no painel depois
             if (typeof dashboardCarregado !== 'undefined') dashboardCarregado = false;
         }
      })
      .subscribe((status) => {
          // Isso ajuda a descobrir se ele conectou mesmo (veja no console do navegador)
          console.log("Status Realtime dos Pedidos:", status);
      });
}
