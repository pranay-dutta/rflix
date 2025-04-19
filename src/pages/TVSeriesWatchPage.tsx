import BackButton from "@/components/BackButton";
import { Quote } from "@/components/Quote";
import Rating from "@/components/Rating";
import ReleaseDate from "@/components/ReleaseDate";
import Runtime from "@/components/Runtime";
import useTvShow from "@/hooks/useTvShow";
import { Container, Text, Heading, HStack, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const TvSeriesWatchPage = () => {
  const { id, season, episode } = useParams();
  if (!id || !season || !episode) throw new Error();

  const { data } = useTvShow(parseInt(id));
  if (!data) return null;

  return (
    <Container py={5}>
      <BackButton />
      <div className="w-full aspect-square md:aspect-video">
        <iframe
          className="rounded-lg"
          sandbox="allow-same-origin allow-scripts"
          width="100%"
          height="100%"
          allowFullScreen
          src={`https://player.videasy.net/tv/${id}/${season}/${episode}?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&color=8B5CF6`}
        />
      </div>
      <Stack gap={5} mt={5}>
        <Heading fontSize="3xl" fontWeight="medium">
          {data.name}
        </Heading>
        <Quote tagline={data.tagline} />
        <Text>{data.overview}</Text>
        <HStack>
          <ReleaseDate date={data?.first_air_date} />
          <Rating rating={data.vote_average} />
          <Runtime runtime={data.episode_run_time[0]} />
        </HStack>
      </Stack>
    </Container>
  );
};
export default TvSeriesWatchPage;
