// ==========================================
// 1. SUPABASE E ESTADO GLOBAL
// ==========================================
let produtos = [];
let carrinho = JSON.parse(localStorage.getItem('shopyump_spa')) || [];
let numeroLojista = "";
let lojaAtual = null;

// ===========================================
// BLOCO 1: SUBSTITUIR TODA A FUNÇÃO inicializarLoja
// ===========================================
// ===========================================
// NOVA FUNÇÃO: inicializarLoja (Com Alertas de Erro Visíveis)
// ===========================================
async function inicializarLoja() {
    try {
        const pathSegments = window.location.pathname.split('/');
        const slugIndex = pathSegments.indexOf('loja');
        const slug = slugIndex !== -1 ? pathSegments[slugIndex + 1] : null;

        if (!slug) {
            mostrarEstadoVazioGlobal("Loja não encontrada.");
            return;
        }

        const { data: loja, error: erroLoja } = await window.supabaseClient
            .from('lojas')
            .select('*')
            .eq('slug', slug)
            .single();

        if (erroLoja || !loja) {
            mostrarEstadoVazioGlobal("A loja que procuras não existe.");
            return;
        }

        lojaAtual = loja;
        numeroLojista = loja.whatsapp ? loja.whatsapp.replace(/\D/g, '') : '';
        
        document.title = loja.nome + " | Shopink";
        const topName = document.getElementById('top-shop-name');
        if (topName) topName.innerText = loja.nome;

        // 🚀 TENTA REGISTAR A VISITA (Com bloqueio de visitas do próprio Lojista)
        const searchParams = new URLSearchParams(window.location.search);
        const isLojista = searchParams.get('admin') === 'true';
        
        const chaveVisiteiHoje = 'visitei_shopyump_' + loja.id;
        
        if (isLojista) {
            // Se o URL tem ?admin=true, finge discretamente na sessão que já visitou, 
            // sem NUNCA escrever na base de dados! (Não suja o gráfico)
            sessionStorage.setItem(chaveVisiteiHoje, 'lojista');
            
            // MÁGICA: Apaga o parâmetro 'admin' da barra de URL imediatamente!
            // Assim o lojista vê e copia sempre o URL limpo (ex: sem o ?admin=true).
            searchParams.delete('admin');
            const novaQuery = searchParams.toString() ? '?' + searchParams.toString() : '';
            window.history.replaceState({}, document.title, window.location.pathname + novaQuery);
            
        } else if (!sessionStorage.getItem(chaveVisiteiHoje)) {
            // Conta APENAS se for um cliente verdadeiro e se for a primeira entrada
            window.supabaseClient.from('visitas')
                .insert([{ loja_id: loja.id }])
                .then(({ error }) => {
                    if (error) {
                        alert("ERRO AO REGISTAR VISITA: " + error.message);
                    } else {
                        sessionStorage.setItem(chaveVisiteiHoje, 'sim');
                    }
                });
        }

        const { data: prods, error: erroProdutos } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .eq('loja_id', loja.id)
            .eq('ativo', true)
            .order('created_at', { ascending: false });

        if (prods && prods.length > 0) {
            produtos = prods.map(p => {
                let tamanhosArr = [];
                let coresArr = [];
                if (p.variantes) {
                    if (p.variantes.tamanhos) tamanhosArr = p.variantes.tamanhos;
                    else if (p.variantes.numeracao) tamanhosArr = p.variantes.numeracao.map(n => String(n));
                    if (p.variantes.cores) coresArr = p.variantes.cores.map(c => ({nome: c, hex: "#94a3b8"})); 
                }
                // Extrai apenas o último nome da categoria (ex: "Ténis" em vez de "Moda > Calçados > Ténis")
                let categoriaCurta = p.categoria || 'Moda';
                if (categoriaCurta.includes(' > ')) {
                    categoriaCurta = categoriaCurta.split(' > ').pop().trim();
                }

                return {
                    id: p.id, nome: p.nome, preco: p.preco_promo && p.preco_promo > 0 ? p.preco_promo : p.preco,
                    precoOriginal: p.preco, categoria: categoriaCurta, subcategoria: 'Destaques',
                    imagem: (p.fotos && p.fotos.length > 0) ? p.fotos[0] : 'https://placehold.co/400x500?text=Sem+Foto',
                    imagens: p.fotos || [], desc: p.descricao || '', tamanhos: tamanhosArr, cores: coresArr
                };
            });
            document.getElementById('loader-global').classList.add('opacity-0', 'pointer-events-none');
            document.getElementById('bottom-nav').classList.remove('hidden');
            
            const params = new URLSearchParams(window.location.search);
            const produtoIdQuery = params.get('produto');
            
            if (produtoIdQuery) {
                navegarPara('produto', produtoIdQuery);
            } else {
                navegarPara('home');
            }
            
            atualizarBadge();
        } else {
            document.getElementById('loader-global').classList.add('opacity-0', 'pointer-events-none');
            mostrarEstadoVazioGlobal("Esta loja ainda não tem produtos", "Pede ao vendedor para atualizar o catálogo.");
        }
    } catch (e) {
        mostrarEstadoVazioGlobal("Erro ao carregar a loja", "Tenta novamente mais tarde.");
    }
}

function mostrarEstadoVazioGlobal(titulo, subtitulo = "") {
    const root = document.getElementById('app-root');
    root.innerHTML = `
        <div class="flex-col items-center justify-center py-32 text-center flex h-full px-6 animate-fade-in">
            <div class="w-20 h-20 bg-slate-50 flex items-center justify-center text-slate-300 rounded-full mb-6">
                <i class="fa-solid fa-store-slash text-3xl"></i>
            </div>
            <h2 class="text-xl font-black text-slate-900 leading-tight">${titulo}</h2>
            <p class="text-sm font-medium text-slate-500 mt-2">${subtitulo}</p>
        </div>
    `;
}

let filtroAtual = { tipo: 'tudo', valor: 'Tudo' };
let selecaoVariantes = { cor: null, tamanho: null }; 

// ==========================================
// 2. O ROUTER E LÓGICA DINÂMICA
// ==========================================
let scrollHome = 0;
let rotaAtualSpa = null; 

function navegarPara(rota, params = null) {
    const toastAtivo = document.getElementById('toast-premium');
    if (toastAtivo) toastAtivo.remove();

    if (rota === 'home' && (rotaAtualSpa === 'home' || rotaAtualSpa === 'home_filtro')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const header = document.getElementById('main-header');
        if (header) {
            header.classList.remove('-translate-y-28', 'opacity-0', 'pointer-events-none');
        }
        return; 
    }

    if (rotaAtualSpa === 'home' || rotaAtualSpa === 'home_filtro') {
        scrollHome = window.scrollY;
    }
    rotaAtualSpa = rota; 
    
    const header = document.getElementById('main-header');
    if (header) {
        if (rota === 'produto' || rota === 'carrinho' || rota === 'favoritos' || rota === 'entrega') {
            header.classList.add('opacity-0', 'pointer-events-none', '-translate-y-28');
        } else {
            header.classList.remove('opacity-0', 'pointer-events-none');
            if (scrollHome > 80) header.classList.add('-translate-y-28');
            else header.classList.remove('-translate-y-28');
        }
    }

    if (document.startViewTransition) {
        document.startViewTransition(() => renderizar(rota, params));
    } else {
        renderizar(rota, params);
    }
}

