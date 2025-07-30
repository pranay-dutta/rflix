import {
  Button,
  Input,
  Box,
  Heading,
  Spinner,
  Image,
  Highlight,
  Text,
} from "@chakra-ui/react";
import { RiAiGenerate2 } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { getTMDBImage } from "./constants";
import useCustomizationStore from "@/store/customizationStore";

const AiRecommended = () => {
  const { data: media, isLoading: isFetchingMovie, isError } = useMedia();
  const aiError = useGeneratedMedia((s) => s.aiError);
  const activePalette = useCustomizationStore((s) => s.activePalette);

  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Heading size="md" mb={4} color={`${activePalette}.500`}>
          Get a random Movie or Tv Series
        </Heading>
        <AiInput isFetchingMovie={isFetchingMovie} />

        <Box display="flex" alignItems="center">
          {(aiError || isError) && (
            <Highlight
              query={["Failed to respond please try again"]}
              styles={{ color: "red.600" }}
            >
              Failed to respond please try again
            </Highlight>
          )}
          {isFetchingMovie && <Spinner mx={3} />}
        </Box>

        {media && (
          <Box
            mt={4}
            p={4}
            borderRadius="md"
            display="flex"
            bgImage={`radial-gradient(circle, #000 45%, ${activePalette} 300%)`}
            flexDir={{ base: "column", sm: "row" }}
            gap={5}
          >
            <Image
              src={getTMDBImage(media.backdrop_path, "original", "horizontal")}
              maxW={{ base: "100%", sm: "40%", lg: "40%" }}
              transition="all 0.3s ease-in-out"
              loading="lazy"
              _hover={{ opacity: 0.8 }}
              aspectRatio={16 / 9}
              objectFit="contain"
              borderRadius="md"
              cursor="pointer"
              onClick={() =>
                isMovieDetails(media)
                  ? navigate("/info/movie/" + media.id)
                  : navigate("/info/tv/" + media.id)
              }
            />
            <Box p={2} gap="3" display="flex" flexDir="column">
              <Heading>
                {isMovieDetails(media) ? media.original_title : media.name}
              </Heading>
              <Text lineClamp="3">{media.overview}</Text>
              <Quote tagline={media.tagline} />
              <Box display="flex" gap={5}>
                <Rating vote_average={media.vote_average || 0} />
                <ReleaseDate
                  date={isMovieDetails(media) ? media.release_date : media.first_air_date}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AiRecommended;

import { useForm, SubmitHandler } from "react-hook-form";
import getRandomMedia from "@/utils/getRandomMedia";
import { useGeneratedMedia } from "@/store/generatedMediaStore";
import getAiRandomMedia from "@/utils/getAiRandomMedia";
import useMedia from "@/hooks/useMedia";
import { useState } from "react";
import Rating from "./Rating";
import { Quote } from "./Quote";
import isMovieDetails from "@/utils/isMovieDetails";
import ReleaseDate from "./ReleaseDate";
import { useNavigate } from "react-router-dom";

interface FormData {
  query: string;
}

const AiInput = ({ isFetchingMovie }: { isFetchingMovie: boolean }) => {
  const setGeneratedMedia = useGeneratedMedia((s) => s.setGeneratedMedia);
  const setAiError = useGeneratedMedia((s) => s.setAiError);
  const activePalette = useCustomizationStore((s) => s.activePalette);
  const [isFetchingAi, setFetchingAi] = useState(false);

  //Form Submission
  const handleClick = () => {
    try {
      setAiError(false);
      setFetchingAi(true);
      const media = getRandomMedia();
      setGeneratedMedia(media);
    } catch {
      setAiError(true);
    } finally {
      setFetchingAi(false);
    }
  };

  //AI Input Submission
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async ({ query }) => {
    try {
      setAiError(false);
      setFetchingAi(true);

      const aiGenMedia = await getAiRandomMedia(query);
      if (aiGenMedia) setGeneratedMedia(aiGenMedia);
      else setAiError(true);
    } finally {
      setFetchingAi(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <Input
        mb={2}
        placeholder="Describe a movie, genre, or mood..."
        {...register("query", { required: true })}
      />

      {/* Search Button */}
      <Button
        variant="subtle"
        color={`${activePalette}.500`}
        type="submit"
        disabled={isFetchingAi || isFetchingMovie}
      >
        <BiSearch />
      </Button>

      {/* Random Response Generate Button */}
      <Button
        variant="subtle"
        loadingText={
          <>
            Loading <BsStars />
          </>
        }
        color={`${activePalette}.500`}
        onClick={handleClick}
        loading={isFetchingAi || isFetchingMovie}
      >
        <RiAiGenerate2 />
        Random
      </Button>
    </form>
  );
};
