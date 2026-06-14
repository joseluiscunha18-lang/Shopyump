// admin-app.js

document.addEventListener('DOMContentLoaded', initAdminSPA);

function initAdminSPA() {
    window.addEventListener('hashchange', renderRoute);
    
    // Se não houver rota, vai para o dashboard
    if (!window.location.hash) {
        window.location.hash = '#dashboard';
    } else {
        renderRoute();
    }
}

function renderRoute() {
    const route = window.location.hash.replace('#', '') || 'dashboard';
    const root = document.getElementById('admin-root');
    const title = document.getElementById('header-title');
    const subtitle = document.getElementById('header-subtitle');

    // Efeito de transição suave
    root.style.opacity = '0';
    root.style.transform = 'translateY(10px)';
    root.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    updateActiveMenu(route);

    setTimeout(() => {
        switch (route) {
            case 'dashboard':
                title.innerText = 'Resumo Geral';
                subtitle.innerText = 'Métricas e saúde global da plataforma';
                root.innerHTML = viewDashboard();
                break;
            case 'lojistas':
                title.innerText = 'Gestão de Lojistas';
                subtitle.innerText = 'Administre contas, acessos e perfis de utilizadores';
                root.innerHTML = viewLojistas();
                break;
            case 'orcamentos':
                title.innerText = 'Orçamentos e Planos';
                subtitle.innerText = 'Controlo financeiro e subscrições';
                root.innerHTML = viewOrcamentos();
                break;
            case 'logs':
                title.innerText = 'Logs de Tráfego';
                subtitle.innerText = 'Registo de visitas e atividades do sistema';
                root.innerHTML = viewLogs();
                break;
            default:
                window.location.hash = '#dashboard';
        }
        
        root.style.opacity = '1';
        root.style.transform = 'translateY(0)';
    }, 150);
}

function updateActiveMenu(currentRoute) {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.route === currentRoute) {
            link.classList.add('bg-white/10', 'text-white', 'font-semibold');
            link.classList.remove('text-slate-400', 'hover:bg-white/5', 'font-medium');
        } else {
            link.classList.remove('bg-white/10', 'text-white', 'font-semibold');
            link.classList.add('text-slate-400', 'hover:bg-white/5', 'font-medium');
        }
    });
}

// ==========================================
// VIEWS (Componentes HTML injetados)
// ==========================================

