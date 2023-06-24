import { DashboardOutlined, ReceiptLong, Storage, Tune } from "@mui/icons-material";
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
        submenu: [
            {
                label: "General",
                path: "general",
                route: "general"
            },
            {
                label: "Backup DB",
                path: "backup",
                route: "backup"
            },
        ],
    },
    {
        label: "Logs Activity",
        icon: ReceiptLong,
        path: "/log-activity",
        route: "log.activity",
        role: ["Admin"]
    }

];


export default menus;