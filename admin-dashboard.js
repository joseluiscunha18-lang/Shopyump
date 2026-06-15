function renderAdminDashboard() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-3xl shadow-card border border-slate-100/60">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl"><i class="ph ph-storefront"></i></div>
                    <p class="text-sm font-semibold text-slate-500">Total de Lojas</p>
                </div>
                <h3 class="text-3xl font-black text-navy-900">842</h3>
            </div>

            <div class="bg-white p-6 rounded-3xl shadow-card border border-slate-100/60">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl"><i class="ph ph-shopping-bag"></i></div>
                    <p class="text-sm font-semibold text-slate-500">Pedidos Recebidos</p>
                </div>
                <h3 class="text-3xl font-black text-navy-900">12,450</h3>
            </div>

            <div class="bg-white p-6 rounded-3xl shadow-card border border-slate-100/60">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl"><i class="ph ph-users"></i></div>
                    <p class="text-sm font-semibold text-slate-500">Visitantes (Hoje)</p>
                </div>
                <h3 class="text-3xl font-black text-navy-900">3,102</h3>
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-card border border-slate-100/60 overflow-hidden">
            <div class="p-6 border-b border-slate-100/80">
                <h3 class="font-bold text-navy-900">Atividade Recente</h3>
            </div>
            <div class="divide-y divide-slate-50">
                <div class="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><i class="ph ph-storefront text-lg"></i></div>
                        <div>
                            <p class="text-sm font-semibold text-navy-900">Nova Loja Criada: <span class="text-brand-600">ModaTech MZ</span></p>
                            <p class="text-xs text-slate-500 mt-0.5">Por carlos@email.com</p>
                        </div>
                    </div>
                    <span class="text-xs font-medium text-slate-400">Há 5 min</span>
                </div>
                <div class="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><i class="ph ph-warning-circle text-lg"></i></div>
                        <div>
                            <p class="text-sm font-semibold text-navy-900">Loja Suspensa: <span class="text-amber-600">Store X</span></p>
                            <p class="text-xs text-slate-500 mt-0.5">Falta de pagamento</p>
                        </div>
                    </div>
                    <span class="text-xs font-medium text-slate-400">Há 2 horas</span>
                </div>
            </div>
        </div>
    `;
}