function viewDashboard() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-2xl shadow-card border border-slate-100/60 flex flex-col justify-between">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl"><i class="ph ph-storefront"></i></div>
                    <span class="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">+12%</span>
                </div>
                <div>
                    <p class="text-sm font-semibold text-slate-500 mb-1">Total de Lojas</p>
                    <h3 class="text-3xl font-black text-navy-900 tracking-tight">1,248</h3>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-card border border-slate-100/60 flex flex-col justify-between">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl"><i class="ph ph-users"></i></div>
                    <span class="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">+4 Hoje</span>
                </div>
                <div>
                    <p class="text-sm font-semibold text-slate-500 mb-1">Lojistas Ativos</p>
                    <h3 class="text-3xl font-black text-navy-900 tracking-tight">892</h3>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-card border border-slate-100/60 flex flex-col justify-between">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl"><i class="ph ph-eye"></i></div>
                    <span class="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">Ao vivo</span>
                </div>
                <div>
                    <p class="text-sm font-semibold text-slate-500 mb-1">Visitas Hoje</p>
                    <h3 class="text-3xl font-black text-navy-900 tracking-tight">14,302</h3>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-card border border-slate-100/60 flex flex-col justify-between">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl"><i class="ph ph-currency-circle-dollar"></i></div>
                    <span class="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">+8%</span>
                </div>
                <div>
                    <p class="text-sm font-semibold text-slate-500 mb-1">Receita Mensal</p>
                    <h3 class="text-3xl font-black text-navy-900 tracking-tight">€ 4.250</h3>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 bg-white rounded-2xl shadow-card border border-slate-100/60 overflow-hidden">
                <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 class="font-bold text-navy-900">Novos Registos (Hoje)</h3>
                    <a href="#lojistas" class="text-sm font-semibold text-brand-600 hover:text-brand-500">Ver todos</a>
                </div>
                <div class="p-0">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50/50 text-xs text-slate-400 uppercase tracking-wider">
                                <th class="p-4 font-semibold">Lojista</th>
                                <th class="p-4 font-semibold">Email</th>
                                <th class="p-4 font-semibold">Hora</th>
                                <th class="p-4 font-semibold text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-slate-50">
                            <tr class="hover:bg-slate-50/50 transition-colors">
                                <td class="p-4 font-semibold text-navy-900">Ana Silva</td>
                                <td class="p-4 text-slate-500">ana.silva@email.com</td>
                                <td class="p-4 text-slate-500">10:45</td>
                                <td class="p-4 text-right"><span class="px-2.5 py-1 rounded-md bg-green-50 text-green-600 font-bold text-xs">Ativo</span></td>
                            </tr>
                            <tr class="hover:bg-slate-50/50 transition-colors">
                                <td class="p-4 font-semibold text-navy-900">Carlos Mendes</td>
                                <td class="p-4 text-slate-500">carlos.m@loja.pt</td>
                                <td class="p-4 text-slate-500">09:12</td>
                                <td class="p-4 text-right"><span class="px-2.5 py-1 rounded-md bg-green-50 text-green-600 font-bold text-xs">Ativo</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-card border border-slate-100/60 p-6">
                <h3 class="font-bold text-navy-900 mb-4">Ações Rápidas</h3>
                <div class="space-y-3">
                    <button class="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all group">
                        <span class="font-semibold text-slate-700 group-hover:text-brand-600 text-sm">Criar Lojista Manual</span>
                        <i class="ph ph-plus-circle text-slate-400 group-hover:text-brand-600 text-lg"></i>
                    </button>
                    <button class="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all group">
                        <span class="font-semibold text-slate-700 group-hover:text-brand-600 text-sm">Exportar Relatório</span>
                        <i class="ph ph-download-simple text-slate-400 group-hover:text-brand-600 text-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function viewLojistas() {
    return `
        <div class="bg-white rounded-2xl shadow-card border border-slate-100/60 overflow-hidden flex flex-col">
            <div class="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="relative w-full md:w-80">
                    <i class="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                    <input type="text" placeholder="Procurar lojista por nome, email ou ID..." class="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium text-slate-700">
                </div>
                <div class="flex gap-3 w-full md:w-auto">
                    <button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all">
                        <i class="ph ph-funnel"></i> Filtros
                    </button>
                    <button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-navy-900/10">
                        <i class="ph ph-plus"></i> Novo Lojista
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50/50 text-xs text-slate-400 uppercase tracking-wider">
                            <th class="p-5 font-semibold">Nome & Dados</th>
                            <th class="p-5 font-semibold">Entrada (Data/Hora)</th>
                            <th class="p-5 font-semibold">Status</th>
                            <th class="p-5 font-semibold text-right">Ações de Risco</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50/50 transition-colors group">
                            <td class="p-5">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm">AS</div>
                                    <div>
                                        <p class="font-bold text-navy-900">Ana Silva</p>
                                        <p class="text-xs text-slate-500">ana.silva@email.com • ID: #SHP-992</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-5">
                                <p class="font-semibold text-slate-700">Hoje</p>
                                <p class="text-xs text-slate-400">10:45 AM</p>
                            </td>
                            <td class="p-5">
                                <span class="px-2.5 py-1 rounded-md bg-green-50 text-green-600 font-bold text-[11px] uppercase tracking-wider">Ativo</span>
                            </td>
                            <td class="p-5 text-right">
                                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onclick="alert('Lojista suspenso temporariamente')" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-xs font-bold transition-colors">
                                        Suspender
                                    </button>
                                    <button onclick="confirm('Tem a certeza que deseja APAGAR TODOS OS DADOS deste utilizador?')" class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors">
                                        Apagar
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                </table>
            </div>
            
            <div class="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span class="text-xs font-semibold text-slate-500">A mostrar 1 de 892 lojistas</span>
                <div class="flex gap-1">
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400"><i class="ph ph-caret-left"></i></button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400"><i class="ph ph-caret-right"></i></button>
                </div>
            </div>
        </div>
    `;
}

