// auth-router.js

document.addEventListener('DOMContentLoaded', inicializarAuth);

function inicializarAuth() {
    // Espião Global de Sessão
    if(window.supabaseClient) {
        window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                sessionStorage.setItem('shopyump_auth', 'true');
                sessionStorage.setItem('shopyump_user', session.user.id);
                
                const root = document.getElementById('auth-root');
                if (root) {
                    root.style.opacity = '0';
                    root.style.transition = 'opacity 0.4s ease';
                }
                
                setTimeout(async () => {
                    // 1. O BANCO DE DADOS VALIDA SE É ADMIN
                    // Verifica na tabela 'administradores' se este dono de sessão tem acesso
                    const { data: admin } = await window.supabaseClient
                        .from('administradores')
                        .select('id')
                        .eq('email', session.user.email)
                        .maybeSingle();

                    if (admin) {
                        // Se for encontrado na tabela de administradores, redireciona para o Admin
                        window.location.href = 'admin.html';
                        return;
                    }

                    // 2. SE NÃO FOR ADMIN, VERIFICA SE O UTILIZADOR JÁ TEM LOJA
                    const { data: loja } = await window.supabaseClient
                        .from('lojas')
                        .select('id')
                        .eq('perfil_id', session.user.id)
                        .maybeSingle();

                    if (loja) {
                        window.location.href = 'dashboard.html'; // Dashboard
                    } else {
                        window.location.href = 'onboarding.html'; // Onboarding
                    }
                }, 400);
            }
        });
    }

    window.addEventListener('hashchange', routerAuth);
    
    if (!window.location.hash) {
        window.location.hash = '#login';
    } else {
        routerAuth();
    }
}

function routerAuth() {
    const rota = window.location.hash || '#login';
    const root = document.getElementById('auth-root');
    
    if (!root) return;

    root.style.opacity = '0';
    root.style.transition = 'opacity 0.2s ease-out';
    
    setTimeout(() => {
        switch (rota) {
            case '#login':
                root.innerHTML = typeof renderLogin === 'function' ? renderLogin() : '';
                if (typeof iniciarLogicaLogin === 'function') iniciarLogicaLogin();
                break;
            case '#register':
                root.innerHTML = typeof renderRegister === 'function' ? renderRegister() : '';
                if (typeof iniciarLogicaRegister === 'function') iniciarLogicaRegister();
                break;
            case '#verify':
                root.innerHTML = typeof renderVerify === 'function' ? renderVerify() : '';
                if (typeof iniciarLogicaVerify === 'function') iniciarLogicaVerify();
                break;
            case '#forgot':
                root.innerHTML = typeof renderForgot === 'function' ? renderForgot() : '<div>Em breve...</div>';
                if (typeof iniciarLogicaForgot === 'function') iniciarLogicaForgot();
                break;
            case '#reset':
                root.innerHTML = typeof renderReset === 'function' ? renderReset() : '<div>Em breve...</div>';
                if (typeof iniciarLogicaReset === 'function') iniciarLogicaReset();
                break;
            default:
                window.location.hash = '#login';
        }
        root.style.opacity = '1';
    }, 200); 
}
