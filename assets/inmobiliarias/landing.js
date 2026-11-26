'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const settings = window.EBEATS;
  if (!settings) return;

  const trackedUtmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  const campaign = readCampaign();
  const { offer } = settings;
  const [minDays, maxDays] = offer.deliveryDays;

  function write(selector, content) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = content;
    });
  }

  function readCampaign() {
    const params = new URLSearchParams(window.location.search);
    const current = Object.fromEntries(trackedUtmKeys.flatMap((key) => {
      const value = params.get(key)?.trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, 180);
      return value ? [[key, value]] : [];
    }));

    try {
      if (Object.keys(current).length) {
        sessionStorage.setItem('ebeats:campaign', JSON.stringify(current));
      } else {
        const stored = JSON.parse(sessionStorage.getItem('ebeats:campaign') || '{}') || {};
        return Object.fromEntries(trackedUtmKeys
          .filter((key) => typeof stored[key] === 'string')
          .map((key) => [key, stored[key]]));
      }
    } catch {
      // La atribución de la visita actual funciona aunque el navegador bloquee el almacenamiento.
    }
    return current;
  }

  function whatsappLink(number, message) {
    const digits = number.replace(/\D/g, '');
    if (!/^[1-9][0-9]{7,14}$/.test(digits)) return '';

    const attribution = Object.entries(campaign).map(([key, value]) => `${key}=${value}`).join(' · ');
    const text = attribution ? `${message}\n\nReferencia: ${attribution}` : message;
    return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
  }

  function bindLink(link, url, isWhatsApp = false) {
    if (!url) return;
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (isWhatsApp) link.addEventListener('click', () => track('Contact'));
  }

  function track(event) {
    window.fbq?.('track', event);
  }

  function loadPixel(id) {
    if (!/^\d{5,25}$/.test(id)) return;

    if (!window.fbq) {
      const pixel = (...args) => {
        if (pixel.callMethod) pixel.callMethod(...args);
        else pixel.queue.push(args);
      };
      pixel.push = pixel;
      pixel.loaded = true;
      pixel.version = '2.0';
      pixel.queue = [];
      window.fbq = window._fbq = pixel;

      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.async = true;
      document.head.append(script);
    }
    window.fbq('init', id);
    track('ViewContent');
  }

  function renderPlans() {
    const container = document.querySelector('[data-plans]');
    if (!container) return;
    const template = document.querySelector('#plan-template');

    offer.plans.forEach((plan) => {
      const card = template.content.firstElementChild.cloneNode(true);
      const button = card.querySelector('.button');
      const features = card.querySelector('.plan-features');
      const catalogue = `Hasta ${plan.catalogueLimit} proyectos o propiedades.`;
      const adjustments = `${offer.adjustmentDays} días de ajustes sin costo.`;

      card.querySelector('h3').textContent = plan.name;
      card.querySelector('.plan-summary').textContent = plan.summary;
      card.classList.toggle('plan--recommended', Boolean(plan.recommended));
      card.querySelector('.plan-recommendation').hidden = !plan.recommended;
      button.classList.toggle('button--primary', Boolean(plan.recommended));

      [catalogue, ...plan.features, adjustments].forEach((feature) => {
        const item = document.createElement('li');
        item.textContent = feature;
        features.append(item);
      });
      container.append(card);
    });
  }

  function initializeDemo() {
    const button = document.querySelector('[data-demo-play]');
    if (!button) return;

    const chat = document.querySelector('#demo-chat');
    const thread = chat.querySelector('.demo-thread');
    const lines = Array.from(thread.children);
    const label = button.querySelector('span');
    const icon = button.querySelector('use');
    const status = chat.querySelector('[data-demo-status]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;

    function finish() {
      window.clearTimeout(timer);
      chat.classList.remove('is-playing');
      label.textContent = 'Reproducir de nuevo';
      icon.setAttribute('href', '/assets/inmobiliarias/icons.svg#replay');
      status.textContent = 'La conversación completa está disponible.';
    }

    function showLine(index) {
      const line = lines[index];
      line.classList.add('is-visible');
      thread.scrollTo({ top: Math.max(0, line.offsetTop + line.offsetHeight - thread.clientHeight + 12), behavior: 'smooth' });
      if (index + 1 < lines.length) timer = window.setTimeout(() => showLine(index + 1), 1100);
      else finish();
    }

    button.hidden = false;
    button.addEventListener('click', () => {
      if (chat.classList.contains('is-playing') || reduceMotion.matches) {
        thread.scrollTo({ top: 0, behavior: 'instant' });
        finish();
        return;
      }
      lines.forEach((line) => line.classList.remove('is-visible'));
      chat.classList.add('is-playing');
      thread.scrollTo({ top: 0, behavior: 'instant' });
      label.textContent = 'Mostrar chat completo';
      status.textContent = 'Reproduciendo la conversación.';
      showLine(0);
    });
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches && chat.classList.contains('is-playing')) finish();
    });
  }

  function initializeVideo(details) {
    const videoUrl = settings.supportVideoUrl;
    if (!details || !videoUrl) return;

    const video = details.querySelector('video');
    const error = details.querySelector('[data-video-error]');
    details.addEventListener('toggle', () => {
      if (details.open && !video.hasAttribute('src')) {
        video.src = videoUrl;
        if (settings.supportVideoCaptions) {
          const captions = document.createElement('track');
          captions.kind = 'captions';
          captions.srclang = 'es';
          captions.label = 'Español';
          captions.src = settings.supportVideoCaptions;
          captions.default = true;
          video.append(captions);
        }
      }
      if (!details.open) video.pause();
    });
    video.addEventListener('error', () => {
      video.hidden = true;
      error.hidden = false;
    });

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      try {
        const response = await fetch(videoUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        details.hidden = !response.ok || !response.headers.get('Content-Type')?.startsWith('video/');
      } catch {
        // El archivo de apoyo es opcional.
      }
    }, { rootMargin: '400px' });
    observer.observe(details.parentElement);
  }

  function initializeQuiz() {
    const quiz = document.querySelector('[data-quiz]');
    if (!quiz) return;

    const questions = [
      {
        label: 'Perfil',
        title: '¿Cuál es tu rol?',
        choices: [
          ['owner', 'Dirijo una inmobiliaria o desarrolladora'],
          ['team', 'Trabajo en un equipo comercial inmobiliario'],
          ['broker', 'Soy corredor inmobiliario independiente'],
          ['other', 'Estoy explorando para otro tipo de negocio']
        ]
      },
      {
        label: 'Catálogo activo',
        title: '¿Cuántas propiedades o proyectos gestionas hoy?',
        choices: [
          ['none', 'Todavía estoy preparando el catálogo'],
          ['small', 'De 1 a 5'],
          ['medium', 'De 6 a 20'],
          ['large', 'Más de 20']
        ]
      },
      {
        label: 'Consultas semanales por WhatsApp',
        title: '¿Cuántas consultas reciben por WhatsApp en una semana?',
        choices: [
          ['low', 'Hasta 10'],
          ['regular', 'De 11 a 30'],
          ['high', 'Más de 30'],
          ['unknown', 'Todavía no lo medimos']
        ]
      },
      {
        label: 'Prioridad',
        title: '¿Qué necesitas mejorar primero?',
        choices: [
          ['reply', 'Responder y calificar las consultas'],
          ['visits', 'Coordinar visitas y recordatorios'],
          ['followup', 'Retomar las conversaciones pendientes'],
          ['overall', 'Revisar todo el proceso comercial']
        ]
      },
      {
        label: 'Plazo',
        title: '¿Cuándo quisieras empezar?',
        choices: [
          ['now', 'Este mes'],
          ['soon', 'En uno a tres meses'],
          ['explore', 'Por ahora estoy evaluando opciones']
        ]
      }
    ];
    const priorities = {
      reply: 'cómo responder y calificar consultas',
      visits: 'cómo coordinar visitas y confirmaciones',
      followup: 'cómo recuperar conversaciones pendientes',
      overall: 'en qué parte del proceso se pierden oportunidades'
    };
    const questionPanel = quiz.querySelector('[data-quiz-question]');
    const resultPanel = quiz.querySelector('[data-quiz-result]');
    const stepLabel = quiz.querySelector('[data-quiz-step]');
    const progress = quiz.querySelector('[data-quiz-progress]');
    const questionTitle = quiz.querySelector('[data-quiz-title]');
    const options = quiz.querySelector('[data-quiz-options]');
    const back = quiz.querySelector('[data-quiz-back]');
    const next = quiz.querySelector('[data-quiz-next]');
    const resultTitle = quiz.querySelector('[data-quiz-result-title]');
    const resultDescription = quiz.querySelector('[data-quiz-result-description]');
    const whatsapp = quiz.querySelector('[data-quiz-whatsapp]');
    const booking = quiz.querySelector('[data-quiz-booking]');
    const answers = Array(questions.length).fill(null);
    let step = 0;
    let leadTracked = false;

    function focusPanel(element) {
      element.focus({ preventScroll: true });
      element.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }

    function showQuestion(moveFocus = false) {
      const question = questions[step];
      questionPanel.hidden = false;
      resultPanel.hidden = true;
      stepLabel.textContent = `Pregunta ${step + 1} de ${questions.length}`;
      progress.max = questions.length;
      progress.value = step + 1;
      questionTitle.textContent = question.title;
      const choices = question.choices.map((choice) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        label.className = 'quiz-option';
        input.type = 'radio';
        input.name = 'respuesta-quiz';
        input.value = choice[0];
        input.checked = answers[step] === choice;
        input.addEventListener('change', () => {
          answers[step] = choice;
          next.disabled = false;
        });
        label.append(input, choice[1]);
        return label;
      });
      options.replaceChildren(...choices);
      back.hidden = step === 0;
      next.disabled = !answers[step];
      next.querySelector('span').textContent = step === questions.length - 1 ? 'Ver mi resultado' : 'Siguiente';
      if (moveFocus) focusPanel(questionTitle);
    }

    function showResult() {
      const [role, inventory, volume, priority, timeline] = answers.map(([key]) => key);
      const hasActiveOperation = role !== 'other' && inventory !== 'none';
      const canStartSoon = ['regular', 'high'].includes(volume) || ['medium', 'large'].includes(inventory);
      let qualification = 'Revisión de proceso';
      let heading = 'Definamos por dónde empezar';
      let description = `Podemos revisar ${priorities[priority]} y qué conviene atender primero con el volumen actual.`;

      if (!hasActiveOperation || timeline === 'explore') {
        qualification = 'Exploración';
        heading = 'Preparemos el siguiente paso';
        description = `Podemos revisar qué necesitas tener listo antes de automatizar y conversar sobre ${priorities[priority]}.`;
      } else if (timeline === 'now' && canStartSoon) {
        qualification = 'Evaluación de implementación';
        heading = 'Tu operación está lista para evaluar la implementación';
        description = `Podemos revisar ${priorities[priority]} y qué haría falta para empezar este mes.`;
      }

      const summary = questions.map((question, index) => `${question.label}: ${answers[index][1]}`);
      const message = [settings.whatsapp.bookingMessage, '', `Perfil del diagnóstico: ${qualification}`, ...summary].join('\n');
      const url = whatsappLink(settings.whatsapp.number, message);
      whatsapp.hidden = !url;
      if (url) bindLink(whatsapp, url);
      resultTitle.textContent = heading;
      resultDescription.textContent = description;
      questionPanel.hidden = true;
      resultPanel.hidden = false;
      leadTracked = false;
      focusPanel(resultTitle);
    }

    function trackLead() {
      if (leadTracked) return;
      leadTracked = true;
      track('Lead');
    }

    back.addEventListener('click', () => {
      step -= 1;
      showQuestion(true);
    });
    next.addEventListener('click', () => {
      if (!answers[step]) return;
      if (step === questions.length - 1) {
        showResult();
        return;
      }
      step += 1;
      showQuestion(true);
    });
    quiz.querySelector('[data-quiz-edit]').addEventListener('click', () => {
      step = 0;
      showQuestion(true);
    });
    whatsapp.addEventListener('click', () => {
      track('Contact');
      trackLead();
    });
    if (settings.bookingUrl) {
      bindLink(booking, settings.bookingUrl);
      booking.hidden = false;
      booking.addEventListener('click', trackLead);
    }

    quiz.hidden = false;
    showQuestion();
    const floatingWhatsapp = document.querySelector('.whatsapp-float');
    if (floatingWhatsapp && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        floatingWhatsapp.toggleAttribute('hidden', entry.isIntersecting);
      });
      observer.observe(quiz);
    }
  }

  write('[data-brand]', settings.brand);
  document.querySelectorAll('a.wordmark').forEach((link) => {
    link.setAttribute('aria-label', `${settings.brand}, inicio`);
  });
  write('[data-offer-name]', offer.name);
  write('[data-headline]', offer.headline);
  write('[data-description]', offer.description);
  write('[data-hero-note]', `Implementación en ${minDays} a ${maxDays} días.`);
  write('[data-step-diagnosis]', `En ${offer.bookingMinutes} minutos revisamos cómo atiendes consultas y agendas visitas, y vemos dónde puede ayudarte el sistema.`);
  write('[data-adjustment-feature]', `Guiamos a tus asesores y damos ${offer.adjustmentDays} días de ajustes sin costo después de la salida en vivo.`);
  write('[data-delivery-terms]', `Salida en vivo en ${minDays} a ${maxDays} días.`);
  write('[data-adjustment-terms]', `${offer.adjustmentDays} días de ajustes sin costo tras la salida en vivo.`);
  write('[data-contact-description]', `Responde cinco preguntas sobre tu operación y solicita un diagnóstico gratuito de ${offer.bookingMinutes} minutos.`);
  write('[data-demo-note]', settings.whatsapp.demoNumber ? 'Se abre el WhatsApp de demostración.' : 'Se abre el WhatsApp comercial para solicitar una prueba.');
  write('[data-privacy-email]', settings.privacyEmail);
  document.querySelectorAll('a[data-privacy-email]').forEach((link) => { link.href = `mailto:${settings.privacyEmail}`; });

  renderPlans();
  document.querySelectorAll('[data-wa]').forEach((link) => {
    const intent = link.dataset.wa;
    const isDemo = intent === 'demo';
    const number = isDemo && settings.whatsapp.demoNumber ? settings.whatsapp.demoNumber : settings.whatsapp.number;
    const message = isDemo ? settings.whatsapp.demoMessage : settings.whatsapp.message;
    bindLink(link, whatsappLink(number, message), true);
  });

  if (settings.proposalUrl) {
    const proposal = document.querySelector('[data-proposal-section]');
    if (proposal) {
      proposal.querySelector('[data-proposal]').href = settings.proposalUrl;
      proposal.hidden = false;
    }
  }

  if (document.querySelector('.hero')) loadPixel(settings.metaPixelId);
  initializeDemo();
  initializeVideo(document.querySelector('[data-support-video]'));
  initializeQuiz();
});
