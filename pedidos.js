// Injeta a Interface da Página de Pedidos
document.body.insertAdjacentHTML('beforeend', `
<template id="tpl-vendas">
    <div class="bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen pb-24">
        
        <div class="sticky top-0 z-20 bg-[#f6f6f7]/95 dark:bg-[#0b0f1a]/95 backdrop-blur-xl pt-24 pb-4 border-b border-slate-200/50 dark:border-navy-800/50 flex flex-col gap-4 shadow-sm">
            
            <div class="flex justify-end items-center px-5">
                <button onclick="abrirModalPeriodo()" class="flex items-center gap-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-sm active:scale-95 transition-all">
                    <i class="far fa-calendar-alt text-slate-400"></i> <span id="texto-periodo-atual">Este Mês</span> <i class="fas fa-chevron-down text-[9px] ml-1 opacity-40"></i>
                </button>
            </div>
            
            <div class="px-5">
                <div class="relative group">
                    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-colors group-focus-within:text-slate-900 dark:group-focus-within:text-white"></i>
                    <input type="text" id="input-pesquisa-pedidos" placeholder="Pesquisar encomendas, clientes..." class="w-full h-[50px] pl-11 pr-4 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-[20px] text-[14px] font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-navy-500 shadow-sm transition-all">
                </div>
            </div>

            <div class="flex gap-2 px-5 overflow-x-auto no-scrollbar items-center">
                <button onclick="filtrarPedidos('pendente')" class="flex-shrink-0 px-5 py-2 rounded-full text-[12px] font-bold bg-[#0F172A] text-white shadow-md active:scale-95 transition-all filtro-btn active" data-filter="pendente">Pendentes</button>
                <button onclick="filtrarPedidos('confirmado')" class="flex-shrink-0 px-5 py-2 rounded-full text-[12px] font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 active:scale-95 transition-all filtro-btn" data-filter="confirmado">Confirmados</button>
                <button onclick="filtrarPedidos('concluido')" class="flex-shrink-0 px-5 py-2 rounded-full text-[12px] font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 active:scale-95 transition-all filtro-btn" data-filter="concluido">Concluídos</button>
                <button onclick="filtrarPedidos('cancelado')" class="flex-shrink-0 px-5 py-2 rounded-full text-[12px] font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 active:scale-95 transition-all filtro-btn" data-filter="cancelado">Cancelados</button>
            </div>
        </div>
        
        <div class="px-5 mt-4 space-y-3" id="lista-pedidos-historico">
            <div class="py-12 text-center text-slate-400 text-sm flex flex-col items-center">
                 <i class="fas fa-circle-notch fa-spin text-2xl mb-3"></i>
                 A carregar histórico...
            </div>
        </div>

        <div id="container-carregar-mais" class="px-5 mt-5 hidden pb-8">
            <button onclick="carregarMaisPedidos()" class="w-full h-12 bg-slate-100 dark:bg-navy-800 rounded-[16px] text-[12px] font-bold text-slate-600 dark:text-slate-300 active:scale-95 transition-all border border-slate-200 dark:border-navy-700 flex items-center justify-center gap-2">
                Ver encomendas anteriores <i class="fas fa-arrow-down text-[10px] opacity-70"></i>
            </button>
        </div>

    </div>
</template>
`);

// Injeta o modal de Detalhes da Encomenda
if (!document.getElementById('modal-pedido')) {
    document.body.insertAdjacentHTML('beforeend', `
        <div id="modal-pedido" class="modal-container">
            <div class="modal-backdrop"></div>
            <div class="modal-sheet drawer bg-white dark:bg-navy-900 pb-8 px-6 flex flex-col gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
                <div class="modal-handle dark:bg-navy-700"></div>
                
                <div class="flex justify-between items-center mt-1 border-b border-slate-50 dark:border-navy-800 pb-4 shrink-0">
                    <h3 class="text-[13px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Detalhes da Encomenda</h3>
                    <button onclick="fecharModal('modal-pedido')" class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 dark:bg-navy-800 text-slate-500 dark:text-slate-400 active:scale-90 transition-all border border-slate-100 dark:border-navy-700">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
                
                <div id="modal-pedido-corpo" class="overflow-y-auto no-scrollbar pb-6 space-y-4">
                </div>
            </div>
        </div>
    `);
}

