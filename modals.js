// ==========================================
// SISTEMA UNIVERSAL DE MODAIS
// ==========================================

// 1. Abrir Modal
window.abrirModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');
    modal.classList.add('active');

    inicializarGestosModais();
};

// 2. Fechar Modal
window.fecharModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');

    setTimeout(() => {
        if (document.querySelectorAll('.modal-container.active').length === 0) {
            document.body.classList.remove('modal-aberto');
            document.documentElement.classList.remove('modal-aberto');
        }
    }, 300);
};

// 3. Fechar ao clicar no backdrop
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modalId = e.target.closest('.modal-container').id;
        fecharModal(modalId);
    }
});

// 4. Bloqueio global de touchmove — cobre barrinha, backdrop, tudo
document.addEventListener('touchmove', (e) => {
    if (document.querySelectorAll('.modal-container.active').length === 0) return;

    const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
    if (areaScroll) {
        if (areaScroll.scrollTop <= 0 && e.cancelable) e.preventDefault();
        return;
    }

    if (e.cancelable) e.preventDefault();
}, { passive: false });

// 5. Motor de Deslize — colado ao dedo, sem delay
window.inicializarGestosModais = function() {
    document.querySelectorAll('.modal-sheet.drawer').forEach(sheet => {
        if (sheet.hasAttribute('data-gesto-ativo')) return;
        sheet.setAttribute('data-gesto-ativo', 'true');

        let startY = 0;
        let currentY = 0;
        let arrastando = false;
        let rafId = null;

        function aplicarTranslate() {
            // Sincroniza com o ciclo de pintura do browser — zero delay visual
            sheet.style.transform = `translateY(${currentY}px) translateZ(0)`;
            rafId = null;
        }

        sheet.addEventListener('touchstart', e => {
            const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
            if (areaScroll && areaScroll.scrollTop > 0) {
                arrastando = false;
                return;
            }

            // Cancela qualquer animação CSS a decorrer ANTES do primeiro frame
            // Isto elimina o delay de arranque
            sheet.classList.add('arrastando');

            startY = e.touches[0].clientY;
            currentY = 0;
            arrastando = true;
        }, { passive: false });

        sheet.addEventListener('touchmove', e => {
            if (!arrastando) return;

            const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
            if (areaScroll && areaScroll.scrollTop > 0) return;

            const diff = e.touches[0].clientY - startY;
            if (diff < 0) return; // não deixa subir acima da posição original

            currentY = diff;

            // Agenda no próximo frame de pintura — o movimento fica colado ao dedo
            if (!rafId) rafId = requestAnimationFrame(aplicarTranslate);
        }, { passive: false });

        function terminar(e) {
            if (!arrastando) return;
            arrastando = false;

            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }

            const diff = (e.changedTouches?.[0]?.clientY ?? startY) - startY;

            sheet.classList.remove('arrastando');

            if (diff > 100) {
                // Aplica animação de queda rápida antes de fechar
                sheet.classList.add('fechando');
                sheet.style.transform = '';
                setTimeout(() => sheet.classList.remove('fechando'), 250);
                const modalId = sheet.closest('.modal-container').id;
                fecharModal(modalId);
            } else {
                // Volta à posição com a curva suave normal de entrada
                sheet.style.transform = '';
            }
        }

        sheet.addEventListener('touchend', terminar);
        sheet.addEventListener('touchcancel', terminar);
    });
};

document.addEventListener('DOMContentLoaded', inicializarGestosModais);
