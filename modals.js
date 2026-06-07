/* =======================================================
   SISTEMA UNIVERSAL DE MODAIS (LÓGICA - CORRIGIDO)
   ======================================================= */

// 1. Abrir Modal
window.abrirModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    
    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');
    modal.classList.add('active');
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

// 3. Fechar ao Clicar no Fundo Escuro e Bloquear Mover a tela nele
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modalId = e.target.closest('.modal-container').id;
        fecharModal(modalId);
    }
});

document.addEventListener('touchmove', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        if (e.cancelable) e.preventDefault();
    }
}, {passive: false});

// 4. Motor de Deslize Inteligente Absoluto
window.inicializarGestosModais = function() {
    document.querySelectorAll('.modal-sheet.drawer').forEach(sheet => {
        if (sheet.hasAttribute('data-gesto-ativo')) return; 
        sheet.setAttribute('data-gesto-ativo', 'true');
        
        let startY = 0;
        let isScrollArea = false; // Flag para prever falsos saltos
        
        sheet.addEventListener('touchstart', e => {
            const areaScroll = e.target.closest('.overflow-y-auto');
            if (areaScroll && areaScroll.scrollTop > 0) {
                isScrollArea = true;
                return;
            }
            isScrollArea = false;
            startY = e.touches[0].clientY;
        }, {passive: true});

        sheet.addEventListener('touchmove', e => {
            const areaScroll = e.target.closest('.overflow-y-auto');
            if (areaScroll && areaScroll.scrollTop > 0) return;
            if (isScrollArea) return;

            let diff = e.touches[0].clientY - startY;
            if (diff > 0) { 
                if (e.cancelable) e.preventDefault(); // MAGIA: Corta Pull-to-refresh
                sheet.style.transform = `translateY(${diff}px)`;
                sheet.style.transition = 'none';
            }
        }, {passive: false}); // passive false DÁ autoridade total ao preventDefault.

        sheet.addEventListener('touchend', e => {
            if (isScrollArea) return;
            let diff = e.changedTouches[0].clientY - startY;
            sheet.style.transition = ''; 
            sheet.style.transform = '';  
            
            if (diff > 100) { 
                const modalId = sheet.closest('.modal-container').id;
                fecharModal(modalId);
            }
        });
    });
};
document.addEventListener('DOMContentLoaded', window.inicializarGestosModais);