function renderizar(rota, params) {
    const root = document.getElementById('app-root');
    const navInferior = document.getElementById('bottom-nav');
    
    if (rota === 'home' || rota === 'home_filtro') root.innerHTML = viewHome();
    else if (rota === 'produto') root.innerHTML = viewProduto(params);
    else if (rota === 'carrinho') root.innerHTML = viewCarrinho();
    else if (rota === 'entrega') root.innerHTML = viewEntrega(); 
    else if (rota === 'favoritos') root.innerHTML = viewFavoritos();

    if (rota === 'home') {
        window.scrollTo(0, scrollHome);
    } else if (rota !== 'home_filtro') {
        window.scrollTo(0, 0); 
    }

    if (navInferior) {
        if (rota === 'produto' || rota === 'carrinho' || rota === 'entrega') {
            navInferior.classList.add('hidden'); 
        } else {
            navInferior.classList.remove('hidden'); 
        }
    }

    atualizarBadge();
    atualizarMenuInferior(rota);
}

function aplicarFiltro(tipo, valor) {
    filtroAtual = { tipo, valor };
    renderizar('home_filtro'); 
}

function renderizarNavegacao() {
    const categoriasPrincipais = [...new Set(produtos.map(p => p.categoria))];
    const classAtiva = "bg-[#0F172A] text-white shadow-md";
    const classInativa = "bg-white border border-slate-200 text-slate-500 shadow-sm";

    let html = `<nav class="flex overflow-x-auto gap-2.5 no-scrollbar px-5 pb-6 border-b border-slate-50">`;
    html += `<button onclick="aplicarFiltro('tudo', 'Tudo')" class="px-5 py-2 rounded-full text-[10px] font-bold whitespace-nowrap active:scale-95 transition-all ${filtroAtual.valor === 'Tudo' ? classAtiva : classInativa}">Tudo</button>`;

    categoriasPrincipais.forEach(cat => {
        html += `<button onclick="aplicarFiltro('categoria', '${cat}')" class="px-5 py-2 rounded-full text-[10px] font-bold whitespace-nowrap active:scale-95 transition-all ${filtroAtual.valor === cat ? classAtiva : classInativa}">${cat}</button>`;
    });

    html += `</nav>`;
    return html;
}


