import MovieGrid from "@/components/MovieGrid";
import TvShowsGrid from "@/components/TvSeriesGrid";
import { Container } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import { FaTv } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

const SearchPage = () => {
  return (
    <Container py={10}>
      <Tabs.Root defaultValue="movies" variant="plain" size="lg">
        <Tabs.List
          bg="bg.muted"
          rounded="l3"
          p="1"
          width="full"
          justifyContent="space-around"
        >
          <Tabs.Trigger value="movies" w={"50%"}>
            <MdMovie />
            Movies
          </Tabs.Trigger>
          <Tabs.Trigger value="tvshows" w={"50%"}>
            <FaTv />
            Tv Shows
          </Tabs.Trigger>
          <Tabs.Indicator rounded="l2" />
        </Tabs.List>
        <Tabs.Content value="movies">
          <MovieGrid />
        </Tabs.Content>
        <Tabs.Content value="tvshows">
          <TvShowsGrid />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
};

export default SearchPage;