// Injeta o modal de Filtro de Período
if (!document.getElementById('modal-periodo')) {
    document.body.insertAdjacentHTML('beforeend', `
        <div id="modal-periodo" class="modal-container">
            <div class="modal-backdrop"></div>
            <div class="modal-sheet drawer bg-white dark:bg-navy-900 pb-8 px-6 flex flex-col gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
                <div class="modal-handle dark:bg-navy-700"></div>
                
                <div class="flex justify-between items-center mt-1 mb-2 shrink-0">
                    <h3 class="text-[13px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Filtrar por Período</h3>
                    <button onclick="fecharModal('modal-periodo')" class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 dark:bg-navy-800 text-slate-500 dark:text-slate-400 active:scale-90 transition-all border border-slate-100 dark:border-navy-700">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
                
                <div class="flex flex-col gap-2" id="lista-opcoes-periodo">
                    <button onclick="mudarPeriodo('hoje', 'Hoje')" class="w-full text-left px-5 py-4 rounded-[16px] bg-slate-50 dark:bg-navy-800/50 text-[13px] font-bold text-slate-700 dark:text-slate-300 active:scale-[0.98] transition-all flex justify-between items-center group">Hoje <i class="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all"></i></button>
                    <button onclick="mudarPeriodo('semana', 'Esta Semana')" class="w-full text-left px-5 py-4 rounded-[16px] bg-slate-50 dark:bg-navy-800/50 text-[13px] font-bold text-slate-700 dark:text-slate-300 active:scale-[0.98] transition-all flex justify-between items-center group">Esta Semana <i class="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all"></i></button>
                    <button onclick="mudarPeriodo('mes', 'Este Mês')" class="w-full text-left px-5 py-4 rounded-[16px] bg-[#0F172A] text-white active:scale-[0.98] transition-all flex justify-between items-center shadow-md">Este Mês <i class="fas fa-check text-[12px]"></i></button>
                    <button onclick="mudarPeriodo('sempre', 'Todo o Período')" class="w-full text-left px-5 py-4 rounded-[16px] bg-slate-50 dark:bg-navy-800/50 text-[13px] font-bold text-slate-700 dark:text-slate-300 active:scale-[0.98] transition-all flex justify-between items-center group">Todo o Período <i class="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all"></i></button>
                </div>
            </div>
        </div>
    `);
}


// ══════════════════════════════════════════════════════════════
// 1. DADOS E INICIALIZAÇÃO
// ══════════════════════════════════════════════════════════════
let todosOsPedidos = [];
let pedidosCarregados = false; 

// Variáveis de Controlo da Interface
let filtroStatusAtual = 'pendente';
let filtroPeriodoAtual = 'mes'; 
let termoPesquisaAtual = '';
let limiteExibicaoPedidos = 15;

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'vendas') {
        if (window.pedidosCarregados) {
            pedidosCarregados = true;
            todosOsPedidos = window.todosOsPedidos;
        }

        if (!pedidosCarregados) {
            carregarHistoricoPedidos();
        } else {
            const btnTudo = document.querySelector('.filtro-btn.active');
            if (typeof filtrarPedidos === 'function') {
                filtrarPedidos(btnTudo ? btnTudo.dataset.filter : 'pendente');
            }
        }
    }
});

async function carregarHistoricoPedidos() {
    const lista = document.getElementById('lista-pedidos-historico');
    if (!lista) return;

    if (todosOsPedidos.length === 0) {
        lista.innerHTML = '<div class="py-6 text-center text-slate-400 text-sm flex flex-col items-center"><i class="fas fa-circle-notch fa-spin text-2xl mb-2"></i>A verificar catálogo...</div>';
    }

    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (!userId) {
            lista.innerHTML = '<p class="text-center text-slate-400 py-4">Sessão expirada. Atualize a página.</p>';
            return;
        }

        let lojaId = window.lojaIdAtivaDashboard;
        if (!lojaId) {
             const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', userId).maybeSingle();
             if (loja) {
                 lojaId = loja.id;
                 window.lojaIdAtivaDashboard = loja.id; 
             }
        }

        if (!lojaId) {
            lista.innerHTML = '<p class="text-center text-slate-400 py-4">Nenhuma loja conectada.</p>';
            return;
        }

        const { data: pedidos, error } = await window.supabaseClient
            .from('pedidos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });

        if (error) throw error; 

        todosOsPedidos = pedidos || [];
        pedidosCarregados = true; 
        window.todosOsPedidos = todosOsPedidos;
        window.pedidosCarregados = true;

    } catch (e) {
        console.error("Erro BD:", e);
        lista.innerHTML = '<div class="py-6 text-center text-red-500 text-sm flex flex-col items-center"><i class="fas fa-exclamation-triangle text-2xl mb-2"></i>Erro ao descarregar da nuvem.</div>';
        return; 
    }

    try {
        const btnAtivo = document.querySelector('.filtro-btn.active');
        const filtroAtual = btnAtivo ? btnAtivo.dataset.filter : 'pendente';
        if (typeof filtrarPedidos === 'function') filtrarPedidos(filtroAtual);
    } catch (erroInterface) {
        console.error("Erro UI:", erroInterface);
    }
}

