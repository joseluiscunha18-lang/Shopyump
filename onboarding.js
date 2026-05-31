/**
 * Shopyump - Lógica de Onboarding Elite
 */

(async function verificarAcesso() {
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Verificar se já tem loja e redirigir para dashboard.html se já tiver
    const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', session.user.id).maybeSingle();
    if (loja) {
        window.location.href = 'dashboard.html';
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 5; 

    if (window.history && window.history.pushState) {
        window.history.replaceState({ step: 1 }, "Passo 1", "");
    }

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.step) {
            if (event.state.step !== currentStep) {
                goToStep(event.state.step, false); 
            }
        }
    });

    function updateProgressBar(step) {
        const progress = (step / (totalSteps - 1)) * 100;
        const bar = document.getElementById('progressBar');
        const counter = document.getElementById('stepCounter');
        
        if (bar && step <= 4) bar.style.width = `${progress}%`;
        if (counter && step <= 4) {
            counter.innerText = step === 4 ? "Último Passo" : `Passo ${step} de 4`;
        }

        const headerContainer = document.querySelector('.absolute.top-6.left-0');
        if (headerContainer) {
            if (step === 5) {
                headerContainer.style.transition = 'opacity 0.3s ease';
                headerContainer.style.opacity = '0';
                setTimeout(() => headerContainer.style.pointerEvents = 'none', 300);
            } else {
                headerContainer.style.pointerEvents = 'auto';
                setTimeout(() => headerContainer.style.opacity = '1', 10);
            }
        }
    }

    function goToStep(stepNumber, pushToHistory = true) {
        const currentEl = document.getElementById(`step${currentStep}`);
        const nextEl = document.getElementById(`step${stepNumber}`);
        const brandLogo = document.getElementById('brandLogo');
        const backArrow = document.getElementById('globalBackArrow');

        if (!currentEl || !nextEl || currentStep === stepNumber) return;

        const isForward = stepNumber > currentStep;

        if (stepNumber > 1 && stepNumber < 5) {
            backArrow?.classList.remove('opacity-0', 'pointer-events-none');
            brandLogo?.classList.add('logo-hidden'); 
        } else if (stepNumber === 1) {
            backArrow?.classList.add('opacity-0', 'pointer-events-none');
            brandLogo?.classList.remove('logo-hidden'); 
        }

        currentEl.classList.remove('enter-forward', 'enter-backward');
        currentEl.classList.add(isForward ? 'exit-forward' : 'exit-backward');

        setTimeout(() => {
            currentEl.classList.remove('active', 'exit-forward', 'exit-backward');
            
            currentStep = stepNumber;
            nextEl.classList.add('active');
            nextEl.classList.add(isForward ? 'enter-forward' : 'enter-backward');
            
            updateProgressBar(currentStep);
            
            if (pushToHistory && window.history && window.history.pushState) {
                window.history.pushState({ step: stepNumber }, `Passo ${stepNumber}`, "");
            }
        }, 200); 
    }

    document.getElementById('btnNext3')?.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (document.activeElement) document.activeElement.blur(); 
        setTimeout(() => goToStep(4), 300);
    });

    document.getElementById('globalBackArrow')?.addEventListener('click', () => {
        if (currentStep > 1) goToStep(currentStep - 1);
    });

    const step1Radios = document.querySelectorAll('input[name="experience"]');
    step1Radios.forEach(radio => {
        radio.addEventListener('click', () => {
            setTimeout(() => goToStep(2), 350); 
        });
    });

    const step2Radios = document.querySelectorAll('input[name="businessModel"]');
    step2Radios.forEach(radio => {
        radio.addEventListener('click', () => {
            setTimeout(() => {
                goToStep(3);
                setTimeout(() => document.getElementById('shopName')?.focus(), 300);
            }, 350);
        });
    });

    const shopInput = document.getElementById('shopName');
    const shopFeedback = document.getElementById('shopFeedback');
    const shopLinkPreview = document.getElementById('shopLinkPreview');
    const shopStatusBadge = document.getElementById('shopStatusBadge');
    const btnNext3 = document.getElementById('btnNext3');
    let typingTimer;

    if (shopInput) {
        btnNext3.disabled = true;
        shopInput.addEventListener('input', function() {
            const val = this.value.trim();
            const slug = val.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            
            clearTimeout(typingTimer);
            
            if (val.length === 0) {
                shopFeedback.classList.add('hidden');
                btnNext3.disabled = true;
                return;
            }

            shopFeedback.classList.remove('hidden');
            setTimeout(() => shopFeedback.classList.add('opacity-100'), 10);
            
            shopLinkPreview.innerHTML = `<span class="font-bold text-navy-900">${slug || 'loja'}</span><span class="text-slate-400">.shopyump.com</span>`;

            shopStatusBadge.innerHTML = '<span class="animate-pulse">A verificar...</span>';
            shopStatusBadge.className = 'flex-shrink-0 ml-2 px-2.5 py-1 flex items-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold tracking-wide';
            btnNext3.disabled = true;

            typingTimer = setTimeout(() => {
                if (slug.length < 3) {
                    shopStatusBadge.innerHTML = 'Nome curto';
                    shopStatusBadge.className = 'flex-shrink-0 ml-2 px-2.5 py-1 flex items-center rounded-full bg-red-50 text-red-600 text-[10px] font-bold tracking-wide';
                    btnNext3.disabled = true;
                } else {
                    shopStatusBadge.innerHTML = '<i class="fa-solid fa-check mr-1 text-[10px]"></i> Disponível';
                    shopStatusBadge.className = 'flex-shrink-0 ml-2 px-2.5 py-1 flex items-center rounded-full bg-emerald-100/50 text-emerald-700 text-[10px] font-bold tracking-wide';
                    btnNext3.disabled = false;
                }
            }, 600);
        });
    }

    const inputUserName = document.getElementById('userName');
    const inputWhatsapp = document.getElementById('whatsapp');
    const btnFinish = document.getElementById('btnFinish');

    if (btnFinish) {
        btnFinish.disabled = true;
        btnFinish.classList.add('opacity-50', 'cursor-not-allowed');
    }

    function validateStep4() {
        const nameVal = (inputUserName?.value || "").trim();
        const waVal = (inputWhatsapp?.value || "").replace(/\\s/g, '');
        
        if (nameVal.length >= 2 && waVal.length >= 8) {
            btnFinish.disabled = false;
            btnFinish.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            btnFinish.disabled = true;
            btnFinish.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    inputUserName?.addEventListener('input', validateStep4);
    
    inputWhatsapp?.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9\\s]/g, '');
        validateStep4();
    });

    // ─── FINALIZAÇÃO: LIGAR AO SUPABASE ───
    btnFinish?.addEventListener('click', async () => {
        const shopName = document.getElementById('shopName').value;
        const userName = document.getElementById('userName').value;
        const whatsappCode = document.getElementById('selectedCode').innerText;
        const whatsappNumber = document.getElementById('whatsapp').value;
        
        const slug = shopName.toLowerCase().trim().replace(/\\s+/g, '-').replace(/[^\\w-]+/g, '');
        const fullWhatsapp = whatsappCode + whatsappNumber.replace(/\\s/g, '');

        const experience = document.querySelector('input[name="experience"]:checked')?.value || 'new';
        const businessModel = document.querySelector('input[name="businessModel"]:checked')?.value || 'stock';
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;

        if (!userId) {
            alert('Sessão expirada. Por favor, faz login novamente.');
            window.location.href = 'auth.html';
            return;
        }

        const originalText = btnFinish.innerHTML;
        btnFinish.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> A preparar...`;
        btnFinish.style.pointerEvents = 'none';

        // SALVA DADOS NO SUPABASE
        const { data, error } = await window.supabaseClient
            .from('lojas')
            .insert([
                {
                    perfil_id: userId,
                    nome: shopName,
                    slug: slug,
                    vendedor_nome: userName,
                    whatsapp: fullWhatsapp,
                    experiencia: experience,
                    modelo_negocio: businessModel
                }
            ]);

        if (error) {
            alert('Falha ao criar loja: ' + error.message);
            btnFinish.innerHTML = originalText;
            btnFinish.style.pointerEvents = 'auto';
            return;
        }

        // Armazena no sessionStorage local
        sessionStorage.setItem('shopyump_store_url', `${slug}.shopyump.com`);
        sessionStorage.setItem('shopyump_seller_name', userName);
        sessionStorage.setItem('shopyump_whatsapp', fullWhatsapp);

        goToStep(5);
        setTimeout(() => {
            btnFinish.innerHTML = originalText;
            btnFinish.style.pointerEvents = 'auto';
        }, 500);
    });

    const btnGoToDashboard = document.getElementById('btnGoToDashboard');
    if (btnGoToDashboard) {
        btnGoToDashboard.addEventListener('click', () => {
            sessionStorage.setItem('shopyump_is_new', 'false');
            localStorage.setItem('onboarding_completo', 'true');
            localStorage.setItem('produtos_criados', '0'); // FORÇA O DASHBOARD A COMEÇAR A ZEROS
            
            window.location.href = 'dashboard.html';
        });
    }

    const countryBtn = document.getElementById('countrySelector');
    const countryList = document.getElementById('countryList');

    if (countryBtn) {
        countryBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            countryList?.classList.toggle('hidden');
        };
    }

    document.addEventListener('click', (e) => {
        if (!countryBtn?.contains(e.target)) {
            countryList?.classList.add('hidden');
        }
    });

    const countryOptions = document.querySelectorAll('.country-option');
    countryOptions.forEach(option => {
        option.addEventListener('click', () => {
            const flag = option.getAttribute('data-flag');
            const code = option.getAttribute('data-code');
            const selectedFlag = document.getElementById('selectedFlag');
            const selectedCode = document.getElementById('selectedCode');
            const list = document.getElementById('countryList');
            
            if (selectedFlag && selectedCode) {
                selectedFlag.innerText = flag;
                selectedCode.innerText = code;
                list?.classList.add('hidden');
                document.getElementById('whatsapp')?.focus();
            }
        });
    });
});
