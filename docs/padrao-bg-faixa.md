# Padrão estética premium — fundo atmosférico e faixa sinuosa

Aprovado pela cliente desenvolvedora em 27/11/2026 na prévia Thaís Moreira. Referência exata: commit `7490082a2ecf65cf6e679a7b7ae1070fe2db1fc0`. Preservar como padrão para futuras prévias, adaptando apenas a paleta à identidade de cada profissional. Não alterar a geometria da faixa, seu posicionamento relativo à hero, nem a escala sem revisão visual.

## CSS aprovado

```css
.hero{position:relative;isolation:isolate;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center;gap:clamp(30px,4vw,64px);min-height:620px;padding:42px var(--gutter) 0;color:var(--cream);background:radial-gradient(ellipse at 12% 44%,#291a15 0%,#291a15de 25%,#38231c90 47%,transparent 72%),radial-gradient(ellipse at 81% 55%,#d09b6b78 0%,#b97e4945 30%,transparent 62%),linear-gradient(177deg,#21140f 0%,#38231c 27%,#71472f 57%,#b78050 79%,#dfc4a4 93%,#faf7f2 100%);overflow:hidden}
.hero::after{content:"";position:absolute;inset:0;z-index:-2;pointer-events:none;opacity:.55;background:
radial-gradient(circle at 8% 15%,#f7dfbf88 0 1px,transparent 2.5px),
radial-gradient(circle at 19% 8%,#e9c29455 0 1px,transparent 2px),
radial-gradient(circle at 34% 23%,#ffe5c477 0 1px,transparent 3px),
radial-gradient(circle at 46% 12%,#e9c29488 0 1px,transparent 2.5px),
radial-gradient(circle at 57% 30%,#ffe5c455 0 1px,transparent 3px),
radial-gradient(circle at 64% 9%,#e9c29477 0 1px,transparent 2px),
radial-gradient(circle at 72% 21%,#ffe5c466 0 1px,transparent 2.5px),
radial-gradient(circle at 86% 12%,#f7dfbf88 0 1px,transparent 3px),
radial-gradient(circle at 94% 33%,#e9c29477 0 1px,transparent 2.5px),
radial-gradient(circle at 91% 48%,#ffe5c477 0 1px,transparent 3px),
radial-gradient(circle at 52% 6%,#f7dfbf55 0 1px,transparent 2px),
radial-gradient(circle at 98% 15%,#f7dfbf55 0 1px,transparent 2px)}
.ribbon{--ribbon-height:clamp(108px,11.111vw,200px);position:relative;z-index:5;width:100%;height:var(--ribbon-height);margin:calc(var(--ribbon-height) * -.73) 0 calc(var(--ribbon-height) * -.27);overflow:hidden;pointer-events:none}
.ribbon svg{display:block;width:100%;height:100%;filter:drop-shadow(0 5px 4px #291a1533)}
.ribbon text{font-family:var(--body);font-weight:600;white-space:pre}
@media(max-width:950px){.hero{min-height:530px}}
@media(max-width:700px){
.hero{grid-template-columns:minmax(0,1fr);gap:10px;min-height:0;padding-top:46px;padding-bottom:0}
.ribbon{--ribbon-height:108px}
.ribbon svg{width:100%;height:100%}
.hero{background:radial-gradient(ellipse at 25% 18%,#291a15aa,transparent 60%),radial-gradient(ellipse at 80% 72%,#d09b6b80,transparent 55%),linear-gradient(176deg,#21140f 0%,#38231c 40%,#71472f 65%,#bf8956 86%,#ead8c1 97%,#faf7f2 100%)}
}
```

A hero depende também das regras de dimensionamento do retrato e do conteúdo em style.css no commit de referência. A faixa deve permanecer imediatamente após a hero, acima das duas seções, sem sobrepor o CTA. A esquerda foi baixada de propósito; não voltar às curvas antigas. Manter `preserveAspectRatio="xMidYMid slice"` para evitar deformação.

## SVG exato

```html
<div class="ribbon" aria-hidden="true"><svg viewBox="0 0 1440 160" preserveAspectRatio="xMidYMid slice"><defs><path id="wave" d="M-40 134 C210 90 460 84 720 100 C980 142 1230 142 1480 80"/></defs><path d="M-40 110 C210 66 460 60 720 76 C980 118 1230 118 1480 56 L1480 104 C1230 166 980 166 720 124 C460 108 210 114 -40 158 Z" fill="#bf8956"/><text fill="#38231c" font-size="18" letter-spacing="2.4" dy="6"><textPath href="#wave" startOffset="0" id="ribbonText">ESTÉTICA ✦ AUTOCUIDADO ✦ PROTOCOLOS PERSONALIZADOS ✦ ESTÉTICA ✦ AUTOCUIDADO ✦ PROTOCOLOS PERSONALIZADOS ✦ ESTÉTICA ✦ AUTOCUIDADO ✦ PROTOCOLOS PERSONALIZADOS ✦</textPath></text></svg></div>
```

## Animação da faixa (JS)

```js
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

```

Usar uma única vez por página. Manter a pausa quando fora da área visível e respeitar prefers-reduced-motion. O código original completo permanece no commit de referência. 
