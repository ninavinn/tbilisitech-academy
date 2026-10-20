export const CATEGORIES = [
  "Frontend",
  "UI/UX",
  "Python",
  "Data",
  "Cybersecurity",
];
export const LEVELS = ["დამწყები", "საშუალო", "მოწინავე"];

export const CATEGORY_META = {
  Frontend: { glyph: "</>", hue: 174 },
  "UI/UX": { glyph: "Aa", hue: 332 },
  Python: { glyph: "py", hue: 42 },
  Data: { glyph: "∑", hue: 214 },
  Cybersecurity: { glyph: "#!", hue: 352 },
};

export const formatPrice = (n) => `${n} ₾`;

export const formatDate = (iso) =>
  new Intl.DateTimeFormat("ka-GE", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

export const formatDay = (iso) =>
  new Intl.DateTimeFormat("ka-GE", { day: "numeric", month: "short" }).format(
    new Date(iso),
  );
