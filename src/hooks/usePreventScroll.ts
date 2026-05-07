import { useEffect } from "react";

const usePreventScroll = (locked: boolean) => {
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = locked ? "hidden" : "";

    return () => {
      // Clean up the style on unmount
      html.style.overflow = "";
    };
  }, [locked]);
};
export default usePreventScroll;
