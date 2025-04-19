import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import TvSeriesInfoPage from "./pages/TvSeriesInfoPage";
import MovieWatchPage from "./pages/MovieWatchPage";
import TvSeriesWatchPage from "./pages/TVSeriesWatchPage";

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
        path: "/watch/movie/:id",
        element: <MovieWatchPage />,
      },
      {
        path: "/watch/tv/:id/:season/:episode",
        element: <TvSeriesWatchPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);
export default router;
