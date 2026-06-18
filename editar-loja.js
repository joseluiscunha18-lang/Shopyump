document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-editar-loja">
        <div class="pt-20 pb-32 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen relative">
            
            <div class="sticky top-[60px] z-40 bg-[#f6f6f7]/90 dark:bg-[#0b0f1a]/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <div class="flex p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl">
                    <button onclick="mudarTabEditarLoja('aparencia')" id="btn-tab-aparencia" class="flex-1 py-2.5 text-[11px] font-black uppercase tracking-wider rounded-lg bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white transition-all">Aparência</button>
                    <button onclick="mudarTabEditarLoja('contactos')" id="btn-tab-contactos" class="flex-1 py-2.5 text-[11px] font-black uppercase tracking-wider rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 transition-all">Contactos</button>
                    <button onclick="mudarTabEditarLoja('informacoes')" id="btn-tab-informacoes" class="flex-1 py-2.5 text-[11px] font-black uppercase tracking-wider rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 transition-all">Informações</button>
                </div>
            </div>

            <div class="max-w-lg mx-auto px-6 mt-6">
                
                <div id="tab-aparencia" class="space-y-6 animate-fade-in">
                    
                    <div class="sf-card p-6 space-y-4 bg-white dark:bg-[#151a2a] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60">
                        <h3 class="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Banner da Loja</h3>
                        <p class="text-[11px] text-slate-500 font-medium">Imagem principal de destaque na tua loja.</p>
                        
                        <input type="file" id="input-banner" accept="image/*" class="hidden" onchange="mudarBanner(event)">
                        <div id="area-banner" class="w-full h-40 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors relative overflow-hidden group" onclick="document.getElementById('input-banner').click()">
                            <div id="banner-placeholder" class="flex flex-col items-center justify-center text-slate-400">
                                <i class="fa-solid fa-camera text-2xl mb-2"></i>
                                <span class="text-xs font-bold">Alterar Banner</span>
                            </div>
                            <img id="preview-banner" class="absolute inset-0 w-full h-full object-cover hidden" alt="Banner Preview">
                        </div>
                    </div>

                    <div class="sf-card p-6 space-y-5 bg-white dark:bg-[#151a2a] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60">
                        <div>
                            <label class="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">Nome da Loja</label>
                            <input type="text" id="input-nome-loja" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all" placeholder="Ex: A Minha Loja">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">Descrição Curta</label>
                            <textarea id="input-descricao-loja" rows="3" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all resize-none" placeholder="O que vendes? Ex: Roupa premium e acessórios."></textarea>
                        </div>
                    </div>
                </div>

                <div id="tab-contactos" class="space-y-6 hidden animate-fade-in">
                    <div class="sf-card p-6 space-y-5 bg-white dark:bg-[#151a2a] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60">
                        <div>
                            <label class="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2"><i class="fa-brands fa-whatsapp text-emerald-500 mr-1"></i> WhatsApp Oficial</label>
                            <input type="tel" id="input-whatsapp-loja" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="+258 ...">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2"><i class="fa-brands fa-instagram text-pink-500 mr-1"></i> Link Instagram</label>
                            <input type="url" id="input-instagram" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="https://instagram.com/tualoja">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2"><i class="fa-brands fa-facebook text-blue-500 mr-1"></i> Link Facebook</label>
                            <input type="url" id="input-facebook" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="https://facebook.com/tualoja">
                        </div>
                    </div>
                </div>

                <div id="tab-informacoes" class="space-y-6 hidden animate-fade-in">
                    <div class="sf-card p-6 space-y-5 bg-white dark:bg-[#151a2a] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60">
                        <div>
                            <label class="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">Sobre a Loja (Página Sobre)</label>
                            <textarea id="input-sobre-loja" rows="4" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all resize-none" placeholder="Conta a história da tua loja..."></textarea>
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">Política de Entregas</label>
                            <textarea id="input-entregas-loja" rows="4" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all resize-none" placeholder="Como funcionam os teus envios e entregas?"></textarea>
                        </div>
                    </div>
                </div>

            </div>

            <div class="fixed bottom-0 left-0 w-full p-5 bg-white/80 dark:bg-[#0b0f1a]/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 pb-8">
                <button id="btn-guardar-loja" onclick="guardarEdicaoLoja()" class="w-full max-w-lg mx-auto block py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-black uppercase tracking-widest rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-check"></i> Guardar Alterações
                </button>
            </div>

        </div>
    </template>
