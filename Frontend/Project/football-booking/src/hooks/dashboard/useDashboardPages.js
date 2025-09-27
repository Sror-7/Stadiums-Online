import { useEffect, useState } from "react";
import { USER_ROLE } from "../../constants/UserRoles";
import { useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StadiumIcon from "@mui/icons-material/Stadium";
import LogoutIcon from "@mui/icons-material/Logout";
import BookingsIcon from "@mui/icons-material/BookOnline";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import { getStadiumInfoByOwnerID } from "../../features/stadium/stadiumThunk";
import { useSelector } from "react-redux";
export function useDashboardPages() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUserInfo);
  const navigate = useNavigate();
  const [currentUserPages, setCurrentUserPages] = useState([]);
  const [menuItems, setMenueItems] = useState([]);

  function LoadPages() {
    setMenueItems([
      {
        text: "Home",
        icon: <HomeIcon />,
        pageNav: () => {
          navigate("/");
        },
      },
      ...currentUserPages,
      {
        text: "My Account",
        icon: <AccountCircleIcon />,
        pageNav: () => {
          navigate("/dashboard/profile");
        },
      },
      {
        text: "Notifications",
        icon: <NotificationsIcon />,
        pageNav: () => {
          navigate("/dashboard/notifications");
        },
      },
      {
        text: "Logout",
        icon: <LogoutIcon />,
        pageNav: () => {
          sessionStorage.removeItem("stadiumsApp.accessToken");
          localStorage.removeItem("stadiumsApp.accessToken");
          dispatch({ type: "LOGOUT" });
          navigate("/login");
        },
      },
    ]);
  }

  useEffect(() => {
    LoadPages();
  }, [currentUserPages]);
  async function LoadStadiumOwnerPages() {
    const result = await dispatch(
      getStadiumInfoByOwnerID({ ownerID: user.id })
    );
    if (getStadiumInfoByOwnerID.fulfilled.match(result)) {
      setCurrentUserPages([
        {
          text: "Stadium Info",
          icon: <StadiumIcon />,
          pageNav: () => {
            navigate("/dashboard/mystadium");
          },
        },
        {
          text: "Bookings",
          icon: <CalendarMonthIcon />,
          pageNav: () => {
            navigate("/dashboard/bookings");
          },
        },
      ]);
    }
  }
  async function LoadGuestPages() {
    setCurrentUserPages([
      {
        text: "My Bookings",
        icon: <NotificationsIcon />,
        pageNav: () => {
          navigate("/dashboard/mybookings");
        },
      },
      {
        text: "Archive",
        icon: <CalendarMonthIcon />,
        pageNav: () => {
          navigate("/dashboard/archive");
        },
      },
    ]);
  }
  useEffect(() => {
    if (user == null) return;

    switch (user.role) {
      case USER_ROLE.STADIUM_OWNER: {
        LoadStadiumOwnerPages();
        break;
      }
      case USER_ROLE.GUEST: {
        LoadGuestPages();
        break;
      }
      case USER_ROLE.ADMIN: {
        console.log("it's Admin");
        break;
      }
      default: {
        console.log("Non OF Those");
        break;
      }
    }
  }, [user]);

  return { menuItems };
}
