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

// 4. Bloqueio global de touchmove
document.addEventListener('touchmove', (e) => {
    if (document.querySelectorAll('.modal-container.active').length === 0) return;

    const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
    if (areaScroll) {
        if (areaScroll.scrollTop <= 0 && e.cancelable) e.preventDefault();
        return;
    }

    if (e.cancelable) e.preventDefault();
}, { passive: false });

// 5. Motor de Deslize
window.inicializarGestosModais = function() {
    document.querySelectorAll('.modal-sheet.drawer').forEach(sheet => {
        if (sheet.hasAttribute('data-gesto-ativo')) return;
        sheet.setAttribute('data-gesto-ativo', 'true');

        let startY    = 0;
        let currentY  = 0;
        let lastY     = 0;   // posição do toque no frame anterior
        let lastT     = 0;   // timestamp do frame anterior
        let velocidade = 0;  // px/ms no momento do touchend
        let arrastando = false;
        let rafId      = null;

        function aplicarTranslate() {
            sheet.style.transform = `translateY(${currentY}px) translateZ(0)`;
            rafId = null;
        }

        sheet.addEventListener('touchstart', e => {
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

            // Calcula velocidade instantânea (px/ms) — usada no touchend
            if (dt > 0) velocidade = (y - lastY) / dt;
            lastY = y;
            lastT = now;

            const diff = y - startY;
            if (diff < 0) return; // não sobe acima do topo

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

            // --- LÓGICA DE ELITE ---
            // Arremesso rápido para baixo (flick): fecha com pouca distância
            const flick = velocidade > 0.6 && dist > 30;
            // Arrastou mais de 45% da altura do sheet
            const longe = dist > altura * 0.45;
            // Mínimo absoluto de 80px para evitar disparos acidentais
            const minimo = dist > 80;

            const deveFechar = minimo && (flick || longe);

            sheet.classList.remove('arrastando');

            if (deveFechar) {
                sheet.classList.add('fechando');
                sheet.style.transform = '';
                setTimeout(() => sheet.classList.remove('fechando'), 450);
                fecharModal(sheet.closest('.modal-container').id);
            } else {
                // Snap de volta com spring
                sheet.style.transform = '';
            }
        }

        sheet.addEventListener('touchend', terminar);
        sheet.addEventListener('touchcancel', terminar);
    });
};

document.addEventListener('DOMContentLoaded', inicializarGestosModais);
