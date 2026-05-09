import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type SearchDialogStore = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const useSearchDialogStore = create<SearchDialogStore>()((set) => ({
  isOpen: false,
  setOpen: (open) => set(() => ({ isOpen: open })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("SearchDialogStore", useSearchDialogStore);
}