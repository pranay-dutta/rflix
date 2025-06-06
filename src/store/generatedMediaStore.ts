import { create } from "zustand";

type GeneratedMedia = {
  id: number;
  type: "tv" | "movie";
};
type GeneratedMediaStore = {
  aiError: boolean;
  generatedMedia: GeneratedMedia;
  setAiError: (isError: boolean) => void;
  setGeneratedMedia: (newMedia: GeneratedMedia) => void;
};

export const useGeneratedMedia = create<GeneratedMediaStore>()((set) => ({
  aiError: false,
  generatedMedia: { id: 1, type: "tv" },
  setAiError: (isError: boolean) => set({ aiError: isError }),
  setGeneratedMedia: (newMedia) => set({ generatedMedia: newMedia }),
}));
