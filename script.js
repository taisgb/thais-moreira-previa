/* Navegação, faixa editorial e animações de entrada. */
(() => {
  const menu = document.querySelector('#menu');
  const nav = document.querySelector('#nav');
  if (menu && nav) {
    const close = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click',close));
    document.addEventListener('keydown', e => { if(e.key==='Escape') close(); });
  }
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const rt = document.querySelector('#ribbonText');
  if (rt && !motion.matches) {
    const phrase = 'ESTÉTICA ✦ AUTOCUIDADO ✦ PROTOCOLOS PERSONALIZADOS ✦ ';
    const ribbon = rt.closest('.ribbon');
    const svg = rt.ownerSVGElement;
    const parent = rt.parentNode;
    const measure = document.createElementNS('http://www.w3.org/2000/svg','text');
    measure.setAttribute('visibility','hidden');
    measure.setAttribute('xml:space','preserve');
    measure.textContent = phrase;
    svg.append(measure);
    let width = 0, offset = 0, previous = null, frame = 0, inView = true;
    const measureWidth = () => {
      const style = getComputedStyle(parent);
      ['font-family','font-size','font-weight','letter-spacing'].forEach(p => measure.style.setProperty(p,style.getPropertyValue(p)));
      width = measure.getComputedTextLength();
      if (!Number.isFinite(width) || width <= 0) width = 700;
      rt.textContent = phrase.repeat(Math.ceil(1600 / width) + 4);
      offset %= width;
    };
    const tick = (now) => {
      frame = 0;
      if (motion.matches || document.hidden || !inView) { previous = null; return; }
      if(previous !== null) offset = (offset + Math.min(now - previous,64) * .055) % width;
      previous = now;
      rt.setAttribute('startOffset', String(-offset));
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0; previous = null;
      if (motion.matches) { rt.setAttribute('startOffset','0'); return; }
      if (!document.hidden && inView) frame = requestAnimationFrame(tick);
    };
    measureWidth(); sync();
    if(document.fonts) document.fonts.ready.then(measureWidth).catch(()=>{});
    document.addEventListener('visibilitychange',sync);
    motion.addEventListener?.('change',sync);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, {rootMargin:'80px'}).observe(ribbon);
    }
  }
  // Reveal individual elements once, without hiding content before JS loads.
  if (!motion.matches && 'IntersectionObserver' in window) {
    const groups = [
      ['#cuidados > .eyebrow, #cuidados > h2, #cuidados > p:not(.eyebrow)', 'motion-title', 55],
      ['.services article', '', 75],
      ['#metodo .method-copy > .eyebrow, #metodo .method-copy > h2, #metodo .method-copy > p:not(.eyebrow), #metodo .method-copy > .pill', 'motion-title', 55],
      ['#metodo .method-panel', '', 0],
      ['#metodo .method-points > span', 'motion-step', 90],
      ['#sobre > img', 'motion-photo', 0],
      ['#sobre > div > .eyebrow, #sobre > div > h2, #sobre > div > p:not(.eyebrow), #sobre > div > .pill', 'motion-title', 55],
      ['#espaco .space-copy', '', 0],
      ['#espaco .space-photos > img', 'motion-photo', 110],
      ['#faq .faq-layout > div:first-child', '', 0],
      ['#faq details', '', 55],
      ['#redes .social-visual, #redes .social-layout > div:last-child', '', 100],
      ['#contato .contact-inner > h2, #contato .contact-inner > p:not(.eyebrow), #contato .contact-inner > .pill', 'motion-title', 65]
    ];
    const mobile = matchMedia('(max-width:700px)').matches;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (!motion.matches && !el.hidden) el.classList.add('motion-enter');
        observer.unobserve(el);
      });
    }, {threshold:.12});
    groups.forEach(([selector,type,step]) => {
      document.querySelectorAll(selector).forEach((el,i) => {
        // Never clip body copy, interactive controls, or the FAQ.
        if(type && (type !== 'motion-title' || /^H[1-6]$/.test(el.tagName))) el.classList.add(type);
        el.style.setProperty('--motion-delay', String(mobile ? 0 : Math.min((i % 3)*step,160))+'ms');
        observer.observe(el);
      });
    });
  }
  // Very small pointer-follow effect, desktop only; touch and keyboard stay native.
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  if (fine.matches && !motion.matches) {
    document.querySelectorAll('.pill').forEach(button => {
      const reset = () => {
        button.style.removeProperty('--magnet-x');
        button.style.removeProperty('--magnet-y');
      };
      button.addEventListener('pointermove', e => {
        if (motion.matches || !fine.matches) { reset(); return; }
        const box = button.getBoundingClientRect();
        const x = Math.max(-3, Math.min(3, (e.clientX-box.left-box.width/2)*.055));
        const y = Math.max(-2, Math.min(2, (e.clientY-box.top-box.height/2)*.07));
        button.style.setProperty('--magnet-x',x.toFixed(1)+'px');
        button.style.setProperty('--magnet-y',y.toFixed(1)+'px');
      }, {passive:true});
      button.addEventListener('pointerleave',reset);
      button.addEventListener('blur',reset);
      motion.addEventListener?.('change',reset);
    });
  }
})();
