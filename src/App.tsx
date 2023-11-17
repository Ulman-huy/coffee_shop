import "swiper/css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Sigup from "./pages/Sigup";
import HeaderOnly from "./layouts/HeaderOnly";
import Login from "./pages/Login";
import Callback from "./pages/Callback";

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
  return <RouterProvider router={router} />;
}

export default App;
