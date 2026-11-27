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
  if (!motion.matches && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.reveal, #cuidados > h2, #metodo .method-copy, #metodo .method-panel, #sobre > *, #espaco .space-copy, #espaco .space-photos, #faq .faq-layout > *, #redes .social-layout > *, #contato .contact-inner');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-enter');
        observer.unobserve(entry.target);
      });
    }, {threshold: .08});
    targets.forEach(el => observer.observe(el));
  }
})();
