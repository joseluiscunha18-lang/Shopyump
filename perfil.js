document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-perfil">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div class="lg:col-span-1 flex flex-col items-center bg-white dark:bg-[#161b2c] p-8 rounded-3xl border border-[#ebebeb] dark:border-slate-800 shadow-sm">
                    <input type="file" id="input-foto" accept="image/*" class="hidden" onchange="mudarFoto(event)">
                    <div class="relative group cursor-pointer" onclick="gerirCliqueFoto()">
                        <div id="circulo-foto" class="w-28 h-28 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white font-black text-5xl shadow-xl ring-4 ring-white dark:ring-[#0b0f1a] transition-transform active:scale-95 overflow-hidden bg-cover bg-center">
                            <span id="letra-inicial" style="display: none;"></span>
                        </div>
                        <button class="absolute bottom-1 right-1 w-9 h-9 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-600 pointer-events-none">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </button>
                    </div>
                </div>

                <div class="lg:col-span-2 space-y-6">
                    <div class="sf-card p-6 space-y-6">
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Nome Completo</label>
                            <input type="text" id="input-nome" oninput="ativarBotao()" value="" placeholder="A carregar nome..." class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all">
                        </div>
                        <div class="relative">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Email de Acesso</label>
                            <input type="email" id="input-email" value="" readonly placeholder="A carregar email..." class="w-full bg-slate-100 dark:bg-[#0b0f1a]/50 border border-transparent dark:border-slate-800 text-slate-500 dark:text-slate-500 px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none cursor-not-allowed">
                            <button id="btn-alterar-email" onclick="navegarAnimado('seguranca')" class="absolute right-3 top-[26px] text-[10px] font-black text-slate-900 dark:text-white hover:text-slate-600 transition-colors uppercase tracking-widest bg-white dark:bg-[#161b2c] px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 hidden">Alterar</button>
                        </div>
                    </div>
                    <div class="pt-2">
                        <button id="btn-guardar" onclick="salvarDados()" disabled class="w-full lg:w-max lg:px-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-xs font-black shadow-lg shadow-slate-900/10 dark:shadow-white/10 uppercase tracking-widest transition-all opacity-50 cursor-not-allowed">Guardar Alterações</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Menu de foto -->
        <div id="menu-foto" class="fixed inset-0 z-[130] hidden">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="fecharMenuFoto()"></div>
            <div class="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#161b2c] rounded-t-[32px] p-6 space-y-3 transform translate-y-full transition-transform duration-300" id="painel-foto">
                <div class="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6"></div>
                <button onclick="document.getElementById('input-foto').click(); fecharMenuFoto();" class="w-full py-4 text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 rounded-2xl active:scale-[0.98] transition-all text-center">Escolher nova foto</button>
                <button onclick="removerFoto(); fecharMenuFoto();" class="w-full py-4 text-sm font-bold text-red-500 bg-red-50 dark:bg-red-500/10 rounded-2xl active:scale-[0.98] transition-all text-center">Remover foto atual</button>
                <button onclick="fecharMenuFoto()" class="w-full py-4 text-sm font-bold text-slate-400 uppercase tracking-widest pt-4 text-center">Cancelar</button>
            </div>
        </div>
    </template>
`);

// perfil.js - Lógica exclusiva da página de Perfil da Loja

// Variável Global para Cache do Utilizador
window.memUtilizador = window.memUtilizador || null;

async function initPerfil() {
    try {
        let user;
        let nome = '';
        let foto = '';
        let email = '';
        let isGoogle = false;

        // Se já temos na memória cache, carrega tudo de forma instantânea
        if (window.memUtilizador) {
            user = window.memUtilizador.user;
            nome = window.memUtilizador.nome;
            foto = window.memUtilizador.foto;
            email = window.memUtilizador.email;
            isGoogle = window.memUtilizador.isGoogle;
        } else {
            // Senão, vai buscar ao banco de dados pela primeira vez
            const { data } = await window.supabaseClient.auth.getUser();
            user = data.user;
            if (!user) return;
            
            nome = user.user_metadata?.full_name || '';
            foto = user.user_metadata?.avatar_url || '';
            email = user.email || '';
            isGoogle = user.app_metadata?.provider === 'google';

            // Se o nome vier vazio (login por email), vai buscar à tabela lojas
            if (!nome || nome.trim() === '') {
                const { data: loja } = await window.supabaseClient
                    .from('lojas')
                    .select('vendedor_nome')
                    .eq('perfil_id', user.id)
                    .maybeSingle();
                    
                if (loja && loja.vendedor_nome) {
                    nome = loja.vendedor_nome;
                }
            }

            // Ganja tudo na memória cache para a próxima vez!
            window.memUtilizador = { user, nome, foto, email, isGoogle };
        }

        const inputNome = document.getElementById('input-nome');
        if (inputNome) inputNome.value = nome;
        
        const inputEmail = document.getElementById('input-email');
        if (inputEmail) inputEmail.value = email;

        // Ocultar botão "Alterar" se o utilizador autenticou-se via Google
        const btnAlterarEmail = document.getElementById('btn-alterar-email');
        if (btnAlterarEmail) {
            if (isGoogle) {
                btnAlterarEmail.style.display = 'none';
            } else {
                btnAlterarEmail.classList.remove('hidden');
                btnAlterarEmail.style.display = 'inline-block';
            }
        }

        const circulo = document.getElementById('circulo-foto');
        const letra = document.getElementById('letra-inicial');
        
        if (foto && circulo) {
            if (letra) letra.style.display = 'none';
            circulo.style.backgroundImage = `url(${foto})`;
            circulo.setAttribute('data-foto-bd', 'true');
        } else if (circulo && letra) {
            circulo.style.backgroundImage = 'none';
            letra.style.display = 'flex';
            // Pega a primeira letra do nome verdadeiro para o ícone
            letra.innerText = (nome && nome.trim().length > 0) ? nome.trim().charAt(0).toUpperCase() : 'L';
            circulo.removeAttribute('data-foto-bd');
        }
    } catch (e) {
        console.error("Erro ao carregar perfil:", e);
    }
}

document.addEventListener('spa:page-loaded', (e) => {
    if (e.detail === 'perfil') initPerfil();
});

// Ler a nova foto do computador/telemóvel
function mudarFoto(event) {
    const ficheiro = event.target.files[0];
    if (!ficheiro) return;
    const leitor = new FileReader();
    leitor.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const size = 400;
            canvas.width = size;
            canvas.height = size;
            const scale = Math.max(size / img.width, size / img.height);
            const x = (size / 2) - (img.width / 2) * scale;
            const y = (size / 2) - (img.height / 2) * scale;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            const urlOtimizada = canvas.toDataURL('image/webp', 0.8);
            const letra = document.getElementById('letra-inicial');
            const circulo = document.getElementById('circulo-foto');
            if (letra) letra.style.display = 'none';
            if (circulo) {
                circulo.style.backgroundImage = `url(${urlOtimizada})`;
                circulo.setAttribute('data-nova-foto', urlOtimizada);
            }
            ativarBotao();
        };
    };
    leitor.readAsDataURL(ficheiro);
}

function ativarBotao() {
    const btn = document.getElementById('btn-guardar');
    if (!btn) return;
    btn.disabled = false;
    btn.classList.remove('opacity-50', 'cursor-not-allowed');
    btn.classList.add('active:scale-95');
}

async function salvarDados() {
    const btn = document.getElementById('btn-guardar');
    const inputNome = document.getElementById('input-nome');
    const circulo = document.getElementById('circulo-foto');
    if (!btn || !inputNome) return;

    const novoNome = inputNome.value;
    let novaFoto = circulo ? circulo.getAttribute('data-nova-foto') : null;
    const remover = circulo && circulo.getAttribute('data-remover') === 'true';

    btn.innerHTML = `<svg class="animate-spin h-5 w-5 mx-auto text-white dark:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;
    btn.disabled = true;
    btn.classList.remove('active:scale-95');

    try {
        let updateData = { full_name: novoNome };
        
        if (novaFoto) {
            updateData.avatar_url = novaFoto;
        } else if (remover) {
            updateData.avatar_url = null;
        }

        // 1. Atualizar o nome e a foto nos metadados do utilizador no Supabase Base de Dados
        const { error } = await window.supabaseClient.auth.updateUser({
            data: updateData
        });

        if (error) throw error;

        // 2. Atualizar o nome e a foto também na tabela 'lojas' caso a uses noutros lados
        const { data: sessionData } = await window.supabaseClient.auth.getSession();
        if (sessionData?.session?.user?.id) {
            await window.supabaseClient
                .from('lojas')
                .update({ vendedor_nome: novoNome })
                .eq('perfil_id', sessionData.session.user.id);
                
            // Limpar cache Global se necessário
            if (typeof window.forcarAtualizacaoDashboard === 'function') {
                window.forcarAtualizacaoDashboard();
            }
        }

        // 3. Atualizar a Cache do Utilizador para as restantes páginas não terem de carregar a antiga
        if (window.memUtilizador) {
            window.memUtilizador.nome = novoNome;
            if (novaFoto) window.memUtilizador.foto = novaFoto;
            else if (remover) window.memUtilizador.foto = null;
            
            // MÁGICA: Atualiza a foto e o nome no Menu Lateral instantaneamente!
            if (typeof window.atualizarInterfaceMenu === 'function') {
                window.atualizarInterfaceMenu();
            }
        }

        // Sucesso visual
        btn.classList.remove('bg-slate-900', 'dark:bg-white', 'text-white', 'dark:text-slate-900');
        btn.classList.add('bg-emerald-500', 'text-white', 'dark:bg-emerald-500', 'dark:text-white');
        btn.innerHTML = '✓ Guardado com Sucesso';
        
        // Limpar LocalStorage caso existisse (porque agora a Base de dados manda)
        localStorage.removeItem('nomeLojista');
        localStorage.removeItem('fotoLojista');

        setTimeout(() => {
            btn.classList.remove('bg-emerald-500', 'dark:bg-emerald-500');
            btn.classList.add('bg-slate-900', 'dark:bg-white', 'text-white', 'dark:text-slate-900', 'opacity-50', 'cursor-not-allowed');
            btn.innerHTML = 'Guardar Alterações';
        }, 2000);
        
    } catch (e) {
        console.error("Erro ao salvar no banco:", e);
        btn.innerHTML = 'X Erro ao guardar';
        btn.classList.remove('bg-slate-900', 'dark:bg-white', 'text-white', 'dark:text-slate-900');
        btn.classList.add('bg-red-500', 'text-white');
        setTimeout(() => {
            btn.classList.remove('bg-red-500', 'opacity-50', 'cursor-not-allowed');
            btn.classList.add('bg-slate-900', 'dark:bg-white', 'text-white', 'dark:text-slate-900');
            btn.innerHTML = 'Tentar Novamente';
            btn.disabled = false;
            btn.classList.add('active:scale-95');
        }, 3000);
    }
}

