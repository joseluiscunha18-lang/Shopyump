document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-editar-loja">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-6">
                <div class="sf-card p-6 space-y-5">
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Nome da Loja</label>
                        <input type="text" value="MarkDesign" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Descrição da Loja</label>
                        <textarea rows="3" placeholder="Descreve a tua loja..." class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all resize-none"></textarea>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">WhatsApp de Contacto</label>
                        <input type="tel" placeholder="+258 84 000 0000" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 transition-all">
                    </div>
                </div>
                <button onclick="mostrarNotificacao('Loja atualizada com sucesso!')" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-xs font-black shadow-lg uppercase tracking-widest active:scale-[0.98] transition-all">
                    Guardar Alterações
                </button>
            </div>
        </div>
    </template>
`);

// loja.js - Logic for loja page
