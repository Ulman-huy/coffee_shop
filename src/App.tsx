import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/navigation";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Sigup from "./pages/Sigup";
import HeaderOnly from "./layouts/HeaderOnly";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import { GlobalContext } from "./context";
import { useState } from "react";
import Lottie from "lottie-react";
import loadingLottie from "./assets/lottie/loading.json";
import Store from "./pages/Store";
import Discover from "./pages/Discover";

export const routers: any = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/callback",
        element: <Callback />,
      },
    ],
  },
  {
    element: <HeaderOnly />,
    children: [
      {
        path: "/sigup",
        element: <Sigup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routers);

function App() {
  const [loading, setLoading] = useState(false);

  const context = { loading, setLoading };

  return (
    <GlobalContext.Provider value={context}>
      {loading && (
        <div className="fixed z-10 top-0 flex items-center justify-center h-screen bg-[#11111150] pointer-events-none">
          <div className="w-[25%]">
            <Lottie animationData={loadingLottie} loop />
          </div>
        </div>
      )}
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
}

export default App;