// ══════════════════════════════════════════════════════════════
// 2. LÓGICA DE FILTROS E PESQUISA
// ══════════════════════════════════════════════════════════════

// Função utilitária de UX: Remove acentos e caracteres especiais para a pesquisa
function normalizarTexto(texto) {
    if (!texto) return '';
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function dataDentroDoPeriodo(dataString, periodo) {
    if (periodo === 'sempre') return true;
    
    const dataPedido = new Date(dataString);
    const hoje = new Date();
    
    // Zera as horas para comparar dias limpos (evita problemas de fuso horário)
    const dataPedidoClean = new Date(dataPedido.getFullYear(), dataPedido.getMonth(), dataPedido.getDate());
    const hojeClean = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    
    if (periodo === 'hoje') {
        return dataPedidoClean.getTime() === hojeClean.getTime();
    }
    
    if (periodo === 'semana') {
        // Ajuste UX: A semana começa à Segunda-feira (Padrão Moçambique) e não ao Domingo (Padrão EUA)
        const diaDaSemana = hojeClean.getDay(); // 0 é Domingo, 1 é Segunda...
        const diasParaVoltar = diaDaSemana === 0 ? 6 : diaDaSemana - 1; 
        
        const primeiroDiaSemana = new Date(hojeClean);
        primeiroDiaSemana.setDate(hojeClean.getDate() - diasParaVoltar);
        
        return dataPedidoClean >= primeiroDiaSemana;
    }
    
    if (periodo === 'mes') {
        return dataPedido.getMonth() === hoje.getMonth() && 
               dataPedido.getFullYear() === hoje.getFullYear();
    }
    
    return true;
}


window.filtrarPedidos = function(filtro) {
    filtroStatusAtual = filtro;
    limiteExibicaoPedidos = 15; 
    
    const botoes = document.querySelectorAll('.filtro-btn');
    botoes.forEach(btn => {
        if (btn.dataset.filter === filtro) {
            btn.className = "flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-bold bg-[#0F172A] text-white shadow-md active:scale-95 transition-all filtro-btn active";
        } else {
            btn.className = "flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-bold bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 active:scale-95 transition-all filtro-btn";
        }
    });

    renderizarListaPedidos();
};

document.addEventListener('input', (e) => {
    if (e.target.id === 'input-pesquisa-pedidos') {
        termoPesquisaAtual = e.target.value;
        renderizarListaPedidos();
    }
});

window.carregarMaisPedidos = function() {
    limiteExibicaoPedidos += 15;
    renderizarListaPedidos();
};

// ══════════════════════════════════════════════════════════════
// 3. MOTOR DE RENDERIZAÇÃO
// ══════════════════════════════════════════════════════════════
window.renderizarListaPedidos = function() {
    const lista = document.getElementById('lista-pedidos-historico');
    const btnCarregarMais = document.getElementById('container-carregar-mais');
    if (!lista) return;

    const basePedidos = typeof todosOsPedidos !== 'undefined' ? todosOsPedidos : window.todosOsPedidos || [];
    let pedidosFiltrados = [...basePedidos];

    // LÓGICA DA LUPA INTELIGENTE (Prioridade Máxima)
    if (termoPesquisaAtual !== '') {
        const termoLimpo = normalizarTexto(termoPesquisaAtual);
        
        // Ignora abas e períodos: procura em TODA a base de dados
        pedidosFiltrados = pedidosFiltrados.filter(p => 
            normalizarTexto(p.cliente_nome).includes(termoLimpo) ||
            normalizarTexto(p.id).includes(termoLimpo) ||
            normalizarTexto(p.cliente_telefone).includes(termoLimpo)
        );
        
        if (btnCarregarMais) btnCarregarMais.classList.add('hidden');

    } else {
        // NAVEGAÇÃO NORMAL
        pedidosFiltrados = pedidosFiltrados.filter(p => p.status === filtroStatusAtual);
        
        if (typeof dataDentroDoPeriodo === 'function' && typeof filtroPeriodoAtual !== 'undefined') {
            pedidosFiltrados = pedidosFiltrados.filter(p => dataDentroDoPeriodo(p.created_at, filtroPeriodoAtual));
        }

        const totalResultados = pedidosFiltrados.length;
        
        if (filtroStatusAtual !== 'pendente') {
            pedidosFiltrados = pedidosFiltrados.slice(0, limiteExibicaoPedidos);
        }

        if (btnCarregarMais) {
            if (filtroStatusAtual !== 'pendente' && totalResultados > limiteExibicaoPedidos) {
                btnCarregarMais.classList.remove('hidden');
            } else {
                btnCarregarMais.classList.add('hidden');
            }
        }
    }

    if (pedidosFiltrados.length === 0) {
        lista.innerHTML = `
            <div class="py-16 flex flex-col items-center justify-center text-center gap-3 fade-in mt-4">
                <div class="w-16 h-16 bg-white dark:bg-navy-800 border border-slate-100 dark:border-navy-700 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-500 mb-2 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                    <i class="fa-solid ${termoPesquisaAtual !== '' ? 'fa-search' : 'fa-box-open'} text-2xl"></i>
                </div>
                <h4 class="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">Nenhum resultado</h4>
                <p class="text-[12px] text-slate-500 mt-0.5 max-w-[220px] leading-relaxed mx-auto">
                    ${termoPesquisaAtual !== '' ? 'Não encontrámos encomendas com essa referência no catálogo.' : 'A lista está limpa nesta categoria e período.'}
                </p>
            </div>
        `;
        return;
    }

    let html = '';
    pedidosFiltrados.forEach(p => {
        const data = new Date(p.created_at);
        const dataFormatada = data.toLocaleDateString('pt-MZ');
        const horaFormatada = data.toLocaleTimeString('pt-MZ', {hour: '2-digit', minute: '2-digit'});
        
        let statusCorBg = 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
        let statusTexto = 'Pendente';
        let dotCor = 'bg-orange-500';
        
        switch(p.status?.toLowerCase()) {
            case 'confirmado':
                statusCorBg = 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20';
                statusTexto = 'Confirmado';
                dotCor = 'bg-emerald-500';
                break;
            case 'concluido':
                statusCorBg = 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20';
                statusTexto = 'Concluído';
                dotCor = 'bg-blue-500';
                break;
            case 'cancelado':
                statusCorBg = 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-500 border border-red-200 dark:border-red-500/20';
                statusTexto = 'Cancelado';
                dotCor = 'bg-red-500';
                break;
        }

        const qtdItens = p.itens ? p.itens.length : 0;
        const totalNum = parseFloat(p.total) || 0;
        const fotoProduto = (p.itens && p.itens[0] && (p.itens[0].foto || p.itens[0].imagem)) ? (p.itens[0].foto || p.itens[0].imagem) : 'https://placehold.co/150x150/f8fafc/94a3b8?text=Sem+Foto';
        
        html += `
            <div onclick="abrirModalPedido('${p.id}')" class="bg-white dark:bg-navy-900 p-3 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-navy-800 transition-all active:scale-[0.98] cursor-pointer mb-3 flex items-center gap-3 relative overflow-hidden group hover:border-slate-200 dark:hover:border-navy-700">
                <div class="w-14 h-14 rounded-[14px] bg-slate-50 dark:bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-100 dark:border-navy-700 relative">
                    <img src="${fotoProduto}" class="w-full h-full object-cover" alt="Produto">
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-0.5">
                        <h4 class="text-[13px] font-bold text-slate-900 dark:text-white truncate pr-2">${p.cliente_nome || 'Anónimo'}</h4>
                        <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] ${statusCorBg}">
                            <div class="w-1.5 h-1.5 rounded-full ${dotCor}"></div>
                            <span class="text-[9px] font-black tracking-widest uppercase">${statusTexto}</span>
                        </div>
                    </div>
                    <div class="flex items-center text-[11px] font-medium text-slate-500 truncate mb-1.5">
                        <span>${qtdItens} item(s)</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-[12px] font-black text-slate-900 dark:text-white">${totalNum.toLocaleString('pt-MZ')} <span class="text-[9px] font-bold text-slate-400">MT</span></p>
                        <p class="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                            ${dataFormatada} - ${horaFormatada}
                        </p>
                    </div>
                </div>
            </div>
        `;
    });

    lista.innerHTML = html;
};

// ══════════════════════════════════════════════════════════════
// 4. GESTÃO DOS MODAIS (PERÍODO E PEDIDO) - UNIVERSAL
// ══════════════════════════════════════════════════════════════

window.abrirModalPeriodo = function() {
    const modal = document.getElementById('modal-periodo');
    if (!modal) return;

    const botoes = modal.querySelectorAll('button[onclick^="mudarPeriodo"]');
    botoes.forEach(btn => {
        const textoBotao = btn.textContent.trim(); // Usa textContent em vez de innerText

        if (btn.getAttribute('onclick').includes(filtroPeriodoAtual)) {
            btn.className = "w-full text-left px-5 py-4 rounded-[16px] bg-[#0F172A] text-white text-[13px] font-bold active:scale-[0.98] transition-all flex justify-between items-center shadow-md";
            btn.innerHTML = textoBotao + ' <i class="fas fa-check text-[12px]"></i>';
        } else {
            btn.className = "w-full text-left px-5 py-4 rounded-[16px] bg-slate-50 dark:bg-navy-800/50 text-[13px] font-bold text-slate-700 dark:text-slate-300 active:scale-[0.98] transition-all flex justify-between items-center group hover:bg-slate-100 dark:hover:bg-navy-800";
            btn.innerHTML = textoBotao + ' <i class="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all"></i>';
        }
    });

    // Usa a magia universal:
    abrirModal('modal-periodo');
};

window.mudarPeriodo = function(valor, texto) {
    filtroPeriodoAtual = valor;
    const spanTexto = document.getElementById('texto-periodo-atual');
    if (spanTexto) spanTexto.innerText = texto;
    
    // Usa a magia universal:
    fecharModal('modal-periodo');
    renderizarListaPedidos();
};

window.abrirModalPedido = function(id) {
    let basePedidos = typeof todosOsPedidos !== 'undefined' ? todosOsPedidos : window.todosOsPedidos || [];
    let pedido = basePedidos.find(p => p.id === id);
    
    if (!pedido && typeof memDashboard !== 'undefined' && memDashboard.pendentes) {
        pedido = memDashboard.pendentes.find(p => p.id === id);
    }

    if (!pedido) {
        console.error("Encomenda não encontrada na memória.");
        return;
    }

    const corpo = document.getElementById('modal-pedido-corpo');
    if (!corpo) return;

    const data = new Date(pedido.created_at);
    const dataFormatada = data.toLocaleDateString('pt-MZ');
    const horaFormatada = data.toLocaleTimeString('pt-MZ', {hour: '2-digit', minute: '2-digit'});

    let htmlItens = '';
    if (pedido.itens && pedido.itens.length > 0) {
        pedido.itens.forEach(item => {
            htmlItens += `
                <div class="flex justify-between items-center py-2.5 border-b border-slate-50 dark:border-navy-800/50 last:border-0">
                    <div>
                        <p class="text-xs font-bold text-slate-800 dark:text-white">${item.nome}</p>
                        <p class="text-[10px] text-slate-500 font-medium mt-0.5">${item.quantidade}x ${parseFloat(item.preco).toLocaleString('pt-MZ')} MT</p>
                    </div>
                    <p class="text-[13px] font-black text-slate-900 dark:text-white">${(item.quantidade * item.preco).toLocaleString('pt-MZ')} MT</p>
                </div>
            `;
        });
    } else {
        htmlItens = '<p class="text-xs text-slate-500">Nenhum detalhe de itens disponível.</p>';
    }

    let acoesHtml = '';
    if (pedido.status === 'pendente') {
        acoesHtml = `
            <div class="flex gap-2 mt-5">
                <button onclick="alterarStatusPedido('${pedido.id}', 'confirmado')" class="flex-1 bg-[#0F172A] text-white h-12 rounded-xl text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all shadow-md">
                    Confirmar
                </button>
                <button onclick="alterarStatusPedido('${pedido.id}', 'cancelado')" class="w-1/3 bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 h-12 rounded-xl text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all">
                    Cancelar
                </button>
            </div>
        `;
    } else if (pedido.status === 'confirmado') {
        acoesHtml = `
            <div class="flex gap-2 mt-5">
                <button onclick="alterarStatusPedido('${pedido.id}', 'concluido')" class="flex-1 bg-blue-600 text-white h-12 rounded-xl text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all shadow-md">
                    Concluir Entrega
                </button>
                <button onclick="alterarStatusPedido('${pedido.id}', 'cancelado')" class="w-1/3 bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 h-12 rounded-xl text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all">
                    Cancelar
                </button>
            </div>
        `;
    }

    const whatsAppUrl = pedido.cliente_telefone ? `https://wa.me/${pedido.cliente_telefone.replace(/[^0-9]/g, '')}` : '#';

    corpo.innerHTML = `
        <div class="bg-slate-50 dark:bg-navy-800/30 p-5 rounded-[20px] mb-5 border border-slate-100 dark:border-navy-700/50">
            <h4 class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Detalhes do Cliente</h4>
            <p class="text-[15px] font-bold text-slate-900 dark:text-white mb-3">${pedido.cliente_nome || 'N/A'}</p>
            
            <div class="flex gap-2 mb-4">
                ${pedido.cliente_telefone ? `
                    <a href="${whatsAppUrl}" target="_blank" class="flex-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                        <i class="fab fa-whatsapp text-sm"></i> WhatsApp
                    </a>
                ` : ''}
                ${pedido.cliente_telefone ? `
                    <a href="tel:${pedido.cliente_telefone}" class="flex-1 bg-white dark:bg-navy-700 border border-slate-200 dark:border-navy-600 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                        <i class="fas fa-phone"></i> Ligar
                    </a>
                ` : ''}
            </div>

            <div class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 font-medium">
                <p class="flex gap-2"><span class="w-4 text-center opacity-50"><i class="fas fa-map-marker-alt"></i></span> <span>${pedido.cliente_endereco || 'Não informada'}</span></p>
                <p class="flex gap-2"><span class="w-4 text-center opacity-50"><i class="fas fa-calendar-alt"></i></span> <span>${dataFormatada} - ${horaFormatada}</span></p>
            </div>
        </div>

        <div>
            <h4 class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Itens Selecionados</h4>
            <div class="bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 rounded-[20px] p-4 shadow-sm">
                ${htmlItens}
            </div>
        </div>

        <div class="flex justify-between items-center p-5 bg-slate-900 dark:bg-slate-800 text-white rounded-[20px] shadow-lg mt-5 border border-slate-800 dark:border-slate-700">
            <span class="text-[10px] font-black uppercase tracking-widest opacity-70">Total a Pagar</span>
            <span class="text-xl font-black">${parseFloat(pedido.total || 0).toLocaleString('pt-MZ')} <span class="text-[10px] uppercase tracking-widest opacity-70 ml-1">MT</span></span>
        </div>

        ${acoesHtml}
    `;

    // Usa a magia universal:
    abrirModal('modal-pedido');
};

// ══════════════════════════════════════════════════════════════
// 5. ATUALIZAÇÃO OTIMISTA (SUPABASE UI)
// ══════════════════════════════════════════════════════════════
async function alterarStatusPedido(id, novoStatus) {
    const index = todosOsPedidos.findIndex(p => p.id === id);
    if (index !== -1) {
        todosOsPedidos[index].status = novoStatus;
    }
    
    // Usa a magia universal:
    fecharModal('modal-pedido');
    
    const btnAtivo = document.querySelector('.filtro-btn.active');
    if (btnAtivo) {
         filtrarPedidos(btnAtivo.dataset.filter);
    } else {
         renderizarListaPedidos();
    }

    try {
        const { error } = await window.supabaseClient
            .from('pedidos')
            .update({ status: novoStatus })
            .eq('id', id);
            
        if (error) throw error;
        
        if (typeof memDashboard !== 'undefined' && memDashboard.pendentes) {
             memDashboard.pendentes = memDashboard.pendentes.filter(p => p.id !== id);
        }
        
    } catch(e) {
        console.error(e);
        if (typeof mostrarNotificacao === 'function') mostrarNotificacao('Erro ao atualizar status');
    }
}