// js/views/onboarding.js

function renderOnboarding() {
    return `
        <div class="mb-6">
            <p class="text-sm text-slate-500">Informações valiosas recolhidas durante a fase de registo (Onboarding) para análise de perfil.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-3xl shadow-card border border-slate-100/60 flex flex-col">
                <div class="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                    <img src="https://ui-avatars.com/api/?name=Ana+Silva&background=f8fafc&color=334155" class="w-12 h-12 rounded-xl">
                    <div>
                        <h4 class="font-bold text-navy-900 text-base">Ana Silva</h4>
                        <p class="text-xs text-slate-400">Registou-se Hoje, 10:45</p>
                    </div>
                </div>

                <div class="space-y-4 flex-1">
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nível de Experiência</p>
                        <p class="text-sm font-semibold text-slate-700 bg-[#F9F7F5] px-3 py-2 rounded-lg">Estou a começar agora</p>
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tipo de Produtos</p>
                        <div class="flex gap-2 flex-wrap">
                            <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-md">Vestuário</span>
                            <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-md">Acessórios</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Objetivo Principal</p>
                        <p class="text-sm font-semibold text-slate-700 bg-[#F9F7F5] px-3 py-2 rounded-lg">Vender no Instagram e WhatsApp</p>
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-slate-100">
                    <button class="w-full py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                        Ver Perfil Completo
                    </button>
                </div>
            </div>

            <div class="bg-white p-6 rounded-3xl shadow-card border border-slate-100/60 flex flex-col">
                <div class="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                    <img src="https://ui-avatars.com/api/?name=Marcos+T&background=f8fafc&color=334155" class="w-12 h-12 rounded-xl">
                    <div>
                        <h4 class="font-bold text-navy-900 text-base">Marcos T.</h4>
                        <p class="text-xs text-slate-400">Registou-se Ontem</p>
                    </div>
                </div>

                <div class="space-y-4 flex-1">
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nível de Experiência</p>
                        <p class="text-sm font-semibold text-slate-700 bg-[#F9F7F5] px-3 py-2 rounded-lg">Já vendo online noutras plataformas</p>
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tipo de Produtos</p>
                        <div class="flex gap-2 flex-wrap">
                            <span class="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">Eletrónica</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Objetivo Principal</p>
                        <p class="text-sm font-semibold text-slate-700 bg-[#F9F7F5] px-3 py-2 rounded-lg">Criar um catálogo profissional</p>
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-slate-100">
                    <button class="w-full py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                        Ver Perfil Completo
                    </button>
                </div>
            </div>
        </div>
    `;
}
