import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const SortDropDown = ({ mediaType }: { mediaType: "movie" | "tv" }) => {
  return <DropDown mediaType={mediaType} />
}

const DropDown = ({ mediaType }: { mediaType: "movie" | "tv" }) => {
  const [, setSearchParams] = useSearchParams();
  const collections = mediaType === "movie" ? movieSortCollections : tvSortCollections;

  return (
    <>
      <Select.Root collection={collections} minW={{ base: "100%", md: "250px" }}>
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText color="gray.300" placeholder="Select sort order" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collections.items.map((sortItem) => (
                <Fragment key={sortItem.value} >
                  <Select.Item
                    item={sortItem}
                    onClick={() => setSearchParams({ "sort_by": sortItem.value })}
                  >
                    {sortItem.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                </Fragment>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </>
  );
};

const movieSortCollections = createListCollection({
  items: [
    { label: "Popularity Ascending", value: "popularity.asc" },
    { label: "Popularity Descending", value: "popularity.desc" },
    { label: "Vote Ascending", value: "vote_count.asc" },
    { label: "Vote Descending", value: "vote_count.desc" },
    { label: "Rating Ascending", value: "vote_average.asc" },
    { label: "Rating Descending", value: "vote_average.desc" },
    { label: "Release Date Ascending", value: "primary_release_date.asc" },
    { label: "Release Date Descending", value: "primary_release_date.desc" },
    { label: "Name (A-Z)", value: "original_title.asc" },
    { label: "Name (Z-A)", value: "original_title.desc" },
  ],
});

const tvSortCollections = createListCollection({
  items: [
    { label: "Popularity Ascending", value: "popularity.asc" },
    { label: "Popularity Descending", value: "popularity.desc" },
    { label: "Vote Ascending", value: "vote_count.asc" },
    { label: "Vote Descending", value: "vote_count.desc" },
    { label: "Rating Ascending", value: "vote_average.asc" },
    { label: "Rating Descending", value: "vote_average.desc" },
    { label: "First Air Date Ascending", value: "first_air_date.asc" },
    { label: "First Air Date Descending", value: "first_air_date.desc" },
    { label: "Name (A-Z)", value: "original_name.asc" },
    { label: "Name (Z-A)", value: "original_name.desc" },
  ],
});



export default SortDropDown