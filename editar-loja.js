document.body.insertAdjacentHTML('beforeend', `
   <template id="tpl-editar-loja">
        <div class="pt-24 px-4 sm:px-6 main-wrapper pb-24 bg-[#F1F5F9] dark:bg-[#020617] min-h-screen">
            <div class="max-w-2xl mx-auto space-y-6">

                <!-- APARÊNCIA -->
                <details class="group/acc bg-white dark:bg-navy-900 rounded-xl shadow-sm border border-slate-200 dark:border-navy-800 overflow-hidden">
                    <summary class="p-4 bg-slate-50/50 dark:bg-navy-800/20 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between outline-none transition-colors hover:bg-slate-100 dark:hover:bg-navy-800/50">
                        <h3 class="text-[14px] font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
                            <i class="fa-solid fa-image text-slate-400"></i> Aparência
                        </h3>
                        <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 group-open/acc:rotate-180"></i>
                    </summary>
                    <div class="p-5 sm:p-6 space-y-5 border-t border-slate-100 dark:border-navy-800">
                        <div>
                            <label class="block text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2">Banner Principal</label>
                            <input type="file" id="input-banner" accept="image/*" class="hidden" onchange="mudarBanner(event)">
                            <div id="area-banner" class="w-full h-32 md:h-48 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative overflow-hidden group" onclick="document.getElementById('input-banner').click()">
                                <div id="banner-placeholder" class="flex flex-col items-center justify-center text-slate-400">
                                    <i class="fa-solid fa-cloud-arrow-up text-2xl mb-2 group-hover:scale-110 transition-transform text-slate-400"></i>
                                    <span class="text-[12px] font-medium">Clique para carregar imagem</span>
                                    <span class="text-[10px] text-slate-400 mt-1">JPG, PNG ou WEBP</span>
                                </div>
                                <img id="banner-preview" class="absolute inset-0 w-full h-full object-cover hidden" src="" />
                                <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden" id="banner-hover">
                                    <i class="fa-solid fa-camera text-white text-xl mb-1"></i>
                                    <span class="text-white text-[11px] font-medium">Trocar Imagem</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Texto do Botão no Banner</label>
                            <input type="text" id="input-banner-botao" placeholder="Ex: Ver Coleção" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm">
                        </div>
                    </div>
                </details>

                <!-- INFORMAÇÕES GERAIS -->
                <details class="group/acc bg-white dark:bg-navy-900 rounded-xl shadow-sm border border-slate-200 dark:border-navy-800 overflow-hidden">
                    <summary class="p-4 bg-slate-50/50 dark:bg-navy-800/20 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between outline-none transition-colors hover:bg-slate-100 dark:hover:bg-navy-800/50">
                        <h3 class="text-[14px] font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
                            <i class="fa-solid fa-circle-info text-slate-400"></i> Informações Gerais
                        </h3>
                        <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 group-open/acc:rotate-180"></i>
                    </summary>
                    <div class="p-5 sm:p-6 space-y-5 border-t border-slate-100 dark:border-navy-800">
                        <div>
                            <label class="block text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nome da Loja <span class="text-red-500">*</span></label>
                            <input type="text" id="input-loja-nome" placeholder="Nome da sua loja" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm">
                        </div>
                        <div>
                            <label class="block text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Descrição</label>
                            <textarea id="input-loja-desc" rows="3" placeholder="A minha loja especializa-se em..." class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none shadow-sm"></textarea>
                        </div>
                        <div>
                            <label class="block text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">WhatsApp (Contacto de Vendas) <span class="text-red-500">*</span></label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <i class="fa-brands fa-whatsapp"></i>
                                </span>
                                <input type="tel" id="input-loja-whatsapp" placeholder="+258 84 000 0000" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-9 pr-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm">
                            </div>
                        </div>
                    </div>
                </details>

          

                <!-- PÁGINAS INSTITUCIONAIS -->
                <div class="bg-white dark:bg-navy-900 rounded-xl shadow-sm border border-slate-200 dark:border-navy-800 overflow-hidden">
                    <div class="p-4 border-b border-slate-100 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-800/20">
                        <h3 class="text-[14px] font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
                            <i class="fa-solid fa-file-lines text-slate-400"></i> Páginas Legais e Políticas
                        </h3>
                    </div>
                    <div class="p-0">
                        
                        <!-- Item: Sobre -->
                        <div class="border-b border-slate-100 dark:border-navy-800 last:border-0 p-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="text-[13px] font-semibold text-slate-800 dark:text-white">Sobre a Loja</h4>
                                    <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">História e visão da sua marca.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-sobre" class="sr-only peer" onchange="toggleSecaoExtra('sobre')">
                                    <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-sobre" class="hidden mt-4">
                                <textarea id="input-loja-sobre" rows="3" placeholder="Escreva sobre nós..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"></textarea>
                            </div>
                        </div>

                        <!-- Item: Entrega -->
                        <div class="border-b border-slate-100 dark:border-navy-800 last:border-0 p-5 sm:px-6 cursor-default">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="text-[13px] font-semibold text-slate-800 dark:text-white">Política de Entrega</h4>
                                    <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Prazos e métodos de envio.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-entrega" class="sr-only peer" onchange="toggleSecaoExtra('entrega')">
                                    <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-entrega" class="hidden mt-4">
                                <textarea id="input-loja-entrega" rows="3" placeholder="Detalhes da entrega, locais de levantamento..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"></textarea>
                            </div>
                        </div>

                        <!-- Item: Termos -->
                        <div class="border-b border-slate-100 dark:border-navy-800 last:border-0 p-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="text-[13px] font-semibold text-slate-800 dark:text-white">Termos e Condições</h4>
                                    <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Regras, devoluções e garantias.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-termos" class="sr-only peer" onchange="toggleSecaoExtra('termos')">
                                    <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-termos" class="hidden mt-4">
                                <textarea id="input-loja-termos" rows="3" placeholder="Condições gerais de serviço..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"></textarea>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- REDES SOCIAIS -->
                <div class="bg-white dark:bg-navy-900 rounded-xl shadow-sm border border-slate-200 dark:border-navy-800 overflow-hidden">
                    <div class="p-4 border-b border-slate-100 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-800/20">
                        <h3 class="text-[14px] font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
                            <i class="fa-solid fa-hashtag text-slate-400"></i> Redes Sociais
                        </h3>
                    </div>
                    <div class="p-5 sm:p-6 space-y-4">
                        
                        <!-- Instagram -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-[13px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <i class="fa-brands fa-instagram text-pink-500 w-4"></i> Instagram
                                </label>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-instagram" class="sr-only peer" onchange="toggleSecaoExtra('instagram')">
                                    <div class="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-instagram" class="hidden transition-all mt-2.5">
                                <input type="url" id="input-loja-instagram" placeholder="https://instagram.com/..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all">
                            </div>
                        </div>

                        <!-- Facebook -->
                        <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-[13px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <i class="fa-brands fa-facebook text-blue-600 w-4"></i> Facebook
                                </label>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-facebook" class="sr-only peer" onchange="toggleSecaoExtra('facebook')">
                                    <div class="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-facebook" class="hidden transition-all mt-2.5">
                                <input type="url" id="input-loja-facebook" placeholder="https://facebook.com/..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all">
                            </div>
                        </div>

                        <!-- TikTok -->
                        <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-[13px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <i class="fa-brands fa-tiktok text-slate-900 dark:text-white w-4"></i> TikTok
                                </label>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-tiktok" class="sr-only peer" onchange="toggleSecaoExtra('tiktok')">
                                    <div class="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-tiktok" class="hidden transition-all mt-2.5">
                                <input type="url" id="input-loja-tiktok" placeholder="https://tiktok.com/@..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all">
                            </div>
                        </div>

                    </div>
                </div>

                <div class="pt-2 pb-6">
                    <button id="btn-salvar-loja" onclick="salvarEdicaoLoja()" class="w-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-3.5 rounded-xl text-[13px] font-bold shadow-sm transition-all focus:ring-4 focus:ring-slate-900/20 active:scale-[0.98]">
                        Guardar Alterações
                    </button>
                </div>

            </div>
        </div>
    </template> 
`);

