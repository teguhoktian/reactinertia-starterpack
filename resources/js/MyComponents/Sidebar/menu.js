import { DashboardOutlined, Storage, Tune } from "@mui/icons-material";
const menus = [
    {
        label: "Dashboard",
        icon: DashboardOutlined,
        path: "dashboard",
        role: true,
    },
    {
        label: "Master Data",
        icon: Storage,
        path: "master",
        role: true,
        submenu: [
            {
                label: "User",
                path: "user",
            },
            {
                label: "Role & Permission",
                path: "roles-permissions",
            },
        ],
    },
    {
        label: "Settings",
        icon: Tune,
        path: "setting",
        role: true,
    },
];


export default menus;