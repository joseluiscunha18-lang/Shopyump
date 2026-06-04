document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-dashboard">
        <div class="relative w-full pb-16 overflow-hidden rounded-b-[40px]">
            <div class="absolute inset-0 w-full h-full z-0" style="background-color: #FDE6DA; background-image: url(&quot;data:image/svg+xml,%3Csvg width='375' height='812' viewBox='0 0 375 812' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='375' height='812' fill='%23FDE6DA'/%3E%3Cg filter='url(%23filter0_f)'%3E%3Ccircle cx='60' cy='80' r='220' fill='%23D4B5FD' fill-opacity='0.9'/%3E%3Ccircle cx='340' cy='50' r='200' fill='%23FBCFE8' fill-opacity='0.8'/%3E%3Ccircle cx='187' cy='406' r='280' fill='white' fill-opacity='0.3'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f' x='-400' y='-400' width='1175' height='1612' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='90' result='effect1_foregroundBlur'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E&quot;); background-size: cover; background-position: center 20%;"></div>
            <div class="relative z-10 px-6 pt-28 max-w-md mx-auto">
                <div class="flex justify-between items-start mb-8">
                    <div>
                        <h2 id="dash-saudacao" class="text-3xl font-medium text-slate-900 tracking-tight leading-none flex items-center h-9">
                            <div class="h-7 w-40 bg-slate-800/10 animate-pulse rounded-md"></div>
                        </h2>
                        <div class="flex items-center gap-1.5 mt-1.5 ml-1 opacity-80">
                            <span class="relative flex h-1.5 w-1.5">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span class="text-[9px] font-black text-slate-500 uppercase tracking-[0.15em]">Loja Online</span>
                        </div>
                    </div>
                    <div class="flex items-center bg-white/35 backdrop-blur-xl border border-white/50 rounded-2xl shadow-sm mt-1 p-1 gap-1">
                        <button id="btn-copiar-loja" class="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/50 active:scale-95 transition-all text-slate-700" title="Copiar Link">
                            <i class="fa-regular fa-copy text-[14px]" id="icone-copiar"></i>
                        </button>
                        <div class="w-[1px] h-4 bg-slate-400/30"></div>
                        <a id="btn-ver-loja" href="#" target="_blank" class="px-3 h-9 flex items-center justify-center rounded-xl hover:bg-white/50 active:scale-95 transition-all text-slate-800 gap-1.5">
                            <span class="text-[10px] font-black uppercase tracking-widest">Loja</span>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[11px] text-slate-600"></i>
                        </a>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <div class="bg-white/35 backdrop-blur-2xl border border-white rounded-[32px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex items-center transition-all">
                        <div class="text-slate-800 flex-shrink-0">
                            <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <div class="ml-7 flex-1">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-1.5">
                                    <div class="w-1.5 h-1.5 rounded-full bg-[#9f6ef5] animate-pulse"></div>
                                    <p class="text-[10px] font-black text-slate-600/90 uppercase tracking-widest">Pedidos Pendentes</p>
                                </div>
                                <span id="badge-pedidos-hoje" class="hidden text-[9px] font-black bg-[#9f6ef5]/10 text-[#9f6ef5] px-2.5 py-1 rounded-lg"></span>
                            </div>
                            <div class="flex items-baseline gap-2 mt-1">
                                <h3 id="stat-pedidos" class="text-[52px] font-medium text-slate-900 tracking-tighter leading-none">0</h3>
                                <span class="text-[12px] font-bold text-slate-600/80">no total</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-white/35 backdrop-blur-xl border border-white/60 rounded-[28px] p-5 flex items-center shadow-sm">
                            <div class="text-slate-700 flex-shrink-0">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </div>
                            <div class="ml-4">
                                <h4 id="stat-visitas" class="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-1">0</h4>
                                <p class="text-[10px] font-black text-slate-600/90 uppercase tracking-widest">Visitas</p>
                            </div>
                        </div>
                        <div class="bg-white/35 backdrop-blur-xl border border-white/60 rounded-[28px] p-5 flex items-center shadow-sm">
                            <div class="text-slate-700 flex-shrink-0">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div class="ml-4">
                                <h4 id="stat-confirmados" class="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-1">0</h4>
                                <p class="text-[10px] font-black text-slate-600/90 uppercase tracking-widest">Confirmados</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <main class="w-full bg-[#F9F7F5] dark:bg-[#020617] rounded-t-[40px] -mt-10 relative z-20 px-6 pt-10 pb-32 min-h-[50vh] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center">
            <div class="w-full max-w-md space-y-8">

                <section class="space-y-4 pt-2" id="area-validacao">
                    <div class="flex justify-between items-end px-1">
                        <div>
                            <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Validar Encomendas</h3>
                            <p class="text-xs font-bold text-slate-900 dark:text-white">Ações Pendentes</p>
                        </div>
                        <span id="badge-acoes-pendentes" class="text-[9px] font-black text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md uppercase tracking-widest">0 Pendentes</span>
                    </div>

                    <div class="order-scroll-area" id="container-pedidos">
                        <div id="msg-vazio" class="col-span-full py-12 flex flex-col items-center justify-center text-center gap-3">
                            <div class="w-14 h-14 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[20px] flex items-center justify-center text-slate-300 dark:text-slate-500 mb-2 shadow-sm">
                                <i class="fa-solid fa-receipt text-2xl"></i>
                            </div>
                            <h4 class="text-[14px] font-bold text-slate-900 dark:text-white">Sem pedidos pendentes</h4>
                            <p class="text-[12px] text-slate-500 mt-1 max-w-[220px] leading-relaxed mx-auto">
                                Quando os teus clientes comprarem, os pedidos aparecerão aqui.
                            </p>
                        </div>
                    </div>
                </section>

                <section class="bg-white dark:bg-navy-900 p-6 rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800 relative overflow-hidden">
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tr?fego da Loja</h3>
                            <p class="text-xs font-bold text-navy-900 dark:text-white">Visitas Únicas</p>
                        </div>
                        <div class="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100/50 dark:border-emerald-500/20 rounded-lg flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span class="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Tempo Real</span>
                        </div>
                    </div>
                    <div class="chart-container mt-2">
                        <div class="chart-view">
                            <div class="grid-line border-t border-dashed border-slate-200 dark:border-slate-700 bg-transparent" style="top: 0;"></div>
                            <div class="grid-line border-t border-dashed border-slate-200 dark:border-slate-700 bg-transparent" style="top: 75px;"></div>
                            <div class="grid-line border-t border-solid border-slate-200 dark:border-slate-700 bg-transparent" style="top: 150px;"></div>
                            <svg class="svg-chart" viewBox="0 0 300 150">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="#D4B5FD" stop-opacity="0.25"/>
                                        <stop offset="100%" stop-color="#D4B5FD" stop-opacity="0"/>
                                    </linearGradient>
                                </defs>
                                <path id="areaPath" fill="url(#chartGradient)" d="M0,150 L300,150 L300,150 L0,150 Z" style="transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);"></path>
                                <path id="cordaPath" class="corda stroke-[#9f6ef5]" d="M0,148 L300,148" style="transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);"></path>
                                <circle id="p-atual" cx="150" cy="148" r="4.5" fill="#9f6ef5" stroke="#ffffff" stroke-width="2.5" style="transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); filter: drop-shadow(0 4px 6px rgba(159, 110, 245, 0.3));"></circle>
                                <text id="valor-atual" x="150" y="135" font-family="Inter" font-size="11" font-weight="800" fill="#9f6ef5" text-anchor="middle" stroke="#ffffff" stroke-width="4" stroke-linejoin="round" paint-order="stroke" style="transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);">0 Visitas</text>
                            </svg>
                        </div>
                    </div>
                    <div class="flex justify-between mt-4 px-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>S?b</span><span class="text-slate-900 dark:text-white font-black italic">Dom</span>
                    </div>
                </section>

                <div class="grid grid-cols-1 gap-6">
                    <section class="bg-white dark:bg-navy-900 p-6 rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800">
                        <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5">Origem do Tr?fego</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center text-xs"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-emerald-500"></div><span class="font-bold text-slate-700 dark:text-slate-300">WhatsApp</span></div><span class="font-black text-slate-900 dark:text-white opacity-30">0</span></div>
                            <div class="flex justify-between items-center text-xs"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-blue-500"></div><span class="font-bold text-slate-700 dark:text-slate-300">Facebook</span></div><span class="font-black text-slate-900 dark:text-white opacity-30">0</span></div>
                            <div class="flex justify-between items-center text-xs"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-pink-500"></div><span class="font-bold text-slate-700 dark:text-slate-300">Instagram</span></div><span class="font-black text-slate-900 dark:text-white opacity-30">0</span></div>
                        </div>
                    </section>

                    <section class="space-y-3">
                        <div class="flex justify-between items-center px-1">
                            <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Os Meus Produtos</h3>
                            <span id="badge-produtos-ativos" class="text-[9px] font-black text-slate-500 uppercase tracking-widest">0 ativos</span>
                        </div>
                        
                        <div id="container-produtos" class="w-full mt-3">
                            <button onclick="navegarAnimado('criar-produto')" class="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-[24px] border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center gap-3 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all active:scale-[0.98] group">
                                <div class="w-12 h-12 rounded-[16px] bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                    <i class="fa-solid fa-plus text-xl"></i>
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-slate-900 dark:text-white">Adicionar Primeiro Produto</p>
                                    <p class="text-[11px] text-slate-500 font-medium mt-0.5">Prepara o teu cat?logo para faturar</p>
                                </div>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </template>
