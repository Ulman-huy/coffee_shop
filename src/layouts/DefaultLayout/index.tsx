import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ConfigProvider } from "antd";

function DefaultLayout() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f88630",
          fontSize: 16
        },
      }}
    >
      <div className="h-screen pt-[80px]">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default DefaultLayout;
