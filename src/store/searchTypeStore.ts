import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type SearchTypeStore = {
  searchType: string;
  setSearchType: (type: string) => void;
};

export const search_menu_items = [
  { label: "Movies & TV Shows", value: "Movies & TV Shows" },
  { label: "Movies", value: "Movies" },
  { label: "TV Shows", value: "TV Shows" },
];

export const useSearchType = create<SearchTypeStore>()((set) => ({
  searchType: search_menu_items[0].value,
  setSearchType: (type) => set(() => ({ searchType: type })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("SearchedMediaTypeStore", useSearchType);
}
