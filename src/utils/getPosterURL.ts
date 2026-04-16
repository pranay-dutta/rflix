import { getTMDBImage } from "@/components/constants";
import { Backdrop, PosterAndExternalIds } from "@/hooks/useRectPoster";

const getPosterURL = (isLoading?: boolean, data?: PosterAndExternalIds) => {
  if (isLoading) return;

  const backdrops = data?.images.backdrops;

  const isWideBackdrop = (b: Backdrop) => b.aspect_ratio > 1.7 && b.aspect_ratio < 1.9;

  const backdrop =
    backdrops?.find((b) => isWideBackdrop(b) && b.iso_3166_1 === "US") ??
    backdrops?.find(isWideBackdrop) ??
    backdrops?.find((b) => b.iso_3166_1 === "US") ??
    backdrops?.[0];

  const path = backdrop?.file_path || "";
  return getTMDBImage(path, "w780", "horizontal");
};
export default getPosterURL;
