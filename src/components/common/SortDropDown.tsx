import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const SortDropDown = () => {
  return <div >
    <DropDown />
  </div>
}

const DropDown = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <>
      <Select.Root collection={sortCollections} minW={{ base: "100%", md: "250px" }}>
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
              {sortCollections.items.map((sortItem, i) => (
                <Fragment key={i} >
                  <Select.Item item={sortItem} key={sortItem.value} onClick={() => {
                    setSearchParams((searchParams) => {
                      searchParams.set("sort_by", sortItem.value)
                      return searchParams;
                    })
                  }}>{sortItem.label}
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

const sortCollections = createListCollection({
  items: [
    { label: "Popularity Ascending", value: "popularity.asc" },
    { label: "Popularity Descending", value: "popularity.desc" },

    { label: "Rating Ascending", value: "vote_count.asc" },
    { label: "Rating Descending", value: "vote_count.desc" },

    { label: "First Air Date Ascending", value: "primary_release_date.asc" },
    { label: "First Air Date Descending", value: "primary_release_date.desc" },

    { label: "Name (A-Z)", value: "original_title.asc" },
    { label: "Name (Z-A)", value: "original_title.desc" },
  ]
})
export default SortDropDown