`);

// dashboard.js - Lógica exclusiva do Dashboard

function animarNumero(id, valorFinal) {
    // Agora apenas insere o número no ecrã de forma instantânea, sem animação
    const elemento = document.getElementById(id);
    if (!elemento) return;
    
    // Mostra o valor exato no momento em que carrega
    const valorAlvo = parseInt(String(valorFinal).replace(/\D/g, ''));
    
    if (isNaN(valorAlvo)) { 
        elemento.textContent = valorFinal; 
    } else {
        elemento.textContent = valorAlvo;
    }
}

function confirmarComAnimacao(id) {
    const card = document.getElementById(id);
    if (!card) return;
    card.style.transition = 'all 0.35s ease';
    card.style.transform = 'scale(0.9) translateY(-20px)';
    card.style.opacity = '0';
    setTimeout(() => {
        card.remove();
        const container = document.getElementById('container-pedidos');
        const msgVazia = document.getElementById('msg-vazio');
        if (container && container.children.length === 0 && msgVazia) {
            msgVazia.style.display = 'flex';
        }
    }, 380);
}

function initDashboard() {
    // A interface arranca a zeros no HTML, logo esta fun??o fica reservada 
    // para quando integrares a l?gica de buscar dados estat?sticos reais do backend
}

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'dashboard') {
        carregarDadosLojaDashboard();
    }
});

async function carregarDadosLojaDashboard() {
    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (userId) {
            const { data: loja } = await window.supabaseClient
                .from('lojas')
                .select('id, nome, vendedor_nome, slug')
                .eq('perfil_id', userId)
                .maybeSingle();
                
            if (loja) {
                const h2Saudacao = document.getElementById('dash-saudacao');
                const headerTitulo = document.getElementById('header-titulo');
                
                // Formatação humana com emoji e sem repetir a loja
                if (h2Saudacao) {
                    const nomeVendedor = loja.vendedor_nome ? loja.vendedor_nome.split(' ')[0] : 'Lojista';
                    h2Saudacao.innerHTML = `Olá, ${nomeVendedor} <span class="text-3xl">👋</span>`;
                }
                
                // Manda o nome da loja apenas para o topo (cabeçalho)
                if (headerTitulo) headerTitulo.innerText = loja.nome || '';
                
                // Configurar botões de link
                const btnVerLoja = document.getElementById('btn-ver-loja');
                const urlLoja = `https://shopyump.vercel.app/loja/${loja.slug}`;
                
                if (btnVerLoja) {
                    btnVerLoja.href = urlLoja;
                }
                
                // Configurar o botão de copiar
                const btnCopiar = document.getElementById('btn-copiar-loja');
                if (btnCopiar) {
                    btnCopiar.onclick = () => {
                        navigator.clipboard.writeText(urlLoja).then(() => {
                            const icone = document.getElementById('icone-copiar');
                            if (icone) {
                                icone.className = 'fa-solid fa-check text-[14px] text-emerald-500';
                                setTimeout(() => {
                                    icone.className = 'fa-regular fa-copy text-[14px]';
                                }, 2000);
                            }
                        });
                    };
                }
                
                // Carregar produtos reais da loja
                await carregarProdutosDashboard(loja.id);

                // Carregar as encomendas pendentes para o ecrã inicial
                await carregarPedidosPendentesDashboard(loja.id);
            } else {
                const h2Saudacao = document.getElementById('dash-saudacao');
                const headerTitulo = document.getElementById('header-titulo');
                
                if (h2Saudacao) h2Saudacao.innerHTML = 'Olá! <span class="text-3xl">👋</span>';
                if (headerTitulo) headerTitulo.innerText = 'Painel';
            }
        }
    } catch (e) {
        console.error("Erro ao carregar dados da loja no dashboard:", e);
    }
}

