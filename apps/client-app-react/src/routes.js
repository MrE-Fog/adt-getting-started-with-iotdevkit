/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Settings from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FloorsIcon from "@material-ui/icons/House";
import RoomIcon from "@material-ui/icons/Room";
import DeviceIcon from "@material-ui/icons/Devices";

// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/DashboardPage";
import FloorsPage from "./views/Floors/FloorsPage";
import RoomsPage from "./views/Rooms/RoomsPage";
import DevicesPage from "./views/Devices/DevicesPage";
import SettingsPage from "./views/Settings/SettingsPage";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",  
    icon: DashboardIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/location",
    name: "Floors",  
    icon: FloorsIcon,
    component: FloorsPage,
    layout: "/admin"
  },
  {
    path: "/rooms",
    name: "Rooms",  
    icon: RoomIcon,
    component: RoomsPage,
    layout: "/admin"
  },
  {
    path: "/devices",
    name: "Devices",  
    icon: DeviceIcon,
    component: DevicesPage,
    layout: "/admin"
  }, 
  {
    path: "/settings",
    name: "Settings",
    icon: Settings,
    component: SettingsPage,
    layout: "/admin"
  } 
  
];

export default dashboardRoutes;
