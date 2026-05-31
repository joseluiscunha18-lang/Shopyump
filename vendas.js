document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-vendas">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-4">
                <div class="sf-card p-6">
                    <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5">Resumo de Vendas</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
                            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Mês</p>
                            <p class="text-2xl font-bold text-slate-900 dark:text-white">54.800</p>
                            <p class="text-[10px] text-slate-500 font-medium">MT</p>
                        </div>
                        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
                            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Pedidos</p>
                            <p class="text-2xl font-bold text-slate-900 dark:text-white">72</p>
                            <p class="text-[10px] text-slate-500 font-medium">este mês</p>
                        </div>
                    </div>
                </div>
                <div class="sf-card p-6">
                    <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Histórico</h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <div><p class="text-sm font-bold text-slate-900 dark:text-white">Jordan 1 High</p><p class="text-[10px] text-slate-500 font-medium">Ana Marques · WPP</p></div>
                            <span class="text-sm font-black text-emerald-600">2.500 MT</span>
                        </div>
                        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <div><p class="text-sm font-bold text-slate-900 dark:text-white">T-shirt Oversized</p><p class="text-[10px] text-slate-500 font-medium">Carlos Silva · IG</p></div>
                            <span class="text-sm font-black text-emerald-600">850 MT</span>
                        </div>
                        <div class="flex items-center justify-between py-2">
                            <div><p class="text-sm font-bold text-slate-900 dark:text-white">Jordan 1 High</p><p class="text-[10px] text-slate-500 font-medium">Maria Joana · FB</p></div>
                            <span class="text-sm font-black text-emerald-600">2.500 MT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
`);

// vendas.js - Logic for vendas page
// Empty for now, templated appended above.
