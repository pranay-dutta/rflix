import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./ui/provider";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { dark } from "@clerk/themes";
import router from "./routes";

const queryClient = new QueryClient();
const { VITE_CLERK_PUBLISHABLE_KEY } = import.meta.env;
if (!VITE_CLERK_PUBLISHABLE_KEY) throw new Error("Missing Publishable Key");

const Providers = () => {
  return (
    <ClerkProvider
      publishableKey={VITE_CLERK_PUBLISHABLE_KEY}
      appearance={{ baseTheme: dark }}
    >
      <QueryClientProvider client={queryClient}>
        <Provider>
          <RouterProvider router={router} />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </Provider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default Providers;
