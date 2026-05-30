// view-verify.js

function renderVerify() {
    return `
    <div class="h-full flex items-center justify-center p-6 bg-[#F9F7F5] animate-pageEnter">
        
        <div class="bg-white w-full max-w-[440px] rounded-[32px] shadow-premium p-8 sm:p-12 relative overflow-hidden" id="verifyCard">
            
            <a href="#register" class="absolute top-6 left-6 p-2 text-slate-400 hover:text-navy-900 hover:bg-slate-50 rounded-full transition-all outline-none group">
                <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
            </a>

            <div class="mb-8 text-center mt-4">
                <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-navy-900 tracking-tight mb-2">Verifica o teu email</h2>
                <p class="text-sm text-slate-500 leading-relaxed">
                    Enviámos um código de 6 dígitos para <br>
                    <span id="userEmailDisplay" class="font-bold text-navy-900"></span>
                </p>
            </div>

            <form id="verifyForm" onsubmit="event.preventDefault();">
                <div id="otp-container" class="flex justify-center gap-2 sm:gap-3 mb-2">
                    <input type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="1" required class="w-10 h-12 sm:w-12 sm:h-14 rounded-xl bg-white border border-slate-200 text-xl sm:text-2xl text-center font-bold text-navy-900 shadow-sm focus:border-navy-900 focus:ring-2 focus:ring-navy-900 focus:-translate-y-1 transition-all duration-200 outline-none">
                    <input type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="1" required class="w-10 h-12 sm:w-12 sm:h-14 rounded-xl bg-white border border-slate-200 text-xl sm:text-2xl text-center font-bold text-navy-900 shadow-sm focus:border-navy-900 focus:ring-2 focus:ring-navy-900 focus:-translate-y-1 transition-all duration-200 outline-none">
                    <input type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="1" required class="w-10 h-12 sm:w-12 sm:h-14 rounded-xl bg-white border border-slate-200 text-xl sm:text-2xl text-center font-bold text-navy-900 shadow-sm focus:border-navy-900 focus:ring-2 focus:ring-navy-900 focus:-translate-y-1 transition-all duration-200 outline-none">
                    <input type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="1" required class="w-10 h-12 sm:w-12 sm:h-14 rounded-xl bg-white border border-slate-200 text-xl sm:text-2xl text-center font-bold text-navy-900 shadow-sm focus:border-navy-900 focus:ring-2 focus:ring-navy-900 focus:-translate-y-1 transition-all duration-200 outline-none">
                    <input type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="1" required class="w-10 h-12 sm:w-12 sm:h-14 rounded-xl bg-white border border-slate-200 text-xl sm:text-2xl text-center font-bold text-navy-900 shadow-sm focus:border-navy-900 focus:ring-2 focus:ring-navy-900 focus:-translate-y-1 transition-all duration-200 outline-none">
                    <input type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="1" required class="w-10 h-12 sm:w-12 sm:h-14 rounded-xl bg-white border border-slate-200 text-xl sm:text-2xl text-center font-bold text-navy-900 shadow-sm focus:border-navy-900 focus:ring-2 focus:ring-navy-900 focus:-translate-y-1 transition-all duration-200 outline-none">
                </div>

                <div id="loadingStatus" class="opacity-0 translate-y-4 transition-all duration-500 flex flex-col items-center justify-center py-4 pointer-events-none">
                    <div class="w-6 h-6 border-[3px] border-navy-900 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <span class="text-xs font-bold text-navy-900 tracking-wide">A validar código...</span>
                </div>
            </form>

            <div class="mt-8 text-center min-h-[50px]">
                <p class="text-[11px] font-bold text-slate-400 tracking-wide mb-3">Não recebeste o código?</p>
                
                <div id="timerContainer">
                    <p class="text-sm text-slate-500" id="timerText">
                        Podes reenviar em <span id="countdown" class="font-bold text-navy-900">00:45</span>
                    </p>
                    <p class="text-sm text-slate-500 hidden" id="resendText">
                        <button type="button" class="text-navy-900 font-bold hover:underline underline-offset-4">Reenviar código</button>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function iniciarLogicaVerify() {
    const inputs = document.querySelectorAll('#otp-container input');
    const loadingStatus = document.getElementById('loadingStatus');
    const otpContainer = document.getElementById('otp-container');

    const savedEmail = sessionStorage.getItem('shopyump_email');
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    if (userEmailDisplay) userEmailDisplay.innerText = savedEmail || "e-mail desconhecido";

    if(inputs.length > 0) setTimeout(() => inputs[0].focus(), 150);

    function verificarAutomatico() {
        const code = Array.from(inputs).map(i => i.value).join('');
        if (code.length === 6) {
            executarFluxoSucesso(code);
        }
    }

    async function executarFluxoSucesso(codigo) {
        inputs.forEach(i => i.blur());
        
        if (loadingStatus) {
            loadingStatus.classList.remove('opacity-0', 'translate-y-4');
            loadingStatus.classList.add('opacity-100', 'translate-y-0');
        }
        if (otpContainer) otpContainer.style.opacity = "0.5";

        const { data, error } = await window.supabaseClient.auth.verifyOtp({
            email: savedEmail,
            token: codigo,
            type: 'signup'
        });

        if (error) {
            alert('Código incorreto ou expirado. Tenta novamente.');
            inputs.forEach(input => {
                input.value = ''; 
            });
            if (loadingStatus) {
                loadingStatus.classList.add('opacity-0', 'translate-y-4');
                loadingStatus.classList.remove('opacity-100', 'translate-y-0');
            }
            if (otpContainer) otpContainer.style.opacity = "1";
            inputs[0].focus();
            return;
        }

        sessionStorage.setItem('shopyump_auth', 'true');
        sessionStorage.setItem('shopyump_is_new', 'true');
        sessionStorage.setItem('shopyump_user', data.user.id);

        setTimeout(() => {
            const card = document.getElementById('verifyCard');
            if (card) {
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
                card.style.transition = "all 0.4s ease";
            }
            setTimeout(() => {
                window.location.href = 'onboarding.html';
            }, 400);
        }, 1000);
    }

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); 
            
            if (e.target.value !== '' && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            verificarAutomatico();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });

    let timeLeft = 45;
    const countdownEl = document.getElementById('countdown');
    const timerText = document.getElementById('timerText');
    const resendText = document.getElementById('resendText');
    
    if(window.verifyTimer) clearInterval(window.verifyTimer);

    window.verifyTimer = setInterval(() => {
        timeLeft--;
        if(countdownEl) {
            countdownEl.innerText = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
        }
        if (timeLeft <= 0) {
            clearInterval(window.verifyTimer);
            if(timerText) timerText.classList.add('hidden');
            if(resendText) resendText.classList.remove('hidden');
        }
    }, 1000);
}
