// view-register.js

function renderRegister() {
    return `
    <div class="min-h-full flex flex-col items-center justify-center p-5 sm:p-8 bg-[#F9F7F5] animate-pageEnter relative overflow-hidden">
        
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
        
        <div class="w-full max-w-[420px] relative z-10 w-full">
            
            <div class="text-center mb-8">
                <div class="w-14 h-14 bg-navy-900 rounded-[18px] shadow-lg flex items-center justify-center mx-auto mb-5">
                    <span class="text-white font-black text-2xl tracking-tighter">S</span>
                </div>
                <h1 class="text-2xl font-extrabold text-navy-900 tracking-tight mb-2">Cria a tua conta</h1>
                <p class="text-sm text-slate-500 font-medium">Começa a vender em menos de 3 minutos.</p>
            </div>

            <div class="bg-white p-7 sm:p-10 rounded-[32px] shadow-premium border border-slate-100">
                <div class="space-y-5">
                    <button type="button" class="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-sm">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5">
                        Registar com Google
                    </button>

                    <div class="flex items-center gap-4 py-2">
                        <div class="h-px bg-slate-200 flex-1"></div>
                        <span class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Ou</span>
                        <div class="h-px bg-slate-200 flex-1"></div>
                    </div>

                    <form id="registerForm" class="space-y-4" onsubmit="event.preventDefault();">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 tracking-wide mb-2 ml-1">E-mail</label>
                            <input type="email" placeholder="exemplo@loja.com" required
                                class="w-full rounded-2xl bg-slate-50 border border-transparent py-4 px-5 text-navy-900 focus:bg-white focus:border-navy-900 outline-none transition-all font-medium text-sm shadow-inner">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 tracking-wide mb-2 ml-1">Palavra-passe</label>
                            <div class="relative flex items-center">
                                <input type="password" id="registerPassword" placeholder="Cria uma senha forte" required
                                    class="w-full rounded-2xl bg-slate-50 border border-transparent py-4 px-5 text-navy-900 focus:bg-white focus:border-navy-900 outline-none transition-all font-medium text-sm shadow-inner pr-14">
                                <button type="button" id="togglePass" class="absolute right-4 text-slate-400 active:scale-90 transition-transform p-2">
                                    <svg id="eyeOpen" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                    <svg id="eyeClosed" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
                                </button>
                            </div>
                            <p id="passHint" class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 ml-1 transition-colors">
                                Mínimo de 8 caracteres
                            </p>
                        </div>

                        <button type="submit" id="btnRegister" disabled
                            class="w-full bg-navy-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-navy-800 transition-all active:scale-[0.97] mt-6 mb-2 opacity-50 cursor-not-allowed uppercase tracking-wider text-sm">
                            Criar conta
                        </button>

                        <p class="text-center text-[11px] text-slate-400 leading-relaxed px-2">
                            Ao continuares, aceitas os <a href="#" class="text-navy-900 font-bold hover:underline transition-colors">Termos</a> e a <a href="#" class="text-navy-900 font-bold hover:underline transition-colors">Privacidade</a>.
                        </p>
                    </form>
                </div>
            </div>
            
            <div class="mt-8 text-center">
                <p class="text-[13px] text-slate-500 font-semibold">
                    Já tens uma conta? 
                    <a href="#login" class="text-navy-900 font-black hover:underline underline-offset-4">Iniciar Sessão</a>
                </p>
            </div>

        </div>
    </div>
    `;
}


function iniciarLogicaRegister() {
    const registerForm = document.getElementById('registerForm');
    const btnRegister = document.getElementById('btnRegister');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.getElementById('registerPassword');
    const passHint = document.getElementById('passHint');

    function validateRegister() {
        const email = emailInput?.value.trim() || "";
        const password = passwordInput?.value.trim() || "";
        
        if (password.length >= 8) {
            passHint.classList.replace('text-slate-400', 'text-emerald-500');
            passHint.innerText = "Senha segura";
        } else {
            passHint.classList.replace('text-emerald-500', 'text-slate-400');
            passHint.innerText = "Mínimo de 8 caracteres";
        }

        if (email.includes('@') && email.length > 5 && password.length >= 8) {
            btnRegister.disabled = false;
            btnRegister.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            btnRegister.disabled = true;
            btnRegister.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    emailInput?.addEventListener('input', validateRegister);
    passwordInput?.addEventListener('input', validateRegister);

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            btnRegister.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>A ligar ao servidor...</span>
                </div>
            `;
            btnRegister.classList.add('opacity-80', 'scale-[0.98]');
            btnRegister.disabled = true;

             const { data, error } = await window.supabaseClient.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                btnRegister.innerHTML = 'Criar conta';
                btnRegister.classList.remove('opacity-80', 'scale-[0.98]');
                btnRegister.disabled = false;
                alert('Erro: ' + error.message);
                return;
            }

            sessionStorage.setItem('shopyump_email', email);
            window.location.hash = '#verify';
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
                googleBtn.innerHTML = '<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5"> Registar com Google';
                googleBtn.disabled = false;
            }
        });
    }

    const togglePass = document.getElementById('togglePass');
    const eyeOpen = document.getElementById('eyeOpen');
    const eyeClosed = document.getElementById('eyeClosed');

    togglePass?.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        eyeOpen?.classList.toggle('hidden', isPassword);
        eyeClosed?.classList.toggle('hidden', !isPassword);
    });
}
