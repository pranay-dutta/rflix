import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import InfoPage from "./pages/InfoPage";
import InfoPageCopy from "./pages/InfoPageCopy";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/info/movie/:id",
        element: <InfoPage />,
      },
      {
        path: "/info/tv/:id",
        element: <h1>Tv info page</h1>,
      },
      {
        path: "/watch/:id",
        element: <WatchPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/info-copy/:id",
        element: <InfoPageCopy />,
      },
    ],
  },
]);
export default router;
