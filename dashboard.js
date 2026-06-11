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
                                <p class="text-[10px] font-black text-slate-600/90 uppercase tracking-widest">Visitas Hoje</p>
                            </div>
                        </div>
                        <div class="bg-white/35 backdrop-blur-xl border border-white/60 rounded-[28px] p-5 flex items-center shadow-sm">
                            <div class="text-slate-700 flex-shrink-0">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.1"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            </div>
                            <div class="ml-4">
                                <h4 id="stat-produtos-ativos" class="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-1">0</h4>
                                <p class="text-[10px] font-black text-slate-600/90 uppercase tracking-widest">Produtos Ativos</p>
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

                <section class="bg-white dark:bg-navy-900 p-6 rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800 relative overflow-hidden group/chart cursor-default">
                    <div class="flex items-start justify-between mb-8">
                        <div>
                            <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tráfego da Loja</h3>
                            <div class="flex items-baseline gap-2">
                                <p id="valor-atual-texto" class="text-4xl font-bold text-slate-900 dark:text-white leading-none tracking-tight">0</p>
                                <span class="text-[12px] font-medium text-slate-500 dark:text-slate-400">visitas únicas hoje</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative h-[130px] mt-2 flex items-end justify-between px-1">
                        <!-- Linhas de Fundo -->
                        <div class="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none pb-6">
                            <div class="w-full border-t border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div class="w-full border-t border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div class="w-full border-t border-solid border-slate-200 dark:border-slate-800"></div>
                        </div>
                        
                        <!-- Barras Modernas dos dias -->
                        <div class="relative z-10 w-full h-[106px] flex items-end justify-between gap-1 sm:gap-2">
                            <!-- Barra inativa -->
                            <div class="group relative w-full flex flex-col items-center h-[25%] transition-all hover:h-[35%]">
                                <div class="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-[8px] h-full transition-colors cursor-pointer"></div>
                                <span class="text-[9px] font-bold text-slate-400 mt-2 absolute -bottom-6">Seg</span>
                            </div>
                            <!-- Barra inativa -->
                            <div class="group relative w-full flex flex-col items-center h-[40%] transition-all hover:h-[50%]">
                                <div class="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-[8px] h-full transition-colors cursor-pointer"></div>
                                <span class="text-[9px] font-bold text-slate-400 mt-2 absolute -bottom-6">Ter</span>
                            </div>
                            <!-- Barra inativa -->
                            <div class="group relative w-full flex flex-col items-center h-[30%] transition-all hover:h-[40%]">
                                <div class="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-[8px] h-full transition-colors cursor-pointer"></div>
                                <span class="text-[9px] font-bold text-slate-400 mt-2 absolute -bottom-6">Qua</span>
                            </div>
                            <!-- Barra inativa -->
                            <div class="group relative w-full flex flex-col items-center h-[55%] transition-all hover:h-[65%]">
                                <div class="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-[8px] h-full transition-colors cursor-pointer"></div>
                                <span class="text-[9px] font-bold text-slate-400 mt-2 absolute -bottom-6">Qui</span>
                            </div>
                            <!-- Barra inativa -->
                            <div class="group relative w-full flex flex-col items-center h-[45%] transition-all hover:h-[55%]">
                                <div class="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-[8px] h-full transition-colors cursor-pointer"></div>
                                <span class="text-[9px] font-bold text-slate-400 mt-2 absolute -bottom-6">Sex</span>
                            </div>
                            <!-- Barra inativa -->
                            <div class="group relative w-full flex flex-col items-center h-[80%] transition-all hover:h-[90%]">
                                <div class="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-[8px] h-full transition-colors cursor-pointer"></div>
                                <span class="text-[9px] font-bold text-slate-400 mt-2 absolute -bottom-6">Sáb</span>
                            </div>
                            <!-- BARRA DE HOJE (Destaque principal) -->
                            <div class="group relative w-full flex flex-col items-center h-[100%] shadow-[0_0_15px_rgba(159,110,245,0.1)]">
                                <!-- Tooltip em cima da barra ativa -->
                                <div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2 py-1 rounded-[6px] text-center shadow-lg whitespace-nowrap z-20 transition-transform">Hoje</div>
                                <!-- Corpo da barra ativa com gradiente roxo premium -->
                                <div class="w-full max-w-[32px] bg-gradient-to-t from-[#9f6ef5]/80 to-[#9f6ef5] rounded-t-[8px] h-full border-t border-[#c6a8fb] shadow-sm transform transition-all cursor-pointer"></div>
                                <span class="text-[9px] font-black text-slate-900 dark:text-white mt-2 absolute -bottom-6 italic">Dom</span>
                            </div>
                        </div>
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

