document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-dashboard">
        <div class="relative w-full pb-16 overflow-hidden rounded-b-[40px]">
            <div class="absolute inset-0 w-full h-full z-0" style="background-color: #FDE6DA; background-image: url(&quot;data:image/svg+xml,%3Csvg width='375' height='812' viewBox='0 0 375 812' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='375' height='812' fill='%23FDE6DA'/%3E%3Cg filter='url(%23filter0_f)'%3E%3Ccircle cx='60' cy='80' r='220' fill='%23D4B5FD' fill-opacity='0.9'/%3E%3Ccircle cx='340' cy='50' r='200' fill='%23FBCFE8' fill-opacity='0.8'/%3E%3Ccircle cx='187' cy='406' r='280' fill='white' fill-opacity='0.3'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f' x='-400' y='-400' width='1175' height='1612' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='90' result='effect1_foregroundBlur'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E&quot;); background-size: cover; background-position: center 20%;"></div>
            <div class="relative z-10 px-6 pt-28 max-w-md mx-auto">
                <div class="flex justify-between items-start mb-8">
                    <div>
                        <h2 id="dash-saudacao" class="text-3xl font-medium text-slate-900 tracking-tight leading-none h-9 flex items-center">
                            <div class="h-7 w-40 bg-slate-800/10 animate-pulse rounded-md"></div>
                        </h2>
                        <div class="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-emerald-50/80 rounded-full border border-emerald-100/50 shadow-sm backdrop-blur-sm">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Loja Online</span>
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
                            <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tráfego da Loja</h3>
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
                        <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span class="text-slate-900 dark:text-white font-black italic">Dom</span>
                    </div>
                </section>

                <div class="grid grid-cols-1 gap-6">
                    <section class="bg-white dark:bg-navy-900 p-6 rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800">
                        <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5">Origem do Tráfego</h3>
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
                                    <p class="text-[11px] text-slate-500 font-medium mt-0.5">Prepara o teu catálogo para faturar</p>
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
    const elemento = document.getElementById(id);
    if (!elemento) return;
    const valorAlvo = parseInt(String(valorFinal).replace(/\D/g, ''));
    if (isNaN(valorAlvo)) { elemento.textContent = valorFinal; return; }
    let valorInicial = 0;
    const duracao = 900;
    const incremento = valorAlvo / (duracao / 16);
    const atualizar = () => {
        valorInicial += incremento;
        if (valorInicial < valorAlvo) {
            elemento.textContent = Math.floor(valorInicial);
            requestAnimationFrame(atualizar);
        } else {
            elemento.textContent = valorAlvo;
        }
    };
    atualizar();
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
    // A interface arranca a zeros no HTML
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
                const headerTitulo = document.getElementById('header-titulo'); // Elemento que está fora no router.html
                
                // Formatação humana e sem "Oi?..."
                if (h2Saudacao) {
                    const nomeVendedor = loja.vendedor_nome ? loja.vendedor_nome.split(' ')[0] : 'Lojista';
                    h2Saudacao.innerHTML = `Olá, ${nomeVendedor} <span class="text-3xl">👋</span>`;
                }
                
                // Manda apenas para o topo (cabeçalho)
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
        const 