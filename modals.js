// ==========================================
// SISTEMA UNIVERSAL DE MODAIS
// ==========================================

// 1. Abrir Modal
window.abrirModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    // Adiciona classes em AMBOS (html + body) para bloquear
    // o Pull-to-Refresh e qualquer movimento da página de fundo
    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');

    modal.classList.add('active');

    // Garante que os gestos de deslize estão ativos neste modal
    inicializarGestosModais();
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

// 3. Fechar ao clicar no fundo escuro (Backdrop)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modalId = e.target.closest('.modal-container').id;
        fecharModal(modalId);
    }
});

// 4. Bloquear qualquer toque/deslize no backdrop — impede que o fundo se mova
document.addEventListener('touchmove', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        if (e.cancelable) e.preventDefault();
    }
}, { passive: false }); // CRÍTICO: passive:false permite o preventDefault

// 5. Motor de Deslize Inteligente
window.inicializarGestosModais = function() {
    document.querySelectorAll('.modal-sheet.drawer').forEach(sheet => {
        // Evita duplicar os listeners se já estiverem ativos
        if (sheet.hasAttribute('data-gesto-ativo')) return;
        sheet.setAttribute('data-gesto-ativo', 'true');

        let startY = 0;

        sheet.addEventListener('touchstart', e => {
            // Se o utilizador está a fazer scroll dentro de uma lista, não ativa o deslize do modal
            const areaScroll = e.target.closest('.overflow-y-auto');
            if (areaScroll && areaScroll.scrollTop > 0) return;

            startY = e.touches[0].clientY;
        }, { passive: true });

        sheet.addEventListener('touchmove', e => {
            const areaScroll = e.target.closest('.overflow-y-auto');
            if (areaScroll && areaScroll.scrollTop > 0) return;

            let diff = e.touches[0].clientY - startY;
            if (diff > 0) {
                // >>> CHAVE DO BLOQUEIO: cancela o comportamento nativo do navegador <<<
                // Sem isto o topo da barra do browser mexe-se ao deslizar
                if (e.cancelable) e.preventDefault();

                sheet.style.transform = `translateY(${diff}px)`;
                sheet.style.transition = 'none';
            }
        }, { passive: false }); // CRÍTICO: passive:false é obrigatório para o preventDefault funcionar

        sheet.addEventListener('touchend', e => {
            let diff = e.changedTouches[0].clientY - startY;
            sheet.style.transition = ''; // Devolve a animação ao CSS
            sheet.style.transform = '';  // Volta à posição original

            if (diff > 100) { // Se puxou mais de 100px para baixo, fecha o modal
                const modalId = sheet.closest('.modal-container').id;
                fecharModal(modalId);
            }
        });
    });
};

// Inicializa os gestos nos modais já presentes no DOM
document.addEventListener('DOMContentLoaded', inicializarGestosModais);
