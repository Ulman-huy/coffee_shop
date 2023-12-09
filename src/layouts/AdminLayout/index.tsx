import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { Breadcrumb, ConfigProvider, Typography } from "antd";
import { useTranslation } from "react-i18next";
import FooterAdmin from "../components/FooterAdmin";
import HeaderAdmin from "../components/HeaderAdmin";
import defaultProps from "../../pages/admin/_defaultProps";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useSelector } from "react-redux";

function AdminLayout() {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [pathname, setPathname] = useState<string>("");
  const { width } = useWindowDimensions();
  const [path, setPath] = useState<{ title: string }[]>([]);
  const user = useSelector((state: any) => state.user.data);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    setPathname(currentPath !== "/" ? currentPath : "/");
  }, [location.pathname, width]);

  useEffect(() => {
    setPath(() => {
      const pathNameArray = location.pathname
        .slice(7)
        .split("/")
        .map((item: string) => ({ title: t(`${item}`) }));
      return pathNameArray;
    });
  }, [location.pathname]);

  useEffect(() => {
    if (user?.role != "ADMIN") {
      navigate("/");
    }
  }, []);

  return (
    <ConfigProvider
      theme={{ token: { fontSize: 15, colorPrimary: "#f88630" } }}
    >
      <ProLayout
        prefixCls="my-prefix"
        locale="en-US"
        title="Coffee Shop"
        navTheme="light"
        collapsed={isShow}
        fixSiderbar={true}
        logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReurPZGpAy4GXkIPzgzcJdimbQNwYahdFjVg&usqp=CAU"
        onCollapse={(collapsed) => {
          width < 915 && !isShow ? setIsShow(collapsed) : setIsShow(collapsed);
        }}
        logoStyle={{ height: 54 }}
        location={{
          pathname: pathname,
        }}
        {...defaultProps}
        pageTitleRender={(_item: any, dom: any, route: any) => {
          return dom === "" ? "" : route.pageName;
        }}
        subMenuItemRender={(item: any) => {
          return (
            <div className="flex items-center gap-2">
              <span className={`${isShow && "relative left-3 top-[-3px]"}`}>
                {item.icon}
              </span>
              <span
                className={`ms-2 relative ${isShow && "left-5"} top-[-2px]`}
              >
                {t(`${item.name.toLocaleLowerCase()}`)}
              </span>
            </div>
          );
        }}
        menuItemRender={(menuItemProps) => {
          return (
            <span
              onClick={() => {
                setPathname(menuItemProps.path ? menuItemProps.path : "/");
              }}
            >
              <Link
                to={`${menuItemProps.path}`}
                className={`flex ${
                  isShow ? "gap-3 relative top-[-3px]" : "gap-1"
                }`}
              >
                <span className={`${isShow && "relative left-3"}`}>
                  {menuItemProps.icon}
                </span>
                &nbsp;
                <span>{t(`${menuItemProps.name?.toLocaleLowerCase()}`)}</span>
              </Link>
            </span>
          );
        }}
        collapsedButtonRender={() => {
          return (
            <span
              className="button-collapsed text-black"
              onClick={() => setIsShow(!isShow)}
            >
              {isShow ? <BsArrowBarRight /> : <BsArrowBarLeft />}
            </span>
          );
        }}
        onMenuHeaderClick={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }}
        footerRender={() => <FooterAdmin />}
        selectedKeys={[pathname]}
      >
        <PageContainer
          pageHeaderRender={() => <HeaderAdmin />}
          childrenContentStyle={{ padding: 24 }}
        >
          {location.pathname != "/admin" && (
            <>
              <Breadcrumb
                items={[{ title: t("common.home") }, ...path]}
              ></Breadcrumb>
              <Typography.Title level={4} className="mt-2">
                {path[path.length - 1]?.title}
              </Typography.Title>
            </>
          )}
          <Outlet />
        </PageContainer>
      </ProLayout>
    </ConfigProvider>
  );
}

export default AdminLayout;
