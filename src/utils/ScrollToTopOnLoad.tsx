import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopOnLoad() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
