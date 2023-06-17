import { DashboardOutlined, Storage, Tune } from "@mui/icons-material";
const menus = [
    {
        label: "Dashboard",
        icon: DashboardOutlined,
        path: "/dashboard",
        route: 'dashboard',
        role: true,
    },
    {
        label: "Master Data",
        icon: Storage,
        path: "/master",
        route: "master",
        role: true,
        submenu: [
            {
                label: "User",
                path: "user",
                route: "user.index"
            },
            {
                label: "Role & Permission",
                path: "roles-permissions",
                route: "role.index"
            },
        ],
    },
    {
        label: "Settings",
        icon: Tune,
        path: "/setting",
        route: "setting",
        role: true,
    },
];


export default menus;