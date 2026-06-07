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

// 3. Fechar ao clicar no fundo escuro
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modalId = e.target.closest('.modal-container').id;
        fecharModal(modalId);
    }
});

// 4. Bloquear TODO o touchmove enquanto houver modal ativo
//    Um único listener global, passive:false, aplicado desde o início.
//    Isto cobre a barrinha, o backdrop, e qualquer zona do modal
//    que não seja uma área de scroll interna.
document.addEventListener('touchmove', (e) => {
    // Se não há modal ativo, não faz nada
    if (document.querySelectorAll('.modal-container.active').length === 0) return;

    // Permite scroll apenas dentro de elementos com scroll interno
    const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
    if (areaScroll) {
        // Dentro da área de scroll: só bloqueia se já estiver no topo
        // (para não "escapar" para a página ao chegar ao início)
        if (areaScroll.scrollTop <= 0 && e.cancelable) {
            e.preventDefault();
        }
        return;
    }

    // Tudo o resto (barrinha, backdrop, zonas brancas): bloqueia sempre
    if (e.cancelable) e.preventDefault();

}, { passive: false }); // passive:false é obrigatório — sem isto o preventDefault não funciona

// 5. Motor de Deslize — só lida com o arrastar visual do drawer
window.inicializarGestosModais = function() {
    document.querySelectorAll('.modal-sheet.drawer').forEach(sheet => {
        if (sheet.hasAttribute('data-gesto-ativo')) return;
        sheet.setAttribute('data-gesto-ativo', 'true');

        let startY = 0;
        let arrastando = false;

        // passive:false no touchstart para o browser saber LOGO que vai ser interceptado
        // Sem isto há sempre 1 frame de atraso antes do touchmove poder agir
        sheet.addEventListener('touchstart', e => {
            const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
            if (areaScroll && areaScroll.scrollTop > 0) {
                arrastando = false;
                return;
            }
            startY = e.touches[0].clientY;
            arrastando = true;
            sheet.style.transition = 'none'; // Remove transição logo no toque — zero delay
        }, { passive: false }); // CRÍTICO: passive:false elimina o delay inicial

        sheet.addEventListener('touchmove', e => {
            if (!arrastando) return;

            const areaScroll = e.target.closest('.overflow-y-auto, .overflow-y-scroll');
            if (areaScroll && areaScroll.scrollTop > 0) return;

            const diff = e.touches[0].clientY - startY;
            if (diff > 0) {
                sheet.style.transform = `translateY(${diff}px)`;
            }
        }, { passive: false });

        sheet.addEventListener('touchend', e => {
            if (!arrastando) return;
            arrastando = false;

            const diff = e.changedTouches[0].clientY - startY;
            sheet.style.transition = ''; // Devolve animação CSS
            sheet.style.transform = '';

            if (diff > 100) {
                const modalId = sheet.closest('.modal-container').id;
                fecharModal(modalId);
            }
        });

        sheet.addEventListener('touchcancel', () => {
            arrastando = false;
            sheet.style.transition = '';
            sheet.style.transform = '';
        });
    });
};

document.addEventListener('DOMContentLoaded', inicializarGestosModais);
