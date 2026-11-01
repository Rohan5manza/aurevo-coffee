(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const config = window.AUREVO_CONFIG || {};
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const progress = $('#reading-progress');
  const section = $('.pour-section');
  const waterStream = $('#water-stream');
  const coffeeStream = $('#coffee-stream');
  const coffeeFill = $('#coffee-fill');
  const pourCaption = $('#pour-caption');
  const steam = $$('.steam');
  const year = $('#year');
  const clamp = (x) => Math.max(0, Math.min(1, x));
  let ticking = false;

  function updateScroll() {
    const full = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.width = `${clamp(window.scrollY / full) * 100}%`;
    if (section) {
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const p = clamp(-bounds.top / travel);
      const water = clamp((p - .08) / .20);
      const drop = clamp((p - .12) / .28);
      const fill = clamp((p - .40) / .48);
      waterStream.style.height = `${water * 116}px`;
      waterStream.style.opacity = water > .01 ? '1' : '0';
      coffeeStream.style.height = `${drop * 62}px`;
      coffeeStream.style.opacity = drop > .01 ? '1' : '0';
      coffeeFill.style.height = `${fill * 94}%`;
      steam.forEach(el => el.style.opacity = fill > .3 ? String(Math.min(.55, (fill - .3) * 1.2)) : '0');
      pourCaption.textContent = p < .12 ? 'PREPARE THE POUR' : p < .40 ? 'BLOOM THE GROUNDS' : p < .88 ? 'SLOWLY, INTO SOMETHING BOLD' : 'THE PERFECT POUR';
      if (reducedMotion.matches) {
        waterStream.style.height = p > .3 ? '116px' : '0px';
        coffeeStream.style.height = p > .3 ? '62px' : '0px';
        coffeeFill.style.height = p > .55 ? '75%' : '0px';
      }
    }
    ticking = false;
  }
  function scheduleScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScroll);
  }
  addEventListener('scroll', scheduleScroll, {passive:true});
  addEventListener('resize', scheduleScroll);
  reducedMotion.addEventListener?.('change', scheduleScroll);
  updateScroll();
  if (year) year.textContent = String(new Date().getFullYear());

  const menu = $('#menu-toggle');
  const nav = $('#main-nav');
  function closeNav() {nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');menu.setAttribute('aria-label', 'Open navigation menu');}
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });
  $$('#main-nav a').forEach(el => el.addEventListener('click', closeNav));
  addEventListener('keydown', e => {if(e.key === 'Escape') closeNav();});
  addEventListener('resize', () => {if(innerWidth > 960) closeNav();});

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('js-reveal');
    const reveal = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) if (entry.isIntersecting) {entry.target.classList.add('in-view'); observer.unobserve(entry.target);}
    }, {threshold:.12});
    $$('[data-reveal]').forEach(el => reveal.observe(el));
  }

  const dialog = $('#info-dialog');
  const dialogTitle = $('#dialog-title');
  const dialogCopy = $('#dialog-copy');
  $('#dialog-close').addEventListener('click', () => dialog.close());
  $('#dialog-ok').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {if (e.target === dialog) dialog.close();});
  function showInfo(title, message) {
    dialogTitle.textContent = title;
    dialogCopy.textContent = message;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else alert(`${title}\n\n${message}`);
  }
  function safeHttps(raw) {
    try { const url = new URL(raw); return url.protocol === 'https:' ? url.href : ''; }
    catch { return ''; }
  }

  $$('[data-order-form]').forEach(el => {
    const url = safeHttps(config.orderFormUrl);
    if(url) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.addEventListener('click', event => {
        event.preventDefault();
        showInfo('Orders opening soon.', 'Our Google order-interest form is being prepared. No payment is being collected on this website yet. Follow AUREVO for launch updates.');
      });
    }
  });
  $$('[data-instagram]').forEach(el => {
    const url = safeHttps(config.instagramUrl);
    if (url) {el.href = url; el.target = '_blank'; el.rel = 'noopener noreferrer';}
    else el.addEventListener('click', e => {e.preventDefault();showInfo('Find us soon.', 'Our Instagram link will appear here as soon as it is connected.');});
  });
  $$('[data-email]').forEach(el => {
    const email = typeof config.contactEmail === 'string' ? config.contactEmail.trim() : '';
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) el.href = `mailto:${email}?subject=${encodeURIComponent('Hello AUREVO')}`;
    else el.addEventListener('click', e => {e.preventDefault();showInfo('Say hello soon.', 'Our contact email will be available here as soon as it is connected.');});
  });
})();
