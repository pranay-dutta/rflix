import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import TvSeriesInfoPage from "./pages/TvSeriesInfoPage";
import MovieWatchPage from "./pages/MovieWatchPage";
import TvSeriesWatchPage from "./pages/TVSeriesWatchPage";
import MovieGrid from "./components/MovieGrid";
import AboutPage from "./pages/AboutPage";
import TvSeriesGrid from "./components/TvSeriesGrid";
import MovieDiscoverPage from "./pages/MovieDiscoverPage";
import TvDiscoverPage from "./pages/TvDiscoverPage";

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
        path: "movies/:tag",
        element: <MovieGrid />,
      },
      {
        path: "tvshows/:tag",
        element: <TvSeriesGrid />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "discover/movie",
        element: <MovieDiscoverPage />
      },
      {
        path: "discover/tv",
        element: <TvDiscoverPage />
      }
    ],
  },
]);
export default router;
