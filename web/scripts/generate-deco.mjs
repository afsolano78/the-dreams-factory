// Genera las ilustraciones botánicas a línea (eucalipto) como componentes Astro en src/components/deco/.
// Uso: node scripts/generate-deco.mjs
// El dibujo es determinista (semilla fija) para que el resultado no cambie entre ejecuciones.
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = new URL('../src/components/deco/', import.meta.url);
mkdirSync(OUT, { recursive: true });

// Generador pseudoaleatorio con semilla (mulberry32).
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n) => Number(n.toFixed(1));

// Punto y tangente en una bézier cúbica.
function bezier(p, t) {
  const [a, b, c, d] = p;
  const mt = 1 - t;
  const x = mt ** 3 * a[0] + 3 * mt ** 2 * t * b[0] + 3 * mt * t ** 2 * c[0] + t ** 3 * d[0];
  const y = mt ** 3 * a[1] + 3 * mt ** 2 * t * b[1] + 3 * mt * t ** 2 * c[1] + t ** 3 * d[1];
  const dx = 3 * mt ** 2 * (b[0] - a[0]) + 6 * mt * t * (c[0] - b[0]) + 3 * t ** 2 * (d[0] - c[0]);
  const dy = 3 * mt ** 2 * (b[1] - a[1]) + 6 * mt * t * (c[1] - b[1]) + 3 * t ** 2 * (d[1] - c[1]);
  return { x, y, angle: Math.atan2(dy, dx) };
}

// Hoja redondeada de eucalipto: base en (0,0), punta en (L,0). Devuelve contorno + nervio, girados y trasladados.
function leaf(L, W, x, y, angle, rand) {
  const j = () => (rand() - 0.5) * W * 0.12; // leve temblor de mano
  const pts = (arr) => arr.map(([px, py]) => {
    const rx = px * Math.cos(angle) - py * Math.sin(angle) + x;
    const ry = px * Math.sin(angle) + py * Math.cos(angle) + y;
    return `${f(rx)} ${f(ry)}`;
  });
  const [p0, c1, c2, p1, c3, c4] = pts([
    [0, 0], [L * 0.18 + j(), -W * 1.05 + j()], [L * 0.92 + j(), -W * 0.95 + j()], [L, 0],
    [L * 0.9 + j(), W * 0.98 + j()], [L * 0.2 + j(), W * 1.02 + j()],
  ]);
  const outline = `M${p0} C${c1} ${c2} ${p1} C${c3} ${c4} ${p0}`;
  const [m0, mc, m1] = pts([[L * 0.1, 0], [L * 0.5, W * 0.1], [L * 0.82, 0]]);
  const rib = `M${m0} Q${mc} ${m1}`;
  return [outline, rib];
}

/**
 * Rama: tallo en bézier cúbica y hojas alternas que decrecen hacia la punta.
 * spread: ángulo de las hojas respecto al tallo (radianes).
 */
function branch({ stem, leaves, size, seed, spread = 0.95, petiole = 0.18, startT = 0.08 }) {
  const rand = rng(seed);
  const paths = [];
  const [a, b, c, d] = stem;
  paths.push(`M${f(a[0])} ${f(a[1])} C${f(b[0])} ${f(b[1])} ${f(c[0])} ${f(c[1])} ${f(d[0])} ${f(d[1])}`);
  for (let i = 0; i < leaves; i++) {
    const t = startT + (i / (leaves - 1)) * (0.97 - startT);
    const { x, y, angle } = bezier(stem, t);
    const side = i % 2 === 0 ? 1 : -1;
    const scale = 1 - t * 0.55;
    const L = size * scale * (0.9 + rand() * 0.2);
    const W = L * (0.42 + rand() * 0.08);
    const la = angle + side * (spread + (rand() - 0.5) * 0.25);
    // pecíolo corto hasta la base de la hoja
    const px = x + Math.cos(la) * L * petiole;
    const py = y + Math.sin(la) * L * petiole;
    paths.push(`M${f(x)} ${f(y)} L${f(px)} ${f(py)}`);
    paths.push(...leaf(L, W, px, py, la, rand));
  }
  // hoja terminal
  const tip = bezier(stem, 1);
  paths.push(...leaf(size * 0.4, size * 0.17, tip.x, tip.y, tip.angle, rand));
  return paths;
}

