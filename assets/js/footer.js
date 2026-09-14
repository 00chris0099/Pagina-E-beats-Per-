(function() {
    const path = window.location.pathname;
    const depth = path.split('/').filter(Boolean).length;
    let root = '';
    if (depth >= 3) root = '../../';
    else if (depth >= 2) root = '../';

    const footerHTML = `
    <footer class="w-full bg-surface-container-lowest border-t-2 border-primary py-xl px-margin-mobile md:px-margin-desktop">
        <div class="max-w-[1440px] mx-auto">
            <div class="mb-xl">
                <img src="${root}assets/images/logonormal.png" alt="E Beats Peru" class="h-14 w-14 object-cover rounded-sm mb-md" />
                <p class="font-body-lg text-body-lg text-on-surface max-w-2xl">
                    Inteligencia Artificial y Ciberseguridad B2B. Agencia de ingenieria tecnologica liderada por Christian Elias (CEO). Operamos formalmente bajo el regimen MYPE Tributario ante SUNAT. Diseniamos, auditamos y blindamos infraestructura digital desde nuestra sede operativa en San Juan de Lurigancho para centros de especializacion, corporaciones y despachos en Lima, Cusco y Piura.
                </p>
                <div class="flex gap-sm items-center mt-sm">
                    <span class="material-symbols-outlined text-on-tertiary-container" style="font-variation-settings: 'FILL' 1;">verified_user</span>
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Validacion Tecnica MYPE Tributario</span>
                </div>
                <div class="flex flex-wrap gap-2 items-center mt-md pt-base border-t border-surface-variant max-w-xl">
                    <span class="font-label-sm text-[11px] uppercase tracking-wider text-secondary mr-2">Comunidad & Redes:</span>
                    <a href="https://www.tiktok.com/@agenciaiaperu" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white hover:bg-on-tertiary-container transition-colors text-xs font-bold rounded-sm" title="TikTok de E Beats Perú">
                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.52z"/></svg>
                        TikTok @agenciaiaperu
                    </a>
                    <a href="https://www.instagram.com/christianeliasan/" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E1306C] text-white hover:opacity-90 transition-opacity text-xs font-bold rounded-sm" title="Instagram de Christian Elias">
                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        Instagram @christianeliasan
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61580617251411" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1877F2] text-white hover:opacity-90 transition-opacity text-xs font-bold rounded-sm" title="Facebook de Christian Elias / E Beats">
                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter py-xl border-t border-surface-variant">
                <div class="flex flex-col gap-md">
                    <h4 class="font-label-sm text-label-sm uppercase text-primary border-l-4 border-on-tertiary-container pl-base">Servicios</h4>
                    <nav class="flex flex-col gap-sm">
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/servicios/agente-ia-whatsapp.html">Agente IA para WhatsApp</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/servicios/paginas-web-baratas.html">Paginas Web Baratas</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/servicios/automatizacion-sunat.html">Automatizacion SUNAT</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/servicios/paquete-completo.html">Paquete Completo</a>
                        <a class="font-body-md text-body-md text-on-tertiary-container font-bold hover:underline transition-colors w-fit flex items-center gap-1.5" href="${root}pages/landing-video/index.html#video-section">
                            <span class="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                            Demostración VSL (10 min)
                        </a>
                    </nav>
                </div>
                <div class="flex flex-col gap-md">
                    <h4 class="font-label-sm text-label-sm uppercase text-primary border-l-4 border-primary pl-base">Casos de Uso</h4>
                    <nav class="flex flex-col gap-sm">
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/casos/chatbots-b2b.html">Chatbots de Ventas IA</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/casos/desarrollo-software.html">Desarrollo de Software</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/casos/flujos-trabajo.html">Automatizacion n8n</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/casos/bases-datos-seguridad.html">Ciberseguridad</a>
                    </nav>
                </div>
                <div class="flex flex-col gap-md">
                    <h4 class="font-label-sm text-label-sm uppercase text-primary border-l-4 border-primary pl-base">Soporte</h4>
                    <nav class="flex flex-col gap-sm">
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/ayuda/">Centro de Ayuda</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/ayuda/seguir-pedido.html">Seguimiento de Pedidos</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/ayuda/metodos-de-pago.html">Metodos de Pago</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/ayuda/envios.html">Politica de Envios</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}pages/ayuda/contacto-soporte.html">Contactar Soporte</a>
                    </nav>
                </div>
                <div class="flex flex-col gap-md">
                    <h4 class="font-label-sm text-label-sm uppercase text-primary border-l-4 border-secondary pl-base">Redes y Contacto</h4>
                    <div class="flex flex-col gap-sm font-body-md text-body-md text-secondary">
                        <a href="https://www.tiktok.com/@agenciaiaperu" target="_blank" rel="noopener" class="flex items-center gap-xs hover:text-primary transition-colors w-fit group">
                            <svg class="w-4 h-4 fill-current text-primary group-hover:text-on-tertiary-container transition-colors" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.52z"/></svg>
                            <span>TikTok <strong class="text-primary font-bold">@agenciaiaperu</strong></span>
                        </a>
                        <a href="https://www.instagram.com/christianeliasan/" target="_blank" rel="noopener" class="flex items-center gap-xs hover:text-primary transition-colors w-fit group">
                            <svg class="w-4 h-4 fill-current text-primary group-hover:text-on-tertiary-container transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            <span>Instagram <strong class="text-primary font-bold">@christianeliasan</strong></span>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61580617251411" target="_blank" rel="noopener" class="flex items-center gap-xs hover:text-primary transition-colors w-fit group">
                            <svg class="w-4 h-4 fill-current text-primary group-hover:text-on-tertiary-container transition-colors" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            <span>Facebook Oficial</span>
                        </a>
                        <a href="https://wa.me/51955250185" target="_blank" rel="noopener" class="flex items-center gap-xs hover:text-primary transition-colors w-fit">
                            <span class="material-symbols-outlined text-[18px] text-green-600">chat</span> +51 955 250 185 (WhatsApp)
                        </a>
                        <a href="mailto:anchillo00@gmail.com" class="flex items-center gap-xs hover:text-primary transition-colors w-fit">
                            <span class="material-symbols-outlined text-[18px]">mail</span> anchillo00@gmail.com
                        </a>
                    </div>
                    <div class="flex flex-wrap gap-xs mt-xs">
                        <span class="px-base py-xs border border-primary text-[10px] font-bold uppercase">KVM Tier 2</span>
                        <span class="px-base py-xs border border-primary text-[10px] font-bold uppercase">SQL Server</span>
                        <span class="px-base py-xs border border-primary text-[10px] font-bold uppercase">n8n Enterprise</span>
                        <span class="px-base py-xs border border-primary text-[10px] font-bold uppercase">SSL/AES-256</span>
                    </div>
                </div>
            </div>

            <div class="pt-lg border-t-2 border-primary flex flex-col md:flex-row justify-between items-center gap-md">
                <div class="flex flex-wrap justify-center md:justify-start gap-md">
                    <a class="font-label-sm text-label-sm text-secondary hover:text-primary uppercase tracking-tight" href="${root}pages/politica-de-privacidad.html">Politicas de Privacidad y Tratamiento de Datos</a>
                    <a class="font-label-sm text-label-sm text-secondary hover:text-primary uppercase tracking-tight" href="${root}pages/politica-de-privacidad.html">Terminos de Servicio Corporativo</a>
                    <a class="font-label-sm text-label-sm text-secondary hover:text-primary uppercase tracking-tight" href="${root}pages/politica-de-privacidad.html">Politicas de Cookies</a>
                </div>
                <div class="flex flex-col items-center md:items-end gap-xs">
                    <p class="font-label-sm text-label-sm text-primary font-bold uppercase">&copy; 2026 E-Beats Peru</p>
                    <p class="font-label-sm text-label-sm text-secondary text-[11px] uppercase tracking-tighter">Todos los derechos de infraestructura y codigo reservados.</p>
                </div>
            </div>
        </div>
    </footer>`;

    const placeholder = document.getElementById('site-footer');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    }
})();
