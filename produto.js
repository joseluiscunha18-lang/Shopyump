document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-produtos">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="max-w-lg mx-auto space-y-4">
                <div class="flex justify-between items-center px-1 mb-4">
                    <p id="produtos-count-page" class="text-xs font-bold text-slate-900 dark:text-white">A carregar...</p>
                    <button onclick="navegarAnimado('criar-produto')" class="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg uppercase tracking-widest">+ Novo</button>
                </div>
                
                <div id="lista-produtos-page" class="space-y-3">
                    <div class="col-span-full py-12 flex flex-col items-center justify-center text-center gap-3">
                        <i class="fas fa-circle-notch fa-spin text-3xl text-emerald-500 mb-2"></i>
                        <h4 class="text-[14px] font-bold text-slate-900 dark:text-white">A procurar produtos...</h4>
                    </div>
                </div>
            </div>
        </div>
    </template>
`);

// produto.js - Logic for produtos page
let memProdutosPage = null;

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'produtos') {
        // Aproveita o carregamento que já foi feito no Painel de Controlo!
        if (!memProdutosPage && typeof memDashboard !== 'undefined' && memDashboard.produtos) {
            memProdutosPage = memDashboard.produtos;
        }

        // Desenha instantaneamente sem "loading"
        if (memProdutosPage) {
            renderizarProdutosLista(memProdutosPage);
        } else {
            // Só vai à nuvem se a memória estiver mesmo vazia
            carregarPaginaProdutos();
        }
    }
});

// Força atualização da página de produtos e do dashboard em simultâneo
window.forcarAtualizacaoProdutos = () => {
    memProdutosPage = null;
    if (typeof window.forcarAtualizacaoDashboard === 'function') {
        window.forcarAtualizacaoDashboard(); // atualiza também o dash 
    }
    carregarPaginaProdutos();
};

async function carregarPaginaProdutos() {
    try {
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (!userId) return;

        let lojaId = null;
        // Pega da memória do dashboard se existir, para ser mais rápido
        if (typeof memDashboard !== 'undefined' && memDashboard.loja) {
            lojaId = memDashboard.loja.id;
        } else {
            const { data: loja } = await window.supabaseClient.from('lojas').select('id').eq('perfil_id', userId).maybeSingle();
            if (loja) lojaId = loja.id;
        }

        if (!lojaId) return;

        if (!memProdutosPage) {
            const { data: produtos, error } = await window.supabaseClient
                .from('produtos')
                .select('*')
                .eq('loja_id', lojaId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            memProdutosPage = produtos || [];
        }

        renderizarProdutosLista(memProdutosPage);

    } catch (e) {
        console.error("Erro ao carregar lista de produtos:", e);
        const container = document.getElementById('lista-produtos-page');
        if (container) {
            container.innerHTML = '<p class="text-center text-red-500 text-sm mt-10">Ocorreu um erro ao carregar os teus produtos.</p>';
        }
    }
}

function renderizarProdutosLista(produtos) {
    const container = document.getElementById('lista-produtos-page');
    const badgeCount = document.getElementById('produtos-count-page');
    if (!container) return;

    if (badgeCount) {
        const ativosCount = produtos.filter(p => p.ativo).length;
        badgeCount.innerText = `${ativosCount} produto${ativosCount !== 1 ? 's' : ''} ativo${ativosCount !== 1 ? 's' : ''}`;
    }

    if (produtos.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 flex flex-col items-center justify-center text-center gap-3 bg-white dark:bg-navy-900 rounded-[28px] shadow-sm">
                <div class="w-14 h-14 bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 rounded-[20px] flex items-center justify-center text-emerald-500 mb-2 shadow-sm">
                    <i class="fa-solid fa-box-open text-2xl"></i>
                </div>
                <h4 class="text-[14px] font-bold text-slate-900 dark:text-white">Gere o teu stock e produtos</h4>
                <button onclick="navegarAnimado('criar-produto')" class="w-full max-w-[200px] mt-2 bg-[#0F172A] text-white h-11 rounded-full text-xs font-black tracking-wider flex items-center justify-center shadow-md active:scale-95 transition-all">Adicionar Produto</button>
            </div>
        `;
        return;
    }

    container.className = "space-y-3";
    let html = '';

    produtos.forEach(p => {
        const fotoCapa = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : 'https://placehold.co/100?text=Sem+Foto';
        html += `
            <div class="bg-white dark:bg-navy-900 p-4 rounded-[20px] shadow-sm border border-slate-100/50 dark:border-navy-800 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700">
                        <img src="${fotoCapa}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <p class="text-[14px] font-bold text-slate-900 dark:text-white line-clamp-1">${p.nome}</p>
                        <p class="text-[11px] text-slate-500 font-bold mt-1">${p.preco.toLocaleString('pt-MZ')} MT ${!p.ativo ? '<span class="text-red-400 font-bold ml-1">(Rascunho)</span>' : ''}</p>
                        <span class="text-[9px] font-black ${p.ativo ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'} px-2 py-0.5 rounded-md mt-1.5 inline-block uppercase tracking-widest">${p.ativo ? 'Ativo' : 'Oculto'}</span>
                    </div>
                </div>
                <button class="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
}