// ==========================================
// 3. AS VIEWS
// ==========================================
function viewHome() {
    let produtosExibicao = produtos;
    if (filtroAtual.tipo === 'categoria') {
        produtosExibicao = produtos.filter(p => p.categoria === filtroAtual.valor);
    } else if (filtroAtual.tipo === 'subcategoria') {
        produtosExibicao = produtos.filter(p => p.subcategoria === filtroAtual.valor);
    }

    let lojaDisplayTitle = lojaAtual ? lojaAtual.nome : "LOJA";
    
    let imgBannerUrl = (lojaAtual && lojaAtual.banner_url) ? lojaAtual.banner_url : (produtos.length > 0 ? produtos[0].imagem : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80');
    let textoBotaoBanner = (lojaAtual && lojaAtual.banner_botao) ? lojaAtual.banner_botao : 'Ver Coleção';
    let descricaoLoja = (lojaAtual && lojaAtual.descricao) ? lojaAtual.descricao : 'Descobre os nossos produtos e novidades exclusivas.';

    let html = `
        <div class="h-[80px]"></div> 
        
        <!-- 1. Banner Ultra-Wide com margens laterais -->
        <div class="px-5 mb-4 group cursor-pointer" onclick="window.scrollBy({ top: 320, behavior: 'smooth' })">
            
            <!-- aspect-[21/9] cria a proporção horizontal moderna (quase 3:1) e rounded-3xl dá as bordas do teu outro design -->
            <div class="w-full aspect-[21/9] md:aspect-[3/1] relative rounded-3xl overflow-hidden shadow-xl shadow-black/5 active:scale-[0.98] transition-all bg-slate-100">
                <img src="${imgBannerUrl}" alt="Banner da Loja" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <!-- Pequeno gradiente em baixo apenas para o botão flutuar -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none"></div>
                
                <div class="absolute bottom-4 right-4 z-20">
                    <button class="bg-white/90 backdrop-blur-md text-slate-900 border border-white/50 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center gap-1.5">
                        ${textoBotaoBanner} <i class="fas fa-arrow-down text-[10px]"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- 2. Informações da Loja Organizadas (Fora do banner) -->
        <div class="px-5 py-6">
            <h1 class="text-[22px] font-black tracking-tight text-slate-900 leading-tight mb-1.5">${lojaDisplayTitle.toUpperCase()}</h1>
            <p class="text-[12px] font-medium text-slate-500 max-w-[90%] leading-relaxed">${descricaoLoja}</p>
        </div>

        ${renderizarNavegacao()}

        <main class="py-4 space-y-10">
            <section>
                <div class="flex items-end justify-between px-5 mb-4">
                    <h2 class="text-lg font-black tracking-tight text-slate-900">Novidades</h2>
                </div>
                <div class="flex overflow-x-auto gap-4 no-scrollbar px-5 pb-2 snap-x snap-mandatory">
    `;
    
    produtos.slice(0, 4).forEach(produto => {
        html += renderProdutoCardHorizontal(produto);
    });
    
    html += `
                </div>
            </section>

            <section>
                <div class="flex items-end justify-between px-5 mb-4">
                    <h2 class="text-lg font-black tracking-tight text-slate-900">Explorar ${filtroAtual.valor !== 'Tudo' ? filtroAtual.valor : 'Tudo'}</h2>
                </div>
                <div class="grid grid-cols-2 gap-x-3 gap-y-6 px-5">
    `;
    
    if (produtosExibicao.length === 0) {
        html += `<div class="col-span-2 text-center py-10 text-slate-400 text-sm font-semibold">Nenhum produto encontrado.</div>`;
    } else {
        produtosExibicao.forEach(p => {
            html += `
                <div onclick="navegarPara('produto', '${p.id}')" class="cursor-pointer group flex flex-col">
                    <div class="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-2.5 border border-slate-100 relative">
                        <button class="absolute top-2.5 right-2.5 z-10 w-7 h-7 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 active:scale-90 transition-transform shadow-sm" 
                                onclick="event.stopPropagation(); toggleFavorito('${p.id}', this)">
                            <i class="${(JSON.parse(localStorage.getItem('shopyump_favs')) || []).includes(p.id) ? 'fas fa-heart text-red-500' : 'far fa-heart'} text-[11px]"></i>
                        </button>
                        <img src="${p.imagem}" class="w-full h-full object-cover transition-transform duration-500 group-active:scale-95">
                    </div>
                    <div class="px-1 flex flex-col gap-1 mt-1">
                        <h3 class="text-[14px] font-extrabold text-black line-clamp-2 leading-tight min-h-[40px] break-words pr-1">${p.nome}</h3>
                        <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            ${p.precoOriginal && p.preco < p.precoOriginal ? `<span class="text-[10.5px] text-slate-400 font-semibold line-through">${p.precoOriginal.toLocaleString('pt-MZ')} MT</span>` : ''}
                            <p class="text-[16px] font-black text-black tracking-tight">${p.preco.toLocaleString('pt-MZ')} <span class="text-[11px] font-extrabold text-black ml-0.5">MT</span></p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    html += `</div></section></main>`;
    return html;
}

function renderProdutoCardHorizontal(p) {
    return `
        <div onclick="navegarPara('produto', '${p.id}')" class="cursor-pointer group flex-shrink-0 w-[170px] snap-start">
            <div class="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-3.5 border border-slate-100 relative">
                <button class="absolute top-2.5 right-2.5 z-10 w-7 h-7 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 active:scale-90 transition-transform shadow-sm" 
                        onclick="event.stopPropagation(); toggleFavorito('${p.id}', this)">
                    <i class="${(JSON.parse(localStorage.getItem('shopyump_favs')) || []).includes(p.id) ? 'fas fa-heart text-red-500' : 'far fa-heart'} text-[11px]"></i>
                </button>
                <img src="${p.imagem}" class="w-full h-full object-cover transition-transform duration-500 group-active:scale-95">
            </div>
            <div class="px-1 flex flex-col gap-1 mt-1">
                <h3 class="text-[14px] font-extrabold text-black line-clamp-2 leading-tight min-h-[40px] break-words pr-1">${p.nome}</h3>
                <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    ${p.precoOriginal && p.preco < p.precoOriginal ? `<span class="text-[10.5px] text-slate-400 font-semibold line-through">${p.precoOriginal.toLocaleString('pt-MZ')} MT</span>` : ''}
                    <p class="text-[15px] font-black text-black tracking-tight">${p.preco.toLocaleString('pt-MZ')} <span class="text-[10px] font-extrabold text-black ml-0.5">MT</span></p>
                </div>
            </div>
        </div>
    `;
}

function viewProduto(id) {
    const p = produtos.find(x => x.id === id);
    if (!p) return `<div class="p-5 text-center font-bold text-slate-400">Produto não encontrado.</div>`;

    selecaoVariantes = { cor: null, tamanho: null };
    const favoritos = JSON.parse(localStorage.getItem('shopyump_favs')) || [];
    const isFav = favoritos.includes(p.id);

    const imagensCarrossel = (p.imagens && p.imagens.length > 0) ? p.imagens : [p.imagem]; 
    let carrosselHtml = ''; let dotsHtml = '';

    imagensCarrossel.forEach((img, index) => {
        carrosselHtml += `<div class="w-full h-full flex-shrink-0 snap-center snap-always relative flex items-center justify-center"><img src="${img}" class="w-full h-full object-cover"></div>`;
        dotsHtml += `<div class="transition-all duration-300 rounded-full shadow-sm ${index === 0 ? 'bg-slate-900 border-[1px] border-white w-2 h-2 scale-110' : 'bg-white/90 border-[0.5px] border-black/10 w-2 h-2'}"></div>`;
    });

    return `
        <div class="animate-fade-in fixed top-0 left-0 w-full h-[100dvh] z-50 bg-white flex flex-col">
            
            <div class="relative flex-1 bg-slate-50/50 overflow-hidden">
                <button onclick="navegarPara('home')" class="absolute top-6 left-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm active:scale-95 transition-all text-slate-900"><i class="fas fa-arrow-left text-sm"></i></button>
                <button onclick="partilharProduto('${p.id}', '${p.nome}')" class="absolute top-6 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm active:scale-95 transition-all text-slate-900"><i class="fas fa-share-nodes text-sm"></i></button>
                
                <div class="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar" onscroll="atualizarDotsProduto(this)">${carrosselHtml}</div>
                ${imagensCarrossel.length > 1 ? `<div id="produto-dots" class="absolute bottom-8 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">${dotsHtml}</div>` : ''}
            </div>

            <div class="bg-white rounded-t-3xl -mt-5 relative z-30 px-5 pt-6 pb-8 flex-shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex flex-col gap-4 border-t border-slate-100">
                <div class="flex justify-between items-start gap-4">
                    <div class="flex flex-col flex-1">
                        <span class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">${p.categoria}</span>
                        <h1 class="text-base font-black text-slate-900 leading-tight">${p.nome}</h1>
                    </div>
                    <div class="text-xl font-black text-slate-900 text-right whitespace-nowrap flex flex-col items-end">
                        ${p.precoOriginal && p.preco < p.precoOriginal ? `<span class="text-[10px] text-slate-400 line-through mb-0.5">${p.precoOriginal.toLocaleString('pt-MZ')} MT</span>` : ''}
                        <div class="leading-none">${p.preco.toLocaleString('pt-MZ')} <span class="text-[10px] font-bold text-slate-400">MT</span></div>
                    </div>
                </div>

               

                <div class="grid grid-cols-2 gap-4 mt-1">
                    <div class="flex flex-col gap-2">
                        ${p.tamanhos && p.tamanhos.length > 0 ? `
                            <span class="text-[10px] font-black uppercase tracking-widest text-slate-900">Tamanho</span>
                            <div class="flex flex-wrap gap-1.5" id="container-tamanhos">
                                ${p.tamanhos.map((t) => `
                                    <button onclick="selecionarTamanho('${t}', this)" class="btn-tamanho px-3 h-8 border border-slate-200 bg-white text-slate-600 rounded-full text-[11px] font-bold transition-all duration-200 flex items-center justify-center shadow-sm">${t}</button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>

                    <div class="flex flex-col gap-2">
                        ${p.cores && p.cores.length > 0 ? `
                            <span class="text-[10px] font-black uppercase tracking-widest text-slate-900">Cor</span>
                            <div class="flex flex-wrap gap-1.5" id="container-cores">
                                ${p.cores.map((c) => `
                                    <button onclick="selecionarCor('${c.nome}', this)" class="btn-cor relative w-fit px-3 h-8 rounded-full shadow-sm transition-all duration-200 border border-slate-200 bg-white text-slate-600 text-[11px] font-bold">${c.nome}</button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="flex flex-col mt-1">
                    <span class="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-1">Descrição</span>
                    ${p.desc.length > 90 ? `
                        <p class="text-[11px] font-medium leading-relaxed text-slate-500 line-clamp-2">${p.desc}</p>
                        <button onclick="abrirDescricaoModal()" class="text-[10px] font-bold text-slate-400 flex items-center justify-center gap-1 mt-1.5 mx-auto active:scale-95 transition-transform">
                            Ler mais <i class="fas fa-chevron-down text-[8px]"></i>
                        </button>
                    ` : `
                        <p class="text-[11px] font-medium leading-relaxed text-slate-500">${p.desc || 'Nenhuma descrição fornecida.'}</p>
                    `}
                </div>

                <div id="modal-desc" onclick="fecharDescricaoModal()" class="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 flex items-end">
                    <div id="modal-desc-content" onclick="event.stopPropagation()" class="bg-white w-full rounded-t-3xl pt-3 pb-6 px-6 transform translate-y-full transition-transform duration-300 ease-out max-h-[80vh] flex flex-col gap-4 relative">
                        <div class="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-1"></div>
                        <div class="flex justify-between items-center border-b border-slate-100 pb-3">
                            <h3 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Detalhes do Produto</h3>
                            <button onclick="fecharDescricaoModal()" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 active:scale-90 transition-transform">
                                <i class="fas fa-times text-sm"></i>
                            </button>
                        </div>
                        <div id="modal-scroll-area" class="text-[13px] font-medium leading-relaxed text-slate-600 pb-6 overflow-y-auto no-scrollbar">
                            ${p.desc.replace(/\\n/g, '<br>')}
                        </div>
                    </div>
                </div>

                <div class="flex gap-2.5 mt-1">
                    <button onclick="event.stopPropagation(); toggleFavorito('${p.id}', this)" class="w-12 h-12 flex-shrink-0 bg-white border border-slate-200 rounded-full flex items-center justify-center active:bg-slate-50 transition-colors shadow-sm ${isFav ? 'text-red-500' : 'text-slate-400'}">
                        <i class="${isFav ? 'fas' : 'far'} fa-heart text-base pointer-events-none"></i>
                    </button>
                    <button onclick="addCarrinho('${p.id}')" class="flex-1 h-12 bg-white border border-slate-200 text-slate-900 rounded-full font-black text-[11px] uppercase tracking-wide active:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <i class="fas fa-shopping-cart text-[10px]"></i> Adicionar
                    </button>
                    <button onclick="prepararCompraDireta('${p.id}')" class="flex-[1.2] h-12 bg-[#0F172A] text-white rounded-full font-black text-[11px] uppercase tracking-wide shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-transform flex items-center justify-center">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    `;
}

function viewCarrinho() {
    let html = `
        <style>
            .premium-saco-entry { animation: iosSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            @keyframes iosSlideUp {
                0% { transform: translateY(40px); opacity: 0; }
                99% { transform: translateY(0); opacity: 1; }
                100% { transform: none; opacity: 1; }
            }
        </style>
        <div class="px-5 py-6 pb-40 premium-saco-entry">
            <div class="relative flex items-center justify-center min-h-[40px] mb-8 w-full">
                <button onclick="navegarPara('home')" class="absolute left-0 w-10 h-10 flex items-center justify-start text-slate-900 active:scale-90 transition-transform z-10">
                    <i class="fas fa-arrow-left text-base"></i>
                </button>
                <h1 class="text-base font-black tracking-tight text-slate-900 text-center">Carrinho</h1>
            </div>
    `;

    if (carrinho.length === 0) {
        return html + `
            <div class="text-center py-20 flex flex-col items-center justify-center gap-4">
                <div class="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <i class="fas fa-shopping-cart text-xl"></i>
                </div>
                <div class="flex flex-col gap-1.5">
                    <p class="text-sm font-semibold text-slate-900">O teu carrinho está vazio</p>
                    <p class="text-[11px] font-medium text-slate-400 max-w-[200px] mx-auto leading-relaxed">Encontra produtos fantásticos e adiciona-os aqui.</p>
                </div>
                <button onclick="navegarPara('home')" class="mt-2 px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm active:scale-95 transition-all">
                    Explorar Coleção
                </button>
            </div>
        </div>`;
    }

    let total = 0;
    html += `<div class="space-y-4 mb-10">`;
    
    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;
        
        let variantesTexto = [];
        if (item.corSelecionada) variantesTexto.push(item.corSelecionada);
        if (item.tamanhoSelecionado) variantesTexto.push(`Tam: ${item.tamanhoSelecionado}`);
        let variantesHtml = variantesTexto.length > 0 
            ? `<p class="text-[10px] font-bold text-slate-400 mt-0.5">${variantesTexto.join(' • ')}</p>` 
            : '';

        html += `
            <div id="cart-item-container-${index}" class="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300 ease-out origin-top">
                <div class="absolute inset-y-0 right-0 w-[100px] flex items-center justify-center">
                    <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 shadow-sm active:scale-90 transition-transform cursor-pointer" onclick="removerItem(${index})">
                        <i class="fas fa-trash-alt text-sm"></i>
                    </div>
                </div>
                
                <div id="cart-item-front-${index}" 
                     class="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 relative z-10 w-full shadow-sm"
                     style="touch-action: pan-y;"
                     ontouchstart="cartTouchStart(event, ${index})" 
                     ontouchmove="cartTouchMove(event, ${index})" 
                     ontouchend="cartTouchEnd(event, ${index})">
                    
                    <div class="w-20 h-24 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                        <img src="${item.imagem}" class="w-full h-full object-cover">
                    </div>
                    
                    <div class="flex flex-col flex-1 py-1">
                        <h4 class="text-[12px] font-bold text-slate-800 line-clamp-2 leading-tight">${item.nome}</h4>
                        ${variantesHtml}
                        <p class="text-[14px] font-black text-slate-900 mt-2">${item.preco.toLocaleString('pt-MZ')} MT</p>
                        
                        <div class="flex items-center gap-3 mt-2.5 w-fit bg-slate-50 rounded-full border border-slate-100 px-1 py-1">
                            <button onclick="diminuirQtd(${index})" class="w-6 h-6 flex items-center justify-center rounded-full bg-white text-slate-900 shadow-sm text-xs font-bold active:scale-90 transition-transform">-</button>
                            <span id="qtd-${index}" class="text-[11px] font-black w-4 text-center">${item.quantidade}</span>
                            <button onclick="aumentarQtd(${index})" class="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-sm text-xs font-bold active:scale-90 transition-transform">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `</div> </div> 
        <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-5 z-[100] shadow-[0_-12px_24px_rgba(0,0,0,0.03)] animate-fade-in" style="animation-delay: 0.1s;">
            <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-bold text-slate-500">Total do carrinho</span>
                <span id="total-saco" class="text-lg font-black text-slate-900">${total.toLocaleString('pt-MZ')} MT</span>
            </div>
            <button onclick="navegarPara('entrega')" class="w-full h-14 bg-[#0F172A] text-white rounded-full font-black text-[13px] tracking-wide shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                Continuar para a entrega <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>`;

    return html;
}

function viewEntrega() {
    const salvoNome = localStorage.getItem('shopyump_cli_nome') || '';
    const salvoTel = localStorage.getItem('shopyump_cli_tel') || '';
    const salvoEnd = localStorage.getItem('shopyump_cli_end') || '';

    let total = produtoCompraDireta ? (produtoCompraDireta.preco * produtoCompraDireta.quantidade) : carrinho.reduce((acc, i) => acc + (i.preco * i.quantidade), 0);

    return `
        <div class="bg-white min-h-[100dvh] pb-40 animate-fade-in">
            <div class="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-slate-100 px-5 py-4 flex items-center justify-center">
                <button onclick="voltarDeEntrega()" class="absolute left-5 w-10 h-10 flex items-center justify-start text-slate-900 active:scale-90 transition-transform">
                    <i class="fas fa-arrow-left text-base"></i>
                </button>
                <h1 class="text-base font-black tracking-tight text-slate-900">Checkout</h1>
            </div>

            <div class="px-5 pt-8 space-y-7">
                <div>
                    <h2 class="text-xl font-black text-slate-900 tracking-tight">Detalhes de Envio</h2>
                    <p class="text-[12px] font-medium text-slate-500 mt-1">Preenche os teus dados para receberes a encomenda.</p>
                </div>

                <div class="space-y-5">
                    <div class="relative">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block pl-1">Nome <span class="text-red-400">*</span></label>
                        <div class="relative flex items-center">
                            <div class="absolute left-4 text-slate-400"><i class="far fa-user text-[14px]"></i></div>
                            <input type="text" id="cli-nome" value="${salvoNome}" oninput="validarFormulario()" placeholder="O teu nome" class="w-full bg-slate-50 border border-transparent rounded-2xl pl-11 pr-4 py-4 text-[13px] font-semibold text-slate-900 outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all shadow-sm">
                        </div>
                    </div>
                    
                    <div class="relative">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block pl-1">Tefone / WhatsApp <span class="text-red-400">*</span></label>
                        <div class="relative flex items-center">
                            <div class="absolute left-4 text-slate-400"><i class="fas fa-phone-alt text-[13px]"></i></div>
                            <input type="tel" id="cli-tel" value="${salvoTel}" oninput="validarFormulario()" placeholder="Ex: 84XXXXXXX" class="w-full bg-slate-50 border border-transparent rounded-2xl pl-11 pr-4 py-4 text-[13px] font-semibold text-slate-900 outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all shadow-sm">
                        </div>
                    </div>
                    
                    <div class="relative">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block pl-1">Endereço de Entrega <span class="text-slate-300 font-medium">(Opcional)</span></label>
                        <div class="relative flex items-center">
                            <div class="absolute left-4 text-slate-400"><i class="far fa-map text-[14px]"></i></div>
                            <input type="text" id="cli-end" value="${salvoEnd}" placeholder="Bairro, Rua, Casa..." class="w-full bg-slate-50 border border-transparent rounded-2xl pl-11 pr-4 py-4 text-[13px] font-semibold text-slate-900 outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all shadow-sm">
                        </div>
                    </div>
                </div>
            </div>

            <div id="checkout-footer" class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-5 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.08)] transition-opacity duration-200">
                <p class="text-[11px] font-medium text-slate-500 text-center mb-3">O teu pedido será finalizado de forma rápida e segura através do WhatsApp.</p>
                
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resumo</span>
                        <span class="text-[11px] font-bold text-slate-900 line-clamp-1 max-w-[60%] text-right">${produtoCompraDireta ? produtoCompraDireta.nome : 'Carrinho de Compras'}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-bold text-slate-500">Total do pedido</span>
                        <span class="text-lg font-black text-slate-900">${total.toLocaleString('pt-MZ')} MT</span>
                    </div>
                </div>
                
                <button id="btn-checkout" onclick="checkoutProgresso()" class="w-full h-14 bg-[#25D366] text-white rounded-full font-black text-[14px] tracking-wide shadow-lg shadow-[#25D366]/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 ${(salvoNome && salvoTel) ? 'opacity-100' : 'opacity-50'}">
                    <i class="fab fa-whatsapp text-[18px]"></i> Finalizar Pedido
                </button>
            </div>
        </div>
    `;
}

function validarFormulario() {
    const nome = document.getElementById('cli-nome').value.trim();
    const tel = document.getElementById('cli-tel').value.trim();
    const btn = document.getElementById('btn-checkout');
    if (btn) {
        if (nome.length > 2 && tel.length > 7) {
            btn.classList.remove('opacity-50', 'scale-[0.98]');
            btn.classList.add('opacity-100');
        } else {
            btn.classList.add('opacity-50');
            btn.classList.remove('opacity-100');
        }
    }
}

async function checkoutProgresso() {
    const nome = document.getElementById('cli-nome').value.trim();
    const tel = document.getElementById('cli-tel').value.trim();
    const end = document.getElementById('cli-end').value.trim();

    if (!nome || !tel) {
        if (!nome) destacarErro('cli-nome');
        if (!tel) destacarErro('cli-tel');
        return mostrarErroPremium("Dados Incompletos", "Por favor, preenche o teu nome e telefone.");
    }

    // --- VERIFICAÇÃO DE SEGURANÇA E SESSÃO ---
    if (!lojaAtual || !lojaAtual.id) {
        const pathSegments = window.location.pathname.split('/');
        const slugIndex = pathSegments.indexOf('loja');
        const slug = slugIndex !== -1 ? pathSegments[slugIndex + 1] : null;
        
        if (slug) {
            const { data: loja } = await window.supabaseClient.from('lojas').select('*').eq('slug', slug).single();
            if (loja) { lojaAtual = loja; }
        }
    }

    if (!lojaAtual || !lojaAtual.id) {
        return mostrarErroPremium("Erro de Sessão", "A loja não carregou corretamente. Atualiza a página e tenta novamente.");
    }
    // ------------------------------------

    const btn = document.getElementById('btn-checkout');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin text-[18px]"></i> A processar...';
        btn.classList.add('pointer-events-none', 'opacity-80');
    }

    let itensPedido = produtoCompraDireta ? [produtoCompraDireta] : [...carrinho];
    let total = itensPedido.reduce((acc, i) => acc + (i.preco * i.quantidade), 0);

    const novoPedido = {
        loja_id: lojaAtual.id,
        cliente_nome: nome,
        cliente_telefone: tel,
        cliente_endereco: end,
        itens: itensPedido,
        total: total,
        status: 'pendente'
    };

    try {
        const { error } = await window.supabaseClient.from('pedidos').insert([novoPedido]);
        if (error) throw error;

        // Limpeza de Carrinho
        if (produtoCompraDireta) produtoCompraDireta = null;
        else { carrinho = []; localStorage.removeItem('shopyump_spa'); }

        // ==========================================
        // CONFIGURAÇÃO DA MENSAGEM DO WHATSAPP (PROFISSIONAL)
        // ==========================================
        let urlLoja = window.location.origin + window.location.pathname;

        // Organizar itens com os bullets e espaçamento
        let itensFormatados = itensPedido.map((i) => {
            let detalhes = [];
            if (i.corSelecionada) detalhes.push(`Cor: ${i.corSelecionada}`);
            if (i.tamanhoSelecionado) detalhes.push(`Tam: ${i.tamanhoSelecionado}`);
            let detStr = detalhes.length > 0 ? ` (${detalhes.join(', ')})` : '';
            
            return `• ${i.quantidade}x ${i.nome}${detStr} — ${(i.preco * i.quantidade).toLocaleString('pt-MZ')} MT`;
        }).join('\n');

        let primeiroNomeCliente = nome.trim().split(' ')[0];

        // Construir a mensagem com o formato exato com mais espaçamento
        let msg = `Olá!\nGostaria de finalizar a minha encomenda na loja ${lojaAtual.nome}.\n\n`;
        msg += `📦 Pedido\n`;
        msg += `${itensFormatados}\n\n`;
        msg += `💰 Total: ${total.toLocaleString('pt-MZ')} MT\n\n`;
        msg += `👤 Entrega\n`;
        msg += `• Nome: ${primeiroNomeCliente}\n`;
        msg += `• Contacto: ${tel}\n`;
        if (end) msg += `• Endereço: ${end}\n`;
        msg += `\n🔗 Link da loja: ${urlLoja}\n\n`;
        msg += `Obrigado!`;

        window.open(`https://wa.me/${numeroLojista}?text=${encodeURIComponent(msg)}`, '_blank');
        navegarPara('home');

    } catch (e) {
        console.error("Erro fatal:", e);
        mostrarErroPremium("Erro no Servidor", "Houve um problema ao registar o pedido.");
        
        // Em caso de erro, devolve o estado original do botão
        if (btn) {
            btn.innerHTML = '<i class="fab fa-whatsapp text-[18px]"></i> Finalizar Pedido';
            btn.classList.remove('pointer-events-none', 'opacity-80');
        }
    }
}


let produtoCompraDireta = null; 

function selecionarCor(cor, btn) {
    selecaoVariantes.cor = cor;
    const botoes = document.getElementsByClassName('btn-cor');
    for(let b of botoes) { b.classList.remove('border-slate-900', 'border-2'); b.classList.add('border-slate-200', 'border'); }
    btn.classList.add('border-slate-900', 'border-2');
    btn.classList.remove('border-slate-200', 'border');
}

function selecionarTamanho(tamanho, btn) {
    selecaoVariantes.tamanho = tamanho;
    const botoes = document.getElementsByClassName('btn-tamanho');
    for(let b of botoes) { b.className = "btn-tamanho px-3 h-8 border border-slate-200 bg-white text-slate-600 rounded-full text-[11px] font-bold transition-all duration-200 flex items-center justify-center shadow-sm"; }
    btn.className = "btn-tamanho px-3 h-8 border-2 border-slate-900 bg-slate-900 text-white rounded-full text-[11px] font-bold transition-all duration-200 flex items-center justify-center shadow-md scale-105";
}

function destacarErro(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.classList.add('ring-2', 'ring-red-400', 'ring-offset-4', 'rounded-lg', 'transition-all', 'duration-300');
        setTimeout(() => el.classList.remove('ring-2', 'ring-red-400', 'ring-offset-4', 'rounded-lg'), 1500);
    }
}

function mostrarErroPremium(titulo, msg) {
    let oldToast = document.getElementById('toast-erro');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-erro';
    toast.className = "fixed top-20 left-5 right-5 bg-white/95 backdrop-blur-xl border border-orange-100 shadow-2xl rounded-2xl p-3 flex items-center gap-3 z-[100] transform -translate-y-[150%] opacity-0 transition-all duration-500 ease-out";    
    toast.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-500"><i class="fas fa-exclamation text-sm"></i></div>
        <div class="flex-1">
            <p class="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-0.5">${titulo}</p>
            <p class="text-[11px] font-bold text-slate-900 leading-tight">${msg}</p>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => { toast.classList.remove('-translate-y-[150%]', 'opacity-0'); toast.classList.add('translate-y-0', 'opacity-100'); }, 10);
    setTimeout(() => { toast.classList.remove('translate-y-0', 'opacity-100'); toast.classList.add('-translate-y-[150%]', 'opacity-0'); setTimeout(() => toast.remove(), 500); }, 2500);
}

function prepararCompraDireta(id) {
    const p = produtos.find(x => x.id === id);
    if (p.cores && p.cores.length > 0 && !selecaoVariantes.cor) return mostrarErroPremium("Cor em Falta", "Seleciona a tua cor preferida para avançar.");
    if (p.tamanhos && p.tamanhos.length > 0 && !selecaoVariantes.tamanho) return mostrarErroPremium("Tamanho em Falta", "Seleciona o tamanho pretendido para avançar.");

    produtoCompraDireta = { ...p, quantidade: 1, corSelecionada: selecaoVariantes.cor, tamanhoSelecionado: selecaoVariantes.tamanho };
    navegarPara('entrega');
}

function voltarDeEntrega() {
    if (produtoCompraDireta) {
        const idProduto = produtoCompraDireta.id;
        produtoCompraDireta = null; 
        navegarPara('produto', idProduto);
    } else { navegarPara('carrinho'); }
}

function addCarrinho(id) {
    const p = produtos.find(x => x.id === id);
    if (p.cores && p.cores.length > 0 && !selecaoVariantes.cor) return mostrarErroPremium("Cor em Falta", "Seleciona a tua cor preferida para adicionar.");
    if (p.tamanhos && p.tamanhos.length > 0 && !selecaoVariantes.tamanho) return mostrarErroPremium("Tamanho em Falta", "Seleciona o tamanho pretendido para adicionar.");

    let item = carrinho.find(x => x.id === id && x.corSelecionada === selecaoVariantes.cor && x.tamanhoSelecionado === selecaoVariantes.tamanho);
    if (item) { item.quantidade++; } else { carrinho.push({ ...p, quantidade: 1, corSelecionada: selecaoVariantes.cor, tamanhoSelecionado: selecaoVariantes.tamanho }); }
    
    localStorage.setItem('shopyump_spa', JSON.stringify(carrinho));
    atualizarBadge();
    mostrarToastPremium(p);
}

function mostrarToastPremium(p) {
    let oldToast = document.getElementById('toast-premium');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-premium';
    toast.className = "fixed top-20 left-5 right-5 bg-white/90 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-2xl p-3 flex items-center gap-3 z-[100] transform -translate-y-[150%] opacity-0 transition-all duration-500 ease-out cursor-pointer active:scale-95";    
    toast.onclick = () => navegarPara('carrinho');
    toast.innerHTML = `
        <img src="${p.imagem}" class="w-10 h-10 rounded-lg object-cover bg-slate-50">
        <div class="flex-1">
            <p class="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-0.5">Adicionado ao carrinho</p>
            <p class="text-[11px] font-medium text-slate-600 line-clamp-1">${p.nome}</p>
        </div>
        <div class="text-slate-300 pl-1 pr-1 flex items-center justify-center"><i class="fas fa-chevron-right text-[10px]"></i></div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => { toast.classList.remove('-translate-y-[150%]', 'opacity-0'); toast.classList.add('translate-y-0', 'opacity-100'); }, 10);
    setTimeout(() => { toast.classList.remove('translate-y-0', 'opacity-100'); toast.classList.add('-translate-y-[150%]', 'opacity-0'); setTimeout(() => toast.remove(), 500); }, 2500);
}

function atualizarTotalSaco() {
    let total = carrinho.reduce((acc, i) => acc + (i.preco * i.quantidade), 0);
    let elTotal = document.getElementById('total-saco');
    if (elTotal) elTotal.innerText = total.toLocaleString('pt-MZ') + ' MT';
}

function aumentarQtd(index) {
    carrinho[index].quantidade++;
    localStorage.setItem('shopyump_spa', JSON.stringify(carrinho));
    const elQtd = document.getElementById(`qtd-${index}`);
    if(elQtd) elQtd.innerText = carrinho[index].quantidade;
    atualizarTotalSaco(); atualizarBadge();
}

function diminuirQtd(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
        localStorage.setItem('shopyump_spa', JSON.stringify(carrinho));
        const elQtd = document.getElementById(`qtd-${index}`);
        if(elQtd) elQtd.innerText = carrinho[index].quantidade;
        atualizarTotalSaco(); atualizarBadge();
    } else { removerItem(index); }
}

function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('shopyump_spa', JSON.stringify(carrinho));
    const cartao = document.getElementById(`cart-item-container-${index}`);
    if (cartao) {
        cartao.style.opacity = '0';
        cartao.style.transform = 'scale(0.9)';
        setTimeout(() => { cartao.style.height = '0px'; cartao.style.margin = '0px'; cartao.style.padding = '0px'; cartao.style.border = 'none'; }, 150); 
    }
    atualizarTotalSaco(); atualizarBadge();
    if (carrinho.length === 0) setTimeout(() => navegarPara('carrinho'), 350);
}

function atualizarBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const total = carrinho.reduce((acc, i) => acc + i.quantidade, 0);
    if (total > 0) {
        badge.innerText = total; badge.style.display = 'flex'; badge.classList.add('scale-150');
        setTimeout(() => badge.classList.remove('scale-150'), 200);
    } else { badge.style.display = 'none'; }
}

function toggleFavorito(id, btn) {
    let favoritos = JSON.parse(localStorage.getItem('shopyump_favs')) || [];
    const index = favoritos.indexOf(id);
    if (index > -1) { favoritos.splice(index, 1); btn.querySelector('i').className = 'far fa-heart text-[11px] text-slate-400'; } 
    else { favoritos.push(id); btn.querySelector('i').className = 'fas fa-heart text-[11px] text-red-500'; }
    localStorage.setItem('shopyump_favs', JSON.stringify(favoritos));
}

function viewFavoritos() {
    let favoritosStorage = [];
    try {
        // Tenta ler com segurança para evitar que erros deixem a página em branco
        favoritosStorage = JSON.parse(localStorage.getItem('shopyump_favs')) || [];
    } catch (e) {
        favoritosStorage = [];
    }
    
    // Cruza os IDs guardados com os produtos que REALMENTE existem na loja no momento
    let produtosFavoritos = produtos.filter(p => favoritosStorage.includes(p.id));

    let html = `
        <div class="px-5 py-6 pb-24 animate-fade-in">
            <div class="relative flex items-center justify-center min-h-[40px] mb-8 w-full">
                <h1 class="text-base font-black tracking-tight text-slate-900 text-center">Favoritos</h1>
            </div>
    `;

    // Agora usa a lista filtrada para conferir se está vazio!
    if (produtosFavoritos.length === 0) {
        return html + `
            <div class="text-center py-20 flex flex-col items-center justify-center gap-4">
                <div class="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300"><i class="far fa-heart text-xl"></i></div>
                <div class="flex flex-col gap-1.5">
                    <p class="text-sm font-semibold text-slate-900">A tua lista de favoritos está vazia</p>
                    <p class="text-[11px] font-medium text-slate-400 max-w-[200px] mx-auto leading-relaxed">Guarda os teus produtos preferidos para os veres aqui mais tarde.</p>
                </div>
                <button onclick="navegarPara('home')" class="mt-2 px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm active:scale-95 transition-all">
                    EXPLORAR PRODUTOS
                </button>
            </div>
        </div>`;
    }

    html += `<div class="grid grid-cols-2 gap-x-3 gap-y-6">`;
    produtosFavoritos.forEach(p => {
        html += `
            <div onclick="navegarPara('produto', '${p.id}')" class="cursor-pointer group flex flex-col">
                <div class="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-2.5 border border-slate-100 relative">
                    <button class="absolute top-2.5 right-2.5 z-10 w-7 h-7 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 active:scale-90 transition-transform shadow-sm" 
                            onclick="event.stopPropagation(); toggleFavorito('${p.id}', this); navegarPara('favoritos');">
                        <i class="fas fa-heart text-[11px]"></i>
                    </button>
                    <img src="${p.imagem}" class="w-full h-full object-cover transition-transform duration-500 group-active:scale-95">
                </div>
                <div class="px-1 flex flex-col gap-1 mt-1">
                    <h3 class="text-[14px] font-extrabold text-black line-clamp-2 leading-tight min-h-[40px] break-words pr-1">${p.nome}</h3>
                    <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        ${p.precoOriginal && p.preco < p.precoOriginal ? `<span class="text-[10.5px] text-slate-400 font-semibold line-through">${p.precoOriginal.toLocaleString('pt-MZ')} MT</span>` : ''}
                        <p class="text-[16px] font-black text-black tracking-tight">${p.preco.toLocaleString('pt-MZ')} <span class="text-[11px] font-extrabold text-black ml-0.5">MT</span></p>
                    </div>
                </div>
            </div>
        `;
    });
    html += `</div></div>`;
    return html;
}

function abrirPesquisa() { document.getElementById('painel-pesquisa').classList.remove('translate-y-full'); document.getElementById('input-pesquisa').focus(); }
function fecharPesquisa() { document.getElementById('painel-pesquisa').classList.add('translate-y-full'); }

function pesquisarProdutos(termo) {
    const resultadosContainer = document.getElementById('resultados-pesquisa');
    const termoFormatado = termo.toLowerCase().trim();
    if (termoFormatado === "") { resultadosContainer.innerHTML = ""; return; }

    const resultados = produtos.filter(p => p.nome.toLowerCase().includes(termoFormatado) || p.desc.toLowerCase().includes(termoFormatado));
    if (resultados.length === 0) { resultadosContainer.innerHTML = `<p class="col-span-2 text-center text-slate-400 font-semibold mt-10">Nenhum produto encontrado...</p>`; return; }

    let html = "";
    resultados.forEach(p => {
        html += `
            <div onclick="fecharPesquisa(); navegarPara('produto', '${p.id}')" class="cursor-pointer group flex flex-col">
                <div class="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-2 border border-slate-100">
                    <img src="${p.imagem}" class="w-full h-full object-cover">
                </div>
                <div class="px-1 mt-1">
                    <h3 class="text-[14px] font-extrabold text-black line-clamp-2 leading-tight min-h-[40px] break-words pr-1">${p.nome}</h3>
                    <p class="text-[15px] font-black text-black tracking-tight mt-1">${p.preco.toLocaleString('pt-MZ')} <span class="text-[11px] font-extrabold text-black ml-0.5">MT</span></p>
                </div>
            </div>
        `;
    });
    resultadosContainer.innerHTML = html;
}

function atualizarMenuInferior(rota) {
    const btnHome = document.getElementById("menu-btn-home");
    const btnFavs = document.getElementById("menu-btn-favoritos");
    const btnCart = document.getElementById("menu-btn-carrinho");
    if (!btnHome || !btnFavs || !btnCart) return;
    const iconeCoracao = btnFavs.querySelector("i");

    [btnHome, btnFavs, btnCart].forEach(btn => { btn.style.color = "#94a3b8"; });
    if (iconeCoracao) iconeCoracao.className = "far fa-heart text-xl"; 

    let btnAtivo = null;
    if (rota === 'home' || rota === 'home_filtro') btnAtivo = btnHome;
    else if (rota === 'favoritos') btnAtivo = btnFavs;
    else if (rota === 'carrinho') btnAtivo = btnCart;

    if (btnAtivo) {
        btnAtivo.style.color = "#0f172a"; 
        if (btnAtivo === btnFavs && iconeCoracao) iconeCoracao.className = "fas fa-heart text-xl"; 
    }
}

function atualizarDotsProduto(container) {
    const indexAtivo = Math.round(container.scrollLeft / container.clientWidth);
    const docs = document.getElementById('produto-dots');
    if (!docs) return;
    const dots = docs.children;
    for (let i = 0; i < dots.length; i++) {
        if (i === indexAtivo) dots[i].className = "transition-all duration-300 rounded-full shadow-md bg-slate-900 border-[1px] border-white w-2 h-2 scale-110"; 
        else dots[i].className = "transition-all duration-300 rounded-full shadow-sm bg-white/90 border-[0.5px] border-black/10 w-2 h-2"; 
    }
}

function abrirDescricaoModal() {
    const modal = document.getElementById('modal-desc');
    const content = document.getElementById('modal-desc-content');
    const scrollArea = document.getElementById('modal-scroll-area');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => content.classList.remove('translate-y-full'), 10);

    let startY = 0; let currentY = 0;
    content.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
    content.addEventListener('touchmove', (e) => {
        if (scrollArea.scrollTop <= 0) {
            currentY = e.touches[0].clientY - startY;
            if (currentY > 0) { content.style.transform = `translateY(${currentY}px)`; content.style.transition = 'none'; }
        }
    }, { passive: true });
    content.addEventListener('touchend', () => {
        content.style.transition = '';
        if (currentY > 100) fecharDescricaoModal();
        else content.style.transform = ''; 
        currentY = 0;
    });
}

function fecharDescricaoModal() {
    const modal = document.getElementById('modal-desc');
    const content = document.getElementById('modal-desc-content');
    content.style.transform = ''; 
    content.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('opacity-0', 'pointer-events-none'), 300);
}

let swipeStartX = 0; let swipeCurrentX = 0; let swipingIndex = null;
function cartTouchStart(e, index) {
    swipeStartX = e.touches[0].clientX; swipeCurrentX = swipeStartX; swipingIndex = index;
    const el = document.getElementById(`cart-item-front-${index}`);
    if (el) el.style.transition = 'none'; 
}
function cartTouchMove(e, index) {
    if (swipingIndex !== index) return;
    swipeCurrentX = e.touches[0].clientX; let diff = swipeCurrentX - swipeStartX;
    if (diff < 0) document.getElementById(`cart-item-front-${index}`).style.transform = `translateX(${diff}px)`;
}
function cartTouchEnd(e, index) {
    if (swipingIndex !== index) return;
    let diff = swipeCurrentX - swipeStartX;
    const el = document.getElementById(`cart-item-front-${index}`);
    el.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    if (diff < -120) {
        el.style.transform = `translateX(-100vw)`;
        setTimeout(() => removerItem(index), 250); 
    } else if (diff < -40) { el.style.transform = `translateX(-80px)`; } 
    else { el.style.transform = `translateX(0px)`; }
    swipingIndex = null;
}

// Inicializar a aplicação quando as bibliotecas carregam
document.addEventListener('DOMContentLoaded', () => {
    inicializarLoja();
});

// Função para Partilhar Produto (nativo no telemóvel ou copia o link no PC)
function partilharProduto(id, nome) {
    const url = window.location.origin + window.location.pathname + '?produto=' + id;
    if (navigator.share) {
        navigator.share({
            title: nome,
            text: 'Olha o que encontrei na loja!',
            url: url,
        }).catch(err => console.log('Partilha cancelada', err));
    } else {
        // Se o telemovel não tiver share nativo, copia ao menos para a área de transferência
        navigator.clipboard.writeText(url);
        mostrarErroPremium("Link copiado!", "Podes agora colar e enviar aos teus amigos."); // usamos a tua funcao de erro como popup
    }
}

// Função Avançada do Coração (Atualiza Ícone + Texto do Botão Grande)
function toggleFavoritoProduto(id, btn) {
    let favoritos = JSON.parse(localStorage.getItem('shopyump_favs')) || [];
    const index = favoritos.indexOf(id);
    const icone = btn.querySelector('i');
    const texto = btn.querySelector('span');
    
    if (index > -1) { 
        // Remove dos favoritos
        favoritos.splice(index, 1); 
        icone.className = 'far fa-heart text-[13px] pointer-events-none'; 
        btn.classList.replace('text-red-500', 'text-slate-500');
        btn.classList.remove('border-red-100');
        if(texto) texto.innerText = 'Guardar';
    } else { 
        // Adiciona aos favoritos
        favoritos.push(id); 
        icone.className = 'fas fa-heart text-[13px] pointer-events-none'; 
        btn.classList.replace('text-slate-500', 'text-red-500');
        btn.classList.add('border-red-100');
        if(texto) texto.innerText = 'Guardado';
    }
    localStorage.setItem('shopyump_favs', JSON.stringify(favoritos));
}
