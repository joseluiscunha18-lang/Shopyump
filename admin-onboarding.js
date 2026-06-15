function renderAdminOnboarding() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-3xl shadow-card border border-slate-100/60">
                <div class="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100">
                    <div class="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold">AS</div>
                    <div>
                        <h4 class="font-bold text-navy-900">Ana Silva</h4>
                        <p class="text-xs text-slate-400">Registada Hoje</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Experiência</p>
                        <p class="text-sm font-semibold text-slate-700 bg-[#F9F7F5] px-3 py-2 rounded-xl">Iniciante</p>
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Produtos</p>
                        <div class="flex gap-2">
                            <span class="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100">Vestuário</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Objetivo</p>
                        <p class="text-sm font-semibold text-slate-700 bg-[#F9F7F5] px-3 py-2 rounded-xl">Vender no WhatsApp</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
