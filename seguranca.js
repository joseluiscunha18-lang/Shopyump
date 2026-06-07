document.body.insertAdjacentHTML('beforeend', `
    <template id="tpl-seguranca">
        <div class="pt-24 px-6 main-wrapper pb-20 bg-[#f6f6f7] dark:bg-[#0b0f1a] min-h-screen">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                <div class="sf-card overflow-hidden">
                    <div class="p-5 flex items-center justify-between">
                        <div class="space-y-0.5 text-left"><p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Email de Acesso</p><p class="text-sm font-semibold text-slate-600 dark:text-slate-300">carlosfer@gmail.com</p></div>
                        <button onclick="toggleSecao('form-email')" class="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg active:scale-95 transition-all">Alterar</button>
                    </div>
                    <div id="form-email" class="expandable border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                        <div class="p-5 space-y-4 text-left">
                            <div class="space-y-1.5">
                                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Novo Email</label>
                                <input type="email" id="input-novo-email" placeholder="novo@exemplo.com" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-colors">
                                <p class="text-[10px] text-slate-400 mt-1">O Supabase enviará um link de confirmação para validar.</p>
                            </div>
                            <p id="msg-erro-email" class="text-red-500 text-[10px] font-bold uppercase mt-2 hidden"></p>
                            <button id="btn-salvar-email" onclick="validarESalvarEmail()" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all">Atualizar Email</button>
                        </div>
                    </div>
                </div>

                <div class="sf-card overflow-hidden">
                    <div class="p-5 flex items-center justify-between">
                        <div class="space-y-0.5 text-left"><p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Palavra-Passe</p><p class="text-sm font-semibold text-slate-600 dark:text-slate-300">••••••••••••</p></div>
                        <button onclick="toggleSecao('form-senha')" class="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg active:scale-95 transition-all">Alterar</button>
                    </div>
                    <div id="form-senha" class="expandable border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                        <div class="p-5 space-y-5 text-left">
                            <div class="space-y-1.5 relative"><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Senha Atual</label><input type="password" id="pass-atual" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-colors">
                                <button type="button" onclick="toggleVerSenha('pass-atual', this)" class="absolute right-4 top-9 text-slate-400 active:scale-90 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                            </div>
                            <div class="space-y-1.5 relative"><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nova Senha</label><input type="password" id="pass-nova" oninput="checarForca(this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-colors">
                                <button type="button" onclick="toggleVerSenha('pass-nova', this)" class="absolute right-4 top-9 text-slate-400 active:scale-90 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                                <div class="flex gap-1.5 mt-3"><div id="f1" class="h-1.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-200"></div><div id="f2" class="h-1.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-200"></div><div id="f3" class="h-1.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-200"></div></div>
                            </div>
                            <div class="space-y-1.5 relative"><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirmar Nova Senha</label><input type="password" id="pass-conf" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-colors">
                                <button type="button" onclick="toggleVerSenha('pass-conf', this)" class="absolute right-4 top-9 text-slate-400 active:scale-90 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                                <p id="msg-erro-senha" class="text-red-500 text-[10px] font-bold uppercase mt-2 hidden"></p>
                            </div>
                            <button id="btn-salvar-senha" onclick="validarESalvarSenha()" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all">Salvar Nova Senha</button>
                        </div>
                    </div>
                </div>

                <div class="sf-card overflow-hidden lg:col-span-2">
                    <div class="p-5 flex items-center justify-between">
                        <div class="text-left space-y-0.5"><p class="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Gestão de Conta</p><p class="text-[11px] text-slate-400">Encerrar e apagar dados</p></div>
                        <button onclick="toggleSecao('form-delete')" class="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg active:scale-95 transition-all">Expandir</button>
                    </div>
                    <div id="form-delete" class="expandable border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                        <div class="p-5 space-y-4 text-left">
                            <p class="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Se eliminares a tua conta, todos os dados serão apagados permanentemente.</p>
                            <div class="relative space-y-1.5"><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Senha para Confirmar</label><input type="password" id="pass-delete" placeholder="Tua senha atual" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-red-500 transition-colors">
                                <button type="button" onclick="toggleVerSenha('pass-delete', this)" class="absolute right-4 top-9 text-slate-400 active:scale-90 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                            </div>
                            <button onclick="mostrarNotificacao('A conta será eliminada', 'form-delete')" class="w-full bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:border-red-900/50 dark:text-red-400 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all">Eliminar Conta Definitivamente</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </template>
`);

// seguranca.js - Lógica exclusiva da página de Segurança

