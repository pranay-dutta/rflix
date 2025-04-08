import { Movie } from "@/hooks/useMovies";
import { Box, Heading, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getTMDBImage } from "./constants";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Link to={"/watch/" + movie.id}>
      <Box
        className={`flex flex-col gap-2 w-56 !p-2 relative cursor-pointer`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Box
          className={classNames({
            "overlay-effect relative": true,
            "after:opacity-100": show,
            "after:opacity-0": !show,
          })}
        >
          <Image
            src={getTMDBImage(movie.poster_path, "w500")}
            className="object-cover h-72 rounded-md"
            objectFit="cover"
            alt={movie.original_title}
          />
          <Box
            className={classNames({
              "absolute left-[33%] top-[33%] transition-transform duration-200 ease-in-out text-white":
                true,
              "opacity-100 scale-100": show,
              "opacity-0 scale-80": !show,
            })}
          >
            <FaPlay size={80} />
          </Box>
        </Box>

        <Heading className="!font-medium !no-underline hover:text-gray-400">
          {movie.original_title}
        </Heading>
      </Box>
    </Link>
  );
};

export default MovieCard;
