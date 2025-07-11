import {
  Box,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Stack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { getTMDBImage } from "../constants";
import useTvSeries from "@/hooks/useTvSeries";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import TvSeriesWatchButton from "../TvSeriesWatchButton";
import ReleaseDate from "../ReleaseDate";
import Runtime from "../Runtime";
import Rating from "../Rating";
import { BiPlay } from "react-icons/bi";
import { Quote } from "../Quote";
import Season from "./Season";
import { MediaPoster, MediaScroll, MediaScrollHeading } from "../common";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import WatchListButton from "../WatchListButton";

const TvHero = ({ series }: { series: TvSeriesDetails | undefined }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  if (!series) return null;

  return (
    <>
      <Box position="relative" height="fit-content">
        <MediaPoster backdrop_path={series.backdrop_path} />

        <SimpleGrid
          className="md:absolute left-[2%] md:bottom-[10%] lg:top-auto lg:bottom-[3%]"
          columns={{ base: 1, md: 4 }}
          gap={{ sm: 2, lg: 5 }}
        >
          <GridItem>
            {/* Card image above poster */}
            <Image
              src={getTMDBImage(series.poster_path, "original", "vertical")}
              borderRadius="md"
              className="lg:w-80"
              objectFit="cover"
              aspectRatio={2 / 3}
            />
          </GridItem>
          <GridItem colSpan={{ md: 3 }} px={2}>
            <Box display="flex" flexDirection="column" gap={5}>
              <Stack gap={4}>
                <Heading mt={{ base: 2, md: 0 }} lineHeight="1" fontSize="4xl">
                  {series.name}
                </Heading>
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
                <Rating vote_average={series.vote_average} />
              </HStack>
              <Text lineClamp={2} fontSize={{ sm: "sm", md: "normal" }}>
                {series.overview}
              </Text>

              <HStack gap={4}>
                <TvSeriesWatchButton id={series.id} season={1} episode={1} icon={BiPlay}>
                  Watch Now
                </TvSeriesWatchButton>
                <WatchListButton
                  id={series.id}
                  type="tv"
                  posterPath={series.poster_path}
                  title={series.name}
                  rating={series.vote_average}
                />
              </HStack>
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
                      ) : null,
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
      <div ref={ref} style={{ minHeight: "300px" }}>
        {inView && (
          <>
            {" "}
            <Season series={series} /> <SimilarSeries />{" "}
          </>
        )}
      </div>
    </>
  );
};

const SimilarSeries = () => {
  const { id } = useParams();
  if (!id) throw Error("Failed to get series id");

  const { data: similarSeries } = useTvSeries(parseInt(id), "similar");
  if (!similarSeries || !similarSeries.results.length) return null;

  return (
    <Box mt={10}>
      <MediaScrollHeading highlight="Tv Shows">Similar Tv Shows</MediaScrollHeading>
      <MediaScroll media={similarSeries.results} />
    </Box>
  );
};

export default TvHero;
