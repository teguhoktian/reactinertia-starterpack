import { CircleStackIcon, Cog6ToothIcon, CogIcon, HomeIcon } from "@heroicons/react/24/solid";
const menus = [
    {
        label: "Dashboard",
        icon: HomeIcon,
        path: "/dashboard",
        route: 'dashboard'
    },
    {
        label: "Master Data",
        icon: CircleStackIcon,
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
        icon: CogIcon,
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
        icon: Cog6ToothIcon,
        path: "/log-activity",
        route: "log.activity",
        role: ["Admin"]
    }

];


export default menus;
