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
                    <button onclick="filtrarProdutosGestao('promocao', this)" class="flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 active:scale-95 transition-all filtro-prod-btn">Em Promoção</button>
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
                        <button id="btn-acao-ver" class="w-full py-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-2xl active:scale-95 transition-all flex items-center justify-between px-5 shadow-sm">
                            <div class="flex items-center gap-3"><i class="fas fa-external-link-alt text-slate-400"></i> Ver na Loja</div>
                            <i class="fas fa-chevron-right text-[10px] text-slate-300"></i>
                        </button>

                        <button id="btn-acao-editar" class="w-full py-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-2xl active:scale-95 transition-all flex items-center justify-between px-5 shadow-sm">
                            <div class="flex items-center gap-3"><i class="fas fa-pen text-slate-400"></i> Editar Produto</div>
                            <i class="fas fa-chevron-right text-[10px] text-slate-300"></i>
                        </button>

                        <button id="btn-acao-duplicar" class="w-full py-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-2xl active:scale-95 transition-all flex items-center justify-between px-5 shadow-sm">
                            <div class="flex items-center gap-3"><i class="far fa-copy text-slate-400"></i> Duplicar Produto</div>
                            <i class="fas fa-chevron-right text-[10px] text-slate-300"></i>
                        </button>
                        
                        <button id="btn-acao-status" class="w-full py-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-2xl active:scale-95 transition-all flex items-center justify-between px-5 shadow-sm border-t border-slate-50 dark:border-navy-800 mt-2">
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
    else if (filtroProdutosAtual === 'promocao') filtrados = filtrados.filter(p => p.preco_promo && p.preco_promo > 0);

    if (termoPesquisaProdutos !== '') {
        filtrados = filtrados.filter(p => {
            const nomeStr = (p.nome || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const catStr = (p.categoria || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return nomeStr.includes(termoPesquisaProdutos) || catStr.includes(termoPesquisaProdutos);
        });
    }

    renderizarProdutosLista(filtrados);
}

function renderizarProdutosLista(produtosRender) {
    const container = document.getElementById('lista-produtos-page');
    const badgeCount = document.getElementById('produtos-count-page');
    if (!container) return;

    if (badgeCount) {
        const bdgBase = memProdutosPage || [];
        const ativosCount = bdgBase.filter(p => p.ativo).length;
        badgeCount.innerText = `${ativosCount} ativo${ativosCount !== 1 ? 's' : ''} de ${bdgBase.length}`;
    }

    if (!memProdutosPage || memProdutosPage.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 flex flex-col items-center justify-center text-center gap-3 bg-white dark:bg-navy-900 rounded-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-navy-800">
                <div class="w-14 h-14 bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 rounded-[20px] flex items-center justify-center text-emerald-500 mb-2 shadow-sm">
                    <i class="fa-solid fa-box-open text-2xl"></i>
                </div>
                <div>
                    <h4 class="text-[14px] font-bold text-slate-900 dark:text-white">Gere o teu stock e produtos</h4>
                    <p class="text-[11px] text-slate-500 font-medium px-4 mt-1 leading-relaxed">Adiciona o teu primeiro produto para começar a vender online.</p>
                </div>
                <button onclick="navegarAnimado('criar-produto')" class="w-full max-w-[200px] mt-2 bg-[#0F172A] text-white h-12 rounded-full text-[11px] uppercase font-black tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"><i class="fas fa-plus"></i> Adicionar Produto</button>
            </div>
        `;
        return;
    }

    if (produtosRender.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-10 flex flex-col items-center justify-center text-center gap-3">
                <div class="w-12 h-12 rounded-[20px] bg-slate-50 dark:bg-navy-800 border border-slate-100 dark:border-navy-700 flex items-center justify-center text-slate-300">
                    <i class="fas fa-search text-lg"></i>
                </div>
                <h4 class="text-[13px] font-bold text-slate-900 dark:text-white mt-1">Nenhum produto encontrado</h4>
            </div>
        `;
        return;
    }

    container.className = "space-y-3 pb-6";
    let html = '';

    produtosRender.forEach(p => {
        const fotoCapa = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : 'https://placehold.co/100?text=Sem+Foto';
        html += `
            <div onclick="abrirModalAcoesProduto('${p.id}')" class="bg-white dark:bg-navy-900 p-3.5 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-navy-800 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group hover:border-slate-200 dark:hover:border-navy-700">
                <div class="flex items-center gap-3.5 w-full pr-2">
                    <div class="w-14 h-14 rounded-[14px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700 shrink-0 relative">
                        <img src="${fotoCapa}" class="w-full h-full object-cover">
                        ${!p.ativo ? '<div class="absolute inset-0 bg-black/40 flex items-center justify-center"><i class="far fa-eye-slash text-white opacity-80 text-xs"></i></div>' : ''}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="text-[13px] font-bold text-slate-900 dark:text-white truncate">${p.nome}</h4>
                        <div class="flex items-center gap-2 mt-0.5 flex-wrap">
                            ${p.preco_promo && p.preco_promo > 0 
                              ? `<p class="text-[11px] font-black text-emerald-500">${p.preco_promo.toLocaleString('pt-MZ')} <span class="text-[9px] text-emerald-400">MT</span></p>
                                 <p class="text-[9px] font-bold text-slate-400 line-through">${p.preco.toLocaleString('pt-MZ')} MT</p>`
                              : `<p class="text-[11px] font-black text-slate-900 dark:text-white">${p.preco.toLocaleString('pt-MZ')} <span class="text-[9px] text-slate-400">MT</span></p>`
                            }
                            ${p.estoque_qtd !== undefined && p.controlar_estoque ? `<p class="flex items-center gap-1 text-[9px] font-bold bg-slate-50 dark:bg-navy-800 px-1.5 py-0.5 border border-slate-100 dark:border-navy-700 rounded-md text-slate-500"><i class="fas fa-box text-[8px] text-slate-400"></i> ${p.estoque_qtd} uni</p>` : ''}
                        </div>
                        <div class="flex items-center gap-1.5 mt-1">
                            <span class="text-[9px] font-black ${p.ativo ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-orange-400 bg-orange-50 dark:bg-orange-500/10'} px-1.5 rounded uppercase tracking-widest">${p.ativo ? 'Publicado' : 'Rascunho'}</span>
                            ${p.preco_promo && p.preco_promo > 0 ? `<span class="text-[9px] font-black text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-1.5 rounded uppercase tracking-widest">Promoção</span>` : ''}
                        </div>
                    </div>
                </div>
                <button class="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 dark:border-slate-700 dark:bg-navy-800 flex items-center justify-center text-slate-400 group-hover:bg-[#0F172A] group-hover:text-white group-hover:border-[#0F172A] transition-colors shrink-0">
                    <i class="fas fa-ellipsis-v text-xs"></i>
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
}

window.abrirModalAcoesProduto = function(id) {
    if (!memProdutosPage) return;
    const p = memProdutosPage.find(p => p.id === id);
    if (!p) return;

    produtoSelecionadoAcoes = p;

    const imgModal = document.getElementById('acoes-prod-img');
    const nomeModal = document.getElementById('acoes-prod-nome');
    const precoModal = document.getElementById('acoes-prod-preco');
    
    if (imgModal) imgModal.src = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : 'https://placehold.co/100?text=Sem+Foto';
    if (nomeModal) nomeModal.innerText = p.nome;
    if (precoModal) precoModal.innerHTML = `${p.preco.toLocaleString('pt-MZ')} <span class="font-normal text-[10px]">MT</span>`;

    const btnStatus = document.getElementById('btn-acao-status');
    const iconeStatus = document.getElementById('icone-acao-status');
    const textoStatus = document.getElementById('texto-acao-status');

    if (btnStatus) {
        btnStatus.onclick = () => alternarStatusVisibilidade(p.id, !p.ativo);
        if (p.ativo) {
            iconeStatus.className = "far fa-eye-slash text-orange-500";
            textoStatus.innerText = "Ocultar da Loja (Guardar Rascunho)";
            textoStatus.className = "text-orange-500";
        } else {
            iconeStatus.className = "far fa-eye text-emerald-500";
            textoStatus.innerText = "Publicar Produto na Loja";
            textoStatus.className = "text-emerald-500";
        }
    }

    const btnVer = document.getElementById('btn-acao-ver');
    if (btnVer) {
        btnVer.onclick = () => {
            fecharModal('modal-acoes-produto');
            if (typeof memDashboard !== 'undefined' && memDashboard.loja && memDashboard.loja.slug) {
                window.open(`${window.location.origin}/loja/${memDashboard.loja.slug}?produto=${p.id}`, '_blank');
            } else {
                if(typeof navegarPara === 'function') navegarPara('produto', p.id);
            }
        };
    }

    const btnDuplicar = document.getElementById('btn-acao-duplicar');
    if (btnDuplicar) {
        btnDuplicar.onclick = () => {
            if (confirm(`Tens a certeza que queres duplicar "${p.nome}"?`)) {
                duplicarProdutoDefinitivo(p);
            }
        };
    }

    const btnEditar = document.getElementById('btn-acao-editar');
    if (btnEditar) {
        btnEditar.onclick = () => {
            fecharModal('modal-acoes-produto');
            if(typeof mostrarNotificacao === "function") mostrarNotificacao('Reencaminhar para edição...');
            navegarAnimado('criar-produto');
        };
    }

    const btnEliminar = document.getElementById('btn-acao-eliminar');
    if (btnEliminar) {
        btnEliminar.onclick = () => {
            if (confirm(`Tens a certeza que queres eliminar "${p.nome}"? Esta ação é definitiva e não pode ser revertida.`)) {
                eliminarProdutoDefinitivo(p.id);
            }
        };
    }

    abrirModal('modal-acoes-produto');
};

async function alternarStatusVisibilidade(id, novoStatusAtivo) {
    try {
        const { error } = await window.supabaseClient.from('produtos').update({ ativo: novoStatusAtivo }).eq('id', id);
        if (error) throw error;

        // Atualiza a cache inter-páginas magicamente
        const idx = memProdutosPage.findIndex(p => p.id === id);
        if (idx !== -1) memProdutosPage[idx].ativo = novoStatusAtivo;

        if (typeof memDashboard !== 'undefined' && memDashboard.produtos) {
            const idxDash = memDashboard.produtos.findIndex(p => p.id === id);
            if (idxDash !== -1) memDashboard.produtos[idxDash].ativo = novoStatusAtivo;
            if (typeof renderizarProdutosDashboard === 'function') renderizarProdutosDashboard(memDashboard.produtos);
        }

        fecharModal('modal-acoes-produto');
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao(novoStatusAtivo ? 'Produto publicado online!' : 'Produto agora está em rascunho.');
        
        processarEExibirProdutos();

    } catch (e) {
        console.error(e);
        alert("Ocorreu um erro ao tentar alterar a visibilidade do produto.");
    }
}

async function eliminarProdutoDefinitivo(id) {
    try {
        const btnEliminar = document.getElementById('btn-acao-eliminar');
        if (btnEliminar) {
            btnEliminar.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> A remover definitivamente...';
            btnEliminar.classList.add('pointer-events-none', 'opacity-50');
        }

        const { error } = await window.supabaseClient.from('produtos').delete().eq('id', id);
        if (error) throw error;

        // Limpa da Mémoria em todo o lado instantaneamente
        memProdutosPage = memProdutosPage.filter(p => p.id !== id);
        
        if (typeof memDashboard !== 'undefined' && memDashboard.produtos) {
            memDashboard.produtos = memDashboard.produtos.filter(p => p.id !== id);
            if (typeof renderizarProdutosDashboard === 'function') renderizarProdutosDashboard(memDashboard.produtos);
        }

        fecharModal('modal-acoes-produto');
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('Produto eliminado da loja.');

        processarEExibirProdutos();

    } catch (e) {
        console.error(e);
        alert("Ocorreu um erro ao eliminar o produto.");
        fecharModal('modal-acoes-produto');
    }
}

async function duplicarProdutoDefinitivo(p) {
    try {
        const btnDuplicar = document.getElementById('btn-acao-duplicar');
        if (btnDuplicar) {
            btnDuplicar.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> A duplicar...';
            btnDuplicar.classList.add('pointer-events-none', 'opacity-50');
        }

        const produtoDuplicado = {
            loja_id: p.loja_id,
            nome: p.nome + ' (Cópia)',
            categoria: p.categoria,
            preco: p.preco,
            preco_promo: p.preco_promo,
            descricao: p.descricao,
            controlar_estoque: p.controlar_estoque,
            estoque_qtd: p.estoque_qtd,
            variantes: p.variantes,
            fotos: p.fotos,
            ativo: false // Starts as Draft para o utilizador poder editar sem publicá-lo acidentalmente
        };

        const { data, error } = await window.supabaseClient.from('produtos').insert([produtoDuplicado]).select();
        if (error) throw error;

        if (data && data.length > 0) {
            if (memProdutosPage) memProdutosPage.unshift(data[0]);
            
            if (typeof memDashboard !== 'undefined' && memDashboard.produtos) {
                memDashboard.produtos.unshift(data[0]);
                if (typeof renderizarProdutosDashboard === 'function') renderizarProdutosDashboard(memDashboard.produtos);
            }
        }

        fecharModal('modal-acoes-produto');
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('Produto duplicado com sucesso!');

        processarEExibirProdutos();

    } catch (e) {
        console.error(e);
        alert("Ocorreu um erro ao duplicar o produto.");
        fecharModal('modal-acoes-produto');
    }
}
