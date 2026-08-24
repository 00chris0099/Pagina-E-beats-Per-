(function() {
    const path = window.location.pathname;
    const depth = path.split('/').filter(Boolean).length;
    let root = '';
    if (depth >= 3) root = '../../';
    else if (depth >= 2) root = '../';

    const headerHTML = `
    <header id="navbar" class="navbar bg-white/95 border-b border-on-surface/10">
        <div class="bg-primary text-on-primary text-center py-1 px-4 overflow-hidden">
            <p class="font-label-sm text-[9px] sm:text-[11px] uppercase tracking-widest truncate">
                <a href="tel:+51955250185" class="hover:underline">+51 955 250 185</a>
                &nbsp;|&nbsp;
                <a href="https://wa.me/51955250185" target="_blank" rel="noopener" class="hover:underline">WhatsApp</a>
                &nbsp;|&nbsp;
                <a href="mailto:anchillo00@gmail.com" class="hover:underline">anchillo00@gmail.com</a>
                <span class="inline-flex items-center gap-1 ml-2">
                    <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    SISTEMAS OPERATIVOS
                </span>
            </p>
        </div>
        <nav class="max-w-7xl mx-auto px-4 md:px-16 h-16 flex items-center justify-between">
            <a href="${root}index.html" class="flex items-center shrink-0">
                <img src="${root}assets/images/logonormal.png" alt="E Beats Peru" class="h-10 w-10 object-cover rounded-sm" />
            </a>
            <div class="hidden lg:flex items-center gap-8">
                <div class="relative group">
                    <button class="font-label-sm text-[13px] uppercase tracking-widest text-on-surface hover:text-on-tertiary-container transition-colors flex items-center gap-1">
                        Soluciones Tecnologicas
                        <span class="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                    <div class="absolute top-full left-1/2 -translate-x-1/2 z-50 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                        <div class="bg-white border border-on-surface/10 p-6 grid grid-cols-2 gap-4 min-w-[400px] shadow-xl">
                            <a href="${root}pages/casos/desarrollo-software.html" class="flex items-start gap-3 p-3 hover:bg-surface-container transition-colors">
                                <span class="material-symbols-outlined text-on-tertiary-container">code</span>
                                <div>
                                    <span class="font-label-sm text-[13px] uppercase font-bold block">Desarrollo</span>
                                    <span class="text-[12px] text-secondary">Software y Apps</span>
                                </div>
                            </a>
                            <a href="${root}pages/casos/chatbots-b2b.html" class="flex items-start gap-3 p-3 hover:bg-surface-container transition-colors">
                                <span class="material-symbols-outlined text-on-tertiary-container">smart_toy</span>
                                <div>
                                    <span class="font-label-sm text-[13px] uppercase font-bold block">Agentes IA</span>
                                    <span class="text-[12px] text-secondary">Chatbots de venta</span>
                                </div>
                            </a>
                            <a href="${root}pages/casos/bases-datos-seguridad.html" class="flex items-start gap-3 p-3 hover:bg-surface-container transition-colors">
                                <span class="material-symbols-outlined text-on-tertiary-container">database</span>
                                <div>
                                    <span class="font-label-sm text-[13px] uppercase font-bold block">SQL Engineering</span>
                                    <span class="text-[12px] text-secondary">Bases de datos</span>
                                </div>
                            </a>
                            <a href="${root}pages/casos/flujos-trabajo.html" class="flex items-start gap-3 p-3 hover:bg-surface-container transition-colors">
                                <span class="material-symbols-outlined text-on-tertiary-container">webhook</span>
                                <div>
                                    <span class="font-label-sm text-[13px] uppercase font-bold block">Automatizacion</span>
                                    <span class="text-[12px] text-secondary">n8n y webhooks</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <a href="${root}pages/servicios.html" class="font-label-sm text-[13px] uppercase tracking-widest text-on-surface hover:text-on-tertiary-container transition-colors">Casos en Produccion</a>
                <a href="${root}pages/blog.html" class="font-label-sm text-[13px] uppercase tracking-widest text-on-surface hover:text-on-tertiary-container transition-colors">Centro de Recursos</a>
                <a href="${root}pages/ayuda/" class="font-label-sm text-[13px] uppercase tracking-widest text-on-surface hover:text-on-tertiary-container transition-colors">Ayuda</a>
            </div>
            <div class="flex items-center gap-4">
                <a href="${root}pages/contacto.html" class="hidden md:inline-flex bg-on-tertiary-container text-white px-5 py-2.5 font-label-sm text-[12px] uppercase tracking-widest hover:bg-primary transition-colors">
                    Agendar Auditoria Ejecutiva
                </a>
                <button id="mobileMenuBtn" class="lg:hidden p-2" aria-label="Abrir menu">
                    <span class="material-symbols-outlined text-2xl">menu</span>
                </button>
            </div>
        </nav>
        <div id="mobileMenu" class="hidden lg:hidden bg-white border-t border-on-surface/10">
            <div class="px-4 py-6 space-y-4">
                <a href="${root}index.html" class="block font-label-sm text-[13px] uppercase tracking-widest py-2 border-b border-on-surface/10">Inicio</a>
                <a href="${root}pages/servicios.html" class="block font-label-sm text-[13px] uppercase tracking-widest py-2 border-b border-on-surface/10">Soluciones</a>
                <a href="${root}pages/blog.html" class="block font-label-sm text-[13px] uppercase tracking-widest py-2 border-b border-on-surface/10">Centro de Recursos</a>
                <a href="${root}pages/ayuda/" class="block font-label-sm text-[13px] uppercase tracking-widest py-2 border-b border-on-surface/10">Ayuda</a>
                <a href="${root}pages/contacto.html" class="block font-label-sm text-[13px] uppercase tracking-widest py-2 border-b border-on-surface/10">Contacto</a>
                <a href="${root}pages/contacto.html" class="block bg-on-tertiary-container text-white px-5 py-3 font-label-sm text-[12px] uppercase tracking-widest text-center mt-4">Agendar Auditoria</a>
            </div>
        </div>
    </header>`;

    const placeholder = document.getElementById('site-header');
    if (placeholder) {
        placeholder.innerHTML = headerHTML;
    }

    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
})();
