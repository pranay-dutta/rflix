import { Movie } from "@/hooks/useMovies";
import { Box, Image, Link } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

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
        className={`after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[radial-gradient(circle,rgba(0,0,0,0)_40%,rgba(0,0,0,0.7)_100%)] after:transition-opacity after:duration-300 after:ease-in-out after:rounded-md after:pointer-events-none ${
          show ? "after:opacity-100" : "after:opacity-0"
        }`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="object-cover h-72 rounded-md"
          objectFit="cover"
          alt={movie.original_title}
        />
        <Box
          position="absolute"
          left="30%"
          top={"30%"}
          opacity={show ? 1 : 0}
          transform={show ? "scale(1)" : "scale(0.8)"}
          transition="opacity 0.2s ease-in-out, transform 0.2s ease-in-out"
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
