import useCustomizationStore from "@/store/customizationStore";
import { useEffect } from "react";

const ChangeFavicon = () => {
  const activePalette = useCustomizationStore((s) => s.activePalette);
  useEffect(() => {
    const changeFavicon = () => {
      const favicon = document.getElementById("favicon");
      favicon?.setAttribute("href", `/${activePalette}.ico`);
    };
    changeFavicon();
  }, [activePalette]);
  return null;
};

export default ChangeFavicon;
