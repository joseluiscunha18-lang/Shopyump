// admin-router.js

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
    const subtitle = document.getElementById('header-subtitle');

    root.style.opacity = '0';
    root.style.transform = 'translateY(10px)';
    root.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    updateActiveMenu(route);

    setTimeout(() => {
        switch (route) {
            case 'dashboard':
                title.innerText = 'Resumo Geral';
                subtitle.innerText = 'Métricas e atividade recente da plataforma';
                root.innerHTML = renderDashboard();
                break;
            case 'lojas':
                title.innerText = 'Gestão de Lojas';
                subtitle.innerText = 'Administração, criação e controlo de lojas ativas';
                root.innerHTML = renderLojas();
                break;
            case 'utilizadores':
                title.innerText = 'Utilizadores';
                subtitle.innerText = 'Gestão de contas, acessos e bloqueios';
                root.innerHTML = renderUtilizadores();
                break;
            case 'onboarding':
                title.innerText = 'Dados de Onboarding';
                subtitle.innerText = 'Informações de perfil recolhidas no registo inicial';
                root.innerHTML = renderOnboarding();
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
