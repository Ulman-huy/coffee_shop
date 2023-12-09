import {
  HomeOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  CodeSandboxOutlined,
  UserOutlined,
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
        path: "/admin/customer",
        name: "Customer",
        icon: <UserOutlined />,
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
      {
        path: "/admin/package",
        name: "Package",
        icon: <CodeSandboxOutlined />,
      },
    ],
  },
};
