import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // children: [
    //   {
    //     index: true,
    //     // element: <HomePage />,
    //   },
    //   {
    //     path: "/watch/:id",
    //     element: <WatchPage />,
    //   },
    // ],
  },
]);
export default router;
