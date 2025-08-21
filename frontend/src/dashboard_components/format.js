export const pad2 = (n) => String(n ?? 0).padStart(2, "0");

export const toCurrency = (v) => `Rs.${Number(v || 0).toLocaleString("en-LK")}/month`;

export const mapLink = (loc) => {
  const s = String(loc || "").trim();
  return /^https?:\/\//i.test(s)
    ? s
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`;
};

export const timeAgo = (iso) => {
  if (!iso) return "";
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
};