function component(name, doc, viewBox, paths, strokeWidth) {
  const body = paths.map((d) => `  <path d="${d}" />`).join('\n');
  return `---
/*
  ${doc}
  GENERADO por scripts/generate-deco.mjs: no editar a mano. Hereda el color del texto (currentColor).
*/
interface Props { class?: string; style?: string; [attr: string]: unknown }
const { class: className = '', style, ...rest } = Astro.props;
---

<svg
  viewBox="${viewBox}"
  fill="none"
  stroke="currentColor"
  stroke-width="${strokeWidth}"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
  data-draw
  class={className}
  style={style}
  {...rest}
>
${body}
</svg>
`;
}

// viewBox ajustado al dibujo (incluye puntos de control, así que sobra un poco) con margen para el trazo.
function fitViewBox(paths, pad = 4) {
  const n = paths.join(' ').match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = n.filter((_, i) => i % 2 === 0);
  const ys = n.filter((_, i) => i % 2 === 1);
  const x0 = Math.floor(Math.min(...xs) - pad);
  const y0 = Math.floor(Math.min(...ys) - pad);
  return `${x0} ${y0} ${Math.ceil(Math.max(...xs) + pad - x0)} ${Math.ceil(Math.max(...ys) + pad - y0)}`;
}

// Rama grande para esquinas: entra desde la esquina superior izquierda y se curva hacia abajo a la derecha.
const big = branch({
  stem: [[8, 6], [150, 40], [230, 150], [330, 330]],
  leaves: 15, size: 58, seed: 7,
});
writeFileSync(new URL('EucalyptusBranch.astro', OUT), component(
  'EucalyptusBranch',
  'Rama de eucalipto grande, a línea, para asomar por la esquina de una sección.',
  fitViewBox(big), big, 1.2,
));

// Ramita pequeña y horizontal, para acompañar la firma o centrar un separador.
const sprig = branch({
  stem: [[4, 30], [40, 22], [80, 36], [118, 26]],
  leaves: 7, size: 22, seed: 21, spread: 1.05, startT: 0.12,
});
writeFileSync(new URL('EucalyptusSprig.astro', OUT), component(
  'EucalyptusSprig',
  'Ramita de eucalipto pequeña y horizontal (firma, separadores).',
  fitViewBox(sprig), sprig, 1.1,
));

console.log('Generados: EucalyptusBranch.astro (%d trazos), EucalyptusSprig.astro (%d trazos)', big.length, sprig.length);

// ---------------------------------------------------------------------------------------------
// Motivos de boda a línea (anillos, ramo, copas, invitación), con trazo de dibujo a mano:
// curvas suavizadas con leve temblor y contornos que se solapan un poco al cerrar, como a pulso.
// ---------------------------------------------------------------------------------------------

// Curva suave que pasa por todos los puntos (Catmull-Rom convertida a béziers cúbicas).
function smooth(points) {
  if (points.length < 2) return '';
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

const jitter = (rand, amp) => (rand() - 0.5) * 2 * amp;

// Elipse «a pulso»: empieza en un ángulo al azar y da algo más de una vuelta (el final solapa el principio).
function handEllipse(cx, cy, rx, ry, rand, { amp = 0.8, overlap = 0.35, steps = 14, rot = 0 } = {}) {
  const a0 = rand() * Math.PI * 2;
  const pts = [];
  const total = Math.PI * 2 + overlap;
  for (let i = 0; i <= steps; i++) {
    const a = a0 + (i / steps) * total;
    const x = Math.cos(a) * (rx + jitter(rand, amp));
    const y = Math.sin(a) * (ry + jitter(rand, amp));
    pts.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]);
  }
  return smooth(pts);
}

// Línea «a pulso» entre varios puntos.
function handLine(points, rand, amp = 0.6) {
  return smooth(points.map(([x, y]) => [x + jitter(rand, amp), y + jitter(rand, amp)]));
}

// Estrella de brillo de cuatro puntas.
function sparkle(x, y, r) {
  return [`M${f(x)} ${f(y - r)} L${f(x)} ${f(y + r)}`, `M${f(x - r * 0.7)} ${f(y)} L${f(x + r * 0.7)} ${f(y)}`];
}

// Rosa vista desde arriba: espiral que se abre y dos pétalos exteriores.
function rose(cx, cy, r, rand) {
  const pts = [];
  const turns = Math.PI * 3.4;
  for (let i = 0; i <= 26; i++) {
    const t = (i / 26) * turns;
    const rr = r * (0.12 + 0.78 * (t / turns)) + jitter(rand, r * 0.04);
    pts.push([cx + Math.cos(t + 0.6) * rr, cy + Math.sin(t + 0.6) * rr * 0.9]);
  }
  const petal = (a0, a1) => {
    const p = [];
    for (let i = 0; i <= 6; i++) {
      const a = a0 + (i / 6) * (a1 - a0);
      p.push([cx + Math.cos(a) * r * (1.02 + jitter(rand, 0.04)), cy + Math.sin(a) * r * 0.92]);
    }
    return smooth(p);
  };
  return [smooth(pts), petal(0.3, 2.2), petal(3.3, 5.3)];
}

