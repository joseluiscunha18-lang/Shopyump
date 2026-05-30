// auth-router.js

document.addEventListener('DOMContentLoaded', inicializarAuth);

function inicializarAuth() {
    // Espião Global de Sessão
    window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
            sessionStorage.setItem('shopyump_auth', 'true');
            sessionStorage.setItem('shopyump_user', session.user.id);
            
            const root = document.getElementById('auth-root');
            if (root) {
                root.style.opacity = '0';
                root.style.transition = 'opacity 0.4s ease';
            }
            
            // VERIFICA SE JÁ TEM LOJA
            const { data: loja, error } = await window.supabaseClient
                .from('lojas')
                .select('id')
                .eq('perfil_id', session.user.id)
                .maybeSingle();

            setTimeout(() => {
                if (loja) {
                    window.location.href = 'index.html'; // Dashboard
                } else {
                    window.location.href = 'onboarding.html'; // Onboarding
                }
            }, 400);
        }
    });

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
                root.innerHTML = typeof renderForgot === 'function' ? renderForgot() : '';
                if (typeof iniciarLogicaForgot === 'function') iniciarLogicaForgot();
                break;
            case '#reset':
                root.innerHTML = typeof renderReset === 'function' ? renderReset() : '';
                if (typeof iniciarLogicaReset === 'function') iniciarLogicaReset();
                break;
            default:
                window.location.hash = '#login';
        }
        root.style.opacity = '1';
    }, 200); 
}
