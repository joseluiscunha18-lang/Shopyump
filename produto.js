<template id="tpl-produtos">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-4">
                
                <!-- Cabeçalho Dinâmico -->
                <div class="flex justify-between items-center px-1 mb-2">
                    <p id="qtd-produtos-ativos" class="text-xs font-bold text-slate-900 dark:text-white">A calcular...</p>
                    <button onclick="navegarAnimado('criar-produto')" class="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg uppercase tracking-widest active:scale-95 transition-transform">+ Novo</button>
                </div>
                
                <!-- Aqui é onde a magia vai desenhar os produtos da base de dados! -->
                <div id="lista-produtos-completa" class="space-y-4 pt-2">
                    <div class="py-6 text-center text-slate-400 text-sm flex flex-col items-center">
                         <i class="fas fa-circle-notch fa-spin text-2xl mb-2"></i>
                         Carregando o catálogo...
                    </div>
                </div>

            </div>
        </div>
    </template>
`);

// ==========================================
// LÓGICA DA PÁGINA DE PRODUTOS
// ==========================================

// 1. Variáveis na memória (Cache da Loja)
window.todosOsProdutos = [];
window.produtosCarregados = false; 

// 2. Quando o utilizador clica para abrir a página Produtos
document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'produtos') {
        if (!window.produtosCarregados) {
            window.carregarTodosProdutos();
        } else {
            window.renderizarListaProdutosCompleta();
        }
    }
});

// 3. Buscar Produtos Reais ao Servidor
window.carregarTodosProdutos = async function() {
    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        if (!userId) return;

        let lojaId = window.lojaIdAtivaDashboard;
        if (!lojaId) {
             const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', userId).maybeSingle();
             if (loja) {
                 lojaId = loja.id;
                 window.lojaIdAtivaDashboard = loja.id;
             }
        }
        if (!lojaId) return;

        const { data: produtos, error } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .eq('loja_id', lojaId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Guarda os produtos da net em segurança!
        window.todosOsProdutos = produtos || [];
        window.produtosCarregados = true;
        
    } catch (e) {
        console.error("Erro ao carregar produtos:", e);
    }

    // Pede ao ecrã para os desenhar!
    window.renderizarListaProdutosCompleta();
};

// 4. Desenhar de forma elegante os produtos na página
window.renderizarListaProdutosCompleta = function() {
    const lista = document.getElementById('lista-produtos-completa');
    const qtdAtivosText = document.getElementById('qtd-produtos-ativos');
    if (!lista) return;

    const produtos = window.todosOsProdutos || [];

    // Validar quantidade ativos
    const qtdAtivos = produtos.filter(p => p.ativo).length;
    if (qtdAtivosText) {
        qtdAtivosText.innerText = `${qtdAtivos} produto(s) ativo(s)`;
    }

    // Se a pessoa não tiver produtos, mostramos a caixa de ausência
    if (produtos.length === 0) {
        lista.innerHTML = `
            <div class="py-12 flex flex-col items-center justify-center text-center gap-3 mt-4">
                <div class="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-navy-700 rounded-[20px] flex items-center justify-center text-slate-300 dark:text-slate-500 mb-2 shadow-sm">
                    <i class="fa-solid fa-box-open text-2xl"></i>
                </div>
                <h4 class="text-[14px] font-bold text-slate-900 dark:text-white">Sem produtos</h4>
                <p class="text-[12px] text-slate-500 mt-1 max-w-[220px] leading-relaxed mx-auto">
                    Cria o teu primeiro produto para o catálogo.
                </p>
                <button onclick="navegarAnimado('criar-produto')" class="mt-2 bg-[#0F172A] text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all">Adicionar Agora</button>
            </div>
        `;
        return;
    }

    // Adiciona os blocos 1 a 1 dinamicamente
    let html = '';
    produtos.forEach(p => {
        const fotoCapa = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : 'https://placehold.co/100?text=Sem+Foto';
        const ativoTag = p.ativo 
                            ? '<span class="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-widest">Ativo</span>'
                            : '<span class="text-[9px] font-black text-red-600 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-md uppercase tracking-widest">Oculto</span>';
                            
        const nomeCurto = p.nome.substring(0, 3).toUpperCase();

        html += `
            <div class="bg-white dark:bg-navy-900 p-4 rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-navy-800 flex items-center justify-between transition-transform active:scale-[0.98] cursor-pointer" onclick="navegarAnimado('produto')">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-300 overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                        <img src="${fotoCapa}" class="w-full h-full object-cover absolute inset-0 z-10" onerror="this.style.display='none'">
                        <span class="z-0 relative">${nomeCurto}</span>
                    </div>
                    <div class="flex flex-col justify-center gap-1.5 pt-0.5">
                        <p class="text-[14px] font-bold text-slate-900 dark:text-white leading-none line-clamp-1">${p.nome}</p>
                        <p class="text-[11px] text-slate-500 font-bold leading-none">${parseFloat(p.preco || 0).toLocaleString('pt-MZ')} MT</p>
                        <div class="mt-0.5">
                            ${ativoTag}
                        </div>
                    </div>
                </div>
                <div class="w-9 h-9 rounded-[14px] bg-slate-50 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center text-slate-400 hover:text-slate-900 transition-colors mr-1">
                    <i class="fa-solid fa-chevron-right text-xs"></i>
                </div>
            </div>
        `;
    });

    lista.innerHTML = html;
};

// 5. Iniciar Atualizações Mágicas em Tempo Real!
window.iniciarTempoRealProdutos = function() {
    if (!window.supabaseClient) return;
    if (window.canalProdutosTempoReal) return; 

    // O canal escuta se a base de dados adicionou produtos numa outra janela!
    window.canalProdutosTempoReal = window.supabaseClient.channel('produtos-em-tempo-real')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'produtos' }, (payload) => {
         
         // Atualizar lista principal da página
         if (typeof window.todosOsProdutos !== 'undefined') {
             if (payload.eventType === 'INSERT') {
                 const exists = window.todosOsProdutos.find(p => p.id === payload.new.id);
                 if (!exists) window.todosOsProdutos.unshift(payload.new); 
             } else if (payload.eventType === 'UPDATE') {
                 const i = window.todosOsProdutos.findIndex(p => p.id === payload.new.id);
                 if (i !== -1) window.todosOsProdutos[i] = payload.new;
             }
         }

         // MÁGICA: Atualizar o cache invisível da Home também para não falhar
         if (typeof memDashboard !== 'undefined' && memDashboard.produtos) {
             if (payload.eventType === 'INSERT') {
                  const exists = memDashboard.produtos.find(p => p.id === payload.new.id);
                  if (!exists) memDashboard.produtos.unshift(payload.new);
             } else if (payload.eventType === 'UPDATE') {
                 const i = memDashboard.produtos.findIndex(p => p.id === payload.new.id);
                 if (i !== -1) memDashboard.produtos[i] = payload.new;
             }
         }

         const rotaAtual = window.location.hash.replace('#', '') || 'dashboard';
         
         if (rotaAtual === 'produtos') {
             window.renderizarListaProdutosCompleta();
         } 
         else if (rotaAtual === 'dashboard' && typeof renderizarProdutosDashboard === 'function') {
             if (typeof memDashboard !== 'undefined') renderizarProdutosDashboard(memDashboard.produtos);
         } else {
             window.produtosCarregados = false;
         }
      })
      .subscribe();
};

setTimeout(() => {
    if (window.iniciarTempoRealProdutos) window.iniciarTempoRealProdutos();
}, 2500);