// ==========================================
// LÓGICA DO DASHBOARD (CORRIGIDA)
// ==========================================

function animarNumero(id, valorFinal) {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    
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

// 1. Variáveis na memória para guardar os dados (CACHE)
let dashboardCarregado = false;
let memDashboard = {
    loja: null,
    produtos: null,
    pendentes: null,
    visitasCache: null // NOVO: Guarda os dados do gráfico
};

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'dashboard') {
        if (!dashboardCarregado) {
            carregarDadosLojaDashboard().then(() => {
                dashboardCarregado = true;
            });
        } else {
            // Redesenha instantaneamente da memória (Zero consumo de requisições ao mudar de página)
            renderizarSaudacaoMemoria();
            if (memDashboard.produtos) renderizarProdutosDashboard(memDashboard.produtos);
            if (memDashboard.pendentes) renderizarPendentesDashboard(memDashboard.pendentes);
            
            // O gráfico agora só é desenhado a partir da memória instantânea. 
            // Ele só voltará a puxar da base de dados se a magia do "Tempo Real" for ativada!
            if (memDashboard.visitasCache) {
                animarNumero('stat-visitas', memDashboard.visitasCache.hoje); // Agora pega no valor de 'hoje'
                animarNumero('valor-atual-texto', memDashboard.visitasCache.hoje);
                atualizarGraficoDashboard(memDashboard.visitasCache.contagensArr, memDashboard.visitasCache.ordemNomes);
            }
        }
    }
});

// Permitir atualizações forçadas (ex: quando ouve um novo pedido via Socket)
window.forcarAtualizacaoDashboard = () => {
    dashboardCarregado = false;
    carregarDadosLojaDashboard().then(() => {
        dashboardCarregado = true;
    });
};

// ----------------------------------------------------
// DADOS DA LOJA E SAUDAÇÃO
// ----------------------------------------------------
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
                memDashboard.loja = loja; // Guarda na memória
                renderizarSaudacaoMemoria(); // Aplica no visual
                
                await carregarProdutosDashboard(loja.id);
                await carregarPedidosPendentesDashboard(loja.id);
                await carregarVisitasDashboard(loja.id); // <-- Carrega as visitas para os gráficos

                // --- INÍCIO: NOVO CÓDIGO TEMPO REAL (Visitas) ---
                if (!window.inscricaoRealtimeVisitas) {
                    window.inscricaoRealtimeVisitas = window.supabaseClient
                        .channel('realtime_visitas_dashboard')
                        .on('postgres_changes', { 
                            event: 'INSERT', 
                            schema: 'public', 
                            table: 'visitas', 
                            filter: `loja_id=eq.${loja.id}` 
                        }, (payload) => {
                            // MAGIA: Quando alguém entra na loja ("INSERT" em 'visitas'), reanima o gráfico sozinho!
                            carregarVisitasDashboard(loja.id);
                        })
                        .subscribe();
                }
                // --- FIM: NOVO CÓDIGO TEMPO REAL ---

           } else {
                const h2Saudacao = document.getElementById('dash-saudacao');
                const headerTitulo = document.getElementById('header-titulo');
                
                const hora = new Date().getHours();
                let saudacao = 'Bom dia';
                let icone = '☀️';
                
                if (hora >= 12 && hora < 18) {
                    saudacao = 'Boa tarde';
                    icone = '☕';
                } else if (hora >= 18 || hora < 6) {
                    saudacao = 'Boa noite';
                    icone = '🌙';
                }

                if (h2Saudacao) h2Saudacao.innerHTML = `${saudacao}! <span class="text-3xl">${icone}</span>`;
                if (headerTitulo) headerTitulo.innerText = 'Painel';
            }
        }
    } catch (e) {
        console.error("Erro ao carregar dados da loja no dashboard:", e);
    }
}

