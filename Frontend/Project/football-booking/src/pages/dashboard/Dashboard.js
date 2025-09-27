import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import Notifications from "./mainSettings/Notifications";
import { Routes, Route } from "react-router-dom";
import { Profile } from "../users/Profile";
import MenuIcon from "@mui/icons-material/Menu";
import { useDashboardPages } from "../../hooks/dashboard/useDashboardPages";
import { StadiumInformation } from "../stadiums/StadiumInformation";
import { BookingsArchive } from "../guest/BookingsArchive";
import { MyBookings } from "../guest/MyBookings";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../../components/notification/NotificationDropdown";
import { useNotifications } from "../../hooks/notifications/useNotifications";
import Bookings from "./stadiumOwnerPages/bookings/Bookings";
export default function DashboardLayout() {
  const {
    notifications,
    LoadNotifications,

    markAllAsRead,
  } = useNotifications();

  useEffect(() => {
    LoadNotifications();
  }, []);

  const navigate = useNavigate();
  // const currentUser = useSelector((state) => state.user.currentUserInfo);

  // useEffect(() => {
  //   if (currentUser.role === "StadiumOwner") navigate("/dashboard/stadiuminfo");
  //   else if (currentUser.role === "Guest") navigate("/dashboard/mybookings");
  // }, [currentUser]);
  useEffect(() => {
    navigate("/dashboard/profile");
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { menuItems } = useDashboardPages();
  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard Layout
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={notificationCounts} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <NotificationDropdown
            notifications={notifications}
            onMarkAllRead={markAllAsRead}
          />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, marginTop: "59px" }} role="presentation">
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  if (item.pageNav) {
                    item.pageNav();
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />

          {/* Owner Stadium Pages */}
          <Route path="mystadium" element={<StadiumInformation />} />
          <Route path="bookings" element={<Bookings />} />

          {/* Player Or Guest Pages */}
          <Route path="mybookings" element={<MyBookings />} />
          <Route path="archive" element={<BookingsArchive />} />
        </Routes>
      </Box>
    </Box>
  );
}
