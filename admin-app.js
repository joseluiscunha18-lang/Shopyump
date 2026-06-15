document.addEventListener('DOMContentLoaded', initAdminSPA);

function initAdminSPA() {
    window.addEventListener('hashchange', renderRoute);
    
    if (!window.location.hash) {
        window.location.hash = '#dashboard';
    } else {
        renderRoute();
    }
}

function renderRoute() {
    const route = window.location.hash.replace('#', '') || 'dashboard';
    const root = document.getElementById('admin-root');
    const title = document.getElementById('header-title');

    root.style.opacity = '0';
    root.style.transform = 'translateY(8px)';
    root.style.transition = 'all 0.2s ease-out';

    updateActiveMenu(route);

    setTimeout(() => {
        switch (route) {
            case 'dashboard':
                title.innerText = 'Resumo e Estatísticas';
                root.innerHTML = renderAdminDashboard();
                break;
            case 'lojas':
                title.innerText = 'Gestão de Lojas';
                root.innerHTML = renderAdminLojas();
                break;
            case 'usuarios':
                title.innerText = 'Gestão de Utilizadores';
                root.innerHTML = renderAdminUsuarios();
                break;
            case 'onboarding':
                title.innerText = 'Inteligência de Onboarding';
                root.innerHTML = renderAdminOnboarding();
                break;
            default:
                window.location.hash = '#dashboard';
        }
        
        root.style.opacity = '1';
        root.style.transform = 'translateY(0)';
    }, 150);
}

function updateActiveMenu(currentRoute) {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.route === currentRoute) {
            link.classList.add('bg-white/10', 'text-white', 'font-semibold');
            link.classList.remove('text-slate-400', 'hover:bg-white/5', 'font-medium');
        } else {
            link.classList.remove('bg-white/10', 'text-white', 'font-semibold');
            link.classList.add('text-slate-400', 'hover:bg-white/5', 'font-medium');
        }
    });
}