// ===========================================
// NOVA FUNÇÃO: carregarVisitasDashboard (Com Alertas de Erro)
// ===========================================
async function carregarVisitasDashboard(lojaId) {
    try {
        // 1. Conta as visitas totais (Estatística Global Numérica)
        const { count: totalVisitas, error: errTotal } = await window.supabaseClient
            .from('visitas')
            .select('*', { count: 'exact', head: true })
            .eq('loja_id', lojaId);
            
        if (errTotal) {
            alert("ERRO AO LER TOTAL DE VISITAS DO DASHBOARD: " + errTotal.message);
        }
            
        // 2. Busca as Visitas Criadas na última semana para o Gráfico
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 6);
        seteDiasAtras.setHours(0,0,0,0);
        
        const { data: visitas, error: errVisitas } = await window.supabaseClient
            .from('visitas')
            .select('created_at')
            .eq('loja_id', lojaId)
            .gte('created_at', seteDiasAtras.toISOString());
            
        if (errVisitas) {
            alert("ERRO AO LER GRÁFICO DE VISITAS: " + errVisitas.message);
        }
            
        // Retirámos a linha que puxava o total absoluto (totalVisitas)

        if (!errVisitas && visitas) {
            const contagemDias = {};
            const nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            const ordemNomes = [];

            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const dataStr = `${year}-${month}-${day}`;
                
                contagemDias[dataStr] = 0;
                ordemNomes.push(nomesDias[d.getDay()]);
            }
            
            visitas.forEach(v => {
                const vDate = new Date(v.created_at); 
                if(!isNaN(vDate)) {
                    const vYear = vDate.getFullYear();
                    const vMonth = String(vDate.getMonth() + 1).padStart(2, '0');
                    const vDay = String(vDate.getDate()).padStart(2, '0');
                    const vDataStr = `${vYear}-${vMonth}-${vDay}`;
                    
                    if (contagemDias[vDataStr] !== undefined) {
                        contagemDias[vDataStr]++;
                    }
                }
            });
            
            const contagensArr = Object.values(contagemDias);
            // Pega o último dia do array (que representa Hoje)
            const hojeCount = contagensArr[contagensArr.length - 1]; 
            
            const textoHoje = document.getElementById('valor-atual-texto');
            if (textoHoje) animarNumero('valor-atual-texto', hojeCount);
            
            // ---> ADICIONADO: Anima o contador principal agora apenas com o número de hoje 
            animarNumero('stat-visitas', hojeCount);
            
            // SALVA TUDO NA MEMÓRIA
            memDashboard.visitasCache = {
                total: totalVisitas || 0,
                hoje: hojeCount,
                contagensArr: contagensArr,
                ordemNomes: ordemNomes
            };
            
            atualizarGraficoDashboard(contagensArr, ordemNomes);
        }
    } catch (e) {
        console.error("Algo correu mal ao renderizar gráfico", e);
    }
}
function atualizarGraficoDashboard(contagens, ordemNomes) {
    const maxVisitas = Math.max(...contagens, 1); 
    
    // Conector 100% blindado para encontrar as barras no ecrã (ignora escapes de classes)
    const conteiners = document.querySelectorAll('.flex.items-end.justify-between.gap-1');
    let conteinerDasBarras = null;
    conteinerDasBarras = conteiners.length > 0 ? conteiners[conteiners.length - 1] : document.querySelector('.relative.z-10.w-full.h-\\[106px\\]');
    
    if (!conteinerDasBarras) {
        console.error("Não encontrei as barras do gráfico na UI!");
        return;
    }
    
    let htmlBarras = '';
    contagens.forEach((qtd, index) => {
        const alturaPercentual = Math.max(15, Math.round((qtd / maxVisitas) * 100));
        const eHoje = index === 6; 
        const nomeDia = ordemNomes[index];
        
        if (eHoje) {
            htmlBarras += `
                <div class="group relative w-full flex flex-col items-center h-[100%] shadow-[0_0_15px_rgba(159,110,245,0.1)] transition-all duration-700 pt-5">
                    <div style="height: ${alturaPercentual}%;" class="w-full relative flex flex-col justify-end items-center mt-auto transition-all">
                        <div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2 py-1 rounded-[6px] text-center shadow-lg whitespace-nowrap z-20">${qtd} Hoje</div>
                        <div class="w-full max-w-[32px] bg-gradient-to-t from-[#9f6ef5]/80 to-[#9f6ef5] rounded-t-[8px] h-full border-t border-[#c6a8fb] shadow-sm transform transition-all cursor-pointer"></div>
                    </div>
                    <span class="text-[9px] font-black text-slate-900 dark:text-white mt-2 absolute -bottom-6 italic">${nomeDia}</span>
                </div>
            `;
        } else {
            htmlBarras += `
                <div class="group relative w-full flex flex-col items-center h-[100%] transition-all duration-700 hover:opacity-80 pt-5">
                    <div style="height: ${alturaPercentual}%;" class="w-full relative flex flex-col justify-end items-center mt-auto transition-all">
                        <div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-2 py-1 rounded-[6px] text-center shadow-md whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">${qtd}</div>
                        <div class="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-[8px] h-full transition-colors cursor-pointer"></div>
                    </div>
                    <span class="text-[9px] font-bold text-slate-400 mt-2 absolute -bottom-6">${nomeDia}</span>
                </div>
            `;
        }
    });

    conteinerDasBarras.innerHTML = htmlBarras;
}

// === CÓDIGO NOVO (Com link dinâmico) ===
function renderizarSaudacaoMemoria() {
    if (!memDashboard.loja) return;
    const loja = memDashboard.loja;
    
    const h2Saudacao = document.getElementById('dash-saudacao');
    const headerTitulo = document.getElementById('header-titulo');
    
    if (h2Saudacao) {
        const nomeVendedor = loja.vendedor_nome ? loja.vendedor_nome.split(' ')[0] : 'Lojista';
        
        const hora = new Date().getHours();
        let saudacao = 'Bom dia';
        let icone = '☀️'; // Sol
        
        if (hora >= 12 && hora < 18) {
            saudacao = 'Boa tarde';
            icone = '☕'; // Café / Tarde
        } else if (hora >= 18 || hora < 6) {
            saudacao = 'Boa noite';
            icone = '🌙'; // Lua
        }

        h2Saudacao.innerHTML = `${saudacao}, ${nomeVendedor} <span class="text-3xl">${icone}</span>`;
    }
    if (headerTitulo) headerTitulo.innerText = loja.nome || '';
    
    // A MÁGICA SALVA-VIDAS: URL normal (para partilhar com clientes) e URL Admin (para o botão Ver Loja)
    const urlLojaNormal = `${window.location.origin}/loja/${loja.slug}`;
    const urlLojaAdmin = `${window.location.origin}/loja/${loja.slug}?admin=true`;
    
    // O botão de ver loja usa o link admin (não contabiliza visita)
    const btnVerLoja = document.getElementById('btn-ver-loja');
    if (btnVerLoja) btnVerLoja.href = urlLojaAdmin;
    
    // O botão de copiar continua a copiar o link normal para os clientes!
    const btnCopiar = document.getElementById('btn-copiar-loja');
    if (btnCopiar) {
        btnCopiar.onclick = () => {
            navigator.clipboard.writeText(urlLojaNormal).then(() => {
                const icone = document.getElementById('icone-copiar');
                if (icone) {
                    icone.className = 'fa-solid fa-check text-[14px] text-emerald-500';
                    setTimeout(() => icone.className = 'fa-regular fa-copy text-[14px]', 2000);
                }
            });
        };
    }
}