function viewOrcamentos() {
    return `
        <div class="max-w-4xl">
            <div class="bg-white rounded-2xl shadow-card border border-slate-100/60 p-8 mb-6">
                <h3 class="text-lg font-bold text-navy-900 mb-2">Planos e Faturação</h3>
                <p class="text-sm text-slate-500 mb-6">Controle as margens de lucro, taxas de transação e orçamentos da plataforma.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Plano Base (Lojistas)</p>
                        <div class="flex items-end gap-2 mb-4">
                            <span class="text-3xl font-black text-navy-900">€ 14.99</span>
                            <span class="text-sm font-semibold text-slate-500 mb-1">/mês</span>
                        </div>
                        <button class="w-full py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:border-slate-300 transition-colors">Ajustar Preço</button>
                    </div>

                    <div class="p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Taxa por Transação</p>
                        <div class="flex items-end gap-2 mb-4">
                            <span class="text-3xl font-black text-navy-900">1.5%</span>
                            <span class="text-sm font-semibold text-slate-500 mb-1">+ €0.25</span>
                        </div>
                        <button class="w-full py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:border-slate-300 transition-colors">Configurar Taxas</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function viewLogs() {
    return `
        <div class="bg-white rounded-2xl shadow-card border border-slate-100/60 overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h3 class="font-bold text-navy-900">Registo de Atividades (Logs)</h3>
                    <p class="text-xs text-slate-500 mt-1">Tráfego capturado em tempo real (Hoje)</p>
                </div>
                <button class="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl border border-slate-200 text-sm font-bold hover:bg-slate-100 transition-colors">
                    <i class="ph ph-download-simple mr-2"></i>Exportar Logs (.csv)
                </button>
            </div>
            
            <div class="p-0">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50/50 text-xs text-slate-400 uppercase tracking-wider">
                            <th class="p-4 font-semibold pl-6">Timestamp</th>
                            <th class="p-4 font-semibold">Tipo</th>
                            <th class="p-4 font-semibold">Descrição do Evento</th>
                            <th class="p-4 font-semibold">IP / Origem</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm font-medium text-slate-600 divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50/30">
                            <td class="p-4 pl-6 text-slate-400 font-mono text-xs">Hoje, 14:02:15</td>
                            <td class="p-4"><span class="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold">VISITA</span></td>
                            <td class="p-4 text-slate-700">Visita à loja <b>#SHP-992</b> (Mobile)</td>
                            <td class="p-4 text-slate-400 font-mono text-xs">192.168.1.1</td>
                        </tr>
                        <tr class="hover:bg-slate-50/30">
                            <td class="p-4 pl-6 text-slate-400 font-mono text-xs">Hoje, 13:45:10</td>
                            <td class="p-4"><span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold">AUTH</span></td>
                            <td class="p-4 text-slate-700">Login bem-sucedido: carlos.m@loja.pt</td>
                            <td class="p-4 text-slate-400 font-mono text-xs">Mozambique / Maputo</td>
                        </tr>
                        <tr class="hover:bg-slate-50/30">
                            <td class="p-4 pl-6 text-slate-400 font-mono text-xs">Hoje, 11:20:00</td>
                            <td class="p-4"><span class="px-2 py-1 bg-amber-50 text-amber-600 rounded text-xs font-bold">SISTEMA</span></td>
                            <td class="p-4 text-slate-700">Sincronização de base de dados concluída</td>
                            <td class="p-4 text-slate-400 font-mono text-xs">Internal / Supabase</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
