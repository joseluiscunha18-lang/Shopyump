/* =======================================================
   SISTEMA UNIVERSAL DE MODAIS (LÓGICA)
   ======================================================= */

// 1. Abrir Modal
window.abrirModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    document.body.style.overflow = 'hidden'; 
    modal.classList.add('active');
};

// 2. Fechar Modal
window.fecharModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    
    setTimeout(() => {
        if (document.querySelectorAll('.modal-container.active').length === 0) {
            document.body.style.overflow = 'auto';
        }
    }, 300);
};

// 3. Fechar ao Clicar no Fundo Escuro
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modalId = e.target.closest('.modal-container').id;
        fecharModal(modalId);
    }
});

// 4. Motor de Deslize Inteligente (Igualzinho ao criar-produtos)
window.inicializarGestosModais = function() {
    document.querySelectorAll('.modal-sheet.drawer').forEach(sheet => {
        if (sheet.hasAttribute('data-gesto-ativo')) return; 
        sheet.setAttribute('data-gesto-ativo', 'true');
        let startY = 0;
        
        sheet.addEventListener('touchstart', e => {
            const areaScroll = e.target.closest('.overflow-y-auto');
            if (areaScroll && areaScroll.scrollTop > 0) return;
            startY = e.touches[0].clientY;
        }, {passive: true});

        sheet.addEventListener('touchmove', e => {
            const areaScroll = e.target.closest('.overflow-y-auto');
            if (areaScroll && areaScroll.scrollTop > 0) return;

            let diff = e.touches[0].clientY - startY;
            if (diff > 0) { 
                sheet.style.transform = `translateY(${diff}px)`;
                sheet.style.transition = 'none';
            }
        }, {passive: true});

        sheet.addEventListener('touchend', e => {
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