// Anillos entrelazados, uno con diamante y destellos.
function rings(seed) {
  const rand = rng(seed);
  const p = [];
  // anillo izquierdo (grosor = dos elipses)
  p.push(handEllipse(70, 92, 44, 41, rand), handEllipse(70, 92, 35.5, 32.5, rand, { amp: 0.6 }));
  // anillo derecho, algo más alto
  p.push(handEllipse(120, 80, 44, 41, rand), handEllipse(120, 80, 35.5, 32.5, rand, { amp: 0.6 }));
  // diamante sobre el anillo derecho: tabla, corona, rondista y pabellón
  const cx = 120, top = 18, gird = 29, culet = 43;
  p.push(handLine([[113, top], [127, top]], rand, 0.3));
  p.push(handLine([[113, top], [106, gird], [134, gird], [127, top]], rand, 0.3));
  p.push(handLine([[106, gird], [cx, culet], [134, gird]], rand, 0.3));
  p.push(handLine([[116, top], [113, gird], [cx, culet]], rand, 0.2), handLine([[124, top], [127, gird], [cx, culet]], rand, 0.2));
  // garras del engaste
  p.push(handLine([[110, 34], [112, 40]], rand, 0.2), handLine([[130, 34], [128, 40]], rand, 0.2));
  // destellos
  p.push(...sparkle(150, 16, 6), ...sparkle(92, 22, 4), ...sparkle(160, 36, 3));
  return p;
}

// Ramo de novia: rosas, hojas de eucalipto, paniculata, tallos recogidos con lazo.
function bouquet(seed) {
  const rand = rng(seed);
  const p = [];
  const G = [100, 172]; // punto donde se atan los tallos
  // tallos
  const tops = [[76, 118], [88, 126], [100, 128], [112, 126], [124, 118], [94, 122], [106, 122]];
  const bottoms = [[86, 250], [92, 254], [100, 256], [108, 254], [114, 250], [96, 252], [104, 252]];
  tops.forEach((t, i) => p.push(handLine([t, [G[0] + jitter(rand, 2), G[1]], bottoms[i]], rand, 0.5)));
  // lazo: dos lazadas y dos caídas
  p.push(handLine([G, [78, 160], [66, 170], [74, 184], G], rand, 0.6));
  p.push(handLine([G, [122, 160], [134, 170], [126, 184], G], rand, 0.6));
  p.push(handLine([G, [92, 196], [84, 216], [78, 232]], rand, 0.6));
  p.push(handLine([G, [110, 198], [118, 214], [126, 230]], rand, 0.6));
  p.push(handEllipse(G[0], G[1], 5, 4, rand, { amp: 0.4, steps: 8 }));
  // rosas
  p.push(...rose(74, 98, 19, rand), ...rose(112, 84, 23, rand), ...rose(142, 106, 17, rand), ...rose(100, 118, 14, rand));
  // hojas de eucalipto asomando
  for (const [x, y, a, L] of [[52, 112, 200, 26], [58, 84, 222, 24], [150, 132, -25, 24], [160, 92, -15, 22], [88, 62, 255, 22], [138, 64, -70, 22]]) {
    p.push(...leaf(L, L * 0.46, x, y, (a * Math.PI) / 180, rand));
  }
  // paniculata: racimos de puntitos
  for (const [x, y] of [[60, 66], [156, 72], [128, 132], [48, 96]]) {
    for (let i = 0; i < 5; i++) {
      p.push(handEllipse(x + jitter(rand, 6), y + jitter(rand, 6), 1.8, 1.8, rand, { amp: 0.15, steps: 6, overlap: 0.2 }));
    }
  }
  return p;
}

// Dos copas de cava brindando, con burbujas y destellos en el choque.
function toast(seed) {
  const rand = rng(seed);
  const p = [];
  // copa en coordenadas locales: borde en y=0, pie en y=118
  const flute = () => ({
    left: [[-13, 0], [-13.5, 22], [-10, 48], [-3, 68], [0, 72]],
    right: [[13, 0], [13.5, 22], [10, 48], [3, 68], [0, 72]],
    rim: [[-13, 0], [0, 1.2], [13, 0]],
    liquid: [[-13.2, 16], [0, 17.5], [13.2, 16]],
    stem: [[0, 72], [0.4, 96], [0, 116]],
    base: { cx: 0, cy: 118, rx: 17, ry: 4 },
    bubbles: [[-4, 30], [3, 38], [-2, 48], [4, 56], [0, 24]],
  });
  const place = (pts, ang, ox, oy) => pts.map(([x, y]) => [ox + x * Math.cos(ang) - y * Math.sin(ang), oy + x * Math.sin(ang) + y * Math.cos(ang)]);
  for (const [ang, ox, oy] of [[0.28, 87, 36], [-0.28, 113, 36]]) {
    const fl = flute();
    p.push(handLine(place(fl.left, ang, ox, oy), rand, 0.4), handLine(place(fl.right, ang, ox, oy), rand, 0.4));
    p.push(handLine(place(fl.rim, ang, ox, oy), rand, 0.3), handLine(place(fl.liquid, ang, ox, oy), rand, 0.3));
    p.push(handLine(place(fl.stem, ang, ox, oy), rand, 0.3));
    const [bx, by] = place([[fl.base.cx, fl.base.cy]], ang, ox, oy)[0];
    p.push(handEllipse(bx, by, fl.base.rx, fl.base.ry, rand, { amp: 0.4, rot: ang }));
    for (const b of place(fl.bubbles, ang, ox, oy)) p.push(handEllipse(b[0], b[1], 1.4, 1.4, rand, { amp: 0.15, steps: 6, overlap: 0.2 }));
  }
  // destellos del brindis
  p.push(handLine([[100, 22], [100, 10]], rand, 0.3), handLine([[90, 24], [84, 14]], rand, 0.3), handLine([[110, 24], [116, 14]], rand, 0.3));
  p.push(...sparkle(128, 8, 4), ...sparkle(70, 12, 3));
  return p;
}

// Sobre de invitación con lacre en forma de corazón y una ramita.
function invitation(seed) {
  const rand = rng(seed);
  const p = [];
  const [x0, y0, x1, y1] = [20, 44, 180, 150];
  // cuatro lados sueltos, rectos y algo prolongados en las esquinas, como a pulso
  p.push(handLine([[x0 - 2, y0], [100, y0 - 0.8], [x1 + 2, y0 + 0.3]], rand, 0.4));
  p.push(handLine([[x1, y0 - 2], [x1 + 0.6, 97], [x1, y1 + 1.5]], rand, 0.4));
  p.push(handLine([[x1 + 1.5, y1], [100, y1 + 0.8], [x0 - 1.5, y1 - 0.2]], rand, 0.4));
  p.push(handLine([[x0, y1 + 2], [x0 - 0.5, 97], [x0 + 0.3, y0 - 2]], rand, 0.4));
  // solapa: se detiene en el borde del lacre
  p.push(handLine([[x0, y0], [60, 72], [87.7, 91.4]], rand, 0.4), handLine([[x1, y0], [140, 72], [112.3, 91.4]], rand, 0.4));
  p.push(handLine([[x0, y1], [78, 108]], rand, 0.4), handLine([[x1, y1], [122, 108]], rand, 0.4));
  // lacre: círculo irregular con corazón dentro
  p.push(handEllipse(100, 102, 15, 14, rand, { amp: 1.2 }), handEllipse(100, 102, 11, 10.5, rand, { amp: 0.5 }));
  p.push(handLine([[100, 109], [94, 103], [93.5, 99], [96.5, 96.5], [100, 99.5], [103.5, 96.5], [106.5, 99], [106, 103], [100, 109]], rand, 0.15));
  // ramita de eucalipto sobre la esquina
  p.push(...branch({ stem: [[132, 40], [148, 30], [160, 22], [178, 8]], leaves: 5, size: 14, seed: seed + 3, spread: 1.05, startT: 0.15 }));
  return p;
}

// Corazón pequeño a línea (centro arriba en x, y; tamaño s).
function heart(x, y, sz, rand) {
  const k = sz / 10;
  const pts = [[0, 9], [-6, 3], [-6.5, -1], [-3.5, -3.5], [0, -0.5], [3.5, -3.5], [6.5, -1], [6, 3], [0, 9]];
  return handLine(pts.map(([a, b]) => [x + a * k, y + b * k]), rand, 0.12 * k);
}

// Tarta nupcial de tres pisos con glaseado, rosas en cascada y corazón de remate.
function cake(seed) {
  const rand = rng(seed);
  const p = [];
  const tiers = [[100, 168, 116, 44], [100, 124, 84, 38], [100, 86, 56, 32]]; // cx, base y, ancho, alto
  for (const [cx, by, w, h] of tiers) {
    const l = cx - w / 2, r = cx + w / 2, ty = by - h;
    p.push(handLine([[l, ty + 2], [l - 0.3, by]], rand, 0.3), handLine([[r, ty + 2], [r + 0.3, by]], rand, 0.3));
    p.push(handLine([[l - 2, by], [cx, by + 0.6], [r + 2, by]], rand, 0.4));
    p.push(handLine([[l, ty + 2], [cx, ty - 0.5], [r, ty + 2]], rand, 0.3));
    // glaseado que gotea
    const n = Math.round(w / 14);
    const drip = [[l, ty + 4]];
    for (let i = 0; i < n; i++) {
      const x0 = l + (i / n) * w, x1 = l + ((i + 1) / n) * w;
      drip.push([(x0 + x1) / 2, ty + 9 + rand() * 5], [x1, ty + 4 + rand()]);
    }
    p.push(handLine(drip, rand, 0.3));
    // cordón de perlas en la base
    for (let x = l + 5; x < r - 3; x += 7) p.push(handEllipse(x, by - 3, 1.3, 1.3, rand, { amp: 0.1, steps: 6, overlap: 0.2 }));
  }
  // bandeja con pie
  p.push(handEllipse(100, 172, 74, 5, rand, { amp: 0.5 }));
  p.push(handLine([[92, 177], [94, 188], [88, 194]], rand, 0.3), handLine([[108, 177], [106, 188], [112, 194]], rand, 0.3));
  p.push(handLine([[80, 195], [100, 196.5], [120, 195]], rand, 0.4));
  // rosas en cascada y hojitas
  p.push(...rose(124, 60, 8, rand), ...rose(114, 102, 9, rand), ...rose(72, 116, 8, rand), ...rose(134, 148, 10, rand));
  for (const [x, y, a] of [[134, 64, -20], [104, 108, 200], [62, 120, 210], [146, 156, -30], [120, 158, 160]]) {
    p.push(...leaf(10, 4.6, x, y, (a * Math.PI) / 180, rand));
  }
  // remate: corazón sobre un palito
  p.push(handLine([[100, 54], [100, 38]], rand, 0.2), heart(100, 28, 9, rand));
  p.push(...sparkle(126, 24, 4), ...sparkle(74, 34, 3));
  return p;
}

// Dos campanas de boda unidas por un lazo.
function bells(seed) {
  const rand = rng(seed);
  const p = [];
  const profile = [[-5, 0], [-11, 5], [-15, 18], [-17, 34], [-21, 46], [-28, 54]];
  const place = (pts, ang, ox, oy) => pts.map(([x, y]) => [ox + x * Math.cos(ang) - y * Math.sin(ang), oy + x * Math.sin(ang) + y * Math.cos(ang)]);
  for (const [ang, ox, oy] of [[0.3, 86, 46], [-0.3, 114, 46]]) {
    p.push(handLine(place(profile, ang, ox, oy), rand, 0.3));
    p.push(handLine(place(profile.map(([x, y]) => [-x, y]), ang, ox, oy), rand, 0.3));
    p.push(handLine(place([[-5, 0], [0, -1.5], [5, 0]], ang, ox, oy), rand, 0.2));
    p.push(handLine(place([[-18.5, 40], [0, 43], [18.5, 40]], ang, ox, oy), rand, 0.3)); // franja
    const [rx, ry] = place([[0, 54]], ang, ox, oy)[0];
    p.push(handEllipse(rx, ry, 28, 5, rand, { amp: 0.4, rot: ang }));
    const [cx, cy] = place([[0, 63]], ang, ox, oy)[0];
    p.push(handEllipse(cx, cy, 4, 4, rand, { amp: 0.2, steps: 8 }));
    p.push(handLine(place([[0, 55], [0, 59]], ang, ox, oy), rand, 0.1));
  }
  // lazo arriba
  const K = [100, 38];
  p.push(handLine([K, [84, 26], [74, 32], [82, 44], K], rand, 0.5), handLine([K, [116, 26], [126, 32], [118, 44], K], rand, 0.5));
  p.push(handEllipse(K[0], K[1], 4, 3.4, rand, { amp: 0.3, steps: 8 }));
  // destellos
  p.push(...sparkle(50, 110, 3.5), ...sparkle(152, 104, 4), ...sparkle(100, 118, 3));
  return p;
}

// Guirnalda de corazones colgando de un cordel con lazos en los extremos.
function garland(seed) {
  const rand = rng(seed);
  const p = [];
  const A = [10, 20], B = [290, 26];
  const at = (t) => [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t + Math.sin(Math.PI * t) * 38];
  const cord = [];
  for (let i = 0; i <= 12; i++) cord.push(at(i / 12));
  p.push(handLine(cord, rand, 0.4));
  const n = 7;
  for (let i = 1; i <= n; i++) {
    const [x, y] = at(i / (n + 1));
    const len = 8 + rand() * 10;
    p.push(handLine([[x, y], [x + jitter(rand, 1), y + len]], rand, 0.2));
    p.push(heart(x, y + len + 7, 17 + rand() * 5, rand));
  }
  for (const [x, y, s] of [[A[0], A[1], 1], [B[0], B[1], -1]]) {
    p.push(handLine([[x, y], [x + 10 * s, y - 9], [x + 16 * s, y - 3], [x + 8 * s, y + 3], [x, y]], rand, 0.3));
    p.push(handLine([[x, y], [x - 9 * s, y - 8], [x - 14 * s, y - 1], [x - 6 * s, y + 3], [x, y]], rand, 0.3));
    p.push(handLine([[x, y], [x - 3 * s, y + 14], [x - 6 * s, y + 22]], rand, 0.3), handLine([[x, y], [x + 4 * s, y + 13], [x + 3 * s, y + 24]], rand, 0.3));
  }
  return p;
}

// Arco de ceremonia con flores en una esquina y en la base, y una tela que cae por un lado.
function arch(seed) {
  const rand = rng(seed);
  const p = [];
  const cx = 100, sy = 96, base = 196;
  const leg = (x, top) => handLine([[x, top], [x + jitter(rand, 0.4), (top + base) / 2], [x, base]], rand, 0.2);
  const dome = (r) => {
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const t = Math.PI - (i / 12) * Math.PI;
      pts.push([cx + Math.cos(t) * r, sy - Math.sin(t) * r * 0.95]);
    }
    return handLine(pts, rand, 0.35);
  };
  for (const r of [72, 65]) p.push(dome(r), leg(cx - r, sy), leg(cx + r, sy));
  p.push(handLine([[14, base + 1], [100, base + 2.5], [186, base + 1]], rand, 0.5)); // suelo
  // flores sobre el arco (arriba a la izquierda), entre las dos líneas
  const onArc = (deg, r = 68.5) => { const t = (deg * Math.PI) / 180; return [cx + Math.cos(t) * r, sy - Math.sin(t) * r * 0.95]; };
  for (const [deg, size] of [[152, 9], [126, 11], [102, 8]]) {
    const [x, y] = onArc(deg);
    p.push(...rose(x, y, size, rand));
  }
  for (const [deg, r, ang, L] of [[168, 76, 190, 13], [140, 78, 135, 14], [114, 79, 95, 13], [90, 78, 70, 11], [162, 60, 300, 11], [134, 58, 260, 12], [80, 76, 30, 10]]) {
    const [x, y] = onArc(deg, r);
    p.push(...leaf(L, L * 0.46, x, y, (ang * Math.PI) / 180, rand));
  }
  // ramillete en la base derecha
  p.push(...rose(172, 186, 9, rand), ...rose(156, 192, 7, rand));
  for (const [x, y, ang] of [[184, 174, -50], [162, 178, 250], [146, 192, 205], [188, 192, 10]]) p.push(...leaf(11, 5, x, y, (ang * Math.PI) / 180, rand));
  // tela que cae desde lo alto del arco por la derecha
  p.push(handLine([onArc(66, 65), [128, 72], [124, 110], [131, 150], [126, 184]], rand, 0.5));
  p.push(handLine([onArc(48, 65), [146, 88], [141, 126], [147, 166]], rand, 0.5));
  p.push(handLine([[126, 184], [134, 182], [138, 175]], rand, 0.3));
  p.push(...sparkle(22, 34, 4), ...sparkle(180, 26, 3.5));
  return p;
}


