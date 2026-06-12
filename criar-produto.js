document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-criar-produto">
        <div class="bg-[#F8FAFC] dark:bg-[#0b0f1a] min-h-screen">
            <main class="max-w-2xl mx-auto px-4 pt-20 pb-4 space-y-5">
                
                <!-- FOTOGRAFIAS -->
                <section class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <h2 class="text-[13px] font-black text-slate-900 dark:text-white">Fotografias</h2>
                            <p class="text-[11px] text-slate-500 font-medium mt-0.5">A primeira Imagem será a capa.</p>
                        </div>
                        <span class="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
                            <span id="contador-fotos" class="text-[#0F172A] dark:text-white">0</span>/5
                        </span>
                    </div>
                    <input type="file" id="galeria-input" accept="image/*" class="hidden" multiple>
                    <div id="media-gallery" class="grid grid-cols-4 gap-2 relative">
                        <button id="btn-add-slot" onclick="document.getElementById('galeria-input').click()" class="aspect-square rounded-xl border-2 border-dashed border-[#CBD5E0] bg-slate-50 dark:bg-slate-700 flex flex-col items-center justify-center text-[#4A5568] dark:text-slate-300 active:bg-slate-100 transition-all no-sort">
                            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            <span class="text-[10px] font-bold tracking-wider">Adicionar</span>
                        </button>
                    </div>
                    <p id="texto-instrucao-galeria" class="hidden text-[10px] text-center text-slate-400 font-semibold mt-3 transition-opacity duration-300">
                        Toque para editar ou arraste para reordenar
                    </p>
                </section>

                <!-- INFORMAÇÃO BÁSICA -->
                <section class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
                    <h2 class="text-[13px] font-black text-slate-900 dark:text-white">Informação Básica</h2>
                    <div>
                        <label class="block text-[11px] font-semibold text-[#4A5568] dark:text-slate-400 mb-1.5 ml-1">Nome do produto</label>
                        <input type="text" id="prod-nome" placeholder="Ex: T-shirt oversized" class="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl h-14 px-5 text-[13px] font-semibold text-slate-900 dark:text-white outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-slate-50 transition-all shadow-sm placeholder:font-medium placeholder:text-slate-400">
                    </div>
                    <div>
                        <button type="button" onclick="abrirGavetaCategorias()" class="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl p-3.5 flex items-center justify-between group active:scale-[0.98] transition-all shadow-sm hover:border-slate-300">
                            <div class="flex items-center gap-3.5">
                                <div id="boxIconeCategoria" class="w-10 h-10 bg-slate-50 dark:bg-slate-600 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-400 shadow-sm transition-all duration-300">
                                    <i id="iconeCategoria" class="fas fa-tag"></i>
                                </div>
                                <div class="text-left">
                                    <p id="textoCategoria" class="text-[12px] font-bold text-slate-900 dark:text-white line-clamp-1">Escolher categoria...</p>
                                </div>
                            </div>
                            <div class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-600 flex items-center justify-center text-slate-400 group-active:translate-x-1 transition-transform">
                                <i class="fas fa-chevron-right text-[11px]"></i>
                            </div>
                        </button>
                        <input type="hidden" id="prod-categoria" value="">
                    </div>
                </section>

                <!-- PREÇO -->
                <section class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
                    <div class="flex items-center justify-between mb-1">
                        <h2 class="text-[13px] font-black text-slate-900 dark:text-white">Preço</h2>
                        <label for="check-promo" class="flex items-center gap-2 cursor-pointer select-none py-1">
                            <span class="text-[11px] font-semibold text-[#4A5568] dark:text-slate-400">Promoção</span>
                            <div class="relative inline-flex items-center">
                                <input type="checkbox" id="check-promo" class="sr-only peer"/>
                                <div class="w-8 h-4 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0F172A] shadow-inner"></div>
                            </div>
                        </label>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="space-y-1.5">
                            <span class="text-[11px] font-semibold text-[#4A5568] dark:text-slate-400 ml-1">Preço normal</span>
                            <div class="relative flex items-center">
                                <span class="absolute right-4 text-slate-400 font-black text-[10px] tracking-tighter">MZN</span>
                                <input type="number" id="prod-preco" placeholder="0.00" class="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl h-11 pl-5 pr-14 text-sm font-semibold text-[#0F172A] dark:text-white outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-slate-50 transition-all shadow-sm">
                            </div>
                        </div>
                        <div id="campo-promo" class="space-y-1.5 opacity-30 pointer-events-none transition-all duration-300">
                            <span class="text-[11px] font-semibold text-[#4A5568] dark:text-slate-400 ml-1">Preço promo</span>
                            <div class="relative flex items-center">
                                <span class="absolute right-4 text-slate-400 font-black text-[10px] tracking-tighter">MZN</span>
                                <input type="number" placeholder="0.00" class="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl h-11 pl-5 pr-14 text-sm font-semibold text-[#0F172A] dark:text-white outline-none focus:border-[#0F172A] shadow-sm">
                            </div>
                            <button type="button" id="btn-agendar" onclick="toggleDatasPromo()" class="text-[10px] font-bold text-slate-400 mt-2 ml-1 flex items-center gap-1">
                                <i class="far fa-calendar-alt"></i> <span>Agendar período</span>
                            </button>
                        </div>
                        <div id="area-datas-promo" class="hidden col-span-2 grid grid-cols-2 gap-4 pt-3 border-t border-slate-50 mt-3 animate-fade-in">
                            <div>
                                <label class="block text-[10px] font-semibold text-[#4A5568] mb-1 ml-1">Início</label>
                                <input type="date" class="w-full bg-white border border-slate-200 rounded-xl h-10 px-3 text-[11px] font-bold text-slate-700 outline-none">
                            </div>
                            <div>
                                <label class="block text-[10px] font-semibold text-[#4A5568] mb-1 ml-1">Término</label>
                                <input type="date" class="w-full bg-white border border-slate-200 rounded-xl h-10 px-3 text-[11px] font-bold text-slate-700 outline-none">
                            </div>
                        </div>
                    </div>
                </section>

                <!-- DESCRIÇÃO -->
                <section class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h2 class="text-[12px] font-black text-slate-900 dark:text-white mb-3">Descrição detalhada</h2>
                    <textarea id="prod-desc" placeholder="Escreve aqui os detalhes do produto, material, cuidados..." class="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl p-5 text-[13px] font-semibold text-slate-900 dark:text-white outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-slate-50 transition-all min-h-[100px] resize-none shadow-sm placeholder:font-medium placeholder:text-slate-400"></textarea>
                </section>

                <!-- INVENTÁRIO E VARIANTES -->
                <section class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[#0F172A] dark:text-white">
                            <i class="fas fa-boxes-stacked text-sm"></i>
                        </div>
                        <h2 class="text-[13px] font-black text-slate-900 dark:text-white">Inventário e variantes</h2>
                    </div>
                    <div class="flex items-center justify-between py-3 border-t border-slate-50 dark:border-slate-700">
                        <div>
                            <p class="text-[12px] font-bold text-slate-900 dark:text-white">Controlar Stock</p>
                            <p class="text-[11px] text-slate-500 font-medium tracking-tight">Gerir quantidades disponíveis</p>
                        </div>
                        <label for="toggle-stock" class="relative inline-flex items-center cursor-pointer select-none">
                            <input type="checkbox" id="toggle-stock" onchange="toggleStock()" class="sr-only peer"/>
                            <div class="w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F172A] shadow-inner"></div>
                        </label>
                    </div>
                    <div id="area-quantidade" class="hidden animate-pop">
                        <label class="block text-[11px] font-semibold text-[#4A5568] mb-1.5 ml-1">Quantidade total</label>
                        <input type="number" id="prod-stock-qtd" placeholder="0" class="w-full h-11 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-2xl px-4 text-sm font-bold border border-slate-200 dark:border-slate-600 outline-none focus:border-[#0F172A] transition-all shadow-inner">
                    </div>
                    <div id="wrapper-variantes" class="space-y-5">
                        <div id="sec-cores" class="variant-section pt-3 border-t border-slate-100 dark:border-slate-700">
                            <label class="block text-[11px] font-semibold text-[#4A5568] dark:text-slate-400 mb-2 ml-1">Cores disponíveis</label>
                            <div class="flex gap-2 w-full">
                                <div class="flex-1 flex overflow-x-auto gap-2 items-center no-scrollbar" id="container-cores">
                                    <button type="button" class="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">Preto</button>
                                    <button type="button" class="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">Branco</button>
                                    <button type="button" class="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">Azul</button>
                                </div>
                                <div class="shrink-0 w-[140px] relative flex items-center sticky-input-container">
                                    <input type="text" placeholder="+ Cor" oninput="validarInput(this, 'letras', 'btn-cor')"
                                           class="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 text-xs font-bold text-slate-900 outline-none focus:border-[#0F172A] placeholder-slate-400">
                                    <button id="btn-cor" type="button" onclick="salvarPeloBotao(this, 'container-cores')"
                                            class="btn-add-hidden absolute right-1 top-1 h-9 w-9 bg-[#0F172A] text-white rounded-lg flex items-center justify-center shadow-sm z-20">
                                        <i class="fas fa-plus text-[10px]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="sec-tamanhos" class="variant-section pt-3 border-t border-slate-100 dark:border-slate-700">
                            <label class="block text-[11px] font-semibold text-[#4A5568] dark:text-slate-400 mb-2 ml-1">Tamanhos</label>
                            <div class="flex gap-2 w-full">
                                <div class="flex-1 flex overflow-x-auto gap-2 items-center no-scrollbar" id="container-tamanhos">
                                    <button type="button" class="h-11 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">S</button>
                                    <button type="button" class="h-11 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">M</button>
                                    <button type="button" class="h-11 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">L</button>
                                    <button type="button" class="h-11 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">XL</button>
                                </div>
                                <div class="shrink-0 w-[140px] relative flex items-center sticky-input-container">
                                    <input type="text" placeholder="+ Tam" oninput="validarInput(this, 'letras', 'btn-tam')"
                                           class="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 text-xs font-bold text-slate-900 outline-none focus:border-[#0F172A] placeholder-slate-400">
                                    <button id="btn-tam" type="button" onclick="salvarPeloBotao(this, 'container-tamanhos')"
                                            class="btn-add-hidden absolute right-1 top-1 h-9 w-9 bg-[#0F172A] text-white rounded-lg flex items-center justify-center shadow-sm z-20">
                                        <i class="fas fa-plus text-[10px]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="sec-numeros" class="variant-section pt-3 border-t border-slate-100 dark:border-slate-700">
                            <label class="block text-[11px] font-semibold text-[#4A5568] dark:text-slate-400 mb-2 ml-1">Numeração</label>
                            <div class="flex gap-2 w-full">
                                <div class="flex-1 flex overflow-x-auto gap-2 items-center no-scrollbar" id="container-numeracao">
                                    <button type="button" class="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">39</button>
                                    <button type="button" class="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">40</button>
                                    <button type="button" class="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">41</button>
                                    <button type="button" class="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">42</button>
                                    <button type="button" class="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0" onclick="toggleOption(this)">43</button>
                                </div>
                                <div class="shrink-0 w-[140px] relative flex items-center sticky-input-container">
                                    <input type="tel" placeholder="+ Num" oninput="validarInput(this, 'numeros', 'btn-num')"
                                           class="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 text-xs font-bold text-slate-900 outline-none focus:border-[#0F172A] placeholder-slate-400">
                                    <button id="btn-num" type="button" onclick="salvarPeloBotao(this, 'container-numeracao')"
                                            class="btn-add-hidden absolute right-1 top-1 h-9 w-9 bg-[#0F172A] text-white rounded-lg flex items-center justify-center shadow-sm z-20">
                                        <i class="fas fa-plus text-[10px]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- VISIBILIDADE & BOTÃO PUBLICAR (Secção Unificada) -->
                <section class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <p class="text-[12px] font-bold text-slate-900 dark:text-white">Ativo na loja</p>
                            <p class="text-[10px] text-slate-500 font-medium">O produto ficará visível para os clientes</p>
                        </div>
                        <label for="toggle-ativo" class="relative inline-flex items-center cursor-pointer select-none">
                            <input type="checkbox" id="toggle-ativo" checked class="sr-only peer"/>
                            <div class="w-10 h-5 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-800 shadow-inner"></div>
                        </label>
                    </div>
                    
                    <button id="btn-main-action" onclick="guardarProduto()" disabled class="w-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-bold py-3.5 rounded-xl pointer-events-none transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-[12px]">
                        <i class="fas fa-check"></i>
                        <span>Publicar Produto</span>
                    </button>
                </section>

            </main>

            <!-- MODAL: CATEGORIAS -->
            <div id="modal-categorias" class="modal-container">
                <div class="modal-backdrop"></div>
                <div class="modal-sheet drawer flex flex-col">
                    <div class="modal-handle"></div>
                    <div class="px-6 mb-4 flex justify-between items-center shrink-0">
                        <h3 class="text-xl font-black text-slate-900">Categorias</h3>
                    </div>
                    <div id="drawer-content" class="overflow-y-auto flex-1 pb-6 px-6">
                        <div class="flex flex-col items-center justify-center py-10 opacity-50">
                            <i class="fas fa-circle-notch fa-spin text-3xl text-[#0F172A] mb-3"></i>
                            <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">A carregar categorias...</p>
                        </div>
                    </div>
                    <div class="px-6 pt-3 pb-10 bg-slate-50/50 border-t border-slate-100 shrink-0">
                        <label class="block text-[11px] font-semibold text-[#4A5568] mb-3 ml-1">Outra categoria</label>
                        <div class="flex gap-2">
                            <input id="inputCategoriaOutro" type="text" placeholder="Digite o nome da categoria..." class="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-inner outline-none focus:border-[#0F172A]">
                            <button onclick="confirmarCategoriaOutro()" class="bg-[#0F172A] text-white px-6 rounded-2xl active:scale-95 transition-transform flex items-center justify-center shadow-md">
                                <i class="fas fa-check"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- EDITOR DE FOTOS (INLINE) -->
            <div id="editor-modal" class="fixed inset-0 z-[60] flex flex-col pointer-events-none opacity-0 invisible transition-all duration-300">
                <div id="editor-sheet" class="bg-[#F8FAFC] w-full h-[100dvh] fixed inset-0 z-10 flex flex-col transform translate-y-full transition-transform duration-300 pointer-events-auto">
                    <div class="flex flex-col bg-white border-b border-gray-100 shrink-0 py-3">
                        <div class="flex justify-between items-center px-8">
                            <button id="btn-cancel-editor" class="p-2 -ml-2 bg-transparent text-gray-500 focus:outline-none">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                            <h2 class="text-[18px] font-black text-[#0F172A] tracking-tight text-center">Editar Imagem</h2>
                            <div class="w-[65px]"></div>
                        </div>
                    </div>
                    <div class="flex-1 overflow-y-auto p-8 flex flex-col items-center space-y-8">
                        <div class="flex flex-col items-center gap-5 w-full">
                            <div id="catalog-card" class="w-full max-w-[260px] bg-white rounded-[40px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 relative cursor-pointer active:scale-95 group mx-auto">
                                <div class="w-full pb-[100%] relative rounded-[32px] overflow-hidden bg-[#F8FAFC] border border-gray-50 shadow-inner">
                                    <div id="fake-bg-removed" class="absolute inset-0 w-full h-full bg-[#F8FAFC] opacity-0 flex z-0">
                                        <img id="bg-removed-img" src="" class="absolute inset-0 w-full h-full object-cover blend-multiply">
                                    </div>
                                    <img id="main-preview-img" src="" class="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105">
                                    <div id="processing-overlay" class="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 opacity-0 transition-opacity duration-500 pointer-events-none overflow-hidden" style="background-color: rgba(18, 14, 10, 0.65);">
                                        <svg class="absolute top-[15%] left-[20%] w-4 h-4 gold-sparkle animate-twinkle" style="animation-delay: 0.1s;" viewBox="0 0 24 24"><path d="M12,21.5C12,21.5 12,12 2.5,12C12,12 12,2.5 12,2.5C12,2.5 12,12 21.5,12C12,12 12,21.5 12,21.5Z" fill="url(#gold-grad)"/></svg>
                                        <svg class="absolute top-[25%] right-[20%] w-7 h-7 gold-sparkle animate-twinkle" style="animation-delay: 0.5s;" viewBox="0 0 24 24"><path d="M12,21.5C12,21.5 12,12 2.5,12C12,12 12,2.5 12,2.5C12,2.5 12,12 21.5,12C12,12 12,21.5 12,21.5Z" fill="url(#gold-grad)"/></svg>
                                        <svg class="absolute bottom-[20%] left-[30%] w-5 h-5 gold-sparkle animate-twinkle" style="animation-delay: 0.8s;" viewBox="0 0 24 24"><path d="M12,21.5C12,21.5 12,12 2.5,12C12,12 2.5,12.5C12,2.5 12,12 21.5,12C12,12 12,21.5 12,21.5Z" fill="url(#gold-grad)"/></svg>
                                        <svg class="absolute top-[50%] right-[10%] w-3 h-3 gold-sparkle animate-twinkle" style="animation-delay: 1.2s;" viewBox="0 0 24 24"><path d="M12,21.5C12,21.5 12,12 2.5,12C12,12 12,2.5 12,2.5C12,2.5 12,12 21.5,12C12,12 12,21.5 12,21.5Z" fill="url(#gold-grad)"/></svg>
                                        <div class="absolute top-[40%] left-[15%] w-1 h-1 bg-yellow-200 rounded-full animate-pulse opacity-60"></div>
                                        <div class="absolute bottom-[35%] right-[25%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-40" style="animation-delay: 0.3s;"></div>
                                        <svg width="0" height="0" class="absolute"><defs><linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#FFD700"/><stop offset="50%" style="stop-color:#FDB931"/><stop offset="100%" style="stop-color:#B8860B"/></linearGradient></defs></svg>
                                    </div>
                                    <div id="laser" class="hidden absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_25px_8px_rgba(255,255,255,1)] z-30"></div>
                                </div>
                            </div>
                            <button id="btn-trocar-foto" class="flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A] rounded-full active:scale-95 transition-colors border border-gray-200 shadow-sm focus:outline-none">
                                <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                <span class="text-[11px] font-black uppercase tracking-widest whitespace-nowrap opacity-80">Trocar Imagem</span>
                            </button>
                        </div>
                        <div class="flex justify-center h-4">
                            <span id="ai-text" class="hidden text-[10px] font-black text-gray-400 tracking-[2px] uppercase animate-pulse"></span>
                        </div>
                        <div id="catalogo-instrucoes" class="w-full bg-white border border-gray-200 rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                            <div class="mb-6 px-1">
                                <div class="flex items-center gap-2 mb-1.5">
                                    <p class="text-[15px] font-black text-[#0F172A] tracking-tight">Remova o fundo da sua imagem</p>
                                    <span class="px-2 py-0.5 bg-[#0F172A] text-white text-[7px] font-black rounded-[4px] uppercase tracking-[1.5px]">PREMIUM</span>
                                </div>
                                <p class="text-[12px] font-medium text-gray-600 leading-snug">Deixe seu produto com um visual limpo e profissional.</p>
                            </div>
                            <div class="flex items-center justify-center gap-3">
                                <div class="flex flex-col items-center gap-2">
                                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Antes</span>
                                    <div class="relative w-[110px] h-[110px] rounded-[20px] overflow-hidden bg-gray-50 border border-gray-100">
                                        <img src="https://www.dropbox.com/scl/fi/dtskmv5jmawzsfjr75s75/1000497357.png?rlkey=jh21nqldc9d8gnxdurzcf9lj1&st=34jpdf0o&raw=1" class="w-full h-full object-cover opacity-80">
                                    </div>
                                </div>
                                <svg class="w-5 h-5 text-gray-300 flex-shrink-0 mt-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                <div class="flex flex-col items-center gap-2">
                                    <span class="text-[10px] font-black text-[#0F172A] uppercase tracking-widest">Depois</span>
                                    <div class="relative w-[110px] h-[110px] bg-white rounded-[20px] border border-gray-100 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.18)] overflow-hidden">
                                        <img src="https://www.dropbox.com/scl/fi/aebnv8x19c7y458fw3px1/1000497721.png?rlkey=zubn2r7lgh6sqodgynryen0rc&st=1tdrzhqv&raw=1" class="w-full h-full object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full space-y-2 mt-auto pb-2">
                            <button id="btn-trigger-color-modal" class="w-full py-4 bg-[#0F172A] text-white rounded-[16px] font-bold text-[15px] flex justify-center items-center gap-2 shadow-md active:scale-95 transition-transform">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                                Melhorar Imagem
                            </button>
                            <button id="btn-confirm-editor" class="w-full py-3 bg-transparent text-slate-600 font-bold text-[14px] active:text-slate-900 active:scale-95 transition-all">
                                Continuar com a Imagem Original
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL: CORES -->
            <div id="modal-cores" class="modal-container">
                <div class="modal-backdrop"></div>
                <div class="modal-sheet drawer px-8 pb-10 pt-5">
                    <div class="modal-handle"></div>
                    <h3 class="text-[22px] font-black text-slate-900 tracking-tight mb-2">Cor de Fundo</h3>
                    <p class="text-slate-500 text-[13px] mb-8 font-medium">Escolha a cor para destacar o produto.</p>
                    <div class="grid grid-cols-4 gap-6 mb-10">
                        <div onclick="selectColor(this, 'transparent')" class="color-card flex flex-col items-center">
                            <div class="w-full aspect-square bg-white rounded-2xl border-2 border-gray-200 shadow-sm"></div><div class="check-badge font-bold">✓</div><span class="text-[10px] font-bold mt-3 text-gray-400 uppercase tracking-widest">Branco</span>
                        </div>
                        <div onclick="selectColor(this, '#F5F5F7')" class="color-card active flex flex-col items-center">
                            <div class="w-full aspect-square bg-[#F5F5F7] rounded-2xl border-2 border-gray-200 shadow-sm"></div><div class="check-badge font-bold">✓</div><span class="text-[10px] font-black mt-3 text-gray-900 uppercase tracking-widest">Cinza</span>
                        </div>
                        <div onclick="selectColor(this, '#121212')" class="color-card flex flex-col items-center">
                            <div class="w-full aspect-square bg-[#121212] rounded-2xl border-2 border-gray-800 shadow-sm"></div><div class="check-badge font-bold">✓</div><span class="text-[10px] font-bold mt-3 text-gray-400 uppercase tracking-widest">Preto</span>
                        </div>
                        <div onclick="selectColor(this, '#FDF5E6')" class="color-card flex flex-col items-center">
                            <div class="w-full aspect-square bg-[#FDF5E6] rounded-2xl border-2 border-orange-100 shadow-sm"></div><div class="check-badge font-bold">✓</div><span class="text-[10px] font-bold mt-3 text-gray-400 uppercase tracking-widest">Creme</span>
                        </div>
                    </div>
                    <button id="btn-final-action" class="w-full py-5 brand-color text-white rounded-[24px] font-black text-[15px] shadow-xl uppercase tracking-[2px] active:scale-95 transition-all">TRANSFORMAR IMAGEM</button>
                </div>
            </div>

            <!-- MODAL: OPÇÕES FOTO -->
            <div id="modal-opcoes-foto" class="modal-container z-[100]">
                <div class="modal-backdrop"></div>
                <div class="modal-sheet drawer px-6 pb-10 pt-5">
                    <div class="modal-handle"></div>
                    <div class="space-y-3 mt-4">
                        <button onclick="tornarCapaSelecionada()" class="w-full py-4 bg-gray-50 text-[#0F172A] font-bold rounded-2xl active:scale-95 transition-all flex justify-center items-center gap-2">Tornar Foto de Capa</button>
                        <button onclick="trocarImagemSelecionada()" class="w-full py-4 bg-gray-50 text-[#0F172A] font-bold rounded-2xl active:scale-95 transition-all flex justify-center items-center gap-2">Trocar Imagem</button>
                        <button onclick="removerImagemSelecionada()" class="w-full py-4 bg-gray-50 text-red-500 font-bold rounded-2xl active:scale-95 transition-all flex justify-center items-center gap-2">Remover Imagem</button>
                    </div>
                </div>
            </div>

        </div>
    </template>
`);

// criar-produto.js - Módulo completo integrado no SPA do Dashboard
// Combina: modais, motor-arrasto, editor-fotos, categorias, variantes, logica, app

// ══════════════════════════════════════════════════════════════
// 1. SISTEMA DE MODAIS
// ══════════════════════════════════════════════════════════════
/* =======================================================
   SISTEMA UNIVERSAL DE MODAIS (LÓGICA)
   ======================================================= */

// 1. Abrir Modal
window.abrirModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    document.body.style.overflow = 'hidden'; // Bloqueia a página de baixo
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
            document.body.style.overflow = 'auto';
        }
    }, 300);
};

// 3. Fechar ao Clicar no Fundo Escuro (Backdrop)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modalId = e.target.closest('.modal-container').id;
        fecharModal(modalId);
    }
});

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
                sheet.style.transform = `translateY(${diff}px)`;
                sheet.style.transition = 'none';
            }
        }, {passive: true});

        sheet.addEventListener('touchend', e => {
            let diff = e.changedTouches[0].clientY - startY;
            sheet.style.transition = ''; // Devolve a animação ao CSS
            sheet.style.transform = '';  // Volta à posição original
            
            if (diff > 100) { // Se puxou muito para baixo, fecha
                const modalId = sheet.closest('.modal-container').id;
                fecharModal(modalId);
            }
        });
    });
};
document.addEventListener('DOMContentLoaded', inicializarGestosModais);


// ══════════════════════════════════════════════════════════════
// 2. MOTOR DE ARRASTO NATIVO
// ══════════════════════════════════════════════════════════════
// ==========================================
// MOTOR DE ARRASTO NATIVO - CLONE & FANTASMA
// ==========================================

let motorIniciado = false;

window.iniciarMotorArrasto = function() {
    if (motorIniciado) return; 
    
    const galeria = document.getElementById('media-gallery');
    if (!galeria) return;
    
    motorIniciado = true;
    let draggedItem = null; // O "fantasma" que fica na grelha
    let cloneVoando = null; // A cópia exata que segue o dedo
    let offsetX = 0;
    let offsetY = 0;

    function getClientPos(e) {
        if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        if (e.changedTouches && e.changedTouches.length > 0) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        return { x: e.clientX, y: e.clientY };
    }

    // 1. PEGAR NA FOTO
    function iniciarArrasto(e) {
        const item = e.target.closest('.photo-slot');
        if (!item || item.id === 'btn-add-slot' || item.classList.contains('no-sort')) return;

        draggedItem = item;
        const pos = getClientPos(e);
        const rect = item.getBoundingClientRect();

        offsetX = pos.x - rect.left;
        offsetY = pos.y - rect.top;

        // 1A. Criar a CÓPIA que vai seguir o dedo
        cloneVoando = item.cloneNode(true);
        cloneVoando.classList.add('voando');
        cloneVoando.style.width = rect.width + 'px';
        cloneVoando.style.height = rect.height + 'px';
        cloneVoando.style.left = (pos.x - offsetX) + 'px';
        cloneVoando.style.top = (pos.y - offsetY) + 'px';
        document.body.appendChild(cloneVoando); // Coloca por cima de todo o site

        // 1B. Transformar a original no "FANTASMA" (mesma foto, mas transparente)
        setTimeout(() => {
            if (draggedItem) {
                draggedItem.classList.add('fantasma');
                if (window.navigator.vibrate) window.navigator.vibrate(15);
            }
        }, 0);
    }

    // 2. MOVER PELA TELA
    function moverArrasto(e) {
        if (!cloneVoando || !draggedItem) return;
        e.preventDefault(); 

        const pos = getClientPos(e);
        
        // O Clone segue o dedo
        cloneVoando.style.left = (pos.x - offsetX) + 'px';
        cloneVoando.style.top = (pos.y - offsetY) + 'px';

        // Deteta a foto que está debaixo do dedo (o Clone não atrapalha graças ao CSS)
        let elementBelow = document.elementFromPoint(pos.x, pos.y);
        let targetSlot = elementBelow ? elementBelow.closest('.photo-slot') : null;

        // SE CHEGOU NOUTRA FOTO -> TROCA DE POSIÇÃO AO VIVO!
        if (targetSlot && targetSlot !== draggedItem && targetSlot.id !== 'btn-add-slot') {
            const children = Array.from(galeria.children);
            const indexDrag = children.indexOf(draggedItem);
            const indexTarget = children.indexOf(targetSlot);

            // Descobre se estamos a arrastar para trás ou para a frente
            if (indexDrag < indexTarget) {
                galeria.insertBefore(draggedItem, targetSlot.nextSibling);
            } else {
                galeria.insertBefore(draggedItem, targetSlot);
            }
        }
    }

    // 3. LARGAR A FOTO
    function pararArrasto(e) {
        if (!cloneVoando || !draggedItem) return;

        // Destrói o Clone Voador
        cloneVoando.remove();
        cloneVoando = null;

        // O Fantasma acorda e volta a ser uma foto normal na nova posição
        draggedItem.classList.remove('fantasma');
        draggedItem = null;

        // Atualiza a Capa (primeira foto)
        if (typeof atualizarSeloCapa === 'function') atualizarSeloCapa();
    }

    galeria.addEventListener('touchstart', iniciarArrasto, { passive: false });
    document.addEventListener('touchmove', moverArrasto, { passive: false });
    document.addEventListener('touchend', pararArrasto);

    galeria.addEventListener('mousedown', iniciarArrasto);
    document.addEventListener('mousemove', moverArrasto);
    document.addEventListener('mouseup', pararArrasto);
};


// ══════════════════════════════════════════════════════════════
// 3. EDITOR DE FOTOS & IA
// ══════════════════════════════════════════════════════════════
/* ============================================================
   MÓDULO DE FOTOS & IA - LÓGICA E INTERATIVIDADE
   Este arquivo controla o motor da IA e a gestão da galeria.
   ============================================================ */

// --- VARIÁVEIS DE ESTADO ---
let totalFotosSubmetidas = 0;
let substituindoFoto = false;
let fotoSelecionadaParaAcao = null;
let isEdited = false;
let selectedBgColor = '#F5F5F7';



// Esta função agora é chamada pelo Fetch no criar-produto.html
window.inicializarEventosEditor = function() {
    const galeriaInput = document.getElementById('galeria-input');
    // Não precisamos de ligar o visual do Modal aqui, pois vamos inibi-lo por enquanto
    
    if (!galeriaInput) return;

    galeriaInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            
            // --- INIBIÇÃO DO EDITOR: Em vez de abrir o modal, salta logo para o resultado ---
            isEdited = false;
            
            if (substituindoFoto && fotoSelecionadaParaAcao) {
                // Se estava a trocar a imagem
                fotoSelecionadaParaAcao.querySelector('img').src = event.target.result;
                fotoSelecionadaParaAcao.style.backgroundColor = '#ffffff';
                substituindoFoto = false;
            } else {
                // Se estava apenas a adicionar uma imagem
                adicionarFotoGrelha(event.target.result);
            }
            
            e.target.value = ''; // Limpa o input para poder selecionar outra imagem depois
        };
        reader.readAsDataURL(file);
    });

    vincularBotoesInternos();

    // ACORDA O MOTOR: Ativa o gesto nos modais que acabaram de carregar
    if (typeof inicializarGestosModais === 'function') {
        inicializarGestosModais();
    }
};

// --- FUNÇÕES DE CONTROLO DE INTERFACE (IGUAIS AO OIIGEH) ---
window.fecharCores = function() {
    fecharModal('modal-cores');
};


function vincularBotoesInternos() {
    const galeriaInput = document.getElementById('galeria-input');
    const modal = document.getElementById('editor-modal');
    const modalSheet = document.getElementById('editor-sheet');

    // A. Gatilhos de Galeria
    const catalogCard = document.getElementById('catalog-card');
    if (catalogCard) catalogCard.onclick = () => galeriaInput.click();

    const btnTrocar = document.getElementById('btn-trocar-foto');
    if (btnTrocar) btnTrocar.onclick = () => galeriaInput.click();

    // B. Abrir Modal de Cores
    const btnTriggerColor = document.getElementById('btn-trigger-color-modal');
    if (btnTriggerColor) {
        btnTriggerColor.onclick = () => abrirModal('modal-cores');
    }

    // C. O MOTOR DA IA (CÓPIA 1:1 DO OIIGEH.HTML)
    const btnFinalAction = document.getElementById('btn-final-action');
    if (btnFinalAction) {
        btnFinalAction.onclick = () => {
            // 1. O modal de cores desce imediatamente
            fecharCores();

            const aiText = document.getElementById('ai-text');
            const processingOverlay = document.getElementById('processing-overlay');
            const laser = document.getElementById('laser');
            const previewImg = document.getElementById('main-preview-img');
            const bgRemovedImg = document.getElementById('bg-removed-img');
            const fakeBgRemoved = document.getElementById('fake-bg-removed');
            const instrucoes = document.getElementById('catalogo-instrucoes');

            // 2. Prepara o cenário
if (instrucoes) instrucoes.style.display = 'none';
document.getElementById('catalog-card').classList.add('expanded');

            
            // Aplica a cor de fundo e prepara as camadas
            fakeBgRemoved.style.backgroundColor = (selectedBgColor === 'transparent') ? '#ffffff' : selectedBgColor;
            bgRemovedImg.src = previewImg.src;
            fakeBgRemoved.classList.remove('opacity-0');
            
            aiText.classList.remove('hidden');
            aiText.classList.add('status-premium');

            document.getElementById('btn-trigger-color-modal').style.display = 'none';
            document.getElementById('btn-confirm-editor').style.display = 'none';
            document.getElementById('btn-trocar-foto').style.display = 'none';

            // 3. IMAGEM ESCURECE + ESTRELAS (Overlay 100%)
            processingOverlay.classList.remove('opacity-0');
            processingOverlay.classList.add('opacity-100');

            const frasesIA = ["A analisar imagem...", "A identificar produto...", "A polir detalhes...", "A finalizar magia..."];
            let step = 0;
            aiText.innerText = frasesIA[0];
            
            const interval = setInterval(() => {
                step++;
                if (step < frasesIA.length) aiText.innerText = frasesIA[step];
            }, 700);

            // PASSO 1: Aos 2.5s, a imagem CLAREIA (Overlay 0%)
            setTimeout(() => {
                clearInterval(interval);
                processingOverlay.classList.replace('opacity-100', 'opacity-0');
                
                // PASSO 2: Espera 0.5s e passa o LASER
                setTimeout(() => {
                    laser.classList.add('animate-laser-rl');
                    previewImg.classList.add('animate-wipe-rl');
                }, 500); 

            }, 2500);

            // PASSO 3: Conclusão aos 5.1s
            setTimeout(() => {
                aiText.classList.add('hidden');
                const btnConfirm = document.getElementById('btn-confirm-editor');
                btnConfirm.style.display = 'block';
                btnConfirm.innerText = 'Adicionar ao Produto';
                btnConfirm.className = 'w-full py-4 bg-[#0F172A] text-white rounded-[16px] font-bold text-[15px] shadow-lg active:scale-95 transition-transform mt-auto mb-2';
                document.getElementById('btn-trocar-foto').style.display = 'flex';
                isEdited = true;
            }, 5100); 
        };
    }

    // D. Botões de Saída e Cancelamento
    const btnConfirm = document.getElementById('btn-confirm-editor');
    if (btnConfirm) {
        btnConfirm.onclick = () => {
            modalSheet.style.transform = 'translateY(100%)';
            setTimeout(() => { 
                // AGORA IGUAL AO CANCELAR: Esconde totalmente o modal
                modal.classList.add('pointer-events-none', 'opacity-0', 'invisible');
                document.body.style.overflow = 'auto'; 
            }, 300);
            const finalSrc = isEdited ? document.getElementById('bg-removed-img').src : document.getElementById('main-preview-img').src;
            if (substituindoFoto && fotoSelecionadaParaAcao) {
                fotoSelecionadaParaAcao.querySelector('img').src = finalSrc;
                fotoSelecionadaParaAcao.style.backgroundColor = isEdited && selectedBgColor !== 'transparent' ? selectedBgColor : '#ffffff';
                substituindoFoto = false;
            } else {
                adicionarFotoGrelha(finalSrc);
            }
        };
    }

    const btnCancel = document.getElementById('btn-cancel-editor');
    if (btnCancel) {
        btnCancel.onclick = () => {
            // Fecha o editor e liberta o scroll da página de baixo
            modalSheet.style.transform = 'translateY(100%)';
            setTimeout(() => { 
                modal.classList.add('pointer-events-none', 'opacity-0', 'invisible');
                document.body.style.overflow = 'auto'; 
            }, 300);
            substituindoFoto = false;
        };
    }
    
}


// --- GESTÃO DA GRELHA (IMNDEX.HTML) ---

function adicionarFotoGrelha(src) {
    if (totalFotosSubmetidas >= 5) return;
    totalFotosSubmetidas++;

    const galeria = document.getElementById('media-gallery');
    const btnAddSlot = document.getElementById('btn-add-slot');

    const div = document.createElement('div');
    // Borda exterior clareada (de border-slate-200 para border-slate-100)
    div.className = "photo-slot aspect-square rounded-xl border-[3px] border-slate-100 ring-2 ring-white ring-inset shadow-md shrink-0 relative bg-white flex items-center justify-center cursor-move active:scale-95 transition-all duration-300";
    div.style.backgroundColor = isEdited && selectedBgColor !== 'transparent' ? selectedBgColor : '#ffffff';
    div.innerHTML = `<img src="${src}" class="w-full h-full object-cover rounded-[10px] p-[2px] pointer-events-none drop-shadow-xl">`;
    div.onclick = function() { abrirMenuImagem(this); };

    galeria.insertBefore(div, btnAddSlot);
    atualizarContador();
    atualizarSeloCapa();
}

function atualizarContador() {
    const cont = document.getElementById('contador-fotos');
    if (cont) cont.innerText = totalFotosSubmetidas;
    
    const btnAdd = document.getElementById('btn-add-slot');
    if (btnAdd) btnAdd.style.display = totalFotosSubmetidas >= 5 ? 'none' : 'flex';

    // Mostra o texto só se houver fotos
    const textoInstrucao = document.getElementById('texto-instrucao-galeria');
    if (textoInstrucao) {
        if (totalFotosSubmetidas > 0) {
            textoInstrucao.classList.remove('hidden');
        } else {
            textoInstrucao.classList.add('hidden');
        }
    }
}

window.atualizarSeloCapa = function() {
    const fotos = document.querySelectorAll('.photo-slot');
    fotos.forEach((foto, index) => {
        foto.classList.remove('is-cover', 'border-[#0F172A]', 'border-2');
        const badge = foto.querySelector('.badge-capa');
        if (badge) badge.remove();

        if (index === 0) {
            foto.classList.add('is-cover', 'border-[#0F172A]', 'border-2');
            const b = document.createElement('div');
            b.className = "badge-capa absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase z-30 shadow-sm";
            b.innerText = "Capa";
            foto.appendChild(b);
        }
    });
};

// --- MENUS DE AÇÃO ---

window.abrirMenuImagem = function(el) {
    fotoSelecionadaParaAcao = el;
    abrirModal('modal-opcoes-foto');
};

window.fecharMenuImagem = function() {
    fecharModal('modal-opcoes-foto');
};

window.removerImagemSelecionada = function() {
    if (fotoSelecionadaParaAcao) {
        fotoSelecionadaParaAcao.remove();
        totalFotosSubmetidas--;
        atualizarContador();
        atualizarSeloCapa();
        fecharMenuImagem();
    }
};

window.tornarCapaSelecionada = function() {
    if (fotoSelecionadaParaAcao) {
        const galeria = document.getElementById('media-gallery');
        galeria.insertBefore(fotoSelecionadaParaAcao, galeria.firstChild);
        atualizarSeloCapa();
        fecharMenuImagem();
    }
};

window.trocarImagemSelecionada = function() {
    substituindoFoto = true;
    document.getElementById('galeria-input').click();
    fecharMenuImagem();
};

window.selectColor = function(el, color) {
    document.querySelectorAll('.color-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    selectedBgColor = color;
};




// ══════════════════════════════════════════════════════════════
// 4. DADOS DE CATEGORIAS
// ══════════════════════════════════════════════════════════════
// dados/categorias.js - Vers00o Ultra-Compatvel (Sem erros de acento)

const baseDeConhecimento = [
    { palavras: ["calca", "jeans", "camisa", "camiseta", "vestido", "roupa", "casaco"], caminho: "Moda > Roupas", icone: "fa-tshirt" },
    { palavras: ["sapato", "tenis", "sandalia", "bota", "chinelo", "calcado"], caminho: "Moda > Calçados", icone: "fa-shoe-prints" },
    { palavras: ["bolsa", "mochila", "relogio", "oculos", "joia", "anel"], caminho: "Moda > Acessórios", icone: "fa-gem" },
    { palavras: ["celular", "telemovel", "iphone", "samsung", "smartphone"], caminho: "Eletrónicos > Celulares", icone: "fa-mobile-alt" },
    { palavras: ["carregador", "cabo", "fone", "headset", "pelicula"], caminho: "Eletrónicos > Acessórios", icone: "fa-headphones" },
    { palavras: ["pc", "computador", "laptop", "macbook", "teclado", "mouse"], caminho: "Eletrónicos > Computadores", icone: "fa-laptop" }
];

const categoriasEstrutura = [
    {
        id: 'cat-moda',
        nome: 'Moda',
        icone: 'fa-tshirt',
        subcategorias: [
            {
                nome: 'Roupas',
                icone: 'fa-tshirt',
                itens: ['Camisetas', 'Camisas', 'Calças', 'Vestidos', 'Saias', 'Casacos']
            },
            {
                nome: 'Calçados',
                icone: 'fa-shoe-prints',
                itens: ['Ténis', 'Sandálias', 'Botas']
            },
            {
                nome: 'Acessórios',
                icone: 'fa-gem',
                itens: ['Bolsas', 'Mochilas', 'Óculos', 'Joias']
            }
        ]
    },
    {
        id: 'cat-eletro',
        nome: 'Eletrónicos',
        icone: 'fa-laptop',
        subcategorias: [
            { nome: 'Televisores', icone: 'fa-tv' },
            {
                nome: 'Celulares e Acessórios',
                icone: 'fa-mobile-alt',
                itens: ['Capas', 'Carregadores']
            },
            {
                nome: 'Computadores',
                icone: 'fa-laptop',
                itens: ['Laptops', 'Desktops', 'Acessórios']
            },
            { nome: 'Consolas e Jogos', icone: 'fa-gamepad' },
            { nome: 'Som', icone: 'fa-headphones' }
        ]
    },
    {
        id: 'cat-beleza',
        nome: 'Beleza e Cuidados',
        icone: 'fa-spa',
        subcategorias: [
            {
                nome: 'Maquilhagem',
                icone: 'fa-magic',
                itens: ['Batom', 'Base']
            },
            { nome: 'Perfumes', icone: 'fa-wind' },
            { nome: 'Higiene Pessoal', icone: 'fa-shower' }
        ]
    },
    {
        id: 'cat-casa',
        nome: 'Casa e Decoração',
        icone: 'fa-home',
        subcategorias: [
            {
                nome: 'Móveis',
                icone: 'fa-chair',
                itens: ['Sofás', 'Camas', 'Mesas']
            },
            { nome: 'Cozinha', icone: 'fa-utensils' }
        ]
    }
];


// ══════════════════════════════════════════════════════════════
// 5. SISTEMA DE VARIANTES
// ══════════════════════════════════════════════════════════════
/**
 * SISTEMA DE VARIANTES E INVENTÁRIO - ZÉ SAAS
 * Responsável pela lógica de Cores, Tamanhos, Números e Filtro por Categoria.
 */

// 1. GESTÃO DE CATEGORIAS: Mostra/Esconde secções conforme o que foi escolhido
function atualizarVariantesPorCategoria(caminhoCategoria) {
    const wrapper = document.getElementById('wrapper-variantes');
    const secCores = document.getElementById('sec-cores');
    const secTamanhos = document.getElementById('sec-tamanhos');
    const secNumeros = document.getElementById('sec-numeros');

    // 1. Normalizamos (Filtro corrigido a usar apenas uma barra: \u0300-\u036f )
    const caminhoNormalizado = caminhoCategoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Mostramos o container principal
    wrapper.classList.remove('hidden');

    // 2. Lógica de Decisão
    if (caminhoNormalizado.includes('roupa') || caminhoNormalizado.includes('t-shirt') || caminhoNormalizado.includes('camis') || caminhoNormalizado.includes('vestido')) {
        // É Roupa: Mostra Cor + Tamanho
        secCores.style.display = 'block';
        secTamanhos.style.display = 'block';
        secNumeros.style.display = 'none';
    } 
    else if (caminhoNormalizado.includes('calcado') || caminhoNormalizado.includes('sapato') || caminhoNormalizado.includes('teni') || caminhoNormalizado.includes('bota')) {
        // É Calçado: Mostra Cor + Número
        secCores.style.display = 'block';
        secTamanhos.style.display = 'none';
        secNumeros.style.display = 'block';
    } 
    else if (caminhoCategoria.includes(' > ')) {
        // É outra categoria da LISTA (Ex: Acessórios, Eletrónicos, Beleza)
        secCores.style.display = 'block';
        secTamanhos.style.display = 'none';
        secNumeros.style.display = 'none';
    }
    else {
        // É uma categoria MANUAL
        secCores.style.display = 'block';
        secTamanhos.style.display = 'block';
        secNumeros.style.display = 'block';
    }
}

// 2. VALIDAÇÃO DE INPUT: Controla o botão "+" e limpa caracteres errados
function validarInput(input, tipo, btnId) {
    let val = input.value;
    const btn = document.getElementById(btnId);

    if (tipo === 'letras') {
        val = val.replace(/[0-9]/g, ''); // Remove números em Cores/Tamanhos
    } else if (tipo === 'numeros') {
        val = val.replace(/\\D/g, ''); // Remove letras em Numeração
    }
    
    input.value = val;

    // Mostra/Esconde o botão com a animação que criámos no CSS
    if (val.trim().length > 0) {
        btn.classList.add('btn-add-show');
    } else {
        btn.classList.remove('btn-add-show');
    }
}

// 3. STOCK: Mostrar/Esconder campo de quantidade
function toggleStock() {
    const area = document.getElementById('area-quantidade');
    const isChecked = document.getElementById('toggle-stock').checked;
    area.style.display = isChecked ? 'block' : 'none';
}

// 4. SELEÇÃO: Ligar/Desligar um chip (quadradinho)
function toggleOption(btn) {
    btn.classList.toggle('chip-selected');
}

// 5. ADIÇÃO: Criar novo chip personalizado
function addCustom(e, containerId) {
    if (e.key && e.key !== 'Enter') return;
    
    const input = e.target || e; 
    let val = input.value.trim();
    const container = document.getElementById(containerId);
    
    if (!val) return;

    // Formatação Profissional
    if (containerId === 'container-tamanhos') {
        val = val.toUpperCase(); // S, M, L, XL
    } else if (containerId === 'container-cores') {
        val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); // Azul, Vermelho
    }

    // Evita duplicados
    const existentes = Array.from(container.querySelectorAll('button')).map(b => b.innerText.toUpperCase());
    if (existentes.includes(val.toUpperCase())) {
        input.value = '';
        esconderBotaoPeloInput(input);
        return;
    }

    // Criar o elemento
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = "h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0 animate-pop chip-selected";
    btn.innerText = val;
    btn.onclick = function() { toggleOption(this); };

    container.appendChild(btn);
    
    // Reset do input
    input.value = '';
    esconderBotaoPeloInput(input);
    input.focus();

    // Scroll suave para o novo item
    container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
}

function salvarPeloBotao(btn, containerId) {
    const input = btn.parentElement.querySelector('input');
    addCustom(input, containerId);
}

function esconderBotaoPeloInput(input) {
    const btn = input.parentElement.querySelector('button');
    if(btn) btn.classList.remove('btn-add-show');
}


// ══════════════════════════════════════════════════════════════
// 6. LÓGICA DE CATEGORIAS
// ══════════════════════════════════════════════════════════════
// js/logica.js - Versão 3 Níveis Completa (Integrada com o Novo Sistema de Modais)

// 1. DESENHAR AS CATEGORIAS NO HTML (3 Níveis: Categoria > Sub > Item)
function renderizarCategorias() {
    const container = document.getElementById('drawer-content');
    if (!container) return;
    
    let html = '';
    categoriasEstrutura.forEach(cat => {
        html += `
        <div class="border-b border-slate-50 mb-1">
            <button onclick="smartToggle('${cat.id}', this, 'main')" class="w-full flex items-center justify-between p-4 group active:bg-slate-50 rounded-2xl transition-all">
                <div class="flex items-center gap-4">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-white shadow-sm">
                        <i class="fas ${cat.icone}"></i>
                    </div>
                    <span class="font-bold text-sm text-slate-800">${cat.nome}</span>
                </div>
                <i class="fas fa-chevron-down text-slate-300 text-xs transition-transform duration-300"></i>
            </button>
            
            <div id="${cat.id}" class="expand-content" data-level="main">
                <div class="flex flex-col py-2">
                    ${cat.subcategorias.map((sub, idx) => {
                        const subId = `${cat.id}-sub-${idx}`;
                        
                        if (sub.itens && sub.itens.length > 0) {
                            return `
                            <button onclick="smartToggle('${subId}', this, 'sub')" class="flex w-full items-center justify-between py-3 pl-14 pr-6 text-sm font-bold text-slate-600 active:bg-slate-50">
                                <span>${sub.nome}</span>
                                <i class="fas fa-plus text-[10px] text-slate-300 transition-transform"></i>
                            </button>
                            <div id="${subId}" class="expand-content" data-level="sub">
                                <div class="flex flex-col py-2 pl-16 pr-6 space-y-4 border-l-2 border-slate-100 ml-14 mb-2">
                                    ${sub.itens.map(item => `
                                        <div onclick="selecionarCategoriaFinal('${cat.nome} > ${sub.nome} > ${item}', '${sub.icone}')" 
                                             class="text-sm text-slate-500 font-medium cursor-pointer active:text-[#0F172A] active:font-bold py-1">
                                            ${item}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>`;
                        } else {
                            // NÍVEL 2: SUBCATEGORIA (CLIQUE DIRETO)
                            return `
                            <div onclick="selecionarCategoriaFinal('${cat.nome} > ${sub.nome}', '${sub.icone}')" 
                                 class="flex w-full items-center py-3 pl-14 pr-6 text-sm font-bold text-slate-600 cursor-pointer active:bg-slate-50">
                                ${sub.nome}
                            </div>`;
                        }
                    }).join('')}
                </div>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

// 2. ABRIR GAVETA E RESETAR ACORDEÃO (Liga-se ao novo sistema)
// NOTA: Se já mudaste o botão no HTML para onclick="abrirModal('modal-categorias')",
// muda de volta para onclick="abrirGavetaCategorias()" para manteres o reset das pastas!
function abrirGavetaCategorias() {
    const todosAbertos = document.querySelectorAll('.expand-content');
    
    // Reset invisível das pastas
    todosAbertos.forEach(item => {
        item.style.transition = 'none'; 
        item.classList.remove('is-open');
    });

    document.querySelectorAll('.rotate-180').forEach(icon => icon.classList.remove('rotate-180'));
    document.querySelectorAll('.fa-minus').forEach(icon => icon.classList.replace('fa-minus', 'fa-plus'));

    void document.body.offsetHeight; // Força renderização

    todosAbertos.forEach(item => {
        item.style.transition = ''; 
    });

    // Chama o NOVO sistema de modais
    if (typeof abrirModal === "function") {
        abrirModal('modal-categorias');
    }
}

// 3. ACORDEÃO INTELIGENTE (Fecha outros ao abrir um novo)
function smartToggle(id, btn, level) {
    const target = document.getElementById(id);
    const openItems = document.querySelectorAll(`.expand-content.is-open[data-level="${level}"]`);
    
    openItems.forEach(item => {
        if (item !== target) {
            item.classList.remove('is-open');
            const prevBtn = item.previousElementSibling;
            if (prevBtn) {
                const icon = prevBtn.querySelector('.fa-chevron-down, .fa-plus, .fa-minus');
                if (icon) {
                    icon.classList.remove('rotate-180');
                    if (icon.classList.contains('fa-minus')) icon.classList.replace('fa-minus', 'fa-plus');
                }
            }
        }
    });

    const isOpen = target.classList.toggle('is-open');
    const chevron = btn.querySelector('.fa-chevron-down');
    const plusMinus = btn.querySelector('.fa-plus, .fa-minus');
    
    if (chevron) chevron.classList.toggle('rotate-180', isOpen);
    if (plusMinus) {
        plusMinus.classList.toggle('fa-minus', isOpen);
        plusMinus.classList.toggle('fa-plus', !isOpen);
    }
}

// 4. SELECIONAR A CATEGORIA FINAL
function selecionarCategoriaFinal(caminho, icone) {
    const textoBtn = document.getElementById('textoCategoria');
    const iconeBtn = document.getElementById('iconeCategoria');
    const boxIcone = document.getElementById('boxIconeCategoria');

    const nomeCurto = caminho.includes(' > ') ? caminho.split(' > ').pop() : caminho;
    
    textoBtn.innerHTML = nomeCurto;
    textoBtn.classList.remove('text-slate-400');
    textoBtn.classList.add('text-[#0F172A]'); 
    
    iconeBtn.className = 'fas ' + icone + ' text-lg';
    
    if (boxIcone) {
        // Limpa o estado cinza/tracejado e restaura o Navy Blue original
        boxIcone.className = "w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-white shadow-md transition-all";
    }
    
    document.getElementById('prod-categoria').value = caminho;
    
    if (typeof atualizarVariantesPorCategoria === "function") {
        atualizarVariantesPorCategoria(caminho);
    }
    
    // Chama o NOVO sistema de modais para fechar
    if (typeof fecharModal === "function") {
        fecharModal('modal-categorias');
    }
}

// 5. PESQUISA E "OUTRO"
function normalizarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").trim();
}

function confirmarCategoriaOutro() {
    const input = document.getElementById('inputCategoriaOutro');
    const valorOriginal = input.value.trim();
    if (valorOriginal === "") return;

    const valorBusca = normalizarTexto(valorOriginal);
    let matchEncontrado = null;

    if (typeof baseDeConhecimento !== 'undefined') {
        for (let categoria of baseDeConhecimento) {
            if (categoria.palavras.some(palavra => valorBusca.includes(palavra))) {
                matchEncontrado = categoria;
                break;
            }
        }
    }

    if (matchEncontrado) {
        selecionarCategoriaFinal(matchEncontrado.caminho, matchEncontrado.icone);
    } else {
        selecionarCategoriaFinal(valorOriginal, 'fa-tag');
    }
    input.value = ''; 
}



function toggleDatasPromo() {
    const area = document.getElementById('area-datas-promo');
    const btn = document.getElementById('btn-agendar');
    const isHidden = area.classList.toggle('hidden');
    
    btn.innerHTML = isHidden ? 
        '<i class="far fa-calendar-alt"></i> <span>Agendar período</span>' : 
        '<i class="fas fa-times"></i> <span>Remover agendamento</span>';
    btn.classList.toggle('text-red-400', !isHidden);
    btn.classList.toggle('text-slate-400', isHidden);
}


// ══════════════════════════════════════════════════════════════
// 7. LÓGICA DE APP (PREÇO, PUBLICAÇÃO, STOCK)
// ══════════════════════════════════════════════════════════════
// js/app.js

// ==========================================
// 1. PREÇO E PROMOÇÃO
// ==========================================
const checkPromo = document.getElementById('check-promo');
const campoPromo = document.getElementById('campo-promo');

if (checkPromo && campoPromo) {
    checkPromo.addEventListener('change', function() {
        if (this.checked) {
            campoPromo.classList.remove('opacity-30', 'pointer-events-none');
        } else {
            campoPromo.classList.add('opacity-30', 'pointer-events-none');
        }
    });
}

// ==========================================
// 2. STOCK E TAMANHOS (Lógica de interação)
// ==========================================
function toggleSize(btn) {
    btn.classList.toggle('bg-white');
    btn.classList.toggle('text-slate-600');
    btn.classList.toggle('bg-[#0F172A]');
    btn.classList.toggle('text-white');
}



// Salvar produto real no Supabase
// criar-produto.js - Módulo completo integrado no SPA do Dashboard
// As correções abaixo incluem a atualização instantânea do dashboard e produtos!

function guardarProduto() {
    const toggleAtivo = document.getElementById('toggle-ativo');
    const isRascunho = toggleAtivo ? !toggleAtivo.checked : false;

    const nome = document.getElementById('prod-nome').value.trim();
    const categoria = document.getElementById('prod-categoria').value.trim();
    const preco = parseFloat(document.getElementById('prod-preco').value) || 0;
    
    const promoInput = document.querySelector('#campo-promo input[type="number"]');
    const preco_promo = promoInput && promoInput.value ? parseFloat(promoInput.value) : null;
    
    const descricao = document.getElementById('prod-desc').value.trim();
    const controlar_estoque = document.getElementById('toggle-stock') ? document.getElementById('toggle-stock').checked : false;
    const estoque_qtd = document.getElementById('prod-stock-qtd') ? (parseInt(document.getElementById('prod-stock-qtd').value) || 0) : 0;

    if (!nome || !preco) {
        alert("Por favor, preencha o nome e o preço do produto.");
        return;
    }

    const variantes = {};
    const extractVariants = (containerId, key) => {
        const container = document.getElementById(containerId);
        if(!container) return;
        const selected = Array.from(container.querySelectorAll('.chip-selected')).map(b => b.innerText);
        if(selected.length > 0) variantes[key] = selected;
    };
    extractVariants('container-cores', 'cores');
    extractVariants('container-tamanhos', 'tamanhos');
    extractVariants('container-numeracao', 'numeracao');

    // MÁGICA 1: Capturar as fotografias base64/links ANTES de sairmos da página
    const photoSlots = document.querySelectorAll('.photo-slot img');
    const fotosCapturadas = [];
    for(let i = 0; i < photoSlots.length; i++) {
        fotosCapturadas.push(photoSlots[i].src);
    }
    
    // Capturamos a id se estivermos em modo de edição
    const produtoEditandoID = (window.produtoEmEdicao && window.produtoEmEdicao.id) ? window.produtoEmEdicao.id : null;

    // AÇÃO INSTANTÂNEA: Feedback Visual Imediato e Navegação Rápida Pára Tudo 🚀
    if (typeof mostrarNotificacao === 'function') {
        mostrarNotificacao(isRascunho ? 'A preparar rascunho...' : 'A publicar na loja...');
    }
    
    // Libertar do estado de edição para os próximos artigos, caso o utilizador clique em novo produto rápido
    window.produtoEmEdicao = null;
    
    // Saída fluente sem espera
    navegarAnimado('produtos');

    // ==========================================
    // MÁGICA 2: PROCESSAMENTO EM BACKGROUND (IIFE)
    // ==========================================
    // Esta função arranca silenciosamente e comunica com o Supabase nos bastidores!
    (async () => {
        try {
            const { data: sessionData } = await window.supabaseClient.auth.getSession();
            const userId = sessionData?.session?.user?.id;
            
            if (!userId) throw new Error("Sessão expirada.");

            const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', userId).maybeSingle();
            if (!loja) throw new Error("Loja não encontrada para este perfil.");

            const lojaId = loja.id;
            const urls = [];

            // Trabalha as fotos capturadas
            for(let i = 0; i < fotosCapturadas.length; i++) {
                const src = fotosCapturadas[i];
                if (src) {
                    if (src.startsWith('data:')) {
                        const img = new Image();
                        img.src = src;
                        await new Promise(res => img.onload = res);
                        
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        const max_size = 1000;
                        
                        if (width > height && width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        } else if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.8));
                        
                        const fileName = `${lojaId}/${Date.now()}-${i}.jpg`;
                        const { data, error } = await window.supabaseClient.storage
                            .from('produtos')
                            .upload(fileName, blob, { contentType: 'image/jpeg' });
                        
                        if (error) {
                            console.error('Erro:', error);
                            throw new Error("Erro ao fazer upload da imagem.");
                        }

                        const { data: pubData } = window.supabaseClient.storage.from('produtos').getPublicUrl(fileName);
                        urls.push(pubData.publicUrl);
                    } else {
                        urls.push(src); // Preserva as antigas na edição
                    }
                }
            }

            const produtoData = {
                loja_id: lojaId,
                nome,
                categoria,
                preco,
                preco_promo,
                descricao,
                controlar_estoque,
                estoque_qtd,
                variantes,
                fotos: urls,
                ativo: !isRascunho
            };

            let dbError;
            
            // Background Update / Insert
            if (produtoEditandoID) {
                const { error } = await window.supabaseClient
                    .from('produtos')
                    .update(produtoData)
                    .eq('id', produtoEditandoID);
                dbError = error;
            } else {
                const { error } = await window.supabaseClient
                    .from('produtos')
                    .insert([produtoData]);
                dbError = error;
            }
            
            if (dbError) throw dbError;

            // Sucesso Silencioso no Background -> Refrescamos magicamente a Lista de Produtos no Ecrã!
            if (typeof window.forcarAtualizacaoDashboard === 'function') {
                window.forcarAtualizacaoDashboard(); 
            }
            if (typeof window.forcarAtualizacaoProdutos === 'function') {
                // Ao forçar atualização os produtos recarregam na tela
                window.forcarAtualizacaoProdutos();
            }
            
            if (typeof mostrarNotificacao === 'function') {
                mostrarNotificacao(isRascunho ? "Guardado com sucesso! 📦" : "Produto já está disponível na loja.");
            }

        } catch(err) {
            console.error("Erro no background:", err.message);
            if (typeof mostrarNotificacao === 'function') {
                mostrarNotificacao("Erro ao gravar produto: " + err.message, "error");
            }
        }
    })();
}

// ══════════════════════════════════════════════════════════════
// 8. INTEGRAÇÃO SPA - inicializa tudo quando a página carrega
// ══════════════════════════════════════════════════════════════

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'criar-produto') {
        initCriarProdutoSPA();
    }
});

function initCriarProdutoSPA() {
    // Reset de estado base
    totalFotosSubmetidas = 0;
    substituindoFoto = false;
    fotoSelecionadaParaAcao = null;
    isEdited = false;
    selectedBgColor = '#F5F5F7';
    motorIniciado = false;

    // Limpar galeria visual (caso tenha havido uploads antes)
    const galeria = document.getElementById('media-gallery');
    if (galeria) {
        galeria.querySelectorAll('.photo-slot').forEach(el => el.remove());
        if (typeof atualizarContador === 'function') atualizarContador();
    }

    // Inicializa módulos
    renderizarCategorias();
    inicializarGestosModais();
    iniciarMotorArrasto();

    // Editor de fotos
    if (typeof inicializarEventosEditor === 'function') {
        inicializarEventosEditor();
    }

    // Promoção toggle
    const checkPromo = document.getElementById('check-promo');
    const campoPromo = document.getElementById('campo-promo');
    if (checkPromo && campoPromo) {
        checkPromo.addEventListener('change', function() {
            if (this.checked) {
                campoPromo.classList.remove('opacity-30', 'pointer-events-none');
            } else {
                campoPromo.classList.add('opacity-30', 'pointer-events-none');
            }
        });
    }

    // --- LÓGICA DE EDIÇÃO: RECUPERAR PRODUTO ---
    const p = window.produtoEmEdicao;
    const isEdicao = !!p;

    if (isEdicao) {
        const headerTitulo = document.getElementById('header-titulo');
        const headerSubtitulo = document.getElementById('header-subtitulo');
        if (headerTitulo) headerTitulo.textContent = 'Editar Produto';
        if (headerSubtitulo) headerSubtitulo.textContent = 'Atualizar';

        document.getElementById('prod-nome').value = p.nome || '';
        document.getElementById('prod-preco').value = p.preco || '';
        document.getElementById('prod-desc').value = p.descricao || '';
        
        if (p.categoria) {
            document.getElementById('textoCategoria').innerText = p.categoria;
            document.getElementById('prod-categoria').value = p.categoria;
            document.getElementById('textoCategoria').classList.remove('text-slate-400');
            document.getElementById('textoCategoria').classList.add('text-[#0F172A]');
            if (typeof atualizarVariantesPorCategoria === 'function') {
                atualizarVariantesPorCategoria(p.categoria);
            }
        }

        if (p.preco_promo && p.preco_promo > 0) {
            if (checkPromo) checkPromo.checked = true;
            if (campoPromo) campoPromo.classList.remove('opacity-30', 'pointer-events-none');
            const promoInput = document.querySelector('#campo-promo input[type="number"]');
            if (promoInput) promoInput.value = p.preco_promo;
        }

        if (p.controlar_estoque) {
            const toggleStockEl = document.getElementById('toggle-stock');
            if (toggleStockEl) toggleStockEl.checked = true;
            const areaQtd = document.getElementById('area-quantidade');
            if (areaQtd) areaQtd.style.display = 'block';
            document.getElementById('prod-stock-qtd').value = p.estoque_qtd || '';
        }

        // Recuperar Variantes (Cores, Tamanhos, Números)
        ['container-cores', 'container-tamanhos', 'container-numeracao'].forEach(id => {
            const c = document.getElementById(id);
            if (c) c.querySelectorAll('button').forEach(b => b.classList.remove('chip-selected'));
        });

        if (p.variantes) {
            const addVars = (containerId, lista) => {
                const c = document.getElementById(containerId);
                if (!c || !lista) return;
                lista.forEach(val => {
                    const existente = Array.from(c.querySelectorAll('button')).find(b => b.innerText.toUpperCase() === val.toUpperCase());
                    if (existente) {
                        existente.classList.add('chip-selected');
                    } else {
                        const btn = document.createElement('button');
                        btn.type = 'button';
                        btn.className = "h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold transition-all active:scale-95 shrink-0 animate-pop chip-selected";
                        btn.innerText = val;
                        btn.onclick = function() { toggleOption(this); };
                        c.appendChild(btn);
                    }
                });
            };
            if (p.variantes.cores) addVars('container-cores', p.variantes.cores);
            if (p.variantes.tamanhos) addVars('container-tamanhos', p.variantes.tamanhos);
            if (p.variantes.numeracao) addVars('container-numeracao', p.variantes.numeracao);
        }

        // Recuperar Fotos (Renderiza na grelha sem as mandar duplicar no site)
        if (p.fotos && p.fotos.length > 0) {
            p.fotos.forEach(fotoUrl => {
                if (typeof adicionarFotoGrelha === 'function') adicionarFotoGrelha(fotoUrl);
            });
            if (typeof atualizarSeloCapa === 'function') atualizarSeloCapa();
        }
        
        const tglAtivo = document.getElementById('toggle-ativo');
        if (tglAtivo) tglAtivo.checked = p.ativo;

    } else {
        // RESET TOTAL (Cenário Produto em Branco)
        document.getElementById('prod-nome').value = '';
        document.getElementById('prod-preco').value = '';
        document.getElementById('prod-desc').value = '';
        
        const promoInput = document.querySelector('#campo-promo input[type="number"]');
        if (promoInput) promoInput.value = '';
        if (checkPromo) checkPromo.checked = false;
        if (campoPromo) campoPromo.classList.add('opacity-30', 'pointer-events-none');
        
        document.getElementById('textoCategoria').innerText = 'Escolher categoria...';
        document.getElementById('prod-categoria').value = '';
        document.getElementById('textoCategoria').classList.add('text-slate-400');
        document.getElementById('textoCategoria').classList.remove('text-[#0F172A]');
        
        const toggleStockEl = document.getElementById('toggle-stock');
        if (toggleStockEl) toggleStockEl.checked = false;
        const areaQtd = document.getElementById('area-quantidade');
        if (areaQtd) areaQtd.style.display = 'none';
        document.getElementById('prod-stock-qtd').value = '';
        
        const tglAtivo = document.getElementById('toggle-ativo');
        if (tglAtivo) tglAtivo.checked = true;

        ['container-cores', 'container-tamanhos', 'container-numeracao'].forEach(id => {
            const c = document.getElementById(id);
            if (c) c.querySelectorAll('button').forEach(b => b.classList.remove('chip-selected'));
        });
    }

    // ==========================================
    // NOVA VALIDAÇÃO DO BOTÃO "PUBLICAR" E ESTADO
    // ==========================================
    const toggleAtivo = document.getElementById('toggle-ativo');
    const btnMain = document.getElementById('btn-main-action');
    const nomeInput = document.getElementById('prod-nome');
    const precoInput = document.getElementById('prod-preco');
    
    window.validarFormularioProduto = function() {
        if (!btnMain) return;
        const nome = document.getElementById('prod-nome')?.value.trim() || '';
        const preco = parseFloat(document.getElementById('prod-preco')?.value) || 0;
        const isAtivo = toggleAtivo ? toggleAtivo.checked : true;
        
        const texto = btnMain.querySelector('span');
        const icone = btnMain.querySelector('i');
        
        // Define os textos base
        if (isAtivo) {
            texto.innerText = isEdicao ? "Guardar Alterações" : "Publicar Produto";
            icone.className = "fas fa-check text-sm";
        } else {
            texto.innerText = "Guardar Rascunho";
            icone.className = "fas fa-archive text-sm";
        }
        
        if (nome.length > 2 && preco > 0) {
            btnMain.disabled = false;
            // Estado Ativado e Válido harmonioso
            if (isAtivo) {
                btnMain.className = "w-full bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-[12px]";
            } else {
                btnMain.className = "w-full bg-slate-500 text-white font-bold py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-[12px]";
            }
        } else {
            // Estado Bloqueado mais limpo
            btnMain.disabled = true;
            btnMain.className = "w-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 font-bold py-3.5 rounded-xl pointer-events-none transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-[12px]";
        }
    };

    if (toggleAtivo && btnMain) {
        toggleAtivo.addEventListener('change', window.validarFormularioProduto);
    }
    if (nomeInput) nomeInput.addEventListener('input', window.validarFormularioProduto);
    if (precoInput) precoInput.addEventListener('input', window.validarFormularioProduto);
    
    // Correr verificação inicial para acertar estilo apagado no início (ou ativo dependendo da edição)
    window.validarFormularioProduto();
}
