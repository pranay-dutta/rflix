import { Movie } from "@/hooks/useMovies";
import { Box, Image, Link } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import classNames from "classnames";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Box
      className={`flex flex-col gap-2 w-56 !p-2 relative cursor-pointer`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Box
        className={classNames({
          "overlay-effect": true,
          "after:opacity-100": show,
          "after:opacity-0": !show,
        })}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="object-cover h-72 rounded-md"
          objectFit="cover"
          alt={movie.original_title}
        />
        <Box
          className={classNames({
            "absolute left-[33%] top-[33%] transition-transform duration-200 ease-in-out":
              true,
            "opacity-100 scale-100": show,
            "opacity-0 scale-80": !show,
          })}
        >
          <FaPlay size={80} />
        </Box>
      </Box>

      <Link className="!font-medium !no-underline hover:text-gray-400" href="#">
        {movie.original_title}
      </Link>
    </Box>
  );
};

export default MovieCard;
