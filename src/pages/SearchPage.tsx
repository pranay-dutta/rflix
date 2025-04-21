import { useEffect, useState } from "react";
import MovieGrid from "@/components/MovieGrid";
import TvShowsGrid from "@/components/TvSeriesGrid";
import { Container } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import { FaTv } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

const SearchPage = () => {
  const [currentTab, setCurrentTab] = useState(() => {
    return localStorage.getItem("search-tab") || "movies";
  });

  useEffect(() => {
    localStorage.setItem("search-tab", currentTab);
  }, [currentTab]);

  return (
    <Container py={5}>
      <Tabs.Root
        value={currentTab}
        onValueChange={(details) => setCurrentTab(details.value)}
        variant="plain"
        size="lg"
      >
        <Tabs.List
          bg="bg.muted"
          rounded="l3"
          p="1"
          width="full"
          justifyContent="space-around"
        >
          <Tabs.Trigger value="movies" w="50%">
            <MdMovie />
            Movies
          </Tabs.Trigger>
          <Tabs.Trigger value="tvshows" w="50%">
            <FaTv />
            Tv Shows
          </Tabs.Trigger>
          <Tabs.Indicator rounded="l2" />
        </Tabs.List>

        {/* Disable tabs when inactive */}
        <Tabs.Content value="movies">
          {currentTab === "movies" && <MovieGrid />}
        </Tabs.Content>
        <Tabs.Content value="tvshows">
          {currentTab === "tvshows" && <TvShowsGrid />}
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
};

export default SearchPage;
