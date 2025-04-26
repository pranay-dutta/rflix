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
import Gradient from "../Gradient";
import { getPlaceHolder, getTMDBImage } from "../constants";
import useTvSeries from "@/hooks/useTvSeries";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import TvSeriesWatchButton from "../TvSeriesWatchButton";
import ReleaseDate from "../ReleaseDate";
import Runtime from "../Runtime";
import Rating from "../Rating";
import { BiPlay } from "react-icons/bi";
import { Quote } from "../Quote";
import Season from "./Season";
import { MediaScroll, MediaScrollHeading } from "../common";

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
          <Gradient.Bottom />
        </Box>

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
                <Heading mt={{ base: 2, md: 0 }} fontSize="4xl">
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
                <Rating rating={series.vote_average} />
              </HStack>
              <Text lineClamp={2} fontSize={{ sm: "sm", md: "normal" }}>
                {series.overview}
              </Text>
              <TvSeriesWatchButton id={series.id} season={1} episode={1} icon={BiPlay}>
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
                        <Text key={company.id} fontSize="sm" fontStyle="italic" color="gray.300">
                          {company.name}
                          {index + 1 != series.production_companies.length && <span>{" •"}</span>}
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
      <Season series={series} />
      {similarSeries && (
        <Box mt={10}>
          <MediaScrollHeading highlight="Tv Shows">Similar Tv Shows</MediaScrollHeading>
          <MediaScroll media={similarSeries.results} />
        </Box>
      )}
    </>
  );
};
export default TvHero;
