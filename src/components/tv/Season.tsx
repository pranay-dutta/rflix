import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useState } from "react";
import Episodes from "./Episodes";
interface Item {
  label: string;
  value: string;
}

const Season = ({ series }: { series: TvSeriesDetails }) => {
  const length = series.number_of_seasons;
  const items: Item[] = Array.from({ length }, (_, i) => {
    return { label: `Season ${i + 1}`, value: `${i + 1}` };
  });
  const seasons = createListCollection({
    items,
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label,
  });
  const [season, setSeason] = useState("1");

  return (
    <>
      <Select.Root
        value={[season]}
        onValueChange={(d) => setSeason(d.value[0])}
        collection={seasons}
        size="md"
        maxW="350px"
        variant="subtle"
        my={5}
      >
        <Select.HiddenSelect />
        <Select.Label fontSize="xl" my={3} color="gray.300">
          Select Season
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select Season" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {seasons.items.map((season) => (
                <Select.Item item={season} key={season.value}>
                  {season.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Episodes seriesId={series.id} seasonNumber={parseInt(season)} />
    </>
  );
};
export default Season;
