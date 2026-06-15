
function renderAdminLojas() {
    return `
        <div class="bg-white rounded-3xl shadow-card border border-slate-100/60 overflow-hidden flex flex-col min-h-[500px]">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
                <div class="relative w-80">
                    <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" placeholder="Pesquisar loja..." class="w-full bg-[#F9F7F5] text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 font-medium text-slate-700">
                </div>
                <button class="flex items-center gap-2 px-5 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-sm font-bold transition-all">
                    <i class="ph ph-plus-circle text-lg"></i> Criar Loja
                </button>
            </div>

            <div class="overflow-x-auto flex-1">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-white border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
                            <th class="p-5 font-semibold pl-6">Nome da Loja</th>
                            <th class="p-5 font-semibold">Proprietário</th>
                            <th class="p-5 font-semibold">Estado</th>
                            <th class="p-5 font-semibold text-right pr-6">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-50">
                        <tr class="hover:bg-slate-50/50 transition-colors">
                            <td class="p-5 pl-6 font-bold text-navy-900">TechZone MZ</td>
                            <td class="p-5 text-slate-600">Carlos Mendes</td>
                            <td class="p-5">
                                <span class="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold border border-green-100">Ativa</span>
                            </td>
                            <td class="p-5 pr-6 text-right">
                                <div class="flex justify-end gap-2">
                                    <button class="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg"><i class="ph ph-eye text-lg"></i></button>
                                    <button class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><i class="ph ph-pencil-simple text-lg"></i></button>
                                    <button class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><i class="ph ph-power text-lg"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
