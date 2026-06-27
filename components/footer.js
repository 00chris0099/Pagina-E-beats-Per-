(function() {
    const isSubdir = window.location.pathname.includes('/blogs/') || window.location.pathname.includes('/components/') || window.location.pathname.includes('casos%20en%20producci') || window.location.pathname.includes('casos en producci');
    const root = isSubdir ? '../' : '';

    const footerHTML = `
    <footer class="w-full bg-surface-container-lowest border-t-2 border-primary py-xl px-margin-mobile md:px-margin-desktop">
        <div class="max-w-[1440px] mx-auto">
            <!-- Top Section: Identity -->
            <div class="mb-xl">
                <img src="${root}image/logonormal.png" alt="E Beats Peru" class="h-14 w-14 object-cover rounded-sm mb-md" />
                <p class="font-body-lg text-body-lg text-on-surface max-w-2xl">
                    Inteligencia Artificial y Ciberseguridad B2B. Agencia de ingenieria tecnologica liderada por Christian Elias (CEO). Operamos formalmente bajo el regimen MYPE Tributario ante SUNAT. Disenamos, auditamos y blindamos infraestructura digital desde nuestra sede operativa en San Juan de Lurigancho para centros de especializacion, corporaciones y despachos en Lima, Cusco y Piura.
                </p>
                <div class="flex gap-sm items-center mt-sm">
                    <span class="material-symbols-outlined text-on-tertiary-container" style="font-variation-settings: 'FILL' 1;">verified_user</span>
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Validacion Tecnica MYPE Tributario</span>
                </div>
            </div>

            <!-- Middle Section: Navigation Clusters -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter py-xl border-t border-surface-variant">
                <div class="flex flex-col gap-md">
                    <h4 class="font-label-sm text-label-sm uppercase text-primary border-l-4 border-on-tertiary-container pl-base">Soluciones Tecnologicas</h4>
                    <nav class="flex flex-col gap-sm">
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}casos%20en%20producci%C3%B3n/Desarrollo%20de%20Software%20y%20Aplicaciones.html">Desarrollo de Software y Ecosistemas Moviles</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}casos%20en%20producci%C3%B3n/Administraci%C3%B3n%20de%20Bases%20de%20Datos%20y%20Seguridad.html">Ingenieria y Seguridad de Bases de Datos</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}casos%20en%20producci%C3%B3n/Ingenier%C3%ADa%20de%20Flujos%20de%20Trabajo%20(Workflows).html">Automatizacion de Workflows B2B</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}casos%20en%20producci%C3%B3n/Chatbots%20B2B%20y%20Agentes%20de%20Ventas.html">Chatbots de Ventas y Agentes IA</a>
                    </nav>
                </div>
                <div class="flex flex-col gap-md">
                    <h4 class="font-label-sm text-label-sm uppercase text-primary border-l-4 border-primary pl-base">Centro de Recursos</h4>
                    <nav class="flex flex-col gap-sm">
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}blogprincipal.html">Casos en Produccion y Despliegues</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}blogprincipal.html">Guias de Arquitectura y T-SQL</a>
                        <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors w-fit" href="${root}blogprincipal.html">Documentacion de Inteligencia Artificial</a>
                    </nav>
                </div>
                <div class="flex flex-col gap-md">
                    <h4 class="font-label-sm text-label-sm uppercase text-primary border-l-4 border-secondary pl-base">Infraestructura</h4>
                    <div class="flex flex-wrap gap-xs">
                        <span class="px-base py-xs border border-primary text-[10px] font-bold uppercase">KVM Tier 2</span>
                        <span class="px-base py-xs border border-primary text-[10px] font-bold uppercase">SQL Server</span>
                        <span class="px-base py-xs border border-primary text-[10px] font-bold uppercase">n8n Enterprise</span>
                        <span class="px-base py-xs border border-primary text-[10px] font-bold uppercase">SSL/AES-256</span>
                    </div>
                </div>
                <div class="flex flex-col gap-md">
                    <h4 class="font-label-sm text-label-sm uppercase text-primary border-l-4 border-secondary pl-base">Operaciones</h4>
                    <div class="flex flex-col gap-xs font-body-md text-body-md text-secondary">
                        <p class="flex items-center gap-xs"><span class="material-symbols-outlined text-[18px]">location_on</span> San Juan de Lurigancho, Lima</p>
                        <p class="flex items-center gap-xs"><span class="material-symbols-outlined text-[18px]">mail</span> soporte@e-beats.pe</p>
                        <p class="flex items-center gap-xs"><span class="material-symbols-outlined text-[18px]">support_agent</span> Soporte 24/7 Corporativo</p>
                    </div>
                </div>
            </div>

            <!-- Bottom Section: Legal & Copyright -->
            <div class="pt-lg border-t-2 border-primary flex flex-col md:flex-row justify-between items-center gap-md">
                <div class="flex flex-wrap justify-center md:justify-start gap-md">
                    <a class="font-label-sm text-label-sm text-secondary hover:text-primary uppercase tracking-tight" href="${root}politica-de-privacidad.html">Politicas de Privacidad y Tratamiento de Datos</a>
                    <a class="font-label-sm text-label-sm text-secondary hover:text-primary uppercase tracking-tight" href="${root}politica-de-privacidad.html">Terminos de Servicio Corporativo</a>
                    <a class="font-label-sm text-label-sm text-secondary hover:text-primary uppercase tracking-tight" href="${root}politica-de-privacidad.html">Politicas de Cookies</a>
                </div>
                <div class="flex flex-col items-center md:items-end gap-xs">
                    <p class="font-label-sm text-label-sm text-primary font-bold uppercase">&copy; 2026 E-Beats Peru</p>
                    <p class="font-label-sm text-label-sm text-secondary text-[11px] uppercase tracking-tighter">Todos los derechos de infraestructura y codigo reservados.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/animejs@4.0.1/lib/anime.min.js"></script>
    <script src="https://player.vimeo.com/api/player.js"></script>
    <script src="${root}main.js"></script>`;

    const placeholder = document.getElementById('site-footer');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    }
})();
