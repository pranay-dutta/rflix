import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "swiper/swiper-bundle.css";
import "./index.css";
import Providers from "./providers";
import ChangeFavicon from "./utils/ChangeFavicon";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers />
    <ChangeFavicon />
  </StrictMode>,
);