async function carregarProdutosDashboard(lojaId) {
    const containerProduto = document.getElementById('container-produtos');
    const badgeAtivos = document.getElementById('badge-produtos-ativos');
    
    if (!containerProduto) return;
    
    try {
        const { data: produtos, error } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        const ativosCount = produtos ? produtos.filter(p => p.ativo).length : 0;
        if (badgeAtivos) {
            badgeAtivos.innerText = `${ativosCount} ATIVOS`;
        }
        
        if (produtos && produtos.length > 0) {
            containerProduto.className = "flex flex-col gap-3 mt-3 order-scroll-area max-h-[300px]";
            let html = '';
            
            // Renderiza apenas os 3 primeiros produtos recentes no Dashboard
            produtos.slice(0, 3).forEach(p => {
                const fotoCapa = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : 'https://placehold.co/100?text=Sem+Foto';
                html += `
                    <div class="bg-white dark:bg-navy-900 p-4 rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800 flex items-center justify-between transition-transform active:scale-[0.98]">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                <img src="${fotoCapa}" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <p class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">${p.nome}</p>
                                <p class="text-[10px] text-slate-500 font-bold mt-0.5">${p.preco.toLocaleString('pt-MZ')} MT ${!p.ativo ? '<span class="text-red-400 font-bold ml-1">(Rascunho)</span>' : ''}</p>
                            </div>
                        </div>
                        <button onclick="navegarAnimado('produto')" class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                `;
            });
            
            html += `
                <button onclick="navegarAnimado('produtos')" class="mt-2 w-full text-center text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
                    Ver Todos os Produtos
                </button>
            `;
            containerProduto.innerHTML = html;
        }
    } catch (e) {
        console.error("Erro ao carregar produtos:", e);
    }
}