document.addEventListener('spa:page-loaded', async (e) => {
    if (e.detail === 'seguranca') {
        // Reset todos os acordeões ao entrar na página
        ['form-email', 'form-senha', 'form-delete'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('open');
        });

        // Buscar dados do banco de dados na hora
        try {
            const { data: { user } } = await window.supabaseClient.auth.getUser();
            if (user) {
                // Coloca o email verdadeiro do user na tela
                const painelEmail = document.getElementById('form-email');
                if (painelEmail) {
                    const textoEmail = painelEmail.previousElementSibling.querySelector('p.text-sm');
                    if (textoEmail) textoEmail.innerText = user.email || '';
                }

                // Verifica se foi registo pelo Google
                const isGoogle = user.app_metadata?.provider === 'google';
                
                // Se for Google, esconde os botões e avisa que é conta Google
                if (isGoogle) {
                    const btnAlterarEmail = document.getElementById('form-email')?.previousElementSibling?.querySelector('button');
                    const btnAlterarSenha = document.getElementById('form-senha')?.previousElementSibling?.querySelector('button');
                    const textoSenha = document.getElementById('form-senha')?.previousElementSibling?.querySelector('p.text-sm');
                    
                    if (btnAlterarEmail) btnAlterarEmail.style.display = 'none';
                    if (btnAlterarSenha) btnAlterarSenha.style.display = 'none';
                    if (textoSenha) textoSenha.innerText = 'Gerido por Google';
                }
            }
        } catch (err) {
            console.error('Erro ao verificar segurança', err);
        }
    }
});

function toggleSecao(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
}

function toggleVerSenha(id, btn) {
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

function checarForca(val) {
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

async function validarESalvarEmail() {
    const inputEmail = document.getElementById('input-novo-email');
    const msg = document.getElementById('msg-erro-email');
    const btn = document.getElementById('btn-salvar-email');
    
    if (!inputEmail || !msg || !btn) return;

    const novoEmail = inputEmail.value.trim();
    if (!novoEmail || !novoEmail.includes('@')) {
        msg.innerText = '⚠ Por favor, insira um e-mail válido';
        msg.style.display = 'block';
        inputEmail.classList.add('border-red-500');
        return;
    }

    msg.style.display = 'none';
    inputEmail.classList.remove('border-red-500');
    
    const textoOriginal = btn.innerText;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> A processar...';
    btn.disabled = true;

    try {
        const { error } = await window.supabaseClient.auth.updateUser({ email: novoEmail });
        
        if (error) throw error;

        if (typeof mostrarNotificacao === 'function') {
            mostrarNotificacao('Verifica a tua caixa de e-mail.');
        } else {
            alert('Verifica a caixa de entrada no e-mail antigo e no novo para confirmar.');
        }

        const formEmail = document.getElementById('form-email');
        if (formEmail) formEmail.classList.remove('open');
        inputEmail.value = '';
    } catch (error) {
        console.error('Erro ao atualizar e-mail:', error);
        msg.innerText = '⚠ ' + (error.message || 'Erro ao atualizar e-mail.');
        msg.style.display = 'block';
    } finally {
        btn.innerHTML = textoOriginal;
        btn.disabled = false;
    }
}

async function validarESalvarSenha() {
    const atual = document.getElementById('pass-atual');
    const nova = document.getElementById('pass-nova');
    const conf = document.getElementById('pass-conf');
    const msg = document.getElementById('msg-erro-senha');
    const btn = document.getElementById('btn-salvar-senha');
    
    if (!nova || !conf || !msg) return;

    msg.style.display = 'none';
    nova.classList.remove('border-red-500');
    conf.classList.remove('border-red-500');

    if (!nova.value || !conf.value || (atual && !atual.value)) {
        msg.innerText = '⚠ Por favor, preenche todos os campos.';
        msg.style.display = 'block';
        return;
    }

    if (atual && atual.value === nova.value) {
        msg.innerText = '⚠ A nova senha não pode ser igual à atual.';
        msg.style.display = 'block';
        nova.classList.add('border-red-500');
        return;
    }

    if (nova.value !== conf.value) {
        msg.innerText = '⚠ As senhas não coincidem.';
        msg.style.display = 'block';
        conf.classList.add('border-red-500');
        return;
    }

    const textoOriginal = btn ? btn.innerText : 'SALVAR NOVA SENHA';
    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> A processar...';
        btn.disabled = true;
    }

    try {
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        if (!user || (!user.email && !user.phone)) throw new Error('Não foi possível aceder à tua conta.');

        // 1. Validar primeiro a senha atual forçando um sign in silencioso (Acesso Implacável)
        const { error: signInError } = await window.supabaseClient.auth.signInWithPassword({
            email: user.email,
            password: atual.value
        });

        if (signInError) {
            throw new Error('A senha atual está incorreta.');
        }

        // 2. Só após confirmar que a senha atual está certa, passamos a atualizar para a nova!
        const { error: updateError } = await window.supabaseClient.auth.updateUser({
            password: nova.value
        });

        if (updateError) throw updateError;

        if (typeof mostrarNotificacao === 'function') {
            mostrarNotificacao('Senha alterada no Supabase com sucesso!');
        } else {
            alert('Senha alterada com sucesso!');
        }
        
        const formSenha = document.getElementById('form-senha');
        if (formSenha) formSenha.classList.remove('open');

        if (atual) atual.value = '';
        nova.value = '';
        conf.value = '';
        if (typeof checarForca === 'function') checarForca('');

    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        msg.innerText = '⚠ ' + (error.message || 'Erro ao alterar a senha.');
        msg.style.display = 'block';
    } finally {
        if (btn) {
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
        }
    }
}
