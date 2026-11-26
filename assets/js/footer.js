document.addEventListener('DOMContentLoaded', () => {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="bg-surface border-t border-outline-variant">
      <nav class="max-w-7xl mx-auto px-4 md:px-16 py-6 flex flex-wrap gap-4" aria-label="Enlaces del pie de página">
        <a class="underline" href="/">Inicio</a>
        <a class="underline" href="/pages/politica-de-privacidad.html">Política de privacidad</a>
        <a class="underline" href="/pages/terminos.html">Términos</a>
      </nav>
    </footer>
  `;
});
