import { createBrowserRouter } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import CastPageContainer from "./pages/cast/container/CastPageContainer";
import CustomizePage from "./pages/customization/CustomizePage";
import DiscoverPage from "./pages/discover/DiscoverPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import MovieInfoPage from "./pages/MovieInfoPage";
import MoviePage from "./pages/MoviePage";
import MovieWatchPage from "./pages/MovieWatchPage";
import SearchPage from "./pages/SearchPage";
import TVPage from "./pages/TVPage";
import TvSeriesInfoPage from "./pages/TvSeriesInfoPage";
import TvSeriesWatchPage from "./pages/TVSeriesWatchPage";
import WatchListPage from "./pages/WatchListPage";

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
        path: "movies",
        element: <MoviePage />,
      },
      {
        path: "tv",
        element: <TVPage />,
      },
      {
        path: "discover",
        element: <DiscoverPage />,
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