// ─── FUNÇÃO AUXILIAR PARA MOSTRAR/OCULTAR CAIXAS DE PÁGINAS ───
window.toggleSecaoExtra = function(secao) {
    const check = document.getElementById('toggle-' + secao);
    const area = document.getElementById('area-' + secao);
    if (!check || !area) return;
    
    if (check.checked) {
        area.classList.remove('hidden');
    } else {
        area.classList.add('hidden');
    }
}

// ─── LÓGICA DE DADOS ───

let memoriaEditarLoja = null;
let bannerUploadAtivo = null;

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'editar-loja') {
        if (!memoriaEditarLoja) {
            carregarDadosEditarLoja();
        } else {
            preencherFormularioEditarLoja(memoriaEditarLoja);
        }
        
        // MÁGICA TEMPO REAL: Guarda o que estás a escrever sem salvar na BD (evita perdas)
        setTimeout(() => {
            const idsInputs = ['input-loja-nome', 'input-loja-desc', 'input-loja-whatsapp', 'input-banner-botao', 'input-loja-sobre', 'input-loja-entrega', 'input-loja-termos', 'input-loja-instagram', 'input-loja-facebook', 'input-loja-tiktok'];
            idsInputs.forEach(id => {
                const elemento = document.getElementById(id);
                if (elemento) {
                    elemento.addEventListener('input', (event) => {
                        if (memoriaEditarLoja) {
                            if (id === 'input-loja-nome') memoriaEditarLoja.nome = event.target.value;
                            if (id === 'input-loja-desc') memoriaEditarLoja.descricao = event.target.value;
                            if (id === 'input-loja-whatsapp') memoriaEditarLoja.whatsapp = event.target.value;
                            if (id === 'input-banner-botao') memoriaEditarLoja.banner_botao = event.target.value;
                            if (id === 'input-loja-sobre') memoriaEditarLoja.conteudo_sobre = event.target.value;
                            if (id === 'input-loja-entrega') memoriaEditarLoja.conteudo_entrega = event.target.value;
                            if (id === 'input-loja-termos') memoriaEditarLoja.conteudo_termos = event.target.value;
                            if (id === 'input-loja-instagram') memoriaEditarLoja.instagram = event.target.value;
                            if (id === 'input-loja-facebook') memoriaEditarLoja.facebook = event.target.value;
                            if (id === 'input-loja-tiktok') memoriaEditarLoja.tiktok = event.target.value;
                        }
                    });
                }
            });

            // Guarda se escolheste LIGAR/DESLIGAR as páginas e as redes sociais
            const idsToggles = ['toggle-sobre', 'toggle-entrega', 'toggle-termos', 'toggle-instagram', 'toggle-facebook', 'toggle-tiktok'];
            idsToggles.forEach(id => {
                const elemento = document.getElementById(id);
                if (elemento) {
                    elemento.addEventListener('change', (event) => {
                        if (memoriaEditarLoja) {
                            if (id === 'toggle-sobre') memoriaEditarLoja.mostrar_sobre = event.target.checked;
                            if (id === 'toggle-entrega') memoriaEditarLoja.mostrar_entrega = event.target.checked;
                            if (id === 'toggle-termos') memoriaEditarLoja.mostrar_termos = event.target.checked;
                            if (id === 'toggle-instagram') memoriaEditarLoja.mostrar_instagram = event.target.checked;
                            if (id === 'toggle-facebook') memoriaEditarLoja.mostrar_facebook = event.target.checked;
                            if (id === 'toggle-tiktok') memoriaEditarLoja.mostrar_tiktok = event.target.checked;
                        }
                    });
                }
            });
        }, 100);
    }
});

