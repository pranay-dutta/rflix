import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import TvSeriesInfoPage from "./pages/TvSeriesInfoPage";
import MovieWatchPage from "./pages/MovieWatchPage";
import TvSeriesWatchPage from "./pages/TVSeriesWatchPage";
import MovieGrid from "./components/MovieGrid";
import TvSereisGrid from "./components/TvSeriesGrid";
import DonatePage from "./pages/DonatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "info/movie/:id",
        element: <MovieInfoPage />,
      },
      {
        path: "info/tv/:id",
        element: <TvSeriesInfoPage />,
      },
      {
        path: "watch/movie/:id",
        element: <MovieWatchPage />,
      },
      {
        path: "watch/tv/:id/:season/:episode",
        element: <TvSeriesWatchPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "movies/*",
        element: <MovieGrid />,
      },
      {
        path: "tvshows/*",
        element: <TvSereisGrid />,
      },
      {
        path: "donate",
        element: <DonatePage />,
      },
    ],
  },
]);
export default router;
