import {
  HomeOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default {
  route: {
    path: "/admin",
    routes: [
      {
        path: "/admin",
        name: "Dashboard",
        icon: <HomeOutlined />,
      },
      {
        path: "/admin/prd",
        name: "Products",
        icon: <AppstoreAddOutlined />,
        routes: [
          {
            path: "/admin/products",
            name: "Products All",
            icon: <UnorderedListOutlined />,
          },
          {
            path: "/admin/products/create",
            name: "Create Product",
            icon: <PlusOutlined />,
          },
        ],
      },
    ],
  },
};
