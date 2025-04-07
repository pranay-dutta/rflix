import { Provider } from "@/ui/provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "./index.css";
import router from "./routes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
        <ReactQueryDevtools buttonPosition="bottom-right" />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
