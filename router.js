// router.js
const SPA = (() => {
    const view = document.getElementById('spa-view');
    const header = document.getElementById('main-header');
    const headerTitulo = document.getElementById('header-titulo');
    const headerSubtitulo = document.getElementById('header-subtitulo');
    const btnVoltar = document.getElementById('btn-voltar');
    const bottomNav = document.getElementById('bottom-nav');

    const paginas = {
        'dashboard':     { tpl: 'tpl-dashboard',     titulo: '', sub: '', voltar: false, nav: true  },
        'perfil':        { tpl: 'tpl-perfil',        titulo: 'Perfil',     sub: 'Dados da Conta',   voltar: true,  nav: false },
        'seguranca':     { tpl: 'tpl-seguranca',     titulo: 'Segurança',  sub: 'Configurações',    voltar: true,  nav: false },
        'criar-produto': { tpl: 'tpl-criar-produto', titulo: 'Novo Produto', sub: 'Adicionar',      voltar: true,  nav: false },
        'produtos':      { tpl: 'tpl-produtos',      titulo: 'Produtos',   sub: 'Gestão',           voltar: false, nav: true  },
        'vendas':        { tpl: 'tpl-vendas',        titulo: 'Vendas',     sub: 'Histórico',        voltar: false, nav: true  },
        'editar-loja':   { tpl: 'tpl-editar-loja',  titulo: 'Editar Loja', sub: 'Configurações',   voltar: true,  nav: false },
    };

    let paginaAtual = null;

    function navegar(pagina) {
        if (!paginas[pagina]) { console.warn('Página não encontrada:', pagina); return; }
        const cfg = paginas[pagina];
        const tpl = document.getElementById(cfg.tpl);
        if (!tpl) { console.warn('Template não encontrado:', cfg.tpl); return; }

        // Animação saída
        view.classList.add('saindo');

        setTimeout(() => {
            // Injeta o conteúdo
            view.innerHTML = '';
            view.appendChild(tpl.content.cloneNode(true));

            // Atualiza header
            if (headerTitulo) headerTitulo.textContent = cfg.titulo;
            if (headerSubtitulo) headerSubtitulo.textContent = cfg.sub;

            // Botão voltar
            if (btnVoltar) btnVoltar.classList.toggle('hidden', !cfg.voltar);

            // Bottom nav
            if (bottomNav) bottomNav.style.display = cfg.nav ? '' : 'none';

            // Atualiza classe ativa no nav
            document.querySelectorAll('#bottom-nav button[id]').forEach(btn => {
                btn.classList.remove('text-emerald-600', 'dark:text-emerald-500');
                btn.classList.add('text-slate-400', 'dark:text-slate-500');
            });
            const navMap = { 'dashboard': 'nav-inicio', 'produtos': 'nav-produtos', 'vendas': 'nav-vendas', 'editar-loja': 'nav-loja' };
            const navBtn = document.getElementById(navMap[pagina]);
            if (navBtn) {
                navBtn.classList.add('text-emerald-600', 'dark:text-emerald-500');
                navBtn.classList.remove('text-slate-400', 'dark:text-slate-500');
            }

            // Scroll para o topo
            window.scrollTo(0, 0);

            // Animação entrada
            view.classList.remove('saindo');
            view.classList.add('entrando');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    view.classList.remove('entrando');
                });
            });

            paginaAtual = pagina;

            // Dispara evento para os módulos JS
            document.dispatchEvent(new CustomEvent('spa:page-loaded', { detail: pagina }));

        }, 200);
    }

    // Inicia na página dashboard
    setTimeout(() => {
        navegar('dashboard');
    }, 50);

    return { navegar };
})();

// Compatibilidade: navegarAnimado aceita nomes com ou sem .html
function navegarAnimado(pagina) {
    // Remove .html se vier de código antigo
    const nome = pagina.replace('.html', '').replace('criar-produto', 'criar-produto');
    const menu = document.getElementById('menuZ');
    const overlay = document.getElementById('overlay');
    if (menu) menu.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    SPA.navegar(nome);
}