`);

// ==========================================
// LÓGICA DE INTERFACE (TABS)
// ==========================================
window.mudarTabEditarLoja = function(tabName) {
    const tabs = ['aparencia', 'contactos', 'informacoes'];
    
    tabs.forEach(tab => {
        // Controlar visibilidade do conteúdo
        const contentEl = document.getElementById(`tab-${tab}`);
        if (contentEl) {
            if (tab === tabName) {
                contentEl.classList.remove('hidden');
            } else {
                contentEl.classList.add('hidden');
            }
        }

        // Controlar estilo do botão da tab
        const btnEl = document.getElementById(`btn-tab-${tab}`);
        if (btnEl) {
            if (tab === tabName) {
                btnEl.classList.remove('text-slate-500', 'hover:text-slate-900', 'dark:text-slate-400');
                btnEl.classList.add('bg-white', 'dark:bg-slate-700', 'shadow-sm', 'text-slate-900', 'dark:text-white');
            } else {
                btnEl.classList.remove('bg-white', 'dark:bg-slate-700', 'shadow-sm', 'text-slate-900', 'dark:text-white');
                btnEl.classList.add('text-slate-500', 'hover:text-slate-900', 'dark:text-slate-400');
            }
        }
    });
};

// ==========================================
// PREVIEW DE IMAGENS
// ==========================================
let bannerUploadAtivo = null;

window.mudarBanner = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('preview-banner');
        const placeholder = document.getElementById('banner-placeholder');
        
        preview.src = e.target.result;
        preview.classList.remove('hidden');
        placeholder.classList.add('hidden');
        
        bannerUploadAtivo = e.target.result; // Temporário. Aqui deves integrar com o Storage do Supabase se necessário
    };
    reader.readAsDataURL(file);
};

// ==========================================
// GUARDAR DADOS NO SUPABASE
// ==========================================
window.guardarEdicaoLoja = async function() {
    const btn = document.getElementById('btn-guardar-loja');
    const textoOriginal = btn.innerHTML;
    
    try {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> A Guardar...';
        btn.disabled = true;
        btn.classList.add('opacity-70');

        // Capturar dados
        const payload = {
            nome: document.getElementById('input-nome-loja')?.value || '',
            descricao: document.getElementById('input-descricao-loja')?.value || '',
            whatsapp: document.getElementById('input-whatsapp-loja')?.value || '',
            instagram_url: document.getElementById('input-instagram')?.value || '',
            facebook_url: document.getElementById('input-facebook')?.value || '',
            conteudo_sobre: document.getElementById('input-sobre-loja')?.value || '',
            conteudo_entregas: document.getElementById('input-entregas-loja')?.value || ''
        };

        if (bannerUploadAtivo) payload.banner_url = bannerUploadAtivo; 

        // IMPORTANTE: Ajusta a query consoante a tua estrutura (usando o userId da sessão)
        const userId = (await window.supabaseClient.auth.getUser()).data.user?.id;
        
        if (!userId) throw new Error("Utilizador não autenticado.");

        const { error } = await window.supabaseClient
            .from('lojas')
            .update(payload)
            .eq('perfil_id', userId);
        
        if (error) throw error; 
        
        if (typeof window.forcarAtualizacaoDashboard === 'function') window.forcarAtualizacaoDashboard();
        
        // Sucesso
        btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Guardado com Sucesso';
        btn.classList.replace('bg-slate-900', 'bg-emerald-500');
        btn.classList.replace('dark:bg-white', 'dark:bg-emerald-500');
        btn.classList.replace('text-slate-900', 'text-white');
        
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('A tua loja foi atualizada com sucesso!');
        
        setTimeout(() => {
            btn.innerHTML = textoOriginal;
            btn.classList.replace('bg-emerald-500', 'bg-slate-900');
            btn.classList.replace('dark:bg-emerald-500', 'dark:bg-white');
            btn.classList.replace('text-white', 'dark:text-slate-900'); // Voltar ao texto escuro no dark mode
            btn.disabled = false;
            btn.classList.remove('opacity-70');
        }, 2500);
        
    } catch (err) {
        console.error("Erro detetado:", err);
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Falha ao Guardar';
        
        alert("Ocorreu o erro:\n" + (err.message || 'Erro desconhecido') + "\n\n🔴 VERIFICA O SUPABASE NA TABELA 'lojas'.");
        
        setTimeout(() => {
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
            btn.classList.remove('opacity-70');
        }, 3000);
    }
};