// Pareja de novios de medio cuerpo, de perfil y mirándose, apoyados en un borde (y = 150).
// Cada figura se dibuja mirando a la derecha y el novio se refleja (x → 260 − x).
function couple(seed) {
  const rand = rng(seed);
  const p = [];
  const L = (pts, amp = 0.3, mirror = false) => p.push(handLine(mirror ? pts.map(([x, y]) => [260 - x, y]) : pts, rand, amp));
  const E = (x, y, rx, ry, mirror = false, amp = 0.3) => p.push(handEllipse(mirror ? 260 - x : x, y, rx, ry, rand, { amp }));

  // ---- novia (izquierda, mira a la derecha)
  // perfil: frente, nariz, labios, barbilla y mandíbula
  L([[103, 40], [107, 47], [108.5, 54], [107.5, 58], [112.5, 64], [108.5, 66], [109.5, 69], [107.8, 70.8], [108.8, 73], [106, 76], [105.5, 79], [99, 82.5], [94, 81.5]], 0.15);
  // pelo recogido: de la frente por arriba hasta la nuca, con moño
  L([[103, 40], [96, 34], [85, 35], [77, 43], [76, 54], [80, 64], [88, 71]], 0.3);
  L([[103, 40], [96, 43], [91, 50], [90, 57]], 0.25);
  E(75, 42, 8, 7);
  p.push(...rose(82, 36, 4, rand));
  // ojo mirando al novio, oreja con pendiente
  L([[102.5, 57], [105.5, 57.6]], 0.05); L([[105.5, 57.6], [107, 56.2]], 0.05);
  L([[91, 57], [88.5, 60], [90.5, 64]], 0.1);
  E(90, 67, 1.1, 1.1, false, 0.05);
  // velo desde el moño
  L([[70, 46], [60, 80], [52, 116], [44, 148]], 0.5);
  L([[74, 50], [66, 84], [62, 112]], 0.4);
  // cuello, espalda, pecho y escote
  L([[99, 82.5], [100.5, 94]], 0.2); L([[88, 71], [86, 92]], 0.2);
  L([[86, 92], [72, 99], [64, 118], [60, 148]], 0.4);
  L([[100.5, 94], [106, 99], [108, 104]], 0.25);
  L([[84, 104], [96, 108], [108, 104]], 0.25);
  for (let x = 87; x <= 105; x += 5) E(x, 110 - Math.abs(x - 96) * 0.1, 0.9, 0.9, false, 0.05);
  // brazo: hombro, codo sobre el borde y antebrazo hacia el centro
  L([[98, 108], [104, 124], [108, 138], [110, 146], [116, 150]], 0.3);
  L([[108, 138], [120, 138.5], [127, 140]], 0.2);
  L([[127, 140], [131, 144], [129, 150]], 0.15);

  // ---- novio (derecha, reflejado)
  const m = true;
  L([[103, 33], [107, 40], [108.5, 48], [107.5, 52], [113, 59], [108.5, 61.5], [109.5, 64.5], [107.8, 66.2], [108.8, 68.5], [107, 71], [107, 75], [100, 78.5], [95, 78]], 0.15, m);
  // pelo corto
  L([[103, 33], [97, 27], [86, 27], [77, 34], [75, 45], [78, 56], [82, 64]], 0.3, m);
  L([[103, 33], [97, 35], [93, 41], [92, 50]], 0.2, m);
  L([[103, 33], [107, 28], [102, 23.5], [92, 22.5], [84, 24.5], [78, 30]], 0.25, m);
  L([[84, 31], [91, 28], [99, 28.5]], 0.15, m);
  L([[78, 40], [83, 34]], 0.15, m);
  // ojo, oreja
  L([[102, 51], [105, 51.6]], 0.05, m); L([[105, 51.6], [106.5, 50.4]], 0.05, m);
  L([[91, 51], [88.5, 54.5], [90.5, 59]], 0.1, m);
  // cuello, cuello de camisa y pajarita
  L([[100, 78.5], [101, 88]], 0.2, m); L([[82, 64], [81, 86]], 0.2, m);
  L([[101, 86], [106, 92], [99, 94]], 0.15, m);
  L([[103, 94], [98.5, 90.5], [98.5, 97.5], [103, 94], [107.5, 90.5], [107.5, 97.5], [103, 94]], 0.08, m);
  // espalda y hombro de la chaqueta, solapa y ojal con flor
  L([[81, 86], [66, 94], [58, 116], [54, 148]], 0.4, m);
  L([[104, 97], [108, 112], [112, 122]], 0.25, m);
  L([[96, 96], [100, 108], [108, 112]], 0.25, m);
  p.push(...rose(260 - 101, 104, 3.6, rand));
  // brazo hacia el centro, junto a la mano de la novia
  L([[96, 110], [104, 126], [108, 138], [110, 146], [116, 150]], 0.3, m);
  L([[108, 138], [118, 138.5], [124, 140]], 0.2, m);
  L([[124, 140], [128, 144], [126, 150]], 0.15, m);
  L([[112, 150], [124, 150]], 0.2, m); // puño de la camisa

  // corazón entre las miradas y destellos
  p.push(heart(130, 40, 9, rand));
  p.push(...sparkle(44, 24, 4), ...sparkle(216, 20, 3.5));
  return p;
}

