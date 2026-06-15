function renderAdminUsuarios() {
    return `
        <div class="bg-white rounded-3xl shadow-card border border-slate-100/60 overflow-hidden flex flex-col min-h-[500px]">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                <div class="relative w-80">
                    <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" placeholder="Procurar utilizador..." class="w-full bg-[#F9F7F5] text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 font-medium text-slate-700">
                </div>
            </div>

            <div class="overflow-x-auto flex-1">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-white border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
                            <th class="p-5 font-semibold pl-6">Utilizador</th>
                            <th class="p-5 font-semibold">Lojas Associadas</th>
                            <th class="p-5 font-semibold">Estado</th>
                            <th class="p-5 font-semibold text-right pr-6">Ações de Acesso</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-50">
                        <tr class="hover:bg-slate-50/50 transition-colors">
                            <td class="p-5 pl-6">
                                <p class="font-bold text-navy-900">Ana Silva</p>
                                <p class="text-xs text-slate-400">ana.silva@email.com</p>
                            </td>
                            <td class="p-5 text-brand-600 font-semibold cursor-pointer hover:underline">Ver Lojas (2)</td>
                            <td class="p-5">
                                <span class="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold border border-green-100">Ativo</span>
                            </td>
                            <td class="p-5 pr-6 text-right">
                                <button class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-colors">Bloquear</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
