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
                
                // VERIFICA SE JÁ TEM LOJA
                const { data: loja, error } = await window.supabaseClient
                    .from('lojas')
                    .select('id')
                    .eq('perfil_id', session.user.id)
                    .maybeSingle();

                setTimeout(() => {
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
    const hash = window.location.hash;
    const root = document.getElementById('auth-root');
    
    if (!root) return;

    // 1. O BLOQUEIO: Se estiver a voltar do Google, mostra a animação de carregamento
    if (hash && (hash.includes('access_token') || hash.includes('type=recovery'))) {
        root.innerHTML = `
            <div class="h-full w-full flex flex-col items-center justify-center bg-[#F9F7F5]">
                <div class="w-16 h-16 bg-white rounded-2xl shadow-premium flex items-center justify-center mb-4">
                    <span class="text-navy-900 font-black text-2xl">S</span>
                </div>
                <div class="w-5 h-5 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p class="mt-4 text-sm font-bold text-slate-500 tracking-wide">A preparar a tua conta...</p>
            </div>
        `;
        root.style.opacity = '1';
        return; // Pára aqui! O "onAuthStateChange" assume o comando.
    }

    // 2. Comportamento normal para visitas comuns
    const rota = hash || '#login';
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

