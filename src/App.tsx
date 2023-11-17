import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/404";
import Home from "./pages/Home";

export const routers: any = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
