import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export type WatchListItem = {
  id: number;
  type: "movie" | "tv";
  title: string;
  posterPath: string;
  rating: number;
};

type WishlistStore = {
  watchList: Map<string, WatchListItem>;
  addToWatchList: (item: WatchListItem) => void;
  inWatchList: (type: "movie" | "tv", id: number) => boolean;
  removeFromWatchList: (type: "movie" | "tv", id: number) => void;
  clearWatchList: () => void;
};

const updateWatchList = (newWishlist: Map<string, WatchListItem>) => {
  localStorage.setItem("watchList", JSON.stringify(Array.from(newWishlist.entries())));
};

const useWatchListStore = create<WishlistStore>((set, get) => ({
  watchList: new Map(JSON.parse(localStorage.getItem("watchList") || "[]")),

  // Add an item to the watch list
  addToWatchList: (item) => {
    set((state) => {
      const newWatchList = new Map(state.watchList);
      const itemKey = `${item.type}-${item.id}`;
      newWatchList.set(itemKey, item);
      updateWatchList(newWatchList); // Update local storage
      return { watchList: newWatchList };
    });
  },

  // Check if an item is in the watch list
  inWatchList: (type, id) => get().watchList.has(`${type}-${id}`),

  // Clear the entire watch list
  clearWatchList: () => {
    set(() => {
      localStorage.removeItem("watchList"); // Clear local storage
      return { watchList: new Map() };
    });
  },

  // Remove an item from the watch list
  removeFromWatchList: (type, id) => {
    set((state) => {
      const newWishlist = new Map(state.watchList);
      newWishlist.delete(`${type}-${id}`);
      updateWatchList(newWishlist); // Update local storage
      return { watchList: newWishlist };
    });
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useWishlistStore", useWatchListStore);
}

export default useWatchListStore;
