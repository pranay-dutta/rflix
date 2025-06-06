import { MovieTags } from "@/hooks/useMovieLists";
import { TvSeriesTags } from "@/hooks/useTvSeriesLists";
import { Heading, Highlight } from "@chakra-ui/react";

export const MediaListHeading = ({
  tag,
  mediaType,
}: {
  tag: MovieTags | TvSeriesTags;
  mediaType: "Movies" | "TV Shows";
}) => {
  const formatted = tag.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Heading size="3xl" as={"h1"}>
      <Highlight query={mediaType} styles={{ color: "purple.400" }}>
        {formatted + " " + mediaType}
      </Highlight>
    </Heading>
  );
};
