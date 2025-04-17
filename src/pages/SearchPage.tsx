import MovieCard from "@/components/MovieCard";
import { Movie } from "@/hooks/useMovies";
import axiosInstance from "@/services/api-client";
import { Container, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment } from "react/jsx-runtime";

interface FetchResponse {
  results: Movie[];
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<FetchResponse, Error>({
    queryKey: ["search", query],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      axiosInstance
        .get<FetchResponse>("/search/movie?", {
          params: { query: query, page: pageParam },
        })
        .then((res) => res.data),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const resCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return (
    <Container>
      <InfiniteScroll
        dataLength={resCount}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={isFetchingNextPage && <Spinner my={3} size="md" />}
        style={{ overflow: "unset" }} // Important! To prevent scroll jump
      >
        <SimpleGrid
          gap={4}
          columns={{
            base: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
          // className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Container>
  );
};

export default SearchPage;
