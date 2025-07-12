import { MovieTags } from "@/hooks/useMovieLists";
import { TvSeriesTags } from "@/hooks/useTvSeriesLists";
import useCustomizationStore from "@/store/customizationStore";
import { Heading, Highlight } from "@chakra-ui/react";

export const MediaListHeading = ({
  tag,
  mediaType,
}: {
  tag: MovieTags | TvSeriesTags;
  mediaType: "Movies" | "TV Shows";
}) => {
  const formatted = tag.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const activePalette = useCustomizationStore((s) => s.activePalette);

  return (
    <Heading size="3xl" as={"h1"}>
      <Highlight query={mediaType} styles={{ color: `${activePalette}.400` }}>
        {formatted + " " + mediaType}
      </Highlight>
    </Heading>
  );
};
