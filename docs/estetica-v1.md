# estetica-v1 — Prompt mestre de landing page Estética Premium

Versão 1 • 27/11/2026 • Referência visual aprovada: Thaís Moreira.

## 1. Objetivo
Desenvolver landing page institucional premium para clínicas e profissionais de estética, com identidade personalizada, composição editorial, profundidade, formas orgânicas e animações sofisticadas. Evitar aparência genérica de template ou IA.
Referências:
- https://taisgb.github.io/thais-moreira-previa/
- https://github.com/taisgb/thais-moreira-previa/tree/7490082a2ecf65cf6e679a7b7ae1070fe2db1fc0 — implementação definitiva aprovada.
- https://nuvea-template.modulify.website/ — inspiração complementar de movimento, sem copiar layout.

## 2. Direção visual
Estética feminina, contemporânea, sensorial e elegante; composição assimétrica; formas sinuosas; camadas, sombras, gradientes e sobreposições; alternância de seções claras e escuras. Botões pill sem setas decorativas. Evitar excesso de ornamentos, ícones genéricos e repetição. Adaptar paleta à identidade da profissional, preservando composição da hero e faixa.

## 3. Tipografia
Bodoni Moda para títulos, chamadas editoriais e itálicos; Albert Sans para corpo, navegação e botões. Escala fluida com clamp(), contraste e hierarquia.

## 4. Navbar
Sticky no topo, logo e identificação à esquerda, navegação à direita, CTA pill, fundo escuro translúcido com backdrop-filter: blur(12px), hambúrguer responsivo, compensação de âncoras e z-index superior à faixa.

## 5. Hero
Full width, duas colunas no desktop. Esquerda: eyebrow especialidade/localização, título editorial com segunda parte em itálico e destaque, texto curto e CTA WhatsApp. Preservar espaço inferior do CTA. Direita: retrato profissional transparente, proporções originais, ancorado na base, moldura orgânica e halo luminoso atrás. A faixa integra a base do retrato.
Reutilizar as regras exatas da referência:
```css
.hero h1 em{color:#e7c39e}
.hero{position:relative;isolation:isolate;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center;gap:clamp(30px,4vw,64px);min-height:620px;padding:42px var(--gutter) 0;color:var(--cream);background:radial-gradient(ellipse at 12% 44%,#291a15 0%,#291a15de 25%,#38231c90 47%,transparent 72%),radial-gradient(ellipse at 81% 55%,#d09b6b78 0%,#b97e4945 30%,transparent 62%),linear-gradient(177deg,#21140f 0%,#38231c 27%,#71472f 57%,#b78050 79%,#dfc4a4 93%,#faf7f2 100%);overflow:hidden}
.hero>div{position:relative;z-index:2;max-width:100%;min-width:0;padding:35px 0 94px}
.hero h1{font-size:clamp(44px,4.3vw,72px);margin-bottom:22px;overflow-wrap:normal;text-wrap:balance}
.hero h1 em{display:block;font-size:.92em;line-height:1.12;text-wrap:balance}
.hero p:not(.eyebrow){max-width:48ch;color:#f0e4d6}
.hero::before{content:"";position:absolute;z-index:-1;right:calc(var(--gutter) + 4px);top:7%;bottom:8%;width:min(34%,570px);border-radius:49% 49% 16% 16%;border:1px solid #e7d4bb60;background:radial-gradient(ellipse at 55% 43%,#c58e6060,transparent 70%);box-shadow:0 0 0 12px #e7d4bb08}
.hero>img{align-self:end;justify-self:center;width:100%;height:clamp(490px,46vw,680px);object-fit:contain;object-position:center bottom;filter:drop-shadow(0 12px 18px #160b0830)}
```
## 6–10. Background, moldura, faixa e responsividade
O fundo atmosférico deve ter topo escuro, esquerda escurecida para contraste, halo luminoso à direita, transição clara na base e partículas discretas. Criar em CSS, sem imagem. Adaptar somente cores. A moldura orgânica usa ::before; partículas usam ::after.
A faixa é SVG preenchido, full width, imediatamente após a hero, sobreposta à base e à seção seguinte; curva esquerda propositalmente rebaixada. Não deformar, não cobrir CTA, não criar gap ou overflow. Manter espessura, geometria, margens, escala e preserveAspectRatio="xMidYMid slice". Não usar preserveAspectRatio="none", largura artificial de 190% ou stroke grosso. Alterar apenas cores e frase. Animar somente o texto com startOffset, medir frase, repetir continuamente, velocidade .055 unidades/ms, pausar fora da viewport e em aba inativa, respeitar movimento reduzido.
Regras responsivas adicionais do retrato:
```css
@media(max-width:950px){.hero>img{height:480px}}
@media(max-width:700px){
.hero>div{padding:0 0 12px}
.hero h1{font-size:clamp(40px,10vw,56px);margin-bottom:18px}
.hero::before{top:auto;bottom:26px;height:clamp(295px,87vw,415px);width:72%;right:14%;border-radius:49% 49% 15% 15%}
.hero>img{width:100%;height:clamp(320px,103vw,450px);object-fit:contain;object-position:center bottom}
}
```


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


## 11. Linguagem de movimento
Text reveal de títulos, mask reveal de fotos, stagger dos cards, parallax discreto, animações de rolagem, microinterações e efeito magnético sutil no desktop. Usar transform, translate, scale, opacity, clip-path, IntersectionObserver e cubic-bezier(0.22,1,0.36,1). Evitar movimentos exagerados e dependências pesadas. Conteúdo visível sem JS.

## 12. Estrutura
Hero; faixa sinuosa; procedimentos e especialidades; método próprio ou diferencial; sobre a profissional; galeria de resultados apenas quando autorizada; clínica e espaço de atendimento; FAQ; redes sociais; CTA final; rodapé; WhatsApp flutuante. Cards com profundidade, formas orgânicas e movimento. Clínica com foto principal maior e foto secundária sobreposta.

## 13. Copy e SEO
Somente informações fornecidas ou verificadas; não inventar credenciais, promessas, resultados, números ou depoimentos. Textos personalizados, valorizar diferenciais reais, CTAs estratégicos e mensagens WhatsApp contextualizadas. HTML semântico, title, meta description, Open Graph, alt, SEO local. Noindex enquanto prévia não oficial.

## 14. Requisitos técnicos
HTML5, CSS3 e JS puro. Imagens WebP ou formato adequado à transparência; lazy loading abaixo da dobra; prioridade na hero; CSS sem conflitos; sem scroll lateral ou imagens quebradas; acessibilidade e movimento reduzido; versionar recursos estáticos; agrupar alterações em um commit.

## 15. Validação obrigatória
Conferir renderização real, preferencialmente Playwright, em desktop, tablet e mobile. Verificar curva esquerda, visibilidade do CTA, integração retrato/faixa, contraste, continuidade do texto animado, ausência de deformação/gaps/overflow, menu fixo e links. Commit não equivale a validação visual.

**Preservar a hero, o fundo atmosférico e a geometria e posição aprovadas da faixa. Adaptar identidade visual sem descaracterizar a composição.**