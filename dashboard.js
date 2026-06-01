document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-dashboard">
        <div class="relative w-full pb-16 overflow-hidden rounded-b-[40px]">
            <div class="absolute inset-0 w-full h-full z-0" style="background-color: #FDE6DA; background-image: url(&quot;data:image/svg+xml,%3Csvg width='375' height='812' viewBox='0 0 375 812' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='375' height='812' fill='%23FDE6DA'/%3E%3Cg filter='url(%23filter0_f)'%3E%3Ccircle cx='60' cy='80' r='220' fill='%23D4B5FD' fill-opacity='0.9'/%3E%3Ccircle cx='340' cy='50' r='200' fill='%23FBCFE8' fill-opacity='0.8'/%3E%3Ccircle cx='187' cy='406' r='280' fill='white' fill-opacity='0.3'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f' x='-400' y='-400' width='1175' height='1612' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='90' result='effect1_foregroundBlur'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E&quot;); background-size: cover; background-position: center 20%;"></div>
            <div class="relative z-10 px-6 pt-28 max-w-md mx-auto">
                <div class="flex justify-between items-start mb-8">
                    <div>
                        <h2 id="dash-saudacao" class="text-3xl font-medium text-slate-900 tracking-tight leading-none">Olá, ...</h2>
                        <div class="flex items-center gap-2 mt-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                            <p id="dash-loja-nome" class="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">A carregar...</p>
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
                                <span class="text-[9px] font-black bg-[#9f6ef5]/10 text-[#9f6ef5] px-2.5 py-1 rounded-lg">+4 hoje</span>
                            </div>
                            <div class="flex items-baseline gap-2 mt-1">
                                <h3 id="stat-pedidos" class="text-[52px] font-medium text-slate-900 tracking-tighter leading-none">18</h3>
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
                                <h4 id="stat-visitas" class="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-1">342</h4>
                                <p class="text-[10px] font-black text-slate-600/90 uppercase tracking-widest">Visitas</p>
                            </div>
                        </div>
                        <div class="bg-white/35 backdrop-blur-xl border border-white/60 rounded-[28px] p-5 flex items-center shadow-sm">
                            <div class="text-slate-700 flex-shrink-0">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div class="ml-4">
                                <h4 id="stat-confirmados" class="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-1">12</h4>
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
                        <span class="text-[9px] font-black text-[#9f6ef5] bg-[#D4B5FD]/10 border border-[#D4B5FD]/20 px-2.5 py-1 rounded-md uppercase tracking-widest">2 Pendentes</span>
                    </div>

                    <div class="order-scroll-area" id="container-pedidos">
                        <div class="bg-white dark:bg-navy-900 p-5 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800" id="card-1">
                            <div class="flex gap-3 items-start">
                                <div class="w-12 h-12 rounded-[14px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                                    <span class="text-[8px] font-black text-slate-300 tracking-widest">IMG</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate">Nike Jordan Retro</h4>
                                    <div class="flex items-center gap-1.5 mt-1">
                                        <div class="w-3.5 h-3.5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[7px] font-bold">A</div>
                                        <p class="text-[10px] font-bold text-slate-500 truncate">Ana Marques</p>
                                    </div>
                                    <div class="flex items-center gap-2 mt-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        <span class="flex items-center gap-1"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> WPP</span>
                                        <span>•</span>
                                        <span class="text-slate-900 dark:text-white">2.500 MT</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2 mt-5">
                                <button onclick="confirmarComAnimacao('card-1')" class="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-[0.97] transition-transform shadow-sm">Confirmar</button>
                                <button onclick="confirmarComAnimacao('card-1')" class="flex-1 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-[0.97] transition-transform">Recusar</button>
                            </div>
                        </div>

                        <div class="bg-white dark:bg-navy-900 p-5 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800" id="card-2">
                            <div class="flex gap-3 items-start">
                                <div class="w-12 h-12 rounded-[14px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                                    <span class="text-[8px] font-black text-slate-300 tracking-widest">IMG</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate">T-shirt Oversized</h4>
                                    <div class="flex items-center gap-1.5 mt-1">
                                        <div class="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[7px] font-bold">C</div>
                                        <p class="text-[10px] font-bold text-slate-500 truncate">Carlos Silva</p>
                                    </div>
                                    <div class="flex items-center gap-2 mt-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        <span class="flex items-center gap-1"><div class="w-1.5 h-1.5 rounded-full bg-pink-500"></div> IG</span>
                                        <span>•</span>
                                        <span class="text-slate-900 dark:text-white">850 MT</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2 mt-5">
                                <button onclick="confirmarComAnimacao('card-2')" class="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-[0.97] transition-transform shadow-sm">Confirmar</button>
                                <button onclick="confirmarComAnimacao('card-2')" class="flex-1 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-[0.97] transition-transform">Recusar</button>
                            </div>
                        </div>

                        <div id="msg-vazio" class="hidden col-span-full py-12 flex-col items-center justify-center text-center gap-3">
                            <svg class="w-12 h-12 text-slate-200 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <p class="text-sm font-bold text-slate-400">Sem pedidos pendentes</p>
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
                                <path id="areaPath" fill="url(#chartGradient)" d="M0,130 C30,130 50,100 80,100 C110,100 130,140 160,140 C190,140 210,90 240,90 C270,90 280,60 300,60 L300,150 L0,150 Z" style="transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);"></path>
                                <path id="cordaPath" class="corda stroke-[#9f6ef5]" d="M0,130 C30,130 50,100 80,100 C110,100 130,140 160,140 C190,140 210,90 240,90 C270,90 280,60 300,60" style="transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);"></path>
                                <circle id="p-atual" cx="300" cy="60" r="4.5" fill="#9f6ef5" stroke="#ffffff" stroke-width="2.5" style="transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); filter: drop-shadow(0 4px 6px rgba(159, 110, 245, 0.3));"></circle>
                                <text id="valor-atual" x="295" y="45" font-family="Inter" font-size="11" font-weight="800" fill="#9f6ef5" text-anchor="end" stroke="#ffffff" stroke-width="4" stroke-linejoin="round" paint-order="stroke" style="transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);">342 Visitas</text>
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
                            <div class="flex justify-between items-center text-xs"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-emerald-500"></div><span class="font-bold text-slate-700 dark:text-slate-300">WhatsApp</span></div><span class="font-black text-slate-900 dark:text-white">112</span></div>
                            <div class="flex justify-between items-center text-xs"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-blue-500"></div><span class="font-bold text-slate-700 dark:text-slate-300">Facebook</span></div><span class="font-black text-slate-900 dark:text-white">46</span></div>
                            <div class="flex justify-between items-center text-xs"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-pink-500"></div><span class="font-bold text-slate-700 dark:text-slate-300">Instagram</span></div><span class="font-black text-slate-900 dark:text-white">18</span></div>
                        </div>
                    </section>

                    <section class="space-y-3">
                        <div class="flex justify-between items-center px-1">
                            <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Os Meus Produtos</h3>
                            <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest">2 ativos</span>
                        </div>
                        <div class="bg-white dark:bg-navy-900 p-4 rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800 flex items-center justify-between transition-transform active:scale-[0.98]">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[8px] font-black text-slate-300 dark:text-slate-500">NIKE</div>
                                <div>
                                    <p class="text-sm font-bold text-slate-900 dark:text-white">Jordan 1 High</p>
                                    <p class="text-[10px] text-slate-500 font-bold mt-0.5">2.500,00 MT</p>
                                </div>
                            </div>
                            <button class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </template>
