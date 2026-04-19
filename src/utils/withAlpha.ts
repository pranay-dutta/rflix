/**
 *  @description takes a color string and an alpha value and returns a rgba color string with the specified alpha
 *  @param color - the original color string
 *  @param alpha - the alpha value (0-1)
 *  @returns the new color string in rgba format
 */
const withAlpha = (color: string, alpha: number) => {
  const el = document.createElement("div");
  el.style.color = color;
  document.body.appendChild(el);

  const rgb = getComputedStyle(el).color;
  document.body.removeChild(el);

  const match = rgb.match(/\d+/g);
  if (!match) return "rgba(0,0,0,0)"; // fallback

  const [r, g, b] = match;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export default withAlpha;
