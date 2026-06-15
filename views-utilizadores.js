// js/views/utilizadores.js

function renderUtilizadores() {
    return `
        <div class="bg-white rounded-3xl shadow-card border border-slate-100/60 overflow-hidden flex flex-col min-h-[600px]">
            <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="relative w-full md:w-96">
                    <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                    <input type="text" placeholder="Pesquisar por email ou ID de utilizador..." class="w-full bg-[#F9F7F5] border-none text-sm rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 transition-all font-medium text-slate-700">
                </div>
                <div class="flex gap-3 w-full md:w-auto">
                    <button class="flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl text-sm font-bold transition-all">
                        <i class="ph ph-export text-lg"></i> Exportar
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto flex-1">
                <table class="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr class="bg-white border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
                            <th class="p-5 font-semibold pl-6">Utilizador</th>
                            <th class="p-5 font-semibold">Lojas Associadas</th>
                            <th class="p-5 font-semibold">Estado da Conta</th>
                            <th class="p-5 font-semibold text-right pr-6">Gerir Acesso</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-50">
                        <tr class="hover:bg-slate-50/50 transition-colors group">
                            <td class="p-5 pl-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">CM</div>
                                    <div>
                                        <p class="font-bold text-navy-900">Carlos Mendes</p>
                                        <p class="text-xs text-slate-400 font-mono mt-0.5">carlos.m@email.com</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-5">
                                <div class="flex flex-col gap-1">
                                    <a href="#lojas" class="text-sm font-semibold text-brand-600 hover:underline">TechZone MZ</a>
                                    <span class="text-xs text-slate-400">1 loja ativa</span>
                                </div>
                            </td>
                            <td class="p-5">
                                <span class="px-2.5 py-1 rounded-md bg-green-50 text-green-600 font-bold text-[11px] uppercase tracking-wider">Ativa</span>
                            </td>
                            <td class="p-5 pr-6 text-right">
                                <button class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-colors">
                                    Bloquear Conta
                                </button>
                            </td>
                        </tr>

                        <tr class="hover:bg-slate-50/50 transition-colors group">
                            <td class="p-5 pl-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">JD</div>
                                    <div>
                                        <p class="font-bold text-slate-500 line-through">João Dias</p>
                                        <p class="text-xs text-slate-400 font-mono mt-0.5">joao.dias@email.com</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-5">
                                <span class="text-xs font-semibold text-slate-400">Nenhuma loja</span>
                            </td>
                            <td class="p-5">
                                <span class="px-2.5 py-1 rounded-md bg-red-50 text-red-600 font-bold text-[11px] uppercase tracking-wider">Bloqueado</span>
                            </td>
                            <td class="p-5 pr-6 text-right">
                                <button class="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-colors">
                                    Desbloquear
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
