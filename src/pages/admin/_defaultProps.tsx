import {
  HomeOutlined,
  AntDesignOutlined,
  MacCommandOutlined,
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
        path: "/admin/example",
        name: "Example",
        icon: <AntDesignOutlined />,
        routes: [
          {
            path: "/admin/example/children",
            name: "Children",
            icon: <MacCommandOutlined />,
          },
        ],
      },
    ],
  },
};
