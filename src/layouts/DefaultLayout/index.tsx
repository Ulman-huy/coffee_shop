import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DefaultLayout() {
  return (
    <>
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>
      {/* <Chat /> */}
      <Footer />
    </>
  );
}

export default DefaultLayout;
