import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import TvSeriesInfoPage from "./pages/TvSeriesInfoPage";

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
        element: <MovieInfoPage />,
      },
      {
        path: "/info/tv/:id",
        element: <TvSeriesInfoPage />,
      },
      {
        path: "/watch/:id",
        element: <WatchPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);
export default router;
