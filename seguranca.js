document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-seguranca">
    <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            <!-- Secção Email -->
            <div class="sf-card overflow-hidden">
                <div class="p-5 flex items-center justify-between">
                    <div class="space-y-0.5 text-left">
                        <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Email de Acesso</p>
                        <p id="display-email-atual" class="text-sm font-semibold text-slate-600 dark:text-slate-300">A carregar...</p>
                    </div>
                    <button id="btn-alterar-email-toggle" onclick="toggleSecao('form-email')" class="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg active:scale-95 transition-all">Alterar</button>
                    <span id="badge-google-email" class="hidden text-[10px] font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900/50">Gerido por Google</span>
                </div>
                <div id="form-email" class="expandable border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                    <div class="p-5 space-y-4 text-left">
                        <div class="space-y-1.5"><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Novo Email</label>
                            <input type="email" id="input-novo-email" placeholder="novo@exemplo.com" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-colors">
                        </div>
                        <p class="text-xs text-slate-500 px-1">Ao atualizar, enviamos um link de confirmação para a caixa de entrada.</p>
                        <p id="msg-erro-email" class="text-red-500 text-[10px] font-bold uppercase mt-2 hidden"></p>
                        <button id="btn-salvar-email" onclick="atualizarEmail()" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all">Atualizar Email</button>
                    </div>
                </div>
            </div>

            <!-- Secção Senha -->
            <div class="sf-card overflow-hidden">
                <div class="p-5 flex items-center justify-between">
                    <div class="space-y-0.5 text-left">
                        <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Palavra-Passe</p>
                        <p class="text-sm font-semibold text-slate-600 dark:text-slate-300">••••••••••••</p>
                    </div>
                    <button id="btn-alterar-senha-toggle" onclick="toggleSecao('form-senha')" class="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg active:scale-95 transition-all">Alterar</button>
                    <span id="badge-google-senha" class="hidden text-[10px] font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900/50">Gerido por Google</span>
                </div>
                <div id="form-senha" class="expandable border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                    <div class="p-5 space-y-5 text-left">
                        
                        <!-- NOVO CAMPO: Senha Atual -->
                        <div class="space-y-1.5 relative"><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Senha Atual (Para Confirmar)</label>
                            <input type="password" id="pass-atual" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-colors" placeholder="Digite sua senha atual">
                            <button type="button" onclick="toggleVerSenha('pass-atual', this)" class="absolute right-4 top-9 text-slate-400 active:scale-90 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                        </div>

                        <!-- Nova Senha -->
                        <div class="space-y-1.5 relative"><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nova Senha</label>
                            <input type="password" id="pass-nova" oninput="checarForca(this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-colors">
                            <button type="button" onclick="toggleVerSenha('pass-nova', this)" class="absolute right-4 top-9 text-slate-400 active:scale-90 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                            <div class="flex gap-1.5 mt-3"><div id="f1" class="h-1.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-200"></div><div id="f2" class="h-1.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-200"></div><div id="f3" class="h-1.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-200"></div></div>
                        </div>
                        
                        <!-- Confirmar Nova Senha -->
                        <div class="space-y-1.5 relative"><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirmar Nova Senha</label>
                            <input type="password" id="pass-conf" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-colors">
                            <button type="button" onclick="toggleVerSenha('pass-conf', this)" class="absolute right-4 top-9 text-slate-400 active:scale-90 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                            <p id="msg-erro-senha" class="text-red-500 text-[10px] font-bold uppercase mt-2 hidden"></p>
                        </div>
                        <button id="btn-salvar-senha" onclick="validarESalvarSenha()" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all">Salvar Nova Senha</button>
                    </div>
                </div>
            </div>

            <!-- Zona de Perigo de Apagar a conta -->
            <div class="sf-card overflow-hidden lg:col-span-2">
               <!-- Seu código de apagar conta continua aqui -->
            </div>

        </div>
    </div>
    </template>
