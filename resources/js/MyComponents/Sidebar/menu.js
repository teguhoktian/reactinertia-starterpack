import { DashboardOutlined, Storage, Tune } from "@mui/icons-material";
const menus = [
    {
        label: "Dashboard",
        icon: DashboardOutlined,
        path: "/dashboard",
        route: 'dashboard'
    },
    {
        label: "Master Data",
        icon: Storage,
        path: "/master",
        route: "master",
        role: ['Admin'],
        submenu: [
            {
                label: "User",
                path: "user",
                route: "user"
            },
            {
                label: "Role & Permission",
                path: "roles-permissions",
                route: "role"
            },
        ],
    },
    {
        label: "Settings",
        icon: Tune,
        path: "/setting",
        route: "setting",
        role: ["Admin"],
    },
];


export default menus;