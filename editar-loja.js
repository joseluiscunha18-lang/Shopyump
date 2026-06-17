document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-editar-loja">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-6">
                <!-- Seção Nova do Banner -->
                <div class="sf-card p-6 space-y-4">
                    <h3 class="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Banner da Loja</h3>
                    <p class="text-[11px] text-slate-500 font-medium">Adiciona uma imagem principal e personaliza o botão que o cliente vai ver.</p>
                    
                    <input type="file" id="input-banner" accept="image/*" class="hidden" onchange="mudarBanner(event)">
                    <div id="area-banner" class="w-full h-40 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors relative overflow-hidden group" onclick="document.getElementById('input-banner').click()">
                        <div id="banner-placeholder" class="flex flex-col items-center justify-center text-slate-400">
                            <i class="fa-solid fa-camera text-2xl mb-2 group-hover:scale-110 transition-transform"></i>
                            <span class="text-[11px] font-bold">Tocar para adicionar banner</span>
                        </div>
                        <img id="banner-preview" class="absolute inset-0 w-full h-full object-cover hidden" src="" />
                        <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden" id="banner-hover">
                            <i class="fa-solid fa-pen text-white text-xl mb-1"></i>
                            <span class="text-white text-[10px] font-bold">Alterar Banner</span>
                        </div>
                    </div>

                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block mt-4">Nome do Botão no Banner</label>
                        <input type="text" id="input-banner-botao" placeholder="Ex: Ver Coleção" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all">
                    </div>
                </div>

                <!-- Informações Básicas da Loja -->
                <div class="sf-card p-6 space-y-5">
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Nome da Loja</label>
                        <input type="text" id="input-loja-nome" placeholder="A carregar..." class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Descrição da Loja</label>
                        <textarea id="input-loja-desc" rows="3" placeholder="Descreve a tua loja..." class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all resize-none"></textarea>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">WhatsApp de Contacto</label>
                        <input type="tel" id="input-loja-whatsapp" placeholder="+258 84 000 0000" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all">
                    </div>
                </div>

                <!-- Páginas Institucionais (Sobre, Entrega, Termos) -->
                <div class="sf-card p-6 space-y-6">
                    <div class="space-y-1 relative">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Páginas da Loja</h3>
                                <p class="text-[10px] text-slate-500 font-medium mt-1">Configura as páginas que devem aparecer no menu da tua loja.</p>
                            </div>
                        </div>

                        <!-- Sobre a Loja -->
                        <div class="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/50 mb-3">
                            <div class="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 dark:border-slate-700 text-sm">
                                        <i class="fas fa-info-circle"></i>
                                    </div>
                                    <span class="text-[12px] font-bold text-slate-900 dark:text-white">Sobre a Loja</span>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-sobre" class="sr-only peer" onchange="toggleSecaoExtra('sobre')">
                                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-sobre" class="hidden transition-all duration-300 relative">
                                <textarea id="input-loja-sobre" rows="4" placeholder="Conta um pouco a história e visão da tua loja..." class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all resize-none"></textarea>
                            </div>
                        </div>

                        <!-- Política de Entrega -->
                        <div class="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/50 mb-3">
                            <div class="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 dark:border-slate-700 text-sm">
                                        <i class="fas fa-truck"></i>
                                    </div>
                                    <span class="text-[12px] font-bold text-slate-900 dark:text-white">Política de Entrega</span>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-entrega" class="sr-only peer" onchange="toggleSecaoExtra('entrega')">
                                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-entrega" class="hidden transition-all duration-300 relative">
                                <textarea id="input-loja-entrega" rows="4" placeholder="Explica os teus métodos e prazos de entrega..." class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all resize-none"></textarea>
                            </div>
                        </div>

                        <!-- Termos e Condições -->
                        <div class="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/50">
                            <div class="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 dark:border-slate-700 text-sm">
                                        <i class="fas fa-file-contract"></i>
                                    </div>
                                    <span class="text-[12px] font-bold text-slate-900 dark:text-white">Termos e Condições</span>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-termos" class="sr-only peer" onchange="toggleSecaoExtra('termos')">
                                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div id="area-termos" class="hidden transition-all duration-300 relative">
                                <textarea id="input-loja-termos" rows="4" placeholder="Condições, devoluções e garantias de uso da tua loja..." class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all resize-none"></textarea>
                            </div>
                        </div>

                    </div>
                </div>

                <button id="btn-salvar-loja" onclick="salvarEdicaoLoja()" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 mb-2 rounded-xl text-xs font-black shadow-lg uppercase tracking-widest active:scale-[0.98] transition-all">
                    Guardar Alterações
                </button>
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
            const idsInputs = ['input-loja-nome', 'input-loja-desc', 'input-loja-whatsapp', 'input-banner-botao', 'input-loja-sobre', 'input-loja-entrega', 'input-loja-termos'];
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
                        }
                    });
                }
            });

            // Guarda se escolheste LIGAR/DESLIGAR as páginas
            const idsToggles = ['toggle-sobre', 'toggle-entrega', 'toggle-termos'];
            idsToggles.forEach(id => {
                const elemento = document.getElementById(id);
                if (elemento) {
                    elemento.addEventListener('change', (event) => {
                        if (memoriaEditarLoja) {
                            if (id === 'toggle-sobre') memoriaEditarLoja.mostrar_sobre = event.target.checked;
                            if (id === 'toggle-entrega') memoriaEditarLoja.mostrar_entrega = event.target.checked;
                            if (id === 'toggle-termos') memoriaEditarLoja.mostrar_termos = event.target.checked;
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
            conteudo_termos: document.getElementById('input-loja-termos')?.value || null
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
        alert("Ocorreu o seguinte erro ao guardar na Base de Dados:\n\n" + (err.message || 'Erro desconhecido') + "\n\n🔴 ATENÇÃO LOJISTA - VERIFICA O SUPABASE:\nVai à tabela 'lojas' e cria estas colunas em falta:\n1. mostrar_sobre (Boolean ou bool)\n2. conteudo_sobre (Text)\n3. mostrar_entrega (Boolean ou bool)\n4. conteudo_entrega (Text)\n5. mostrar_termos (Boolean ou bool)\n6. conteudo_termos (Text)");

        setTimeout(() => {
            btn.innerHTML = 'Tentar Novamente';
            btn.disabled = false;
        }, 4000);
    }
}