`);

// Lógica para a Página de Segurança com Supabase

document.addEventListener('spa:page-loaded', async (e) => {
    if (e.detail === 'seguranca') {
        // Reset as secções / painéis
        const els = ['form-email', 'form-senha', 'form-delete'];
        els.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('open');
        });

        try {
            const { data: { user } } = await window.supabaseClient.auth.getUser();
            if (user) {
                const displayEmail = document.getElementById('display-email-atual');
                if (displayEmail) displayEmail.innerText = user.email || '';

                const isGoogle = user.app_metadata?.provider === 'google';
                if (isGoogle) {
                    const btnEmail = document.getElementById('btn-alterar-email-toggle');
                    const badgeEmail = document.getElementById('badge-google-email');
                    if (btnEmail) btnEmail.style.display = 'none';
                    if (badgeEmail) badgeEmail.classList.remove('hidden');

                    const btnSenha = document.getElementById('btn-alterar-senha-toggle');
                    const badgeSenha = document.getElementById('badge-google-senha');
                    if (btnSenha) btnSenha.style.display = 'none';
                    if (badgeSenha) badgeSenha.classList.remove('hidden');
                }
            }
        } catch (err) {
            console.error('Erro ao verificar segurança', err);
        }
    }
});

// Funções globais necessárias no HTML
window.toggleSecao = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
}

window.atualizarEmail = async function() {
    const novoEmail = document.getElementById('input-novo-email').value;
    const msg = document.getElementById('msg-erro-email');
    const btn = document.getElementById('btn-salvar-email');
    
    if(!novoEmail || !novoEmail.includes('@')) {
        msg.innerText = "Insira um email válido.";
        msg.classList.remove('hidden', 'text-emerald-500');
        msg.classList.add('text-red-500');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> A atualizar...';

    try {
        const { error } = await window.supabaseClient.auth.updateUser({ email: novoEmail });
        
        if (error) throw error;

        msg.innerText = "Email de verificação enviado! Confirme a caixa de entrada.";
        msg.classList.remove('hidden', 'text-red-500');
        msg.classList.add('text-emerald-500');
        document.getElementById('input-novo-email').value = ''; 

    } catch (e) {
        console.error("Erro ao atualizar email", e);
        msg.innerText = e.message || "Erro ao atualizar email.";
        msg.classList.remove('hidden', 'text-emerald-500');
        msg.classList.add('text-red-500');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Atualizar Email';
    }
}

window.validarESalvarSenha = async function() {
    const atual = document.getElementById('pass-atual');
    const nova = document.getElementById('pass-nova');
    const conf = document.getElementById('pass-conf');
    const msg = document.getElementById('msg-erro-senha');
    const btn = document.getElementById('btn-salvar-senha');
    
    msg.classList.add('hidden');
    if(atual) atual.classList.remove('border-red-500');
    nova.classList.remove('border-red-500');
    conf.classList.remove('border-red-500');

    // Validar se todos os campos estão preenchidos
    if (!atual.value || !nova.value || !conf.value) {
        msg.innerText = '⚠ Preencha todos os campos de senha.';
        msg.classList.remove('hidden', 'text-emerald-500');
        msg.classList.add('text-red-500');
        return;
    }

    if (nova.value !== conf.value) {
        msg.innerText = '⚠ As senhas não coincidem.';
        msg.classList.remove('hidden', 'text-emerald-500');
        msg.classList.add('text-red-500');
        conf.classList.add('border-red-500');
        return;
    }

    if (nova.value.length < 6) {
        msg.innerText = '⚠ A senha deve ter pelo menos 6 caracteres.';
        msg.classList.remove('hidden', 'text-emerald-500');
        msg.classList.add('text-red-500');
        nova.classList.add('border-red-500');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Validando e guardando...';

    try {
        // 1. Obter os detalhes da conta do Utilizador atual
        const { data: { user }, error: userError } = await window.supabaseClient.auth.getUser();
        if (userError || !user) throw new Error("Não foi possível identificar a sessão do utilizador.");

        // 2. Tentar Iniciar Sessão com a Senha Atual para verificar se a pessoa sabe a senha!
        const { error: signInError } = await window.supabaseClient.auth.signInWithPassword({
            email: user.email,
            password: atual.value
        });

        if (signInError) {
            atual.classList.add('border-red-500');
            throw new Error("A senha atual que digitou está incorreta.");
        }

        // 3. A senha atual está garantidamente correta. Fazer Update para a Nova.
        const { error: updateError } = await window.supabaseClient.auth.updateUser({ password: nova.value });
        
        if (updateError) throw updateError;

        msg.innerText = "✔ Senha alterada com sucesso!";
        msg.classList.remove('hidden', 'text-red-500');
        msg.classList.add('text-emerald-500');

        // Limpar campos
        atual.value = '';
        nova.value = '';
        conf.value = '';
        if(window.checarForca) window.checarForca('');

        setTimeout(() => {
            const formSenha = document.getElementById('form-senha');
            if (formSenha) formSenha.classList.remove('open');
            msg.classList.add('hidden');
        }, 3000);

    } catch (e) {
        console.error("Erro na atualização de senha", e);
        msg.innerText = e.message || "Erro ao guardar nova senha.";
        msg.classList.remove('hidden', 'text-emerald-500');
        msg.classList.add('text-red-500');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Salvar Nova Senha';
    }
}

window.toggleVerSenha = function(id, btn) {
    const input = document.getElementById(id);
    const svg = btn.querySelector('svg');
    const olhoAberto = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
    const olhoFechado = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />';
    if (!input || !svg) return;
    if (input.type === 'password') {
        input.type = 'text';
        svg.innerHTML = olhoFechado;
    } else {
        input.type = 'password';
        svg.innerHTML = olhoAberto;
    }
}

window.checarForca = function(val) {
    const f1 = document.getElementById('f1');
    const f2 = document.getElementById('f2');
    const f3 = document.getElementById('f3');
    if (!f1 || !f2 || !f3) return;
    const b = 'h-1.5 flex-1 rounded-full transition-colors duration-200 bg-slate-200 dark:bg-slate-700';
    f1.className = f2.className = f3.className = b;
    if (val.length > 0) f1.className = b.replace('bg-slate-200 dark:bg-slate-700', 'bg-red-500');
    if (val.length > 5) f2.className = b.replace('bg-slate-200 dark:bg-slate-700', 'bg-orange-400');
    if (val.length > 8) f3.className = b.replace('bg-slate-200 dark:bg-slate-700', 'bg-emerald-500');
}
