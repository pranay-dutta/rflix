import useCustomizationStore from "@/store/customizationStore";
import { useEffect } from "react";

const useChangeScrollbarColor = () => {
  const activePalette = useCustomizationStore((s) => s.activePalette);

  //change scrollbar color to match active palette
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--scrollbar-color",
      activePalette,
    );
  }, [activePalette]);
};

export default useChangeScrollbarColor;
