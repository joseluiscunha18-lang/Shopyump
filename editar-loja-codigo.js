/* 
1. CÓDIGO PARA SUBSTITUIR O TEMPLATE HTML DA TELA "EDITAR LOJA" 
(Apaga o antigo template "tpl-editar-loja" do teu ficheiro HTML ou JS e coloca este)
*/
document.body.insertAdjacentHTML('beforeend', \`
    <template id="tpl-editar-loja">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-6">
                <!-- Seção do Banner -->
                <div class="sf-card p-6 space-y-4">
                    <h3 class="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Banner da Loja</h3>
                    <p class="text-[11px] text-slate-500 font-medium">Personaliza a imagem principal que os teus clientes encontram ao abrir a loja.</p>
                    
                    <input type="file" id="input-banner" accept="image/*" class="hidden" onchange="mudarBanner(event)">
                    <div id="area-banner" class="w-full h-40 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors relative overflow-hidden group" onclick="document.getElementById('input-banner').click()">
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
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Nome do Botão no Banner</label>
                        <input type="text" id="input-banner-botao" placeholder="Ex: Ver Coleção" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all">
                    </div>
                </div>

                <!-- Informações Básicas -->
                <div class="sf-card p-6 space-y-5">
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Nome da Loja</label>
                        <input type="text" id="input-loja-nome" placeholder="Carregando..." class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Descrição da Loja</label>
                        <textarea id="input-loja-desc" rows="3" placeholder="Descreve a tua loja aos clientes..." class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all resize-none"></textarea>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">WhatsApp (Onde recebes pedidos)</label>
                        <input type="tel" id="input-loja-whatsapp" placeholder="+258 84 000 0000" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all">
                    </div>
                </div>
                
                <button id="btn-salvar-loja" onclick="salvarEdicaoLoja()" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-xs font-black shadow-lg uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-save text-sm"></i> Guardar Alterações
                </button>
            </div>
        </div>
    </template>
\`);

/* 
2. LÓGICA DE DADOS (Junta no final do teu arquivo loja.js ou onde estavas a gerir o evento de carregamento do template) 
*/

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'editar-loja') {
        carregarDadosEditarLoja();
    }
});

let bannerUploadAtivo = null;

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
                // Preenche os inputs se houver dados
                document.getElementById('input-loja-nome').value = loja.nome || '';
                document.getElementById('input-loja-desc').value = loja.descricao || '';
                document.getElementById('input-loja-whatsapp').value = loja.whatsapp || '';
                
                // Se a loja tiver banner customizado (base64 ou url da BD)
                if (loja.banner_url) {
                    const preview = document.getElementById('banner-preview');
                    const placeholder = document.getElementById('banner-placeholder');
                    const hover = document.getElementById('banner-hover');
                    
                    preview.src = loja.banner_url;
                    preview.classList.remove('hidden');
                    placeholder.classList.add('hidden');
                    hover.classList.remove('hidden');
                }
                
                if (loja.banner_botao) {
                    document.getElementById('input-banner-botao').value = loja.banner_botao;
                }
            }
        }
    } catch (e) {
        console.error("Erro ao carregar os dados para editar a loja:", e);
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
            // Conversão para webp mais leve
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // O target dimension para banner 800x400
            const cw = 800;
            const ch = 400;
            canvas.width = cw;
            canvas.height = ch;
            
            // Scaled Cover
            const scale = Math.max(cw / img.width, ch / img.height);
            const x = (cw / 2) - (img.width / 2) * scale;
            const y = (ch / 2) - (img.height / 2) * scale;
            
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            const base64Url = canvas.toDataURL('image/webp', 0.85);
            
            // Atualiza UI
            const preview = document.getElementById('banner-preview');
            const placeholder = document.getElementById('banner-placeholder');
            const hover = document.getElementById('banner-hover');
            
            preview.src = base64Url;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
            hover.classList.remove('hidden');
            
            // Variável pronta para subir pro Supabase Storage ou diretamente em base64 string
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
        if (typeof mostrarNotificacao === 'function') {
            mostrarNotificacao('Prenche o Nome e WhatsApp!');
        } else {
            alert("Nome e WhatsApp são obrigatórios!");
        }
        return;
    }
    
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> A atualizar...';
    btn.disabled = true;
    
    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        let payload = {
            nome: nome,
            descricao: desc,
            whatsapp: zap,
            banner_botao: btnTexto
        };
        
        // Se a pessoa colocou nova foto!
        if (bannerUploadAtivo) {
            payload.banner_url = bannerUploadAtivo; 
        }

        const { error } = await window.supabaseClient
            .from('lojas')
            .update(payload)
            .eq('perfil_id', userId);
            
        if (error) throw error;
        
        // Se a Home ou Memória precisar saber q atualizamos
        if (typeof window.forcarAtualizacaoDashboard === 'function') {
            window.forcarAtualizacaoDashboard();
        }
        
        btn.innerHTML = '✓ Guardado com Sucesso';
        btn.classList.replace('bg-slate-900', 'bg-emerald-500');
        btn.classList.replace('dark:bg-white', 'dark:bg-emerald-500');
        btn.classList.replace('text-white', 'text-white');
        
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('A tua loja foi atualizada!');
        
        // Reset Visual
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-save text-sm"></i> Guardar Alterações';
            btn.classList.replace('bg-emerald-500', 'bg-slate-900');
            btn.classList.replace('dark:bg-emerald-500', 'dark:bg-white');
            btn.disabled = false;
        }, 2000);
        
    } catch (err) {
        console.error("Erro ao gravar:", err);
        btn.innerHTML = 'Falha ao Guardar';
        btn.classList.replace('bg-slate-900', 'bg-red-500');
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-save text-sm"></i> Tentar Novamente';
            btn.classList.replace('bg-red-500', 'bg-slate-900');
            btn.disabled = false;
        }, 2000);
    }
}
