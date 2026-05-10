/**
 * Get TMDB image URL with specified quality and placeholder dimension
 *
 * @param {string} url - The image URL
 * @param {quality} quality - The quality of the image
 * @param {("vertical" | "horizontal")} [placeholderDimension] - The placeholder dimension
 *
 * TMDB Sizes:
 *
 * **Poster:** `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`
 * **Backdrop:** `w300`, `w780`, `w1280`, `original`
 */
export function getTMDBImage(
  url: string,
  quality:
    | "w92"
    | "w154"
    | "w185"
    | "w342"
    | "w500"
    | "w300"
    | "w780"
    | "w1280"
    | "original",
  placeholderDimension?: "vertical" | "horizontal",
) {
  const dimension = placeholderDimension === "horizontal" ? "1920x1080" : "500x750";
  if (!url || !url.length) return `https://fakeimg.ryd.tools/${dimension}/111?text=Media`;
  return `https://image.tmdb.org/t/p/${quality}` + url;
}

export function getCreditImage(url: string) {
  if (!url) return "/person.png";
  return `https://image.tmdb.org/t/p/w154` + url;
}
