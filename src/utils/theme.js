// ألوان التمييز المتاحة. الـ id يطابق data-accent في index.css
// (indigo هو الافتراضي المعرَّف في :root)، و hex هو لون الدائرة في صفحة المظهر.
export const accents = [
  { id: "indigo", label: "نيلي", hex: "#2f3a8f" },
  { id: "copper", label: "نحاسي", hex: "#9a4a1a" },
  { id: "teal", label: "تركوازي", hex: "#0f6b73" },
  { id: "plum", label: "برقوقي", hex: "#6b2d6b" },
  { id: "slate", label: "رمادي", hex: "#3f4a5a" },
];

const toRgb = (hex) => {
  const h = String(hex || "").replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

// يحوّل أي لون محفوظ (حتى القديم مثل #92400e) إلى أقرب id متاح
export const resolveAccentId = (hex) => {
  const exact = accents.find(
    (a) => a.hex.toLowerCase() === String(hex).toLowerCase(),
  );
  if (exact) return exact.id;
  const rgb = toRgb(hex);
  if (!rgb) return accents[0].id;
  let best = accents[0];
  let bestDist = Infinity;
  for (const a of accents) {
    const c = toRgb(a.hex);
    const d = c.reduce((s, v, i) => s + (v - rgb[i]) ** 2, 0);
    if (d < bestDist) {
      bestDist = d;
      best = a;
    }
  }
  return best.id;
};