function gerirCliqueFoto() {
    const circulo = document.getElementById('circulo-foto');
    // Verifica apenas se os dados reais existem
    const temFoto = (circulo && circulo.getAttribute('data-foto-bd') === 'true') || (circulo && circulo.getAttribute('data-nova-foto'));
    if (temFoto && circulo && circulo.getAttribute('data-remover') !== 'true') {
        abrirMenuFoto();
    } else {
        const input = document.getElementById('input-foto');
        if (input) input.click();
    }
}

function abrirMenuFoto() {
    const menu = document.getElementById('menu-foto');
    const painel = document.getElementById('painel-foto');
    if (!menu || !painel) return;
    menu.classList.remove('hidden');
    setTimeout(() => painel.classList.remove('translate-y-full'), 10);
}

function fecharMenuFoto() {
    const painel = document.getElementById('painel-foto');
    const menu = document.getElementById('menu-foto');
    if (!painel || !menu) return;
    painel.classList.add('translate-y-full');
    setTimeout(() => menu.classList.add('hidden'), 300);
}

function removerFoto() {
    if (confirm("Queres mesmo retirar a tua foto?")) {
        const circulo = document.getElementById('circulo-foto');
        const letra = document.getElementById('letra-inicial');
        if (circulo) {
            circulo.style.backgroundImage = 'none';
            circulo.removeAttribute('data-nova-foto');
            circulo.setAttribute('data-remover', 'true');
        }
        if (letra) letra.style.display = 'flex';
        ativarBotao();
    }
}
