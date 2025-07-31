import BackButton from "@/components/BackButton";
import { Quote } from "@/components/Quote";
import Rating from "@/components/Rating";
import ReleaseDate from "@/components/ReleaseDate";
import Runtime from "@/components/Runtime";
import useTvSeries from "@/hooks/useTvSeries";
import useTvSeriesTrailer from "@/hooks/useTvSeriesTrailer";
import { Text, Heading, HStack, Stack, Box, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const TvSeriesWatchPage = () => {
  const { id, season, episode } = useParams();
  const { trailers, isLoading } = useTvSeriesTrailer(parseInt(id || "0"));
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  if (!id || !season || !episode) throw new Error();

  const { data } = useTvSeries(parseInt(id), "details");
  if (!data) return null;

  const youtubeId = trailers?.find((trailer) => trailer.type === "Trailer")?.key;

  return (
    <Box>
      <Box my={3}>
        <BackButton />
      </Box>
      <Skeleton
        loading={isLoading || isVideoLoading}
        className="w-full aspect-square md:aspect-video"
      >
        <div className="w-full aspect-square md:aspect-video">
          <iframe
            className="w-full h-full rounded-md"
            onLoad={() => setIsVideoLoading(false)}
            src={`https://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </Skeleton>
      <Stack gap={5} mt={5}>
        <Heading fontSize="3xl" fontWeight="medium">
          {data.name}
        </Heading>
        <Quote tagline={data.tagline} />
        <Text>{data.overview}</Text>
        <HStack>
          <ReleaseDate date={data?.first_air_date} />
          <Rating vote_average={data.vote_average} />
          <Runtime runtime={data.episode_run_time[0]} />
        </HStack>
      </Stack>
    </Box>
  );
};
export default TvSeriesWatchPage;
