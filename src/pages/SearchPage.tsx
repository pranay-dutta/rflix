import MovieSeriesGrid from "@/components/MovieSearchGrid";
import TvSeriesSearchGrid from "@/components/TvSeriesSearchGrid";
import { Tab, useSearchTabStore } from "@/store/searchTabStore";
import { Tabs } from "@chakra-ui/react";
import { FaTv } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

const SearchPage = () => {
  const { currentTab, setCurrentTab } = useSearchTabStore();

  return (
    <>
      <Tabs.Root
        value={currentTab}
        onValueChange={(details) => setCurrentTab(details.value as Tab)}
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
          {currentTab === "movies" && <MovieSeriesGrid />}
        </Tabs.Content>
        <Tabs.Content value="tvshows">
          {currentTab === "tvshows" && <TvSeriesSearchGrid />}
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default SearchPage;
