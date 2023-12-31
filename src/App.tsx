import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/navigation";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Product from "./pages/Product";
import HeaderOnly from "./layouts/HeaderOnly";
import Login from "./pages/Authentication/Login";
import Callback from "./pages/Callback";
import { GlobalContext } from "./context";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingLottie from "./assets/lottie/loading.json";
import Store from "./pages/Store";
import Discover from "./pages/Discover";
import Sigup from "./pages/Authentication/Sigup";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ChangePassword from "./pages/Authentication/ChangePassword";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import CreateProduct from "./pages/admin/Products/CreateProduct";
import ProductDetail from "./pages/Product/ProductDetail";
import { GET } from "./service";
import ProductPreview from "./components/ProductPreview";
import { ProductType } from "./types";
import Cart from "./pages/Cart";
import { ConfigProvider } from "antd";
import vi_VN from "antd/locale/vi_VN";
import Package from "./pages/Package";
import PackageDetail from "./pages/Package/PackageDetail";
import Wishlist from "./pages/Wishlist";
import PackageManager from "./pages/admin/PackageManager";
import CustomerManager from "./pages/admin/CustomerManager";

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
        path: "/products/:_id/:slug",
        element: <ProductDetail />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/package",
        element: <Package />,
      },
      {
        path: "/package/:_id",
        element: <PackageDetail />,
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
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/products",
        element: <Products />,
      },
      {
        path: "/admin/products/create",
        element: <CreateProduct />,
      },
      {
        path: "/admin/package",
        element: <PackageManager />,
      },
      {
        path: "/admin/customer",
        element: <CustomerManager />,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isGetUp, setIsGetUp] = useState(false);
  const [productPreview, setProductPreview] = useState<ProductType>();

  const getUp = async () => {
    const options = {
      url: "get-up",
    };
    await GET(options).finally(() => setIsGetUp(!isGetUp));
  };

  const getUpToServer = () => {
    setInterval(() => {
      getUp();
    }, 300000);
  };

  useEffect(() => {
    getUpToServer();
  }, [isGetUp]);

  const context = {
    loading,
    setLoading,
    isPreview,
    setIsPreview,
    setProductPreview,
  };

  useEffect(() => {
    if (!isPreview) {
      setProductPreview(undefined);
    }
  }, [isPreview]);

  return (
    <GlobalContext.Provider value={context}>
      <ConfigProvider
        locale={vi_VN}
        theme={{ token: { colorPrimary: "#f88630" } }}
      >
        {loading && (
          <div className="fixed z-10 top-0 flex items-center justify-center h-screen bg-[#11111150] pointer-events-none">
            <div className="w-[25%]">
              <Lottie animationData={loadingLottie} loop />
            </div>
          </div>
        )}
        <RouterProvider router={router} />
        <ProductPreview
          visible={isPreview}
          setVisible={setIsPreview}
          product={productPreview}
        />
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default App;
