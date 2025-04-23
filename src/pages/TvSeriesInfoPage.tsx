import {
  Portal,
  Select,
  Skeleton,
  createListCollection,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { getPlaceHolder, getTMDBImage } from "@/components/constants";
import Gradient from "@/components/Gradient";
import { Quote } from "@/components/Quote";
import Rating from "@/components/Rating";
import ReleaseDate from "@/components/ReleaseDate";
import Runtime from "@/components/Runtime";
import TvSeriesWatchButton from "@/components/TvSeriesWatchButton";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import {
  Box,
  GridItem,
  SimpleGrid,
  Image,
  Stack,
  Heading,
  HStack,
  Badge,
  Text,
  Highlight,
} from "@chakra-ui/react";
import { BiPlay } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import useSeason from "@/hooks/useSeason";
import { RiMovieLine } from "react-icons/ri";
import useTvSeries from "@/hooks/useTvSeries";
import MovieScroll from "@/components/MovieScroll";

const TvSeriesInfoPage = () => {
  const { id } = useParams();
  if (!id) throw new Error("tv info page");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: series, isLoading } = useTvSeries(parseInt(id), "details");

  return (
    <>
      <Box my={3}>
        <BackButton />
      </Box>
      <>
        {isLoading ? (
          <Skeleton w="full" h="774px" />
        ) : (
          <TvHero series={series!} />
        )}
      </>
    </>
  );
};

export default TvSeriesInfoPage;

interface Item {
  label: string;
  value: string;
}