// Libreta de espiral abierta con renglones, un corazón garabateado, cinta marcapáginas y un bolígrafo encima.
function notebook(seed) {
  const rand = rng(seed);
  const p = [];
  const L = (pts, amp = 0.35) => p.push(handLine(pts, rand, amp));
  const [x0, y0, x1, y1] = [30, 30, 150, 190];
  // tapas: la hoja y, asomando detrás, la tapa trasera
  L([[x0 - 1.5, y0], [90, y0 - 0.6], [x1 + 1.5, y0 + 0.3]], 0.3);
  L([[x1, y0 - 1.5], [x1 + 0.5, 110], [x1, y1 + 1.5]], 0.3);
  L([[x1 + 1.5, y1], [90, y1 + 0.6], [x0 - 1.5, y1 - 0.2]], 0.3);
  L([[x0, y1 + 1.5], [x0 - 0.4, 110], [x0 + 0.2, y0 - 1.5]], 0.3);
  L([[x1 + 0.5, y0 + 6], [x1 + 5, y0 + 8]], 0.1);
  L([[x1 + 5, y0 + 8], [x1 + 5.4, 110], [x1 + 5, y1 + 5]], 0.2);
  L([[x1 + 5, y1 + 5], [90, y1 + 5.4], [x0 + 5, y1 + 5]], 0.2);
  L([[x0 + 5, y1 + 5], [x0 + 1, y1 + 0.5]], 0.1);
  // espiral: anillas que atraviesan el borde de arriba
  for (let x = x0 + 10; x <= x1 - 8; x += 11) {
    p.push(handEllipse(x, y0 - 1, 3.2, 6, rand, { amp: 0.2, steps: 10, overlap: 0.25 }));
    p.push(handEllipse(x, y0 + 7, 1.3, 1.3, rand, { amp: 0.1, steps: 6, overlap: 0.2 }));
  }
  // renglones y margen
  for (let y = y0 + 26; y < y1 - 10; y += 13) L([[x0 + 10, y], [90, y + 0.4], [x1 - 10, y]], 0.25);
  L([[x0 + 22, y0 + 16], [x0 + 22.5, y1 - 8]], 0.2);
  // apuntes: una línea de «letra» ondulada y un corazón
  L([[x0 + 28, y0 + 36], [x0 + 36, y0 + 33], [x0 + 44, y0 + 37], [x0 + 52, y0 + 33], [x0 + 60, y0 + 37], [x0 + 70, y0 + 34]], 0.2);
  L([[x0 + 28, y0 + 49], [x0 + 38, y0 + 46], [x0 + 48, y0 + 50], [x0 + 58, y0 + 46]], 0.2);
  p.push(heart(x0 + 88, y0 + 38, 12, rand));
  // cinta marcapáginas que cae por abajo
  L([[x0 + 70, y1], [x0 + 71, y1 + 22], [x0 + 75, y1 + 17], [x0 + 79, y1 + 22], [x0 + 78, y1]], 0.2);
  // bolígrafo en diagonal sobre la hoja
  const pen = (t, o) => { const a = -0.62; const [cx, cy] = [118, 128]; return [cx + Math.cos(a) * t - Math.sin(a) * o, cy + Math.sin(a) * t + Math.cos(a) * o]; };
  L([pen(-52, -3.5), pen(34, -3.5)], 0.2); L([pen(-52, 3.5), pen(34, 3.5)], 0.2);
  L([pen(34, -3.5), pen(46, 0), pen(34, 3.5)], 0.1);
  L([pen(-52, -3.5), pen(-55, 0), pen(-52, 3.5)], 0.1);
  L([pen(24, -3.5), pen(24, 3.5)], 0.1);
  L([pen(-44, -3.5), pen(-44, -6), pen(-20, -6), pen(-20, -3.5)], 0.1); // clip
  p.push(...sparkle(166, 22, 4), ...sparkle(18, 62, 3));
  return p;
}

const motifs = [
  ['WeddingRings', 'Anillos entrelazados con diamante, a línea.', rings(41)],
  ['WeddingBouquet', 'Ramo de novia con rosas, eucalipto y lazo, a línea.', bouquet(52)],
  ['WeddingToast', 'Dos copas de cava brindando, a línea.', toast(63)],
  ['WeddingCake', 'Tarta nupcial de tres pisos con rosas en cascada, a línea.', cake(85)],
  ['WeddingNotebook', 'Libreta de espiral con apuntes y un bolígrafo, a línea.', notebook(142)],
  ['HeartGarland', 'Guirnalda de corazones colgando de un cordel, a línea.', garland(107)],
  ['WeddingArch', 'Arco de ceremonia con flores y tela, a línea.', arch(118)],
];
for (const [name, doc, paths] of motifs) {
  writeFileSync(new URL(`${name}.astro`, OUT), component(name, doc, fitViewBox(paths), paths, 1.6));
}
console.log('Generados: %s', motifs.map(([n, , p]) => `${n} (${p.length})`).join(', '));
