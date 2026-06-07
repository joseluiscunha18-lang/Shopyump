/* =======================================================
   SISTEMA UNIVERSAL DE MODAIS (LÓGICA - CORRIGIDO)
   ======================================================= */

// 1. Abrir Modal
window.abrirModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    
    // Liga as classes limpas de CSS que blindam o Pull-to-Refresh e o fundo
    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');
    
    modal.classList.add('active');
};

// 2. Fechar Modal
window.fecharModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    
    // Só liberta a página se não houver outros modais abertos por cima
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

// Bloqueia tentativas de arrastar na zona escura (arrastar a página debaixo)
document.addEventListener('touchmove', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        if (e.cancelable) e.preventDefault();
    }
}, {passive: false});

// 4. Motor de Deslize Inteligente
window.inicializarGestosModais = function() {
    document.querySelectorAll('.modal-sheet.drawer').forEach(sheet => {
        // Evita duplicar o gesto se já estiver ativo
        if (sheet.hasAttribute('data-gesto-ativo')) return; 
        sheet.setAttribute('data-gesto-ativo', 'true');
        let startY = 0;
        
        sheet.addEventListener('touchstart', e => {
            // Se estiver a fazer scroll numa lista interna, não ativa o deslize do modal
            const areaScroll = e.target.closest('.overflow-y-auto');
            if (areaScroll && areaScroll.scrollTop > 0) return;
            
            startY = e.touches[0].clientY;
        }, {passive: true});

        sheet.addEventListener('touchmove', e => {
            const areaScroll = e.target.closest('.overflow-y-auto');
            if (areaScroll && areaScroll.scrollTop > 0) return;

            let diff = e.touches[0].clientY - startY;
            if (diff > 0) { // Só puxa para baixo
                
                // >>> MAGIA AQUI <<<
                // Isto bloqueia o Pull-to-Refresh do navegador nativo!
                if (e.cancelable) e.preventDefault();
                
                sheet.style.transform = `translateY(${diff}px)`;
                sheet.style.transition = 'none';
            }
        }, {passive: false}); // IMPORTANTE SER false PARA ANULAR O NAVEGADOR

        sheet.addEventListener('touchend', e => {
            let diff = e.changedTouches[0].clientY - startY;
            sheet.style.transition = ''; // Devolve a animação ao CSS
            sheet.style.transform = '';  // Volta a posição original
            
            if (diff > 100) { // Se puxou muito para baixo, fecha
                const modalId = sheet.closest('.modal-container').id;
                fecharModal(modalId);
            }
        });
    });
};
document.addEventListener('DOMContentLoaded', window.inicializarGestosModais);