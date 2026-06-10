document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-produtos">
        <div class="pt-24 px-6 main-wrapper pb-24 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-5">
                
                <div class="flex justify-between items-center px-1">
                    <div>
                        <h2 class="text-xl font-black text-slate-900 dark:text-white tracking-tight">Meus Produtos</h2>
                        <p id="produtos-count-page" class="text-[11px] font-bold text-slate-500 mt-0.5">A carregar...</p>
                    </div>
                    <button onclick="navegarAnimado('criar-produto')" class="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 px-4 py-2 flex items-center gap-1.5 rounded-xl uppercase tracking-widest active:scale-95 transition-all shadow-sm">
                        <i class="fas fa-plus"></i> Novo
                    </button>
                </div>
                
                <div class="relative group mt-2">
                    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-colors group-focus-within:text-slate-900 dark:group-focus-within:text-white"></i>
                    <input type="text" id="input-pesquisa-produtos" oninput="pesquisarProdutosGestao(this.value)" placeholder="Pesquisar por nome ou categoria..." class="w-full h-[50px] pl-11 pr-4 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-[20px] text-[13px] font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-navy-500 shadow-sm transition-all focus:ring-4 focus:ring-slate-900/5">
                </div>
                
                <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button onclick="filtrarProdutosGestao('todos', this)" class="flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold bg-[#0F172A] text-white shadow-md active:scale-95 transition-all filtro-prod-btn active">Todos</button>
                    <button onclick="filtrarProdutosGestao('ativos', this)" class="flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 active:scale-95 transition-all filtro-prod-btn">Ativos</button>
                    <button onclick="filtrarProdutosGestao('rascunhos', this)" class="flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 active:scale-95 transition-all filtro-prod-btn">Rascunhos</button>
                </div>
                
                <div id="lista-produtos-page" class="space-y-3 pb-6">
                    <div class="col-span-full py-12 flex flex-col items-center justify-center text-center gap-3">
                        <i class="fas fa-circle-notch fa-spin text-3xl text-emerald-500 mb-2"></i>
                        <h4 class="text-[14px] font-bold text-slate-900 dark:text-white">A procurar produtos...</h4>
                    </div>
                </div>
            </div>
            
            <!-- MODAL GESTÃO AVANÇADA DO PRODUTO (Bottom Sheet) -->
            <div id="modal-acoes-produto" class="modal-container z-[100]">
                <div class="modal-backdrop"></div>
                <div class="modal-sheet drawer px-6 pb-10 pt-5 bg-white dark:bg-navy-900 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
                    <div class="modal-handle dark:bg-navy-700"></div>
                    
                    <div class="flex items-center gap-4 mb-6 mt-3 px-1 border-b border-slate-50 dark:border-navy-800 pb-5">
                        <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-navy-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700 shrink-0">
                            <img id="acoes-prod-img" src="" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 id="acoes-prod-nome" class="text-[14px] font-black text-slate-900 dark:text-white truncate">Nome</h4>
                            <p id="acoes-prod-preco" class="text-[11px] text-slate-500 font-bold mt-0.5">Preço</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <button id="btn-acao-editar" class="w-full py-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-2xl active:scale-95 transition-all flex items-center justify-between px-5 shadow-sm">
                            <div class="flex items-center gap-3"><i class="fas fa-pen text-slate-400"></i> Editar Produto</div>
                            <i class="fas fa-chevron-right text-[10px] text-slate-300"></i>
                        </button>
                        
                        <button id="btn-acao-status" class="w-full py-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-2xl active:scale-95 transition-all flex items-center justify-between px-5 shadow-sm">
                            <div class="flex items-center gap-3"><i id="icone-acao-status" class="far fa-eye-slash text-slate-400"></i> <span id="texto-acao-status">Ocultar da Loja</span></div>
                        </button>

                        <button id="btn-acao-eliminar" class="w-full py-4 mt-2 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-500 font-bold text-[13px] rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm">
                            <i class="far fa-trash-alt"></i> Eliminar Definitivamente
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </template>
`);

// produto.js - Lógica completa para página de produtos

let memProdutosPage = null;
let termoPesquisaProdutos = '';
let filtroProdutosAtual = 'todos';
let produtoSelecionadoAcoes = null;

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'produtos') {
        if (!memProdutosPage && typeof memDashboard !== 'undefined' && memDashboard.produtos) {
            memProdutosPage = memDashboard.produtos;
        }

        if (memProdutosPage) {
            processarEExibirProdutos();
            if (typeof inicializarGestosModais === 'function') inicializarGestosModais();
        } else {
            carregarPaginaProdutos();
        }
    }
});

window.forcarAtualizacaoProdutos = () => {
    memProdutosPage = null;
    if (typeof window.forcarAtualizacaoDashboard === 'function') {
        window.forcarAtualizacaoDashboard(); 
    }
    carregarPaginaProdutos();
};

async function carregarPaginaProdutos() {
    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        if (!userId) return;

        let lojaId = null;
        if (typeof memDashboard !== 'undefined' && memDashboard.loja) {
            lojaId = memDashboard.loja.id;
        } else {
            const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', userId).maybeSingle();
            if (loja) lojaId = loja.id;
        }

        if (!lojaId) return;

        const { data: produtos, error } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        memProdutosPage = produtos || [];
        processarEExibirProdutos();
        if (typeof inicializarGestosModais === 'function') inicializarGestosModais();

    } catch (e) {
        console.error("Erro ao carregar lista de produtos:", e);
        const container = document.getElementById('lista-produtos-page');
        if (container) {
            container.innerHTML = '<p class="text-center text-red-500 text-sm mt-10">Ocorreu um erro ao carregar os teus produtos.</p>';
        }
    }
}

window.filtrarProdutosGestao = function(filtro, btnObj) {
    filtroProdutosAtual = filtro;
    const botoes = document.querySelectorAll('.filtro-prod-btn');
    botoes.forEach(b => {
        b.className = "flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 active:scale-95 transition-all filtro-prod-btn";
    });
    btnObj.className = "flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold bg-[#0F172A] text-white shadow-md active:scale-95 transition-all filtro-prod-btn active";
    processarEExibirProdutos();
};

window.pesquisarProdutosGestao = function(termo) {
    termoPesquisaProdutos = termo.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    processarEExibirProdutos();
};

function processarEExibirProdutos() {
    let filtrados = [...(memProdutosPage || [])];

    if (filtroProdutosAtual === 'ativos') filtrados = filtrados.filter(p => p.ativo);
    else if (filtroProdutosAtual === 'rascunhos') filtrados = filtrados.filter(p => !p.ativo);

    if (termoPesquisaProdutos !== '') {
        filtrados = filtrados.filter(p => {
            const nomeStr = (p.nome || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const catStr = (p.categoria || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return nomeStr.includes(termoPesquisaProdutos) || catStr.includes(termoPesquisaProdutos);
        });
    }

    renderizarProdutosLista(filtrados);
}

function renderizarProdutosLista(produtos) {
    const container = document.getElementById('lista-produtos-page');
    const badgeCount = document.getElementById('produtos-count-page');
    if (!container) return;

    if (badgeCount) {
        const ativosCount = produtos.filter(p => p.ativo).length;
        badgeCount.innerText = `${ativosCount} produto${ativosCount !== 1 ? 's' : ''} ativo${ativosCount !== 1 ? 's' : ''}`;
    }

    if (produtos.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 flex flex-col items-center justify-center text-center gap-3 bg-white dark:bg-navy-900 rounded-[28px] shadow-sm border border-slate-100 dark:border-navy-800">
                <div class="w-14 h-14 bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 rounded-[20px] flex items-center justify-center text-emerald-500 mb-2 shadow-sm">
                    <i class="fa-solid fa-box-open text-2xl"></i>
                </div>
                <h4 class="text-[14px] font-bold text-slate-900 dark:text-white">Gere o teu catálogo e stock</h4>
                <button onclick="navegarAnimado('criar-produto')" class="w-full max-w-[200px] mt-2 bg-[#0F172A] text-white h-11 rounded-full text-xs font-black tracking-wider flex items-center justify-center shadow-md active:scale-95 transition-all">Adicionar Produto</button>
            </div>
        `;
        return;
    }

    container.className = "space-y-3";
    let html = '';

    produtos.forEach(p => {
        const fotoCapa = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : 'https://placehold.co/100?text=Sem+Foto';
        
        // Verifica se há promoção (preco_promo > 0 e menor que o preco normal. Opcionalmente verifica se existe essa propriedade.)
        const temPromo = (p.preco_promo && p.preco_promo > 0);
        const precoDisplay = temPromo ? p.preco_promo : p.preco;
        
        html += `
            <div class="bg-white dark:bg-navy-900 p-4 rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-navy-800 flex flex-col transition-all group relative overflow-hidden">
                <div class="flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform z-10" onclick="navegarAnimado('editar-produto?id=${p.id}')">
                    <div class="flex items-center gap-3.5 w-full">
                        <div class="w-14 h-14 rounded-[14px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700 shrink-0 shadow-inner relative">
                            <img src="${fotoCapa}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex flex-col items-start min-w-0 flex-1 pr-2">
                            <p class="text-[14px] font-bold text-slate-900 dark:text-white line-clamp-1 w-full leading-tight mb-0.5">${p.nome}</p>
                            
                            <p class="text-[12px] font-black text-slate-900 dark:text-white mt-1">
                                ${precoDisplay.toLocaleString('pt-MZ')} <span class="text-[9px] text-slate-400">MT</span>
                                ${temPromo ? `<span class="text-[10px] text-slate-400 font-semibold line-through ml-1">${p.preco.toLocaleString('pt-MZ')} MT</span>` : ''}
                            </p>
                            
                            <div class="flex flex-wrap gap-1.5 mt-1.5">
                                <span class="text-[9px] font-black ${p.ativo ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'} px-2 py-0.5 rounded-md inline-block uppercase tracking-widest">${p.ativo ? 'Ativo' : 'Rascunho'}</span>
                                ${temPromo && p.ativo ? `<span class="text-[9px] font-black text-[#9f6ef5] bg-[#9f6ef5]/10 px-2 py-0.5 rounded-md inline-block uppercase tracking-widest">Promoção</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors shrink-0">
                        <i class="fas fa-chevron-right text-[11px]"></i>
                    </div>
                </div>
                
                <!-- Botões de Ação Rápida  -->
                <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-50 dark:border-navy-800/50 z-10">
                    <button onclick="duplicarProduto('${p.id}');" class="flex-[0.8] bg-slate-50 dark:bg-navy-800 hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-600 dark:text-slate-300 h-9 rounded-xl text-[10px] font-bold tracking-wider uppercase active:scale-95 transition-all text-center flex justify-center items-center gap-1.5 shadow-sm border border-slate-100">
                        <i class="fa-regular fa-copy opacity-60"></i> Duplicar
                    </button>
                    <button onclick="verProdutoLoja('${p.id}');" class="flex-1 bg-[#0F172A] text-white hover:bg-slate-800 h-9 rounded-xl text-[10px] font-bold tracking-wider uppercase active:scale-95 transition-all text-center flex justify-center items-center gap-1.5 shadow-md">
                        <i class="fa-solid fa-arrow-up-right-from-square opacity-70 mb-[1px]"></i> Ver Produto
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================
// FUNÇÕES AUXILIARES (Adicionar no fundo do ficheiro de produtos)
// ==========================================

window.duplicarProduto = async function(id) {
    if (!window.supabaseClient) return;
    try {
        const btn = event.currentTarget;
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-sm"></i>';
        
        // 1. Vai buscar os dados completos do produto
        const { data: produtoOriginal, error } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) throw error;
        
        // 2. Remove restrições e altera propriedades básicas para iniciar Clone Rascunho
        const novoProduto = { ...produtoOriginal };
        delete novoProduto.id;
        delete novoProduto.created_at;
        novoProduto.nome = novoProduto.nome + " (Cópia)";
        novoProduto.ativo = false; // Começa oculto
        
        // 3. Salva a cópia
        const { error: insertError } = await window.supabaseClient.from('produtos').insert([novoProduto]);
        if (insertError) throw insertError;
        
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao("✔ Produto duplicado (Rascunho)", null);
        
        // 4. Força atualização do Ecrã
        if (typeof window.forcarAtualizacaoProdutos === 'function') {
            window.forcarAtualizacaoProdutos();
        }
        
    } catch(e) {
        console.error("Erro ao duplicar: ", e);
        const btn = event.currentTarget;
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Falhou';
        setTimeout(() => btn.innerHTML = '<i class="fa-regular fa-copy opacity-60"></i> Duplicar', 2000);
    }
};

window.verProdutoLoja = function(id) {
    let slugLoja = '';
    
    // Procura o slug da loja na Cache local para guiar até o produto final no front-end de cliente
    if (typeof memDashboard !== 'undefined' && memDashboard.loja && memDashboard.loja.slug) {
        slugLoja = memDashboard.loja.slug;
    }
    
    if (slugLoja) {
        // Abre um novo separador já com o URL da loja a passar o Produto por filtro
        // Altera aqui o routing final caso já estejas a usar rotas diferentes para a vitrine
        window.open(window.location.origin + '/loja/' + slugLoja + '?p=' + id, '_blank');
    } else {
        alert("O teu link não carregou adequadamente, entra e volta no painel central ou refresca a página.");
    }
};
