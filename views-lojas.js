//views-lojas.js

function renderLojas() {
    return `
        <div class="bg-white rounded-3xl shadow-card border border-slate-100/60 overflow-hidden flex flex-col min-h-[600px]">
            <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="relative w-full md:w-96">
                    <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                    <input type="text" placeholder="Pesquisar loja por nome ou ID..." class="w-full bg-[#F9F7F5] border-none text-sm rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 transition-all font-medium text-slate-700">
                </div>
                <div class="flex gap-3 w-full md:w-auto">
                    <button class="flex items-center justify-center gap-2 px-5 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-navy-900/20">
                        <i class="ph ph-plus-circle text-lg"></i> Criar Loja
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto flex-1">
                <table class="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr class="bg-white border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
                            <th class="p-5 font-semibold pl-6">Loja & Domínio</th>
                            <th class="p-5 font-semibold">Proprietário</th>
                            <th class="p-5 font-semibold">Status</th>
                            <th class="p-5 font-semibold text-right pr-6">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-50">
                        <tr class="hover:bg-slate-50/50 transition-colors group">
                            <td class="p-5 pl-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
                                        <img src="https://ui-avatars.com/api/?name=Tech+Zone&background=f1f5f9&color=64748b" class="w-full h-full object-cover">
                                    </div>
                                    <div>
                                        <p class="font-bold text-navy-900 text-base">TechZone MZ</p>
                                        <p class="text-xs text-brand-600 font-medium">techzone.shopyump.com</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-5">
                                <p class="font-semibold text-slate-700">Carlos Mendes</p>
                                <p class="text-xs text-slate-400">carlos.m@email.com</p>
                            </td>
                            <td class="p-5">
                                <span class="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 font-bold text-xs flex items-center w-max gap-1.5 border border-green-100">
                                    <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div> Ativa
                                </span>
                            </td>
                            <td class="p-5 pr-6">
                                <div class="flex items-center justify-end gap-2">
                                    <button class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50 transition-colors" title="Ver Detalhes">
                                        <i class="ph ph-eye text-lg"></i>
                                    </button>
                                    <button class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors" title="Editar">
                                        <i class="ph ph-pencil-simple text-lg"></i>
                                    </button>
                                    <button class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors" title="Desativar">
                                        <i class="ph ph-power text-lg"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr class="hover:bg-slate-50/50 transition-colors group bg-slate-50/30">
                            <td class="p-5 pl-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden opacity-50">
                                        <img src="https://ui-avatars.com/api/?name=Moda+Maputo&background=f1f5f9&color=64748b" class="w-full h-full object-cover">
                                    </div>
                                    <div>
                                        <p class="font-bold text-slate-500 text-base">Moda Maputo</p>
                                        <p class="text-xs text-slate-400 font-medium">modamaputo.shopyump.com</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-5">
                                <p class="font-semibold text-slate-500">Ana Lúcia</p>
                                <p class="text-xs text-slate-400">ana.moda@email.com</p>
                            </td>
                            <td class="p-5">
                                <span class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-bold text-xs flex items-center w-max gap-1.5 border border-slate-200">
                                    <div class="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Inativa
                                </span>
                            </td>
                            <td class="p-5 pr-6">
                                <div class="flex items-center justify-end gap-2">
                                    <button class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50 transition-colors" title="Ver Detalhes">
                                        <i class="ph ph-eye text-lg"></i>
                                    </button>
                                    <button class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-green-600 hover:border-green-200 hover:bg-green-50 transition-colors" title="Ativar Loja">
                                        <i class="ph ph-play text-lg"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="p-5 border-t border-slate-100 flex justify-between items-center bg-white">
                <span class="text-xs font-semibold text-slate-400">Página 1 de 45</span>
                <div class="flex gap-2">
                    <button class="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-bold hover:bg-slate-50">Anterior</button>
                    <button class="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-bold hover:bg-slate-50">Próximo</button>
                </div>
            </div>
        </div>
    `;
}