// ----------------------------------------------------
// PRODUTOS
// ----------------------------------------------------
async function carregarProdutosDashboard(lojaId) {
    try {
        const { data: produtos, error } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        memDashboard.produtos = produtos || []; // Guarda na memória
        renderizarProdutosDashboard(memDashboard.produtos); // Aplica no visual
    } catch (e) {
        console.error("Erro ao carregar produtos:", e);
    }
}

function renderizarProdutosDashboard(produtos) {
    const containerProduto = document.getElementById('container-produtos');
    const badgeAtivos = document.getElementById('badge-produtos-ativos');
    const statProdutosAtivos = document.getElementById('stat-produtos-ativos');
    if (!containerProduto) return;

    const ativosCount = produtos ? produtos.filter(p => p.ativo).length : 0;
    
    if (badgeAtivos) badgeAtivos.innerText = `${ativosCount} ATIVOS`;
    if (statProdutosAtivos) animarNumero('stat-produtos-ativos', ativosCount);
    
    if (produtos && produtos.length > 0) {
        containerProduto.className = "flex flex-col gap-3 mt-3 order-scroll-area max-h-[300px]";
        let html = '';
        
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
}

// ----------------------------------------------------
// PEDIDOS PENDENTES
// ----------------------------------------------------
async function carregarPedidosPendentesDashboard(lojaId) {
    if (lojaId) window.lojaIdAtivaDashboard = lojaId;
    
    try {
        const { data: pedidos, error } = await window.supabaseClient
            .from('pedidos')
            .select('*')
            .eq('loja_id', lojaId || window.lojaIdAtivaDashboard)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        // MÁGICA: Partilhamos a lista gigantesca que recebemos para a Memória Global,
        // assim a página de Vendas não vai descarregar isso novamente!
        window.todosOsPedidos = [...(pedidos || [])];
        window.pedidosCarregados = true;
        
        memDashboard.pendentes = pedidos ? pedidos.filter(p => (p.status || 'pendente').toLowerCase() === 'pendente') : []; // Guarda na memória
        renderizarPendentesDashboard(memDashboard.pendentes); // Aplica no visual
    } catch (e) {
        console.error("Erro ao carregar pedidos pendentes:", e);
    }
}

function renderizarPendentesDashboard(pendentes) {
    const container = document.getElementById('container-pedidos');
    const badgeAtivos = document.getElementById('badge-acoes-pendentes');
    const msgVazia = document.getElementById('msg-vazio');
    const badgePedidosHoje = document.getElementById('badge-pedidos-hoje');
    const statPedidos = document.getElementById('stat-pedidos'); 
    
    if (!container) return;
    
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
        pendentes.slice(0, 3).forEach(p => {
            // Novo Design Premium - Cartão Limpo e Clicável
            const dataFormatada = new Date(p.created_at).toLocaleDateString('pt-MZ');
            const qtdItens = p.itens ? p.itens.length : 0;
            const descItens = p.itens && p.itens.length > 0 ? p.itens[0].nome : 'Sem itens';
            
            // Busca a foto do primeiro item.
            const fotoProduto = (p.itens && p.itens[0] && (p.itens[0].foto || p.itens[0].imagem)) 
                                ? (p.itens[0].foto || p.itens[0].imagem) 
                                : 'https://placehold.co/150x150/f8fafc/94a3b8?text=Sem+Foto';

            html += `
                <div onclick="abrirModalPedido('${p.id}')" id="card-pendente-${p.id}" class="bg-white dark:bg-navy-900 mb-3 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-navy-800 transition-all active:scale-[0.98] cursor-pointer p-3 flex items-center gap-3 relative overflow-hidden group hover:border-slate-200 dark:hover:border-navy-700">
                    
                    <div class="w-14 h-14 rounded-[14px] bg-slate-50 dark:bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-100 dark:border-navy-700 relative">
                        <img src="${fotoProduto}" class="w-full h-full object-cover" alt="Produto do pedido">
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-0.5">
                            <h4 class="text-[13px] font-bold text-slate-900 dark:text-white truncate pr-2">${p.cliente_nome}</h4>
                            <span class="text-[9px] font-black text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-[6px] tracking-widest uppercase">Pendente</span>
                        </div>
                        
                        <div class="flex items-center text-[11px] font-medium text-slate-500 truncate mb-1.5">
    <span>${qtdItens} item(s)</span>
</div>
                        
                        <div class="flex items-center justify-between">
                            <p class="text-[12px] font-black text-slate-900 dark:text-white">${p.total.toLocaleString('pt-MZ')} <span class="text-[9px] font-bold text-slate-400">MT</span></p>
                            <p class="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                                <i class="fa-regular fa-clock"></i> ${dataFormatada}
                            </p>
                        </div>
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
}

// Em animarRemocaoPedidoEAtualizar(card), continue a usar:
// if (window.lojaIdAtivaDashboard) { carregarPedidosPendentesDashboard(window.lojaIdAtivaDashboard); }
async function confirmarPedidoAction(pedidoId, btnElement) {
    const card = document.getElementById(`card-pendente-${pedidoId}`);
    if (btnElement) btnElement.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    
    try {
        const { error } = await window.supabaseClient.from('pedidos').update({ status: 'confirmado' }).eq('id', pedidoId);
        if (!error) {
            if (typeof mostrarNotificacao === 'function') mostrarNotificacao('Pedido Confirmado!');
            animarRemocaoPedidoEAtualizar(card);
            
            // MÁGICA: Atualiza instantaneamente a lista de Pedidos na memória (Página Vendas)
            if (typeof todosOsPedidos !== 'undefined') {
                const index = todosOsPedidos.findIndex(p => p.id === pedidoId);
                if (index !== -1) todosOsPedidos[index].status = 'confirmado';
            }
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
        if (!error) {
            animarRemocaoPedidoEAtualizar(card);
            
            // MÁGICA: Atualiza instantaneamente a lista de Pedidos na memória (Página Vendas)
            if (typeof todosOsPedidos !== 'undefined') {
                const index = todosOsPedidos.findIndex(p => p.id === pedidoId);
                if (index !== -1) todosOsPedidos[index].status = 'cancelado';
            }
        }
    } catch (e) {
        if (btnElement) btnElement.innerHTML = '<i class="fas fa-times text-[12px]"></i>';
    }
}

// ────── CÓDIGO A SUBSTITUIR EM: dashboard.js ──────

function animarRemocaoPedidoEAtualizar(card) {
    const statPedidos = document.getElementById('stat-pedidos');
    const badgeAtivos = document.getElementById('badge-acoes-pendentes');
    const badgePedidosHoje = document.getElementById('badge-pedidos-hoje');
    
    // Altera os números da página imediatamente
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

    if (!card) return;
    card.style.transition = 'all 0.35s ease';
    card.style.transform = 'scale(0.95)';
    card.style.opacity = '0';
    
    // Exclui o visual maravilhosamente sem travar ou sobrecarregar a BD
    setTimeout(() => {
        card.style.height = '0px';
        card.style.margin = '0px';
        card.style.border = 'none';
        card.style.padding = '0px';
        
        setTimeout(() => {
            card.remove();
            // NADA de carregar da base de dados aqui - As "Mágicas" do global.js cuidam de atualizar os valores internamente!
        }, 300);
    }, 150);
}
