document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = `
    <header class="bg-surface border-b border-outline-variant">
      <nav class="max-w-7xl mx-auto px-4 md:px-16 min-h-16 flex flex-wrap items-center justify-between gap-3 py-3" aria-label="Principal">
        <a class="font-headline-lg font-bold text-primary" href="/">E Beats Perú</a>
        <div class="flex flex-wrap gap-4">
          <a class="underline" href="/pages/blog.html">Artículos</a>
          <a class="underline" href="/#contacto">Contacto</a>
        </div>
      </nav>
    </header>
  `;
});
