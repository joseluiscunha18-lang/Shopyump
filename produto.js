document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-produtos">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-4">
                <div class="flex justify-between items-center px-1 mb-2">
                    <p class="text-xs font-bold text-slate-900 dark:text-white">2 produtos ativos</p>
                    <button onclick="navegarAnimado('criar-produto')" class="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg uppercase tracking-widest">+ Novo</button>
                </div>
                <div class="bg-white dark:bg-navy-900 p-4 rounded-[20px] shadow-sm border border-slate-100/50 dark:border-navy-800 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[8px] font-black text-slate-300">NIKE</div>
                        <div>
                            <p class="text-sm font-bold text-slate-900 dark:text-white">Jordan 1 High</p>
                            <p class="text-[10px] text-slate-500 font-bold mt-0.5">2.500,00 MT</p>
                            <span class="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">Ativo</span>
                        </div>
                    </div>
                    <button class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
                <div class="bg-white dark:bg-navy-900 p-4 rounded-[20px] shadow-sm border border-slate-100/50 dark:border-navy-800 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[8px] font-black text-slate-300">TSH</div>
                        <div>
                            <p class="text-sm font-bold text-slate-900 dark:text-white">T-shirt Oversized</p>
                            <p class="text-[10px] text-slate-500 font-bold mt-0.5">850,00 MT</p>
                            <span class="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">Ativo</span>
                        </div>
                    </div>
                    <button class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    </template>
`);

// produto.js - Logic for produtos page
// Empty for now, templated appended above.
