// views/view-login.js

function renderLogin() {
    return `
    <div class="min-h-full flex flex-col items-center justify-center p-6 sm:p-12 bg-[#F9F7F5] overflow-y-auto animate-pageEnter w-full">
        
        <div class="w-full max-w-[400px] mx-auto">
            
            <div class="text-center mb-8">
                <h1 class="text-3xl font-black text-navy-900 tracking-tighter">Shopyump</h1>
            </div>

            <div class="bg-white p-8 sm:p-10 rounded-[32px] shadow-premium w-full">
                
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-extrabold text-navy-900 tracking-tight mb-2">Iniciar sessão</h2>
                    <p class="text-sm text-slate-500 font-medium">Insere as tuas credenciais para aceder ao painel.</p>
                </div>

                <div class="space-y-5">
                    <button type="button" class="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-sm">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5">
                        Continuar com Google
                    </button>

                    <div class="flex items-center gap-4 py-2">
                        <div class="h-px bg-slate-200 flex-1"></div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">OU</span>
                        <div class="h-px bg-slate-200 flex-1"></div>
                    </div>

                    <form id="loginForm" class="space-y-4" onsubmit="event.preventDefault();">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 tracking-wide mb-2 ml-1">E-mail</label>
                            <input type="email" id="loginEmail" placeholder="exemplo@loja.com" required
                                class="w-full rounded-2xl bg-slate-50 border border-transparent py-4 px-5 text-navy-900 focus:bg-white focus:border-navy-900 outline-none transition-all font-medium text-sm shadow-inner">
                        </div>

                        <div>
                            <div class="flex justify-between items-center mb-2 px-1">
                                <label class="text-xs font-bold text-slate-500 tracking-wide">Senha</label>
                                <a href="#forgot" class="text-xs font-bold text-slate-400 hover:text-navy-900 transition-colors">Esqueceste-te?</a>
                            </div>
                            <div class="relative flex items-center">
                                <input type="password" id="loginPassword" placeholder="••••••••" required
                                    class="w-full rounded-2xl bg-slate-50 border border-transparent py-4 px-5 text-navy-900 focus:bg-white focus:border-navy-900 outline-none transition-all font-medium text-sm shadow-inner pr-14">
                                <button type="button" id="togglePass" class="absolute right-4 text-slate-400 active:scale-90 transition-transform p-2 flex items-center justify-center">
                                    <svg id="eyeOpen" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                    <svg id="eyeClosed" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
                                </button>
                            </div>
                        </div>

                        <div class="flex items-center ml-1 py-1">
                            <input id="remember" type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-[#0F172A] cursor-pointer">
                            <label for="remember" class="ml-2 text-xs text-slate-500 font-semibold cursor-pointer select-none">Manter sessão iniciada</label>
                        </div>

                        <button type="submit" id="btnLogin" disabled
                            class="w-full bg-navy-900 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-navy-800 transition-all active:scale-[0.97] mt-4 mb-4 opacity-50 cursor-not-allowed text-sm tracking-wider">
                            Entrar
                        </button>
                    </form>

                    <div class="mt-8 text-center border-t border-slate-100 pt-6">
                        <p class="text-sm text-slate-500 font-semibold">
                            Novo na plataforma? 
                            <a href="#register" class="text-navy-900 font-black hover:underline underline-offset-4">Criar conta grátis</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function iniciarLogicaLogin() {
    const loginForm = document.getElementById('loginForm');
    const btnLogin = document.getElementById('btnLogin');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    const toggleBtn = document.getElementById('togglePass');
    const eyeOpen = document.getElementById('eyeOpen');
    const eyeClosed = document.getElementById('eyeClosed');

    function validateLogin() {
        const email = emailInput?.value.trim() || "";
        const password = passwordInput?.value.trim() || "";
        
        if (email.includes('@') && email.length > 5 && password.length >= 1) {
            btnLogin.disabled = false;
            btnLogin.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            btnLogin.disabled = true;
            btnLogin.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    emailInput?.addEventListener('input', validateLogin);
    passwordInput?.addEventListener('input', validateLogin);

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            if(eyeOpen && eyeClosed) {
                eyeOpen.classList.toggle('hidden', isPassword);
                eyeClosed.classList.toggle('hidden', !isPassword);
            }
        });
    }

    const googleBtn = document.querySelector('button img[src*="google"]')?.closest('button');
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            googleBtn.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                A ligar à Google...
            `;
            googleBtn.disabled = true;

            const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
                provider: 'google',
            });

            if (error) {
                alert('Erro ao ligar à Google: ' + error.message);
                googleBtn.innerHTML = '<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5"> Continuar com Google';
                googleBtn.disabled = false;
            }
        });
    }

    if (loginForm) {
        loginForm.onsubmit = async function(e) {
            e.preventDefault();
            
            btnLogin.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>A entrar...</span>
                </div>
            `;
            btnLogin.classList.add('opacity-80', 'scale-[0.98]');
            btnLogin.disabled = true;

            const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            });

            if (error) {
                alert('Erro: ' + error.message);
                btnLogin.innerHTML = 'Entrar';
                btnLogin.classList.remove('opacity-80', 'scale-[0.98]');
                btnLogin.disabled = false;
            }
            // o auth-router fará o redirecionamento.
        };
    }
}
