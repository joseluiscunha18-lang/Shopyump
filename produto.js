document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-produtos">
        <div class="pt-24 px-6 main-wrapper pb-32 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-4">
                
                <div class="flex justify-between items-center px-1 mb-2">
                    <p id="badge-total-produtos" class="text-xs font-bold text-slate-900 dark:text-white">A carregar...</p>
                    <button onclick="navegarAnimado('criar-produto')" class="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg uppercase tracking-widest active:scale-95 transition-transform shadow-sm">+ Novo</button>
                </div>

                <div id="lista-produtos" class="space-y-3 flex flex-col">
                    </div>

                <div id="msg-sem-produtos" class="hidden py-16 flex-col items-center justify-center text-center gap-3">
                    <div class="w-16 h-16 bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 rounded-[24px] flex items-center justify-center text-slate-300 dark:text-slate-500 mb-2 shadow-sm">
                        <i class="fa-solid fa-box-open text-3xl"></i>
                    </div>
                    <h4 class="text-[15px] font-bold text-slate-900 dark:text-white">A tua montra está vazia</h4>
                    <p class="text-[12px] text-slate-500 mt-1 max-w-[240px] leading-relaxed mx-auto">
                        Adiciona o teu primeiro produto para começares a organizar o teu catálogo.
                    </p>
                    <button onclick="navegarAnimado('criar-produto')" class="mt-4 bg-slate-900 dark:bg-emerald-600 text-white px-6 py-3.5 rounded-[16px] text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                        Criar Produto
                    </button>
                </div>

            </div>
        </div>
    </template>
`);

// ────────────────────────────────────────────────────────────────────────
// LOGIC PARA A PÁGINA DE PRODUTOS
// ────────────────────────────────────────────────────────────────────────

document.addEventListener('spa:page-loaded', (e) => {
    // Escuta o router. Assumo que o id desta view é 'produtos'
    if (e.detail === 'produtos') {
        carregarPaginaProdutos();
    }
});

async function carregarPaginaProdutos() {
    const listaProdutos = document.getElementById('lista-produtos');
    const msgVazia = document.getElementById('msg-sem-produtos');
    const badgeTotal = document.getElementById('badge-total-produtos');

    if (!listaProdutos || !msgVazia || !badgeTotal) return;

    // 1. Mostrar estado de carregamento elegante
    listaProdutos.innerHTML = `
        <div class="w-full py-12 flex justify-center items-center gap-3">
            <div class="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">A Sincronizar...</span>
        </div>
    `;
    msgVazia.classList.add('hidden');
    msgVazia.classList.remove('flex');

    try {
        // 2. Obter a sessão e a loja do Lojista
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (!userId) return;

        const { data: loja } = await window.supabaseClient
            .from('lojas')
            .select('id')
            .eq('perfil_id', userId)
            .maybeSingle();

        if (!loja) {
            // Se ele não tem loja, não tem produtos. Mostra o Vazio.
            badgeTotal.innerText = '0 PRODUTOS';
            listaProdutos.innerHTML = '';
            msgVazia.classList.remove('hidden');
            msgVazia.classList.add('flex');
            return;
        }

        // 3. Buscar todos os produtos desta loja
        const { data: produtos, error } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .eq('loja_id', loja.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // 4. Renderizar a Vista
        if (!produtos || produtos.length === 0) {
            badgeTotal.innerText = '0 PRODUTOS';
            listaProdutos.innerHTML = '';
            msgVazia.classList.remove('hidden');
            msgVazia.classList.add('flex');
        } else {
            const ativosCount = produtos.filter(p => p.ativo).length;
            badgeTotal.innerText = `${produtos.length} PRODUTOS (${ativosCount} ATIVOS)`;
            
            let html = '';
            produtos.forEach(p => {
                // Se o produto tiver array de fotos usa a primeira, senão usa placeholder
                const fotoCapa = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : 'https://placehold.co/100?text=Sem+Foto';
                
                // UX de Cores: Verde se ativo, Cinzento se rascunho
                const statusClass = p.ativo 
                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' 
                    : 'text-slate-500 bg-slate-100 dark:bg-slate-800';
                const statusText = p.ativo ? 'Ativo' : 'Rascunho';

                html += `
                    <div onclick="abrirDetalheProduto('${p.id}')" class="bg-white dark:bg-navy-900 p-3.5 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100/50 dark:border-navy-800 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:shadow-md">
                        <div class="flex items-center gap-3.5">
                            <div class="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                                <img src="${fotoCapa}" class="w-full h-full object-cover">
                            </div>
                            <div class="flex flex-col justify-center py-1">
                                <p class="text-[13px] font-bold text-slate-900 dark:text-white line-clamp-1">${p.nome}</p>
                                <p class="text-[11px] text-slate-500 font-black mt-0.5 mb-1.5 tracking-tight">${p.preco.toLocaleString('pt-MZ')} MT</p>
                                <div>
                                    <span class="text-[8px] font-black ${statusClass} px-2 py-0.5 rounded-md uppercase tracking-widest">${statusText}</span>
                                </div>
                            </div>
                        </div>
                        <button class="w-8 h-8 mr-1 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                `;
            });

            listaProdutos.innerHTML = html;
        }

    } catch (e) {
        console.error("Erro ao carregar lista de produtos:", e);
        listaProdutos.innerHTML = `
            <div class="text-center py-8">
                <div class="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <p class="text-xs text-red-500 font-bold">Falha ao carregar catálogo.</p>
                <button onclick="carregarPaginaProdutos()" class="mt-2 text-[10px] font-bold text-slate-500 underline">Tentar novamente</button>
            </div>
        `;
    }
}

// Guarda o ID do produto para a página de edição saber qual abrir
function abrirDetalheProduto(idProduto) {
    sessionStorage.setItem('shopyump_produto_editar_id', idProduto);
    navegarAnimado('produto'); // O teu router navega para a página única do produto
}
