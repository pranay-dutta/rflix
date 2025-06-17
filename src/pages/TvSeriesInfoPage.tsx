import BackButton from "@/components/BackButton";
import TvHero from "@/components/tv/TvHero";
import useTvSeries from "@/hooks/useTvSeries";
import { Box, Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const TvSeriesInfoPage = () => {
  const { id } = useParams();
  if (!id) throw new Error("tv info page");

  const { data: series, isLoading } = useTvSeries(parseInt(id), "details");

  return (
    <>
      <Box my={3}>
        <BackButton />
      </Box>
      {isLoading ? <Skeleton w="full" h="80vh" /> : <TvHero series={series!} />}
    </>
  );
};

export default TvSeriesInfoPage;
