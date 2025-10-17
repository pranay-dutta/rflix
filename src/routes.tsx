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
import CustomizePage from "./pages/CustomizePage";
import WatchListPage from "./pages/WatchListPage";
import CastPageContainer from "./pages/cast/container/CastPageContainer";

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
        path: "discover/movie",
        element: <MovieDiscoverPage />,
      },
      {
        path: "discover/tv",
        element: <TvDiscoverPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "watchlist",
        element: <WatchListPage />,
      },
      {
        path: "customize",
        element: <CustomizePage />,
      },
      {
        path: "cast/:id",
        element: <CastPageContainer />,
      },
    ],
  },
]);
export default router;