// ==========================================
// PENDENTES DASHBOARD: VALIDAR ENCOMENDAS
// ==========================================

async function carregarPedidosPendentesDashboard(lojaId) {
    const container = document.getElementById('container-pedidos');
    const badgeAtivos = document.getElementById('badge-acoes-pendentes');
    const msgVazia = document.getElementById('msg-vazio');
    const badgePedidosHoje = document.getElementById('badge-pedidos-hoje');
    const statPedidos = document.getElementById('stat-pedidos'); // O número gigante!
    
    if (!container) return;
    
    // Guardar o lojaId globalmente para atualizar silenciosamente depois
    window.lojaIdAtivaDashboard = lojaId;
    
    try {
        const { data: pedidos, error } = await window.supabaseClient
            .from('pedidos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        const pendentes = pedidos ? pedidos.filter(p => (p.status || 'pendente').toLowerCase() === 'pendente') : [];
        
        // 1. Atualizar Número Gigante para PENDENTES
        if (statPedidos) animarNumero('stat-pedidos', pendentes.length);
        if (badgeAtivos) badgeAtivos.innerText = `${pendentes.length} Pendentes`;
        
        if (badgePedidosHoje && pendentes.length > 0) {
            badgePedidosHoje.innerText = `${pendentes.length} PENDENTE(S)`;
            badgePedidosHoje.classList.remove('hidden');
        } else if (badgePedidosHoje) {
            badgePedidosHoje.classList.add('hidden');
        }
        
        if (pendentes.length > 0) {
            const cloneMsgVazio = msgVazia ? msgVazia.cloneNode(true) : null;
            container.innerHTML = '';
            
            let html = '';
            // Renderiza apenas os ÚLTIMOS 3 PENDENTES
            pendentes.slice(0, 3).forEach(p => {
                const dataFormatada = new Date(p.created_at).toLocaleDateString('pt-MZ');
                const descItens = p.itens && p.itens.length > 0 ? p.itens[0].nome + (p.itens.length > 1 ? ` (+${p.itens.length - 1})` : '') : 'Itens';
                
                html += `
                    <div id="card-pendente-${p.id}" class="bg-white dark:bg-navy-900 overflow-hidden mb-3 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100/80 dark:border-navy-800 transition-all duration-300 transform origin-top">
                        <div class="px-5 py-4 border-b border-slate-50 dark:border-navy-800/50 flex justify-between items-center">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <i class="fas fa-box-open text-sm"></i>
                                </div>
                                <div class="max-w-[130px]">
                                    <h4 class="text-[13px] font-bold text-slate-900 dark:text-white leading-tight truncate">${p.cliente_nome}</h4>
                                    <p class="text-[11px] font-medium text-slate-500 mt-0.5 truncate">${descItens}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-[14px] font-black text-slate-900 dark:text-white tracking-tight">${p.total.toLocaleString('pt-MZ')} <span class="text-[9px] text-slate-400">MT</span></p>
                                <p class="text-[9px] font-bold text-slate-400 mt-0.5">${dataFormatada}</p>
                            </div>
                        </div>
                        <div class="px-3 py-3 bg-slate-50/50 dark:bg-slate-800/30 flex gap-2">
                            <button onclick="confirmarPedidoAction('${p.id}', this)" class="flex-1 bg-[#0F172A] text-white h-11 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md">
                                <i class="fas fa-check text-[10px]"></i> Confirmar
                            </button>
                            <button onclick="recusarPedidoAction('${p.id}', this)" class="w-11 h-11 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-400 rounded-xl flex flex-shrink-0 items-center justify-center active:scale-95 transition-all">
                                <i class="fas fa-times text-[12px]"></i>
                            </button>
                            <a href="https://wa.me/${p.cliente_telefone}" target="_blank" class="w-11 h-11 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl flex flex-shrink-0 items-center justify-center active:scale-95 transition-all">
                                <i class="fab fa-whatsapp text-[14px]"></i>
                            </a>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = html;
            if (cloneMsgVazio) {
                cloneMsgVazio.style.display = 'none';
                container.appendChild(cloneMsgVazio);
            }
        } else {
            container.innerHTML = '';
            if (msgVazia) {
                container.appendChild(msgVazia);
                msgVazia.style.display = 'flex';
            }
        }
    } catch (e) {
        console.error("Erro ao carregar pedidos pendentes:", e);
    }
}

async function confirmarPedidoAction(pedidoId, btnElement) {
    const card = document.getElementById(`card-pendente-${pedidoId}`);
    if (btnElement) btnElement.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    
    try {
        const { error } = await window.supabaseClient.from('pedidos').update({ status: 'confirmado' }).eq('id', pedidoId);
        if (!error) {
            if (typeof mostrarNotificacao === 'function') mostrarNotificacao('Pedido Confirmado!');
            animarRemocaoPedidoEAtualizar(card);
        }
    } catch (e) {
        if (btnElement) btnElement.innerHTML = '<i class="fas fa-check text-[10px]"></i> Confirmar';
    }
}

async function recusarPedidoAction(pedidoId, btnElement) {
    const card = document.getElementById(`card-pendente-${pedidoId}`);
    if (btnElement) btnElement.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    
    try {
        const { error } = await window.supabaseClient.from('pedidos').update({ status: 'cancelado' }).eq('id', pedidoId);
        if (!error) animarRemocaoPedidoEAtualizar(card);
    } catch (e) {
        if (btnElement) btnElement.innerHTML = '<i class="fas fa-times text-[12px]"></i>';
    }
}

function animarRemocaoPedidoEAtualizar(card) {
    // 1. Reduzir instantaneamente TODOS os contadores (Incluindo o Gigante)
    const statPedidos = document.getElementById('stat-pedidos');
    const badgeAtivos = document.getElementById('badge-acoes-pendentes');
    const badgePedidosHoje = document.getElementById('badge-pedidos-hoje');
    
    if (statPedidos) {
        let numeroGigante = parseInt(statPedidos.innerText) || 0;
        if (numeroGigante > 0) statPedidos.innerText = (numeroGigante - 1).toString();
    }

    if (badgeAtivos) {
        let numero = parseInt(badgeAtivos.innerText) || 0;
        if (numero > 0) badgeAtivos.innerText = `${numero - 1} Pendentes`;
    }
    
    if (badgePedidosHoje) {
        let numeroHoje = parseInt(badgePedidosHoje.innerText) || 0;
        if (numeroHoje > 0) badgePedidosHoje.innerText = `${numeroHoje - 1} PENDENTE(S)`;
        if (numeroHoje - 1 === 0) badgePedidosHoje.classList.add('hidden');
    }

    // 2. Animar e remover o cartão
    if (!card) return;
    card.style.transition = 'all 0.35s ease';
    card.style.transform = 'scale(0.95)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.height = '0px';
        card.style.margin = '0px';
        card.style.border = 'none';
        card.style.padding = '0px';
        
        setTimeout(() => {
            card.remove();
            
            // 3. Puxar um novo pedido caso exista (Silenciosamente) para repor a lista
            if (window.lojaIdAtivaDashboard) {
                carregarPedidosPendentesDashboard(window.lojaIdAtivaDashboard);
            }
        }, 300);
    }, 150);
}