async function carregarDadosEditarLoja() {
    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (userId) {
            const { data: loja } = await window.supabaseClient
                .from('lojas')
                .select('*')
                .eq('perfil_id', userId)
                .single();
                
            if (loja) {
                memoriaEditarLoja = loja;
                preencherFormularioEditarLoja(loja);
            }
        }
    } catch (e) {
        console.error("Erro ao carregar dados da loja:", e);
    }
}

function preencherFormularioEditarLoja(loja) {
    // 1. Dados Básicos da Loja
    const nomeEl = document.getElementById('input-loja-nome');
    const descEl = document.getElementById('input-loja-desc');
    const zapEl = document.getElementById('input-loja-whatsapp');
    const btnEl = document.getElementById('input-banner-botao');
    
    if (nomeEl) nomeEl.value = loja.nome || '';
    if (descEl) descEl.value = loja.descricao || '';
    if (zapEl) zapEl.value = loja.whatsapp || '';
    if (btnEl) btnEl.value = loja.banner_botao || '';

    // 2. Preenchimento Dinâmico (Toggles e Textos Opcionais)
    const chkSobre = document.getElementById('toggle-sobre');
    const txtSobre = document.getElementById('input-loja-sobre');
    if (chkSobre) { chkSobre.checked = loja.mostrar_sobre === true; window.toggleSecaoExtra('sobre'); }
    if (txtSobre) txtSobre.value = loja.conteudo_sobre || '';

    const chkEntrega = document.getElementById('toggle-entrega');
    const txtEntrega = document.getElementById('input-loja-entrega');
    if (chkEntrega) { chkEntrega.checked = loja.mostrar_entrega === true; window.toggleSecaoExtra('entrega'); }
    if (txtEntrega) txtEntrega.value = loja.conteudo_entrega || '';

    const chkTermos = document.getElementById('toggle-termos');
    const txtTermos = document.getElementById('input-loja-termos');
    if (chkTermos) { chkTermos.checked = loja.mostrar_termos === true; window.toggleSecaoExtra('termos'); }
    if (txtTermos) txtTermos.value = loja.conteudo_termos || '';
    
    // Novas Redes Sociais
    const chkInstagram = document.getElementById('toggle-instagram');
    const txtInstagram = document.getElementById('input-loja-instagram');
    if (chkInstagram) { chkInstagram.checked = loja.mostrar_instagram === true; window.toggleSecaoExtra('instagram'); }
    if (txtInstagram) txtInstagram.value = loja.instagram || '';

    const chkFacebook = document.getElementById('toggle-facebook');
    const txtFacebook = document.getElementById('input-loja-facebook');
    if (chkFacebook) { chkFacebook.checked = loja.mostrar_facebook === true; window.toggleSecaoExtra('facebook'); }
    if (txtFacebook) txtFacebook.value = loja.facebook || '';

    const chkTiktok = document.getElementById('toggle-tiktok');
    const txtTiktok = document.getElementById('input-loja-tiktok');
    if (chkTiktok) { chkTiktok.checked = loja.mostrar_tiktok === true; window.toggleSecaoExtra('tiktok'); }
    if (txtTiktok) txtTiktok.value = loja.tiktok || '';
    
    // 3. Preenchimento de Banner Image
    const preview = document.getElementById('banner-preview');
    const placeholder = document.getElementById('banner-placeholder');
    const hover = document.getElementById('banner-hover');
    
    const bannerMostrar = bannerUploadAtivo || loja.banner_url;
    
    if (bannerMostrar && preview) {
        preview.src = bannerMostrar;
        preview.classList.remove('hidden');
        if (placeholder) placeholder.classList.add('hidden');
        if (hover) hover.classList.remove('hidden');
    }
}