const Season = ({ series }: { series: TvSeriesDetails }) => {
  const length = series.number_of_seasons;
  const items: Item[] = Array.from({ length }, (_, i) => {
    return { label: `Season ${i + 1}`, value: `${i + 1}` };
  });
  const seasons = createListCollection({
    items,
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label,
  });
  const [season, setSeason] = useState("1");

  return (
    <>
      <Select.Root
        value={[season]}
        onValueChange={(d) => setSeason(d.value[0])}
        collection={seasons}
        size="md"
        width="350px"
        variant="subtle"
        my={5}
      >
        <Select.HiddenSelect />
        <Select.Label fontSize="xl" my={3} color="gray.300">
          Select Season
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select Season" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {seasons.items.map((season) => (
                <Select.Item item={season} key={season.value}>
                  {season.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Episodes seriesId={series.id} seasonNumber={parseInt(season)} />
    </>
  );
};

const Episodes = ({
  seriesId,
  seasonNumber,
}: {
  seriesId: number;
  seasonNumber: number;
}) => {
  const { data, error, isLoading } = useSeason(seriesId, seasonNumber);
  if (error) return <h1>Error: {error.message}</h1>;

  const skeletons = Array.from({ length: 5 });
  if (isLoading)
    return (
      <Box display="flex" flexDirection="column" gap={5}>
        {skeletons.map((_, i) => (
          <Skeleton key={i} height="200px" width="350px" />
        ))}
      </Box>
    );

  if (!data) return <h1>No data found</h1>;
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      {data.episodes.map((episode) => (
        <Box display="flex" gap={5} key={episode.id}>
          <Link
            to={`/watch/tv/${seriesId}/${seasonNumber}/${episode.episode_number}`}
          >
            <SeasonImage key={episode.id} still_path={episode.still_path} />
          </Link>
          <Box>
            <HStack gap={4} alignItems="center">
              <Badge size="md" variant="outline" colorPalette="purple">
                <RiMovieLine />
                {episode.episode_number}
              </Badge>
              <Link
                to={`/watch/tv/${seriesId}/${seasonNumber}/${episode.episode_number}`}
              >
                <Text fontSize="xl" fontWeight="medium">
                  {episode.name}
                </Text>
              </Link>
            </HStack>
            <HStack>
              <ReleaseDate date={episode.air_date} />
              <Rating rating={episode.vote_average} />
              <Runtime runtime={episode.runtime} />
            </HStack>
            <Text>{episode.overview}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
const TvHero = ({ series }: { series: TvSeriesDetails }) => {
  const { data: similarSeries } = useTvSeries(series.id, "similar");

  return (
    <>
      <Box position="relative" height="fit-content">
        {/* Movie Poster */}
        <Box className="opacity-50 hidden! md:block! rounded-lg">
          <Image
            borderRadius="md"
            src={
              series.backdrop_path
                ? getTMDBImage(series.backdrop_path, "original")
                : getPlaceHolder("original")
            }
          />
        </Box>
        <Gradient.Bottom />

        <SimpleGrid
          className="md:absolute left-[2%] md:top-2 md:bottom-auto lg:top-auto lg:bottom-[3%]"
          columns={{ base: 1, md: 4 }}
          gap={{ sm: 2, lg: 5 }}
        >
          <GridItem>
            {/* Card image above poster */}
            <Image
              src={
                series.poster_path
                  ? getTMDBImage(series.poster_path, "original")
                  : getPlaceHolder("w500")
              }
              borderRadius="md"
            />
          </GridItem>
          <GridItem colSpan={{ md: 3 }} px={2}>
            <Box display="flex" flexDirection="column" gap={5}>
              <Stack gap={4}>
                <Heading fontSize="4xl">{series.name}</Heading>
                <Quote tagline={series.tagline} />
              </Stack>
              <HStack flexWrap="wrap">
                {series.genres.map((genre) => (
                  <Badge size="md" key={genre.id}>
                    {genre.name}
                  </Badge>
                ))}
              </HStack>
              <HStack>
                <ReleaseDate date={series.first_air_date} />
                <Runtime runtime={series.episode_run_time[0]} /> {/* runtime */}
                <Rating rating={series.vote_average} />
              </HStack>
              <Text lineClamp={2} fontSize={{ sm: "sm", md: "normal" }}>
                {series.overview}
              </Text>
              <TvSeriesWatchButton
                id={series.id}
                season={1}
                episode={1}
                icon={BiPlay}
              >
                Watch Now
              </TvSeriesWatchButton>
            </Box>

            <Stack mt={5}>
              <HStack
                flexDirection={{ base: "column", md: "row" }}
                alignItems={{ base: "flex-start", md: "center" }}
                maxW={{ md: "3/4" }}
                justify="space-between"
              >
                <Box>
                  <Text fontWeight="medium">Production</Text>
                  <HStack>
                    {series.production_companies.map((company, index) =>
                      index <= 2 ? (
                        <Text
                          key={company.id}
                          fontSize="sm"
                          fontStyle="italic"
                          color="gray.300"
                        >
                          {company.name}
                          {index + 1 != series.production_companies.length && (
                            <span>{" •"}</span>
                          )}
                        </Text>
                      ) : null
                    )}
                  </HStack>
                </Box>
                <Box>
                  <Text fontWeight="medium">Language</Text>
                  <Text fontSize="sm" fontStyle="italic" color="gray.300">
                    {series.original_language.toUpperCase()}
                  </Text>
                </Box>
              </HStack>
            </Stack>
            <HStack></HStack>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Season series={series} />
      {/* Similar tv shows scroll compoent */}
      <Box mt={10}>
        <Heading fontSize="2xl" fontWeight="bold" filter={"contrast(2)"}>
          <Highlight query={"Tv Shows"} styles={{ color: "red.600" }}>
            Similar Tv Shows
          </Highlight>
        </Heading>
        {similarSeries && <MovieScroll media={similarSeries.results} />}
      </Box>
    </>
  );
};
const SeasonImage = ({ still_path }: { still_path?: string }) => {
  return (
    <Image
      maxW="350px"
      objectFit="cover"
      borderRadius="md"
      src={
        still_path
          ? getTMDBImage(still_path, "w500")
          : getPlaceHolder("original")
      }
    />
  );
};