`);

// dashboard.js - Lógica exclusiva do Dashboard

const dadosDashboard = {
    hoje: { pedidos: "3", visitas: "42", confirmados: "2", sufixo: "(Hoje)" },
    "7dias": { pedidos: "18", visitas: "342", confirmados: "12", sufixo: "(7 dias)" },
    "30dias": { pedidos: "72", visitas: "1.240", confirmados: "48", sufixo: "(30 dias)" }
};

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

// O CÉREBRO: Decide se mostra os dados ou se esvazia a tela
function initDashboard() {
    const p = document.getElementById('stat-pedidos');
    const v = document.getElementById('stat-visitas');
    const c = document.getElementById('stat-confirmados');
    
    if (p) animarNumero('stat-pedidos', p.innerText);
    if (v) animarNumero('stat-visitas', v.innerText);
    if (c) animarNumero('stat-confirmados', c.innerText);
}

// A FUNÇÃO QUE LIMPA OS DADOS FALSOS
function aplicarEstadoZero() {
    // 1. Zera os números principais logo de cara (sem animação)
    const p = document.getElementById('stat-pedidos');
    const v = document.getElementById('stat-visitas');
    const c = document.getElementById('stat-confirmados');
    if (p) p.innerText = '0';
    if (v) v.innerText = '0';
    if (c) c.innerText = '0';

    // 2. Caçar e Ocultar Badges
    const spans = document.querySelectorAll('span');
    spans.forEach(span => {
        const texto = span.innerText.trim().toUpperCase();
        if (texto.includes('+4 HOJE')) span.style.display = 'none';
        if (texto.includes('2 PENDENTES') && span.classList.contains('bg-[#D4B5FD]/10')) {
            span.innerText = '0 PENDENTES';
            span.className = 'text-[9px] font-black text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md uppercase tracking-widest';
        }
    });

    // 3. Limpar a secção de pedidos pendentes
    const containerPedidos = document.getElementById('container-pedidos');
    if (containerPedidos) {
        containerPedidos.innerHTML = `
            <div class="col-span-full py-8 flex flex-col items-center justify-center text-center gap-3 opacity-80">
                <div class="w-14 h-14 bg-slate-50 border border-slate-100 rounded-[20px] flex items-center justify-center text-slate-300 mb-2 shadow-sm">
                    <i class="fa-solid fa-receipt text-2xl"></i>
                </div>
                <h4 class="text-[14px] font-bold text-slate-900">Sem pedidos ainda</h4>
                <p class="text-[12px] text-slate-500 mt-1 max-w-[220px] leading-relaxed mx-auto">
                    A tua montra está vazia. Começa a adicionar produtos abaixo.
                </p>
            </div>
        `;
    }

    // 4. Achatar o gráfico SVG para zero
    const areaPath = document.getElementById('areaPath');
    const cordaPath = document.getElementById('cordaPath');
    const pAtual = document.getElementById('p-atual');
    const valorAtual = document.getElementById('valor-atual');

    if (areaPath) areaPath.setAttribute('d', 'M0,150 L300,150 L300,150 L0,150 Z');
    if (cordaPath) cordaPath.setAttribute('d', 'M0,148 L300,148');
    if (pAtual) { pAtual.setAttribute('cx', '150'); pAtual.setAttribute('cy', '148'); }
    if (valorAtual) {
        valorAtual.innerHTML = '0 Visitas';
        valorAtual.setAttribute('x', '150');
        valorAtual.setAttribute('y', '135');
        valorAtual.setAttribute('text-anchor', 'middle');
    }

    // 5. Origens do tráfego para zero
    const origens = document.querySelectorAll('.flex.justify-between.items-center span.font-black');
    origens.forEach(el => {
        el.innerText = '0';
        el.classList.add('opacity-30');
    });

    // 6. Substituir ténis Nike por botão de Adicionar Produto
    const titulos = document.querySelectorAll('h3');
    titulos.forEach(titulo => {
        if (titulo.innerText.trim().toUpperCase() === 'OS MEUS PRODUTOS') {
            const badgeAtivos = titulo.nextElementSibling;
            if (badgeAtivos && badgeAtivos.tagName.toLowerCase() === 'span') {
                badgeAtivos.innerText = '0 ATIVOS';
            }

            const containerProduto = titulo.parentElement.nextElementSibling;
            if (containerProduto) {
                containerProduto.className = "w-full mt-3";
                containerProduto.innerHTML = `
                    <button onclick="navegarAnimado('criar-produto')" class="w-full bg-slate-50 p-5 rounded-[24px] border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center gap-3 hover:bg-emerald-50 transition-all active:scale-[0.98] group">
                        <div class="w-12 h-12 rounded-[16px] bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                            <i class="fa-solid fa-plus text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-900">Adicionar Primeiro Produto</p>
                            <p class="text-[11px] text-slate-500 font-medium mt-0.5">Prepara o teu catálogo para faturar</p>
                        </div>
                    </button>
                `;
            }
        }
    });
}

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'dashboard') {
        // Load dynamically store name and actions, and then fetch products
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
                const pLojaNome = document.getElementById('dash-loja-nome');
                
                if (h2Saudacao) h2Saudacao.innerText = 'Olá, ' + (loja.vendedor_nome || 'Lojista');
                if (pLojaNome) pLojaNome.innerText = loja.nome;
                
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
                
                // Limpar fake stats default
                limparDadosFalsosDashboard();
                
                // Carregar produtos da loja
                await carregarProdutosDashboard(loja.id);
            } else {
                const h2Saudacao = document.getElementById('dash-saudacao');
                const pLojaNome = document.getElementById('dash-loja-nome');
                if (h2Saudacao) h2Saudacao.innerText = 'Olá!';
                if (pLojaNome) pLojaNome.innerText = 'Sem Loja';
                limparDadosFalsosDashboard();
            }
        }
    } catch (e) {
        console.error("Erro ao carregar dados da loja no dashboard:", e);
    }
}

function limparDadosFalsosDashboard() {
    // 1. Zera os números principais
    const p = document.getElementById('stat-pedidos');
    const v = document.getElementById('stat-visitas');
    const c = document.getElementById('stat-confirmados');
    if (p) p.innerText = '0';
    if (v) v.innerText = '0';
    if (c) c.innerText = '0';

    // 2. Caçar e Ocultar Badges
    const spans = document.querySelectorAll('span');
    spans.forEach(span => {
        const texto = span.innerText.trim().toUpperCase();
        if (texto.includes('+4 HOJE')) span.style.display = 'none';
        if (texto.includes('2 PENDENTES') && span.classList.contains('bg-[#D4B5FD]/10')) {
            span.innerText = '0 PENDENTES';
            span.className = 'text-[9px] font-black text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md uppercase tracking-widest';
        }
    });

    // 3. Limpar a secção de pedidos pendentes
    const containerPedidos = document.getElementById('container-pedidos');
    if (containerPedidos) {
        containerPedidos.innerHTML = `
            <div class="col-span-full py-8 flex flex-col items-center justify-center text-center gap-3 opacity-80">
                <div class="w-14 h-14 bg-slate-50 border border-slate-100 rounded-[20px] flex items-center justify-center text-slate-300 mb-2 shadow-sm">
                    <i class="fa-solid fa-receipt text-2xl"></i>
                </div>
                <h4 class="text-[14px] font-bold text-slate-900">Sem pedidos ainda</h4>
                <p class="text-[12px] text-slate-500 mt-1 max-w-[220px] leading-relaxed mx-auto">
                    Os teus novos pedidos vão aparecer aqui.
                </p>
            </div>
        `;
    }

    // 4. Achatar o gráfico SVG para zero
    const areaPath = document.getElementById('areaPath');
    const cordaPath = document.getElementById('cordaPath');
    const pAtual = document.getElementById('p-atual');
    const valorAtual = document.getElementById('valor-atual');

    if (areaPath) areaPath.setAttribute('d', 'M0,150 L300,150 L300,150 L0,150 Z');
    if (cordaPath) cordaPath.setAttribute('d', 'M0,148 L300,148');
    if (pAtual) { pAtual.setAttribute('cx', '150'); pAtual.setAttribute('cy', '148'); }
    if (valorAtual) {
        valorAtual.innerHTML = '0 Visitas';
        valorAtual.setAttribute('x', '150');
        valorAtual.setAttribute('y', '135');
        valorAtual.setAttribute('text-anchor', 'middle');
    }

    // 5. Origens do tráfego para zero
    const origens = document.querySelectorAll('.flex.justify-between.items-center span.font-black');
    origens.forEach(el => {
        el.innerText = '0';
        el.classList.add('opacity-30');
    });
}

async function carregarProdutosDashboard(lojaId) {
    // 6. Atualizar a listagem de produtos com dados reais
    const titulos = document.querySelectorAll('h3');
    let titleElement = null;
    titulos.forEach(titulo => {
        if (titulo.innerText.trim().toUpperCase() === 'OS MEUS PRODUTOS') {
            titleElement = titulo;
        }
    });
    
    if (!titleElement) return;
    
    const badgeAtivos = titleElement.nextElementSibling;
    const containerProduto = titleElement.parentElement.nextElementSibling;
    
    if (!containerProduto) return;
    
    try {
        const { data: produtos, error } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        const ativosCount = produtos ? produtos.filter(p => p.ativo).length : 0;
        if (badgeAtivos && badgeAtivos.tagName.toLowerCase() === 'span') {
            badgeAtivos.innerText = `${ativosCount} ATIVOS`;
        }
        
        if (!produtos || produtos.length === 0) {
            containerProduto.className = "w-full mt-3";
            containerProduto.innerHTML = `
                <button onclick="navegarAnimado('criar-produto')" class="w-full bg-slate-50 p-5 rounded-[24px] border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center gap-3 hover:bg-emerald-50 transition-all active:scale-[0.98] group">
                    <div class="w-12 h-12 rounded-[16px] bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <i class="fa-solid fa-plus text-xl"></i>
                    </div>
                    <div>
                        <p class="text-sm font-bold text-slate-900">Adicionar Primeiro Produto</p>
                        <p class="text-[11px] text-slate-500 font-medium mt-0.5">Prepara o teu catálogo para faturar</p>
                    </div>
                </button>
            `;
        } else {
            containerProduto.className = "flex flex-col gap-3 mt-3 order-scroll-area max-h-[300px]";
            let html = '';
            
            // Renderiza apenas os 3 primeiros produtos recentes no Dashboard por espaço
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
