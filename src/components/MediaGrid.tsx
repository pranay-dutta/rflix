import { SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react/jsx-runtime";
import Card from "./Card";
import { FetchResponse } from "@/interfaces/FetchResponse";
import { InfiniteData } from "@tanstack/react-query";
import { Movie } from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";

interface Props {
  media: InfiniteData<FetchResponse<Movie | TvSeries>>;
}
const MediaGrid = ({ media }: Props) => {
  return (
    <SimpleGrid className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {media.pages.map((page, index) => (
        <Fragment key={index}>
          {page.results.map((movie) => (
            <Card key={movie.id} media={movie} />
          ))}
        </Fragment>
      ))}
    </SimpleGrid>
  );
};

export default MediaGrid;
