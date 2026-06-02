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
                <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-navy-900 tracking-tight mb-2">Verifica o teu email</h2>
                <p class="text-sm text-slate-500 leading-relaxed mb-6">
                    Enviámos um link de confirmação seguro para <br>
                    <span id="userEmailDisplay" class="font-bold text-navy-900"></span>
                </p>
                
                <div class="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                    <p class="text-[13px] font-medium text-slate-600">
                        Clica no botão que recebeste no email para validar a tua conta. Serás redirecionado automaticamente para a configuração da tua loja.
                    </p>
                </div>
            </div>

            <div class="mt-8 text-center min-h-[50px]">
                <p class="text-[11px] font-bold text-slate-400 tracking-wide mb-3">Não recebeste o email?</p>
                
                <div id="timerContainer">
                    <p class="text-sm text-slate-500" id="timerText">
                        Podes reenviar em <span id="countdown" class="font-bold text-navy-900">00:45</span>
                    </p>
                    <p class="text-sm text-slate-500 hidden" id="resendText">
                        <button type="button" id="btnResendLink" class="text-navy-900 font-bold hover:underline underline-offset-4 transition-all">Reenviar link</button>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function iniciarLogicaVerify() {
    const savedEmail = sessionStorage.getItem('shopyump_email');
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    if (userEmailDisplay) userEmailDisplay.innerText = savedEmail || "e-mail desconhecido";

    let timeLeft = 45;
    const countdownEl = document.getElementById('countdown');
    const timerText = document.getElementById('timerText');
    const resendText = document.getElementById('resendText');
    const btnResendLink = document.getElementById('btnResendLink');
    
    function iniciarCronometro() {
        timeLeft = 45;
        if(timerText) timerText.classList.remove('hidden');
        if(resendText) resendText.classList.add('hidden');

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

    iniciarCronometro();

    // Lógica para reenviar o Magic Link
    if (btnResendLink) {
        btnResendLink.addEventListener('click', async () => {
            const originalText = btnResendLink.innerText;
            btnResendLink.innerText = "A enviar...";
            btnResendLink.style.pointerEvents = "none";
            btnResendLink.classList.add('opacity-50');

            // Pede ao Supabase para reenviar o email
            const { error } = await window.supabaseClient.auth.resend({
                type: 'signup',
                email: savedEmail
            });

            btnResendLink.innerText = originalText;
            btnResendLink.style.pointerEvents = "auto";
            btnResendLink.classList.remove('opacity-50');

            if (error) {
                alert("Erro ao reenviar o link: " + error.message);
            } else {
                iniciarCronometro(); // Reinicia os 45 segundos
            }
        });
    }
}
