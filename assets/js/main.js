/* ══════════════════════════════════════════════════
   E BEATS PERÚ — JAVASCRIPT
   Navbar scroll, animation observer, mobile menu
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── MOBILE HAMBURGER ─── */
  const hamburger = document.getElementById('hamburger');
  const sidebarNav = document.getElementById('sidebarNav');
  const sidebarClose = document.getElementById('sidebarClose');

  const toggleSidebar = (forceState) => {
    if (!sidebarNav) return;
    const isOpen = typeof forceState === 'boolean' ? forceState : !sidebarNav.classList.contains('sidebar-nav--open');
    sidebarNav.classList.toggle('sidebar-nav--open', isOpen);
    sidebarNav.setAttribute('aria-hidden', (!isOpen).toString());
    hamburger?.classList.toggle('open', isOpen);
    hamburger?.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('sidebar-open', isOpen);
  };

  hamburger?.addEventListener('click', () => {
    toggleSidebar();
  });

  sidebarClose?.addEventListener('click', () => toggleSidebar(false));

  sidebarNav?.addEventListener('click', (event) => {
    if (event.target === sidebarNav) {
      toggleSidebar(false);
    }
  });

  document.querySelectorAll('.sidebar-nav .nav-link, .nav-links .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggleSidebar(false);
    });
  });

  document.querySelectorAll('details > summary').forEach(s => {
    const text = s.textContent.trim();
    if (text) s.setAttribute('aria-label', text);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebarNav?.classList.contains('sidebar-nav--open')) {
      toggleSidebar(false);
    }
  });

  /* ─── HERO ENTRANCE ANIMATION ─── */
  function initHeroEntrance() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Show everything immediately
      document.querySelectorAll('.hero-item, .trust-item').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const heroItems = document.querySelectorAll('.hero-item');
    const trustItems = document.querySelectorAll('.trust-item');

    // Stagger hero items
    heroItems.forEach((item, index) => {
      const delay = parseFloat(item.dataset.heroDelay || index) * 80;
      setTimeout(() => {
        item.classList.add('hero-item--visible');
      }, 150 + delay);
    });

    // Stagger trust items after hero items
    const heroDelay = heroItems.length * 80 + 400;
    trustItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('trust-item--visible');
      }, heroDelay + index * 100);
    });
  }

  // Run hero entrance on load
  initHeroEntrance();

  /* ─── HERO DOT GRID ANIMATION (anime.js) ─── */
  function initDotGrid() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof anime === 'undefined') return;

    const dotGrid = document.getElementById('heroDotGrid');
    if (!dotGrid) return;

    // Create dots
    const totalDots = 13 * 13;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dotGrid.appendChild(dot);
    }

    // Animate dots with staggered scale from center
    anime({
      targets: '.dot',
      scale: [
        { value: 1.2, duration: 800, delay: anime.stagger(50, { grid: [13, 13], from: 'center' }) },
        { value: 0.7, duration: 1200, delay: anime.stagger(50, { grid: [13, 13], from: 'center' }) },
        { value: 1, duration: 1000, delay: anime.stagger(50, { grid: [13, 13], from: 'center' }) }
      ],
      easing: 'easeInOutQuad',
      loop: true
    });

    // Mouse interaction - subtle pulse near cursor
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        anime({
          targets: '.dot',
          scale: (el, i) => {
            const col = i % 13;
            const row = Math.floor(i / 13);
            const dotX = (col / 12) * rect.width;
            const dotY = (row / 12) * rect.height;
            const dist = Math.sqrt(Math.pow(x - dotX, 2) + Math.pow(y - dotY, 2));
            const maxDist = 150;
            if (dist < maxDist) {
              return 1 + (1 - dist / maxDist) * 0.8;
            }
            return 1;
          },
          backgroundColor: (el, i) => {
            const col = i % 13;
            const row = Math.floor(i / 13);
            const dotX = (col / 12) * rect.width;
            const dotY = (row / 12) * rect.height;
            const dist = Math.sqrt(Math.pow(x - dotX, 2) + Math.pow(y - dotY, 2));
            const maxDist = 150;
            if (dist < maxDist) {
              const intensity = 1 - dist / maxDist;
              return `rgba(229, 62, 62, ${0.5 + intensity * 0.5})`;
            }
            return 'rgba(255, 255, 255, 0.5)';
          },
          duration: 200,
          easing: 'easeOutQuad'
        });
      });

      hero.addEventListener('mouseleave', () => {
        anime({
          targets: '.dot',
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          duration: 400,
          easing: 'easeOutQuad'
        });
      });
    }
  }

  initDotGrid();

  /* ─── ENHANCED SCROLL REVEALS ─── */
  function initScrollReveals() {
    // Return early if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Staggered reveal for grid items
    const staggerContainers = [
      { selector: '.problems-grid', childSelector: '.problem-card', stagger: 80 },
      { selector: '.paradigm-grid', childSelector: '.paradigm-card', stagger: 100 },
      { selector: '.includes-grid', childSelector: '.include-card', stagger: 80 },
      { selector: '.method-steps', childSelector: '.method-step', stagger: 120 },
      { selector: '.forwhom-grid', childSelector: '.forwhom-card', stagger: 120 },
      { selector: '.faq-grid', childSelector: '.faq-item', stagger: 60 }
    ];

    staggerContainers.forEach(({ selector, childSelector, stagger }) => {
      const container = document.querySelector(selector);
      if (!container) return;

      const children = container.querySelectorAll(childSelector);
      if (!children.length) return;

      // Set initial state
      children.forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(18px)';
        child.style.transition = 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      });

      // Create and configure observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const allChildren = container.querySelectorAll(childSelector);
            allChildren.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, i * stagger);
            });
            observer.unobserve(container);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      // Start observing
      observer.observe(container);
    });

    // Fade-in for section headers and key elements
    const fadeSections = [
      '.section-header',
      '.hero-content',
      '.video-container',
      '.diagnostic-content',
      '.diagnostic-card-wrap',
      '.final-cta-inner'
    ];

    fadeSections.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      // Set initial state
      elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });

      // Create and configure observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      // Start observing
      elements.forEach(el => observer.observe(el));
    });
  }

  initScrollReveals();

  /* ─── METHOD STEPS LINE FILL ANIMATION ─── */
  function initMethodStepsAnimation() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const methodSteps = document.querySelectorAll('.method-step');
    if (!methodSteps.length) return;

    methodSteps.forEach(step => {
      const line = step.querySelector('.method-step-line');
      if (line) {
        line.style.transition = 'background 0.6s var(--ease)';
        line.style.background = 'var(--gray-200)';
      }
    });

    const methodObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const line = entry.target.querySelector('.method-step-line');
          if (line) {
            line.style.background = 'linear-gradient(to bottom, var(--red), var(--red) 80%, transparent)';
          }
          methodObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5, rootMargin: '0px 0px -20% 0px' });

    methodSteps.forEach(step => methodObserver.observe(step));
  }

  initMethodStepsAnimation();

  /* ─── AOS SCROLL ANIMATIONS ─── */
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        // Once animated, stop observing for performance
        aosObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  aosElements.forEach(el => aosObserver.observe(el));

  /* ─── SMOOTH SCROLL FOR ANCHORS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── BRIDGE STEPS HOVER INTERACTION ─── */
  const bridgeSteps = document.querySelectorAll('.bridge-step');
  bridgeSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      // Visually highlight hovered step
      bridgeSteps.forEach(s => s.style.opacity = '0.65');
      step.style.opacity = '1';
    });
    step.addEventListener('mouseleave', () => {
      bridgeSteps.forEach(s => s.style.opacity = '1');
    });
  });

  /* ─── DIAGNOSTIC CARD COUNTER ANIMATION ─── */
  const dscStats = document.querySelectorAll('.dsc-stat strong');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (document.querySelector('.diagnostic-system-card')) {
    statsObserver.observe(document.querySelector('.diagnostic-system-card'));
  }

  function animateStats() {
    dscStats.forEach(stat => {
      const text = stat.textContent.trim();
      const numMatch = text.match(/\d+/);
      if (numMatch) {
        const target = parseInt(numMatch[0]);
        const prefix = text.replace(/\d+/, '').replace(/[0-9]/g, '');
        let start = 0;
        const duration = 1200;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          stat.textContent = Math.round(eased * target) + (prefix || '');
          if (progress < 1) requestAnimationFrame(step);
          else stat.textContent = text; // restore original
        };
        requestAnimationFrame(step);
      }
    });
  }

  /* ─── ACTIVE NAV LINK ON SCROLL ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.style.color = '';
          link.style.fontWeight = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--red)';
            link.style.fontWeight = '700';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── CTA BUTTON RIPPLE ─── */
  document.querySelectorAll('.btn-primary, .btn-primary-light').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: rippleFade .6s linear;
        background: rgba(255,255,255,.3);
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        left: ${e.clientX - this.getBoundingClientRect().left}px;
        top:  ${e.clientY - this.getBoundingClientRect().top}px;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* Add ripple keyframe dynamically */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleFade {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  /* ─── DIAGNOSTIC MODAL ─── */
  const modal = document.getElementById('diagModal');
  const modalClose = document.getElementById('diagModalClose');
  const progressBar = document.getElementById('diagProgressBar');
  const submitBtn = document.getElementById('diagSubmitBtn');
  const successWA = document.getElementById('diagSuccessWA');
  const closeSuccess = document.getElementById('diagCloseSuccess');
  const calendlySection = document.getElementById('diagCalendlySection');
  const calendlyContainer = document.getElementById('diagCalendlyContainer');
  const closeCalendly = document.getElementById('diagCloseCalendly');
  const countrySelect = document.getElementById('diag-country');
  const phonePrefix = document.getElementById('diagPhonePrefix');
  const phoneGroup = document.getElementById('diagPhoneGroup');
  const phoneInput = document.getElementById('diag-phone');

  // ─ Phone rules per country ─
  const PHONE_RULES = {
    PE: { regex: /^9\d{8}$/, placeholder: '999 000 000', hint: '9 dígitos, empieza con 9' },
    MX: { regex: /^\d{10}$/, placeholder: '55 1234 5678', hint: '10 dígitos' },
    AR: { regex: /^\d{10}$/, placeholder: '11 1234 5678', hint: '10 dígitos' },
    CO: { regex: /^3\d{9}$/, placeholder: '310 123 4567', hint: '10 dígitos, empieza con 3' },
    CL: { regex: /^9\d{8}$/, placeholder: '9 1234 5678', hint: '9 dígitos, empieza con 9' },
    ES: { regex: /^[67]\d{8}$/, placeholder: '612 345 678', hint: '9 dígitos, empieza con 6 o 7' },
    US: { regex: /^\d{10}$/, placeholder: '212 555 1234', hint: '10 dígitos' },
    VE: { regex: /^0?4\d{9}$/, placeholder: '0412 123 4567', hint: '11 dígitos, empieza con 04' },
    EC: { regex: /^0?9\d{8}$/, placeholder: '09 1234 5678', hint: '9-10 dígitos, empieza con 09' },
    BO: { regex: /^[67]\d{7}$/, placeholder: '71234567', hint: '8 dígitos, empieza con 6 o 7' },
    PY: { regex: /^09\d{8}$/, placeholder: '0981 234 567', hint: '10 dígitos, empieza con 09' },
    UY: { regex: /^09\d{7}$/, placeholder: '094 123 456', hint: '9 dígitos, empieza con 09' },
    PA: { regex: /^\d{8}$/, placeholder: '6123 4567', hint: '8 dígitos' },
    CR: { regex: /^[67]\d{7}$/, placeholder: '6123 4567', hint: '8 dígitos, empieza con 6 o 7' },
    GT: { regex: /^\d{8}$/, placeholder: '1234 5678', hint: '8 dígitos' },
    SV: { regex: /^7\d{7}$/, placeholder: '7123 4567', hint: '8 dígitos, empieza con 7' },
    HN: { regex: /^\d{8}$/, placeholder: '9123 4567', hint: '8 dígitos' },
    NI: { regex: /^\d{8}$/, placeholder: '8123 4567', hint: '8 dígitos' },
    BR: { regex: /^\d{11}$/, placeholder: '11 91234 5678', hint: '11 dígitos' },
    DO: { regex: /^\d{10}$/, placeholder: '809 123 4567', hint: '10 dígitos' },
    OTHER: { regex: /^\d{6,15}$/, placeholder: '1234567890', hint: 'Solo números' }
  };

  // ─ Calendly integration ─
  let calendlyLoaded = false;

  function loadCalendlyAssets() {
    return new Promise((resolve, reject) => {
      if (calendlyLoaded || window.Calendly) {
        resolve();
        return;
      }

      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(cssLink);

      // Load JS
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        calendlyLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function showCalendly(name, email) {
    if (!calendlyContainer) return;

    // Build Calendly URL with pre-filled data
    let calendlyUrl = 'https://calendly.com/anchillo00/diagnostico-de-automatizacion';
    
    // Add pre-fill parameters if name and email are provided
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (email) params.append('email', email);
    
    if (params.toString()) {
      calendlyUrl += '?' + params.toString();
    }

    // Load Calendly assets and initialize widget
    loadCalendlyAssets().then(() => {
      // Clear any existing content
      calendlyContainer.innerHTML = '';
      
      // Create Calendly inline widget
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: calendlyContainer,
          prefill: {
            name: name || '',
            email: email || ''
          },
          utm: {
            utmSource: 'website',
            utmMedium: 'form'
          }
        });
      }
    }).catch(err => {
      console.error('Error loading Calendly:', err);
      calendlyContainer.innerHTML = '<p style="text-align:center; padding: 40px;">Error al cargar el calendario. Por favor, recarga la página o contacta por WhatsApp.</p>';
    });
  }

  // ─ Event: Close Calendly section ─
  if (closeCalendly) {
    closeCalendly.addEventListener('click', closeModal);
  }

  let currentStep = 1;
  const TOTAL_STEPS = 3;

  // ─ Open / Close helpers ─
  function openModal() {
    modal.classList.add('diag-modal--open');
    document.body.style.overflow = 'hidden';
    // Reset to step 1
    goToStep(1);
    // Clear inputs
    modal.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(el => el.value = '');
    modal.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => el.checked = false);
    modal.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
    hideAllErrors();
    // Reset phone prefix to Peru default
    if (phonePrefix) phonePrefix.textContent = '+51';
    // Hide success, show step 1
    document.getElementById('diagSuccess').classList.add('diag-step--hidden');
    document.getElementById('diagStep1').classList.remove('diag-step--hidden');
    // Ocultar mensaje de resultado
    const resultMessage = document.getElementById('diagResultMessage');
    if (resultMessage) {
      resultMessage.classList.add('diag-result-message--hidden');
      resultMessage.textContent = '';
    }
  }

  function closeModal() {
    modal.classList.remove('diag-modal--open');
    document.body.style.overflow = '';
  }

  // ─ Step navigation ─
  function goToStep(step) {
    // Hide all steps
    [1, 2, 3].forEach(n => {
      const el = document.getElementById(`diagStep${n}`);
      if (el) el.classList.add('diag-step--hidden');
    });
    // Show target
    const target = document.getElementById(`diagStep${step}`);
    if (target) target.classList.remove('diag-step--hidden');
    currentStep = step;
    progressBar.style.width = `${(step / TOTAL_STEPS) * 100}%`;
    // Scroll modal scroll area to top
    document.querySelector('.diag-modal-scroll').scrollTop = 0;
  }

  // ─ Validation helpers ─
  function showError(inputId, errId) {
    const inp = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (inp) inp.classList.add('diag-input--error');
    if (err) err.classList.add('diag-error--visible');
  }

  function clearError(inputId, errId) {
    const inp = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (inp) inp.classList.remove('diag-input--error');
    if (err) err.classList.remove('diag-error--visible');
  }

  function hideAllErrors() {
    modal.querySelectorAll('.diag-field-error').forEach(e => e.classList.remove('diag-error--visible'));
    modal.querySelectorAll('.diag-input--error').forEach(e => e.classList.remove('diag-input--error'));
    modal.querySelectorAll('.diag-privacy-error').forEach(e => e.classList.remove('diag-error--visible'));
  }

  function validateStep1() {
    let valid = true;
    const country = document.getElementById('diag-country');
    const name = document.getElementById('diag-name');
    const email = document.getElementById('diag-email');
    const phone = document.getElementById('diag-phone');

    if (!country.value) { showError('diag-country', 'err-country'); valid = false; }
    else clearError('diag-country', 'err-country');

    if (!name.value.trim()) { showError('diag-name', 'err-name'); valid = false; }
    else clearError('diag-name', 'err-name');

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRx.test(email.value)) { showError('diag-email', 'err-email'); valid = false; }
    else clearError('diag-email', 'err-email');

    // Phone: only digits, validated per country
    const rawPhone = phone.value.replace(/\s/g, '');
    const countryKey = country.value || 'OTHER';
    const rule = PHONE_RULES[countryKey] || PHONE_RULES['OTHER'];
    const errPhone = document.getElementById('err-phone');

    if (!rawPhone) {
      if (phoneGroup) phoneGroup.classList.add('diag-input--error');
      if (errPhone) { errPhone.textContent = 'Ingresa tu número de contacto'; errPhone.classList.add('diag-error--visible'); }
      valid = false;
    } else if (!rule.regex.test(rawPhone)) {
      if (phoneGroup) phoneGroup.classList.add('diag-input--error');
      if (errPhone) { errPhone.textContent = `Número inválido (${rule.hint})`; errPhone.classList.add('diag-error--visible'); }
      valid = false;
    } else {
      if (phoneGroup) phoneGroup.classList.remove('diag-input--error');
      if (errPhone) errPhone.classList.remove('diag-error--visible');
    }

    return valid;
  }

  function validateStep2() {
    let valid = true;
    const ventas = document.querySelector('input[name="ventas"]:checked');
    const facturacion = document.querySelector('input[name="facturacion"]:checked');
    const problema = document.querySelectorAll('input[name="problema"]:checked');
    const herramientas = document.querySelectorAll('input[name="herramientas"]:checked');

    if (!ventas) {
      document.getElementById('err-ventas').classList.add('diag-error--visible');
      valid = false;
    } else {
      document.getElementById('err-ventas').classList.remove('diag-error--visible');
    }

    if (!facturacion) {
      document.getElementById('err-facturacion').classList.add('diag-error--visible');
      valid = false;
    } else {
      document.getElementById('err-facturacion').classList.remove('diag-error--visible');
    }

    if (problema.length === 0) {
      document.getElementById('err-problema').classList.add('diag-error--visible');
      valid = false;
    } else {
      document.getElementById('err-problema').classList.remove('diag-error--visible');
    }

    if (herramientas.length === 0) {
      document.getElementById('err-herramientas').classList.add('diag-error--visible');
      valid = false;
    } else {
      document.getElementById('err-herramientas').classList.remove('diag-error--visible');
    }

    return valid;
  }

  function validateStep3() {
    let valid = true;
    const stage = document.querySelector('input[name="etapa"]:checked');
    const implementar = document.querySelector('input[name="implementar"]:checked');
    const tiempo = document.querySelector('input[name="tiempo"]:checked');
    const privacyCheck = document.getElementById('diag-privacy-check');

    if (!stage) {
      document.getElementById('err-stage').classList.add('diag-error--visible');
      valid = false;
    } else {
      document.getElementById('err-stage').classList.remove('diag-error--visible');
    }

    if (!implementar) {
      document.getElementById('err-implementar').classList.add('diag-error--visible');
      valid = false;
    } else {
      document.getElementById('err-implementar').classList.remove('diag-error--visible');
    }

    if (!tiempo) {
      document.getElementById('err-tiempo').classList.add('diag-error--visible');
      valid = false;
    } else {
      document.getElementById('err-tiempo').classList.remove('diag-error--visible');
    }

    if (!privacyCheck || !privacyCheck.checked) {
      document.getElementById('err-privacy').classList.add('diag-error--visible');
      valid = false;
    } else {
      document.getElementById('err-privacy').classList.remove('diag-error--visible');
    }

    return valid;
  }

  // ─ Event: Open modal via CTA buttons ─
  function interceptCTAs() {
    const ctaSelectors = [
      '#hero-cta', '#nav-cta', '#diag-cta',
      '#final-cta-btn', '.nav-cta'
    ];
    ctaSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (btn.getAttribute('href') === '#contacto' || btn.getAttribute('href') === 'mailto:contacto@ebeatspe.com') {
            e.preventDefault();
            openModal();
          }
        });
      });
    });

    // Also intercept all "solicitar diagnóstico" anchors pointing to #contacto
    document.querySelectorAll('a[href="#contacto"]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }
  interceptCTAs();

  // ─ Event: Close ─
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('diag-modal--open')) closeModal();
  });

  // ─ Event: Next buttons ─
  modal.querySelectorAll('.diag-next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.dataset.next);
      if (currentStep === 1 && !validateStep1()) return;
      if (currentStep === 2 && !validateStep2()) return;
      goToStep(nextStep);
    });
  });

  // ─ Event: Prev buttons ─
  modal.querySelectorAll('.diag-prev-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prevStep = parseInt(btn.dataset.prev);
      goToStep(prevStep);
    });
  });

  // ─ Event: Country → phone prefix + placeholder ─
  if (countrySelect && phonePrefix) {
    countrySelect.addEventListener('change', () => {
      const selected = countrySelect.options[countrySelect.selectedIndex];
      const dial = selected?.getAttribute('data-dial') || '+';
      phonePrefix.textContent = dial;
      // Update placeholder for the country
      const rule = PHONE_RULES[countrySelect.value] || PHONE_RULES['OTHER'];
      if (phoneInput) phoneInput.placeholder = rule.placeholder;
      // Clear errors
      clearError('diag-country', 'err-country');
      if (phoneGroup) phoneGroup.classList.remove('diag-input--error');
      const errPhone = document.getElementById('err-phone');
      if (errPhone) errPhone.classList.remove('diag-error--visible');
    });
  }

  // ─ Block non-numeric input in phone field ─
  if (phoneInput) {
    phoneInput.addEventListener('keypress', (e) => {
      if (!/[\d\s]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });
    phoneInput.addEventListener('input', () => {
      // Remove any non-digit characters (handles paste)
      const cleaned = phoneInput.value.replace(/[^\d]/g, '');
      phoneInput.value = cleaned;
      // Live validate
      if (cleaned) {
        const countryKey = countrySelect?.value || 'OTHER';
        const rule = PHONE_RULES[countryKey] || PHONE_RULES['OTHER'];
        if (rule.regex.test(cleaned)) {
          if (phoneGroup) phoneGroup.classList.remove('diag-input--error');
          const errPhone = document.getElementById('err-phone');
          if (errPhone) errPhone.classList.remove('diag-error--visible');
        }
      }
    });
  }

  // ─ Live field validation ─
  ['diag-name', 'diag-email', 'diag-phone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        const errMap = { 'diag-name': 'err-name', 'diag-email': 'err-email', 'diag-phone': 'err-phone' };
        if (el.value.trim()) clearError(id, errMap[id]);
      });
    }
  });

  // ─ Privacy checkbox: clear error when checked ─
  const privacyCheckbox = document.getElementById('diag-privacy-check');
  const privacyError = document.getElementById('err-privacy');
  if (privacyCheckbox && privacyError) {
    privacyCheckbox.addEventListener('change', () => {
      if (privacyCheckbox.checked) {
        privacyError.classList.remove('diag-error--visible');
      }
    });
  }

  // ─ Event: Submit form ─
  const diagForm = document.getElementById('diagForm');
  if (diagForm) {
    diagForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate step 3 before submitting
      if (!validateStep3()) return;

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="animation:spin .8s linear infinite">
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" opacity=".3"/>
          <path d="M12 2a10 10 0 0110 10" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        Enviando...
      `;

      // Add spin keyframe if needed
      if (!document.getElementById('diagSpinStyle')) {
        const ss = document.createElement('style');
        ss.id = 'diagSpinStyle';
        ss.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(ss);
      }

      // ── Recopilar datos del formulario ──
      const country = document.getElementById('diag-country');
      const name = document.getElementById('diag-name');
      const email = document.getElementById('diag-email');
      const phone = document.getElementById('diag-phone');
      const company = document.getElementById('diag-company');
      const ventasChecked = document.querySelector('input[name="ventas"]:checked');
      const facturacionChecked = document.querySelector('input[name="facturacion"]:checked');
      const stageChecked = document.querySelector('input[name="etapa"]:checked');
      const implementarChecked = document.querySelector('input[name="implementar"]:checked');
      const tiempoChecked = document.querySelector('input[name="tiempo"]:checked');
      const gestion = document.getElementById('diag-gestion');

      const selectedCountry = country.options[country.selectedIndex];
      const dialCode = selectedCountry?.getAttribute('data-dial') || '';
      const countryLabel = selectedCountry?.textContent?.trim() || country.value;

      // Obtener el texto de las herramientas seleccionadas
      const problemas = [...document.querySelectorAll('input[name="problema"]:checked')].map(cb => {
        const span = cb.parentElement.querySelector('span');
        return span ? span.textContent.replace(/\s+/g, ' ').trim() : cb.value;
      });

      const herramientas = [...document.querySelectorAll('input[name="herramientas"]:checked')].map(cb => {
        const span = cb.parentElement.querySelector('span');
        return span ? span.textContent.replace(/\s+/g, ' ').trim() : cb.value;
      });

      // Obtener el texto de ventas
      let ventasLabel = '';
      if (ventasChecked) {
        const span = ventasChecked.parentElement.querySelector('span');
        ventasLabel = span ? span.textContent.replace(/\s+/g, ' ').trim() : ventasChecked.value;
      }

      // Obtener el texto de facturación
      let facturacionLabel = '';
      if (facturacionChecked) {
        const span = facturacionChecked.parentElement.querySelector('span');
        facturacionLabel = span ? span.textContent.replace(/\s+/g, ' ').trim() : facturacionChecked.value;
      }

      // Obtener el texto de etapa
      let stageLabel = '';
      if (stageChecked) {
        const span = stageChecked.parentElement.querySelector('span');
        stageLabel = span ? span.textContent.replace(/\s+/g, ' ').trim() : stageChecked.value;
      }

      // Obtener el texto de implementar
      let implementarLabel = '';
      if (implementarChecked) {
        const span = implementarChecked.parentElement.querySelector('span');
        implementarLabel = span ? span.textContent.replace(/\s+/g, ' ').trim() : implementarChecked.value;
      }

      // Obtener el texto de tiempo
      let tiempoLabel = '';
      if (tiempoChecked) {
        const span = tiempoChecked.parentElement.querySelector('span');
        tiempoLabel = span ? span.textContent.replace(/\s+/g, ' ').trim() : tiempoChecked.value;
      }

      const payload = {
        // ── Paso 1: Contacto ──
        pais: country.value,
        pais_nombre: countryLabel,
        nombre: name.value.trim(),
        email: email.value.trim(),
        telefono: `${dialCode}${phone.value.replace(/\s/g, '')}`,
        tienda: company ? company.value.trim() : '',

        // ── Paso 2: Negocio ──
        tienda_vendiendo: ventasLabel,
        facturacion_mensual: facturacionLabel,
        problemas_principales: problemas,
        herramientas_actuales: herramientas,

        // ── Paso 3: Preferencias ──
        etapa_actual: stageLabel,
        dispuesto_implementar: implementarLabel,
        tiempo_implementacion: tiempoLabel,
        gestion_clientes: gestion ? gestion.value.trim() : '',

        // ── Metadatos ──
        fecha_envio: new Date().toISOString(),
        origen: window.location.href
      };

      // ── Enviar POST al webhook de n8n ──
      const WEBHOOK_URL = '/.netlify/functions/webhook-proxy';

      fetch(WEBHOOK_URL, { 
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      })
        .then(async res => {
          if (!res.ok) {
            const errorText = await res.text().catch(() => '');
            throw new Error(`HTTP ${res.status} ${res.statusText} - ${errorText}`);
          }
          return res.json();
        })
        .then(result => {
          
          // Restaurar botón
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Enviar solicitud <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
          
          // Mostrar resultado en el contenedor
          const resultMessage = document.getElementById('diagResultMessage');
          if (resultMessage) {
            if (result.success === true) {
              // El webhook procesó correctamente
              if (result.califica === true) {
                // Califica: mostrar mensaje positivo
                resultMessage.textContent = result.mensaje || '¡Felicidades! Calificas para nuestra oferta.';
                resultMessage.className = 'diag-result-message diag-result-message--success';
                
                // Mostrar botón de agendar
                const agendarContainer = document.createElement('div');
                agendarContainer.className = 'diag-agendar-container';
                
                const agendarBtn = document.createElement('button');
                agendarBtn.type = 'button';
                agendarBtn.className = 'btn btn-primary btn-lg diag-agendar-btn';
                agendarBtn.textContent = 'Agendar diagnóstico';
                agendarBtn.addEventListener('click', () => {
                  // Mostrar Calendly
                  document.getElementById('diagStep3').classList.add('diag-step--hidden');
                  document.getElementById('diagSuccess').classList.add('diag-step--hidden');
                  const calendlySection = document.getElementById('diagCalendlySection');
                  calendlySection.classList.remove('diag-step--hidden');
                  progressBar.style.width = '100%';
                  // Obtener nombre y email del formulario
                  const nameInput = document.getElementById('diag-name');
                  const emailInput = document.getElementById('diag-email');
                  showCalendly(nameInput.value.trim(), emailInput.value.trim());
                });
                
                agendarContainer.appendChild(agendarBtn);
                resultMessage.appendChild(agendarContainer);
              } else {
                // No califica: mostrar mensaje empático
                resultMessage.textContent = result.mensaje || 'Gracias por tu interés. En este momento no cumples con los requisitos para nuestra oferta.';
                resultMessage.className = 'diag-result-message diag-result-message--error';
              }
            } else {
              // El webhook devolvió success: false
              resultMessage.textContent = result.mensaje || 'No fue procesado tu formulario. Por favor, intenta de nuevo.';
              resultMessage.className = 'diag-result-message diag-result-message--error';
            }
          }
          
          // Ocultar paso 3 y Calendly
          document.getElementById('diagStep3').classList.add('diag-step--hidden');
          document.getElementById('diagSuccess').classList.add('diag-step--hidden');
          document.getElementById('diagCalendlySection').classList.add('diag-step--hidden');
        })
        .catch(err => {
          // Error en el envío
          console.error('Webhook error:', err);
          console.error('Error details:', err.message, err.stack);
          
          // Restaurar botón
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Enviar solicitud <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
          
          // Mostrar mensaje de error
          const resultMessage = document.getElementById('diagResultMessage');
          if (resultMessage) {
            resultMessage.textContent = 'Error al enviar el formulario, intenta nuevamente.';
            resultMessage.className = 'diag-result-message diag-result-message--error';
          }
        });
    });
  }

  // ─ Event: Close from success screen ─
  if (closeSuccess) closeSuccess.addEventListener('click', closeModal);

  /* ─── WHATSAPP FLOATING BUTTON: hide when CTA WA is visible ─── */
  const waFloat = document.getElementById('waFloat');
  const finalWaBtn = document.getElementById('final-cta-wa');

  if (waFloat && finalWaBtn) {
    const waObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          waFloat.classList.add('wa-float--hidden');
        } else {
          waFloat.classList.remove('wa-float--hidden');
        }
      });
    }, { threshold: 0.3 });

    waObserver.observe(finalWaBtn);
  }

  /* ─── URGENCY BAR VISIBILITY ─── */
  const urgencyBar = document.getElementById('urgencyBar');
  const finalSection = document.getElementById('aplicar');
  if (urgencyBar && finalSection) {
    const urgencyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          urgencyBar.classList.add('urgency-bar--hidden');
        } else {
          urgencyBar.classList.remove('urgency-bar--hidden');
        }
      });
    }, { threshold: 0.4 });

    urgencyObserver.observe(finalSection);
  }

  /* ─── HERO TYPEWRITER ─── */
  const heroTypeTitle = document.getElementById('heroTypeTitle');
  if (heroTypeTitle) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fullTitle = heroTypeTitle.textContent.trim();
    if (!prefersReduced) {
      let titleIndex = 0;
      heroTypeTitle.textContent = '';
      const typeTitle = () => {
        if (titleIndex <= fullTitle.length) {
          heroTypeTitle.textContent = fullTitle.slice(0, titleIndex);
          titleIndex += 1;
          setTimeout(typeTitle, 45);
        }
      };
      typeTitle();
    }
  }

  const typewriterEl = document.getElementById('hero-typewriter');
  if (typewriterEl) {
    const phrases = [
      'operar sin planillas eternas',
      'responder en minutos y no en horas',
      'tomar decisiones con datos vivos',
      'escalar con control y seguimiento'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 55;   // ms por carácter al escribir
    const DELETING_SPEED = 28;   // ms por carácter al borrar
    const PAUSE_AFTER = 2200; // ms de pausa al terminar de escribir
    const PAUSE_BEFORE = 350;  // ms de pausa antes de empezar a borrar

    function tick() {
      const current = phrases[phraseIndex];

      if (!isDeleting) {
        // Escribiendo
        charIndex++;
        typewriterEl.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          // Terminó de escribir → esperar y luego borrar
          isDeleting = true;
          setTimeout(tick, PAUSE_AFTER);
          return;
        }
        setTimeout(tick, TYPING_SPEED);
      } else {
        // Borrando
        charIndex--;
        typewriterEl.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          // Terminó de borrar → siguiente frase
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, PAUSE_BEFORE);
          return;
        }
        setTimeout(tick, DELETING_SPEED);
      }
    }

  // Arrancar casi de inmediato
  setTimeout(tick, 400);
  }

  /* ─── SECTION TYPING ON SCROLL ─── */
  function initScrollTyping() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const selectors = ['.section-title', '.mockup-headline h3'];
    const targets = selectors.reduce((acc, sel) => {
      const found = document.querySelectorAll(sel);
      if (found.length) acc.push(...found);
      return acc;
    }, []);
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startTyping(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.65, rootMargin: '0px 0px -10% 0px' });

    targets.forEach(el => {
      if (!el.textContent.trim()) return;
      el.dataset.typingFull = el.textContent.trim();
      el.dataset.typingDone = 'false';
      el.textContent = '';
      el.classList.add('typing-waiting');
      observer.observe(el);
    });

    function startTyping(el) {
      if (el.dataset.typingDone === 'true') return;
      el.dataset.typingDone = 'true';
      el.classList.add('typing-active');
      const full = el.dataset.typingFull || '';
      const speed = Number(el.dataset.typingSpeed) || 38;
      let index = 0;

      const step = () => {
        el.textContent = full.slice(0, index);
        index += 1;
        if (index <= full.length) {
          setTimeout(step, speed);
        } else {
          el.classList.remove('typing-active');
          el.classList.add('typing-complete');
        }
      };

      step();
    }
  }

  initScrollTyping();

  
  /* ─── PREMIUM MICRO-ANIMATIONS (anime.js createAnimatable) ─── */
  function initMicroAnimations() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof anime === 'undefined') return;

    // Animate diagnostic system card badge pulse
    const dscBadge = document.querySelector('.dsc-header');
    if (dscBadge) {
      anime({
        targets: '.pulse-dot',
        scale: [1, 1.3, 1],
        opacity: [1, 0.6, 1],
        duration: 2000,
        easing: 'easeInOutQuad',
        loop: true
      });
    }

    // Subtle rotation on paradigm icons on hover
    const paradigmCards = document.querySelectorAll('.paradigm-card');
    paradigmCards.forEach(card => {
      const icon = card.querySelector('.paradigm-icon svg');
      if (icon) {
        card.addEventListener('mouseenter', () => {
          anime({
            targets: icon,
            rotate: 10,
            scale: 1.1,
            duration: 300,
            easing: 'easeOutQuad'
          });
        });
        card.addEventListener('mouseleave', () => {
          anime({
            targets: icon,
            rotate: 0,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
          });
        });
      }
    });

    // Animate method step icons on hover
    const methodSteps = document.querySelectorAll('.method-step');
    methodSteps.forEach(step => {
      const icon = step.querySelector('.method-icon-wrap svg');
      if (icon) {
        step.addEventListener('mouseenter', () => {
          anime({
            targets: icon,
            translateY: -2,
            duration: 250,
            easing: 'easeOutQuad'
          });
        });
        step.addEventListener('mouseleave', () => {
          anime({
            targets: icon,
            translateY: 0,
            duration: 250,
            easing: 'easeOutQuad'
          });
        });
      }
    });
  }

  /* ─── FAQ SPARKLE EFFECT ─── */
  function initFaqSparkle() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      item.addEventListener('mouseenter', function(e) {
        // Create sparkle elements
        for (let i = 0; i < 3; i++) {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle';
          sparkle.style.left = `${Math.random() * 100}%`;
          sparkle.style.top = `${Math.random() * 100}%`;
          sparkle.style.animationDelay = `${i * 0.1}s`;
          this.appendChild(sparkle);

          // Remove sparkle after animation
          setTimeout(() => {
            sparkle.remove();
          }, 600);
        }
      });
    });
  }

  initFaqSparkle();

  initMicroAnimations();

});
