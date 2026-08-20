// auth-router.js

// ACESSO BLOQUEADO: enquanto isto for true, ninguém consegue entrar
// nem registar conta (nem sequer quem já tem conta existente).
window.SHOPYUMP_ACESSO_BLOQUEADO = true;

document.addEventListener('DOMContentLoaded', inicializarAuth);

function renderAcessoBloqueado() {
    return `
    <div class="min-h-full flex flex-col items-center justify-center p-6 sm:p-12 bg-[#F9F7F5] overflow-y-auto animate-pageEnter w-full">
        <div class="w-full max-w-[400px] mx-auto text-center">
            <h1 class="text-3xl font-black text-navy-900 tracking-tighter mb-8">Shopyump</h1>
            <div class="bg-white p-8 sm:p-10 rounded-[32px] shadow-premium w-full">
                <div class="w-14 h-14 mx-auto mb-5 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <svg class="w-7 h-7 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 class="text-xl font-extrabold text-navy-900 tracking-tight mb-2">Acesso temporariamente bloqueado</h2>
                <p class="text-sm text-slate-500 font-medium">Não é possível iniciar sessão ou criar conta neste momento. Tenta novamente mais tarde.</p>
            </div>
        </div>
    </div>
    `;
}

function inicializarAuth() {
    // Espião Global de Sessão
    if(window.supabaseClient) {
        window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
            if (window.SHOPYUMP_ACESSO_BLOQUEADO) {
                // Acesso bloqueado: força sempre o logout, mesmo que
                // alguém consiga autenticar-se.
                if (session) await window.supabaseClient.auth.signOut();
                return;
            }
            if (event === 'SIGNED_IN' && session) {
                sessionStorage.setItem('shopyump_auth', 'true');
                sessionStorage.setItem('shopyump_user', session.user.id);
                
                const root = document.getElementById('auth-root');
                if (root) {
                    root.style.opacity = '0';
                    root.style.transition = 'opacity 0.4s ease';
                }
                
                setTimeout(async () => {
                    // Verifica se o usuário é o ADMIN via base de dados
                    const { data: adminData, error: adminError } = await window.supabaseClient
                        .from('admins')
                        .select('email')
                        .eq('email', session.user.email);

                    // Se a query retornar dados (o e-mail logado está na tabela admins)
                    if (adminData && adminData.length > 0) {
                        window.location.href = 'admin.html'; // Painel Admin
                        return;
                    }

                    // VERIFICA SE JÁ TEM LOJA (Para usuários normais)
                    const { data: loja, error } = await window.supabaseClient
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

    if (window.SHOPYUMP_ACESSO_BLOQUEADO) {
        setTimeout(() => {
            root.innerHTML = renderAcessoBloqueado();
            root.style.opacity = '1';
        }, 200);
        return;
    }
    
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
