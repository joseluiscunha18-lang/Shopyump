// ==========================================
// SISTEMA UNIVERSAL DE MODAIS
// ==========================================

window.abrirModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');
    modal.classList.add('active');

    inicializarGestosModais();
};

window.fecharModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    
    // Inicia a animação de saída
    modal.classList.remove('active');

    // O timeout deve ser ligeiramente maior que a transição CSS (400ms)
    setTimeout(() => {
        if (document.querySelectorAll('.modal-container.active').length === 0) {
            document.body.classList.remove('modal-aberto');
            document.documentElement.classList.remove('modal-aberto');
            
            // Limpa o estado de gesto, caso o fecho tenha sido por deslize
            const sheet = modal.querySelector('.modal-sheet');
            if (sheet) sheet.classList.remove('fechando');
        }
    }, 420); 
};

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modalId = e.target.closest('.modal-container').id;
        fecharModal(modalId);
    }
});

document.addEventListener('touchmove', (e) => {
    if (document.querySelectorAll('.modal-container.active').length === 0) return;

    const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
    if (areaScroll) {
        if (areaScroll.scrollTop <= 0 && e.cancelable) e.preventDefault();
        return;
    }

    if (e.cancelable) e.preventDefault();
}, { passive: false });

window.inicializarGestosModais = function() {
    document.querySelectorAll('.modal-sheet.drawer').forEach(sheet => {
        if (sheet.hasAttribute('data-gesto-ativo')) return;
        sheet.setAttribute('data-gesto-ativo', 'true');

        let startY    = 0;
        let currentY  = 0;
        let lastY     = 0;   
        let lastT     = 0;   
        let velocidade = 0;  
        let arrastando = false;
        let rafId      = null;

        function aplicarTranslate() {
            sheet.style.transform = `translateY(${currentY}px) translateZ(0)`;
            rafId = null;
        }

        sheet.addEventListener('touchstart', e => {
            // 🛑 NOVA REGRA: Impede o modal de fechar se tocares na área do cropper (área de edição da imagem)
            if (e.target.closest('.cropper-area-bloqueada')) {
                arrastando = false;
                return;
            }

            const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
            if (areaScroll && areaScroll.scrollTop > 0) {
                arrastando = false;
                return;
            }

            sheet.classList.add('arrastando');
            startY     = e.touches[0].clientY;
            lastY      = startY;
            lastT      = Date.now();
            currentY   = 0;
            velocidade = 0;
            arrastando = true;
        }, { passive: false });

        sheet.addEventListener('touchmove', e => {
            if (!arrastando) return;

            const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
            if (areaScroll && areaScroll.scrollTop > 0) return;

            const now  = Date.now();
            const y    = e.touches[0].clientY;
            const dt   = now - lastT;

            if (dt > 0) velocidade = (y - lastY) / dt;
            lastY = y;
            lastT = now;

            const diff = y - startY;
            if (diff < 0) return; 

            currentY = diff;
            if (!rafId) rafId = requestAnimationFrame(aplicarTranslate);
        }, { passive: false });

        function terminar(e) {
            if (!arrastando) return;
            arrastando = false;

            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

            const endY  = e.changedTouches?.[0]?.clientY ?? startY;
            const dist  = endY - startY;
            const altura = sheet.offsetHeight;

            // Constantes de fecho ajustadas para fluidez nativa
            const flick = velocidade > 0.6 && dist > 30;
            const longe = dist > altura * 0.40;
            const minimo = dist > 60;

            const deveFechar = minimo && (flick || longe);

            sheet.classList.remove('arrastando');

            if (deveFechar) {
                // Passa o controlo para o CSS gerir a curva de fecho
                sheet.classList.add('fechando');
                sheet.style.transform = ''; 
                fecharModal(sheet.closest('.modal-container').id);
            } else {
                sheet.style.transform = '';
            }
        }

        sheet.addEventListener('touchend', terminar);
        sheet.addEventListener('touchcancel', terminar);
    });
};

document.addEventListener('DOMContentLoaded', inicializarGestosModais);
