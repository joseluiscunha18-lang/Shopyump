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
                
                <button id="btn-salvar-loja" onclick="salvarEdicaoLoja()" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-xs font-black shadow-lg uppercase tracking-widest active:scale-[0.98] transition-all">
                    Guardar Alterações
                </button>
            </div>
        </div>
    </template>
`);

// ─── LÓGICA DE DADOS (Junta automaticamente logo a seguir ao template) ───

let memoriaEditarLoja = null;
let bannerUploadAtivo = null;

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'editar-loja') {
        // Se ainda não carregou, vai à base de dados. Se já carregou, usa a memória rápida.
        if (!memoriaEditarLoja) {
            carregarDadosEditarLoja();
        } else {
            preencherFormularioEditarLoja(memoriaEditarLoja);
        }
        
        // MÁGICA: Guarda os dados temporários na memória enquanto escreves, para nunca perderes o teu progresso
        setTimeout(() => {
            const idsInputs = ['input-loja-nome', 'input-loja-desc', 'input-loja-whatsapp', 'input-banner-botao'];
            idsInputs.forEach(id => {
                const elemento = document.getElementById(id);
                if (elemento) {
                    elemento.addEventListener('input', (event) => {
                        if (memoriaEditarLoja) {
                            if (id === 'input-loja-nome') memoriaEditarLoja.nome = event.target.value;
                            if (id === 'input-loja-desc') memoriaEditarLoja.descricao = event.target.value;
                            if (id === 'input-loja-whatsapp') memoriaEditarLoja.whatsapp = event.target.value;
                            if (id === 'input-banner-botao') memoriaEditarLoja.banner_botao = event.target.value;
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
    const nomeEl = document.getElementById('input-loja-nome');
    const descEl = document.getElementById('input-loja-desc');
    const zapEl = document.getElementById('input-loja-whatsapp');
    const btnEl = document.getElementById('input-banner-botao');
    
    if (nomeEl) nomeEl.value = loja.nome || '';
    if (descEl) descEl.value = loja.descricao || '';
    if (zapEl) zapEl.value = loja.whatsapp || '';
    if (btnEl) btnEl.value = loja.banner_botao || '';
    
    const preview = document.getElementById('banner-preview');
    const placeholder = document.getElementById('banner-placeholder');
    const hover = document.getElementById('banner-hover');
    
    // Se trocaste o banner e voltaste antes de salvar, ele mostra a imagem do teu rascunho
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
            // Recorta e Otimiza a Imagem 
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const cw = 800; // Resolução recomendada
            const ch = 400; 
            canvas.width = cw;
            canvas.height = ch;
            
            const scale = Math.max(cw / img.width, ch / img.height);
            const x = (cw / 2) - (img.width / 2) * scale;
            const y = (ch / 2) - (img.height / 2) * scale;
            
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            const base64Url = canvas.toDataURL('image/webp', 0.85); // Otimiza para Base de dados 
            
            const preview = document.getElementById('banner-preview');
            const placeholder = document.getElementById('banner-placeholder');
            const hover = document.getElementById('banner-hover');
            
            preview.src = base64Url;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
            hover.classList.remove('hidden');
            
            bannerUploadAtivo = base64Url; // Guarda a info para salvar
        };
    };
    leitor.readAsDataURL(ficheiro);
}

async function salvarEdicaoLoja() {
    const btn = document.getElementById('btn-salvar-loja');
    
    // 1. Pega os valores dos inputs
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
        
        // 2. Prepara os dados para ir para a base de dados
        let payload = {
            nome: nome,
            descricao: desc,
            whatsapp: zap,
            banner_botao: btnTexto
        };
        
        // Se escolheste uma foto, adiciona ao pacote
        if (bannerUploadAtivo) { 
            payload.banner_url = bannerUploadAtivo; 
        }

        // 3. Comunica com o Supabase
        const { error } = await window.supabaseClient.from('lojas').update(payload).eq('perfil_id', userId);
        
        // Se houver BOOM no Supabase, nós interceptamos!
        if (error) {
            throw error; 
        }
        
        // Sucesso maravilhoso
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
        
        // 🔴 AQUI ESTÁ A MAGIA DE DEBUB: Vai mostrar ao utilizador a Falha Exata
        alert("Ocorreu o seguinte erro na Base de Dados:\\n\\n" + err.message + "\\n\\n🔴 DICA: Vai ao teu painel do Supabase, entra na tabela 'lojas' e certifica-te de que criaste as seguintes colunas (do tipo Text ou Varchar):\\n1. banner_url\\n2. banner_botao\\n3. descricao");

        setTimeout(() => {
            btn.innerHTML = 'Tentar Novamente';
            btn.disabled = false;
        }, 4000);
    }
}