function mudarBanner(event) {
    const ficheiro = event.target.files[0];
    if (!ficheiro) return;
    
    const leitor = new FileReader();
    leitor.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const cw = 800; // Resolução otimizada
            const ch = 400; 
            canvas.width = cw;
            canvas.height = ch;
            
            const scale = Math.max(cw / img.width, ch / img.height);
            const x = (cw / 2) - (img.width / 2) * scale;
            const y = (ch / 2) - (img.height / 2) * scale;
            
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            const base64Url = canvas.toDataURL('image/webp', 0.85); 
            
            const preview = document.getElementById('banner-preview');
            const placeholder = document.getElementById('banner-placeholder');
            const hover = document.getElementById('banner-hover');
            
            preview.src = base64Url;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
            hover.classList.remove('hidden');
            
            bannerUploadAtivo = base64Url;
        };
    };
    leitor.readAsDataURL(ficheiro);
}

async function salvarEdicaoLoja() {
    const btn = document.getElementById('btn-salvar-loja');
    
    const nome = document.getElementById('input-loja-nome').value.trim();
    const desc = document.getElementById('input-loja-desc').value.trim();
    const zap = document.getElementById('input-loja-whatsapp').value.trim();
    const btnTexto = document.getElementById('input-banner-botao').value.trim();
    
    if (!nome || !zap) {
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('Nome e WhatsApp são obrigatórios!');
        else alert("Nome e WhatsApp são obrigatórios!");
        return;
    }
    
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> A atualizar...';
    btn.disabled = true;
    
    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        let payload = {
            nome: nome,
            descricao: desc,
            whatsapp: zap,
            banner_botao: btnTexto,
            
            // Novos campos recolhidos
            mostrar_sobre: document.getElementById('toggle-sobre')?.checked || false,
            conteudo_sobre: document.getElementById('input-loja-sobre')?.value || null,
            mostrar_entrega: document.getElementById('toggle-entrega')?.checked || false,
            conteudo_entrega: document.getElementById('input-loja-entrega')?.value || null,
            mostrar_termos: document.getElementById('toggle-termos')?.checked || false,
            conteudo_termos: document.getElementById('input-loja-termos')?.value || null,
            mostrar_instagram: document.getElementById('toggle-instagram')?.checked || false,
            instagram: document.getElementById('input-loja-instagram')?.value || null,
            mostrar_facebook: document.getElementById('toggle-facebook')?.checked || false,
            facebook: document.getElementById('input-loja-facebook')?.value || null,
            mostrar_tiktok: document.getElementById('toggle-tiktok')?.checked || false,
            tiktok: document.getElementById('input-loja-tiktok')?.value || null
        };
        
        if (bannerUploadAtivo) payload.banner_url = bannerUploadAtivo; 

        const { error } = await window.supabaseClient.from('lojas').update(payload).eq('perfil_id', userId);
        
        if (error) throw error; 
        
        if (typeof window.forcarAtualizacaoDashboard === 'function') window.forcarAtualizacaoDashboard();
        
        btn.innerHTML = 'Guardado com Sucesso ✓';
        btn.classList.replace('bg-slate-900', 'bg-emerald-500');
        btn.classList.replace('dark:bg-white', 'dark:bg-emerald-500');
        
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('A tua loja foi atualizada!');
        
        setTimeout(() => {
            btn.innerHTML = 'Guardar Alterações';
            btn.classList.replace('bg-emerald-500', 'bg-slate-900');
            btn.classList.replace('dark:bg-emerald-500', 'dark:bg-white');
            btn.disabled = false;
        }, 2500);
        
    } catch (err) {
        console.error("Erro detetado:", err);
        btn.innerHTML = 'Falha ao Guardar';
        
        // 🔴 ALERTA VERMELHO: Lista EXATA do que falta nas colunas do Supabase!
        alert("Ocorreu o erro:\n" + (err.message || 'Erro desconhecido') + "\n\n🔴 VERIFICA O SUPABASE NA TABELA 'lojas':\nDeves ter as colunas bool:\n- mostrar_sobre\n- mostrar_entrega\n- mostrar_termos\n- mostrar_instagram\n- mostrar_facebook\n- mostrar_tiktok");

        setTimeout(() => {
            btn.innerHTML = 'Tentar Novamente';
            btn.disabled = false;
        }, 4000);
    }
}