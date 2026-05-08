import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const SortDropDown = ({ mediaType }: { mediaType: "movie" | "tv" }) => {
  const [, setSearchParams] = useSearchParams();
  const collections = mediaType === "movie" ? movieSortCollections : tvSortCollections;

  return (
    <Select.Root collection={collections}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select sort order" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collections.items.map((sortItem) => (
              <Fragment key={sortItem.value}>
                <Select.Item
                  item={sortItem}
                  onClick={() => setSearchParams({ sort_by: sortItem.value })}
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
  );
};

const movieSortCollections = createListCollection({
  items: [
    { label: "High Votes", value: "vote_count.desc" },
    { label: "Low Votes", value: "vote_count.asc" },
    { label: "High Rating", value: "vote_average.desc" },
    { label: "Low Rating", value: "vote_average.asc" },
    { label: "More Popular", value: "popularity.desc" },
    { label: "Less Popular", value: "popularity.asc" },
    { label: "Name (A-Z)", value: "original_title.asc" },
    { label: "Name (Z-A)", value: "original_title.desc" },
    { label: "Latest", value: "primary_release_date.desc" },
    { label: "Oldest", value: "primary_release_date.asc" },
  ],
});

const tvSortCollections = createListCollection({
  items: [
    { label: "High Votes", value: "vote_count.desc" },
    { label: "Low Votes", value: "vote_count.asc" },
    { label: "High Rating", value: "vote_average.desc" },
    { label: "Low Rating", value: "vote_average.asc" },
    { label: "More Popular", value: "popularity.desc" },
    { label: "Less Popular", value: "popularity.asc" },
    { label: "Name (A-Z)", value: "original_name.asc" },
    { label: "Name (Z-A)", value: "original_name.desc" },
    { label: "Latest", value: "first_air_date.desc" },
    { label: "Oldest", value: "first_air_date.asc" },
  ],
});

export default SortDropDown;
