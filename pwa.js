let eventoInstalacaoNativo;

// 1. O navegador avisa que a app cumpre os requisitos para instalar
window.addEventListener('beforeinstallprompt', (e) => {
    // Esconde o popup nativo feio que o Chrome mete em baixo
    e.preventDefault();
    // Guarda o evento para usar no nosso Botão personalizado
    eventoInstalacaoNativo = e;
});

// 2. Simulador: Passado 2.5 segundos, mostra o teu Modal Premium de convite PWA
setTimeout(() => {
    const modal = document.getElementById('pwa-modal');
    const content = document.getElementById('pwa-modal-content');
    if (modal && content) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-95');
    }
}, 2500);

// 3. Função para fechar se ele disser "Mais tarde"
window.fecharPwaModal = function() {
    const modal = document.getElementById('pwa-modal');
    const content = document.getElementById('pwa-modal-content');
    if (modal && content) {
        content.classList.add('scale-95');
        modal.classList.add('opacity-0', 'pointer-events-none');
    }
}

// 4. Instalar quando clica no botão grande
window.instalarApp = async function() {
    if (!eventoInstalacaoNativo) {
        alert("Modo de Teste Visual Ativo! (O Pop-up está perfeito. Quando abrires isto no telemóvel via Vercel e o telemóvel detetar a tua app, isto vai acionar o menu de instalação do sistema!)");
        fecharPwaModal();
        return;
    }

    // Mostra o ecrã nativo de instalação do Sistema
    eventoInstalacaoNativo.prompt();
    
    // Espera para ver se o utilizador carregou em "Instalar"
    const { outcome } = await eventoInstalacaoNativo.userChoice;
    console.log(`Resultado da instalação: ${outcome}`);
    
    // Limpa a memória e fecha o pop-up
    eventoInstalacaoNativo = null;
    fecharPwaModal();
}