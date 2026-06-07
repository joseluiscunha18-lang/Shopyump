// ==========================================
// SISTEMA UNIVERSAL DE MODAIS (CORRIGIDO)
// ==========================================

// 1. Abrir Modal
window.abrirModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    
    // Liga as classes de CSS que blindam o Pull-to-Refresh e travam a página a 100%
    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');
    
    modal.classList.add('active');
};

// 2. Fechar Modal
window.fecharModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    
    // Só liberta a página de baixo se não houver outros modais super-impostos
    setTimeout(() => {
        if (document.querySelectorAll('.modal-container.active').length === 0) {
            document.body.classList.remove('modal-aberto');
            document.documentElement.classList.remove('modal-aberto');
        }
    }, 300);
};

// 3. Bloqueio Completo na Zona Escura
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modalId = e.target.closest('.modal-container').id;
        fecharModal(modalId);
    }
});

// Se o dedo deslizar o fundo escuro do modal, bloqueia totalmente para não raspar a pág por trás
document.addEventListener('touchmove', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        if (e.cancelable) e.preventDefault();
    }
}, {passive: false});

// 4. Motor de Deslize Inteligente Corrigido
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
                // >>> O SEGREDO MÁGICO: CANCELA O MOTOR DO TELEMÓVEL <<<
                if (e.cancelable) e.preventDefault();
                
                sheet.style.transform = `translateY(${diff}px)`;
                sheet.style.transition = 'none';
            }
        }, {passive: false}); // IMPORTANTE: Obriga o navegador a escutar o preventDefault

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