import { Routes, Route } from "react-router-dom";
import { ResponsiveAppBar } from "./components/header";
import { Home } from "./pages/home";
import { AddNewStadium } from "./pages/stadiums/AddNewStadium";
import { useLocation } from "react-router-dom";
import { Bookings } from "./pages/bookings/ShowBookingsList";
import DashboardLayout from "./pages/dashboard/Dashboard";
import { Stadiums } from "./pages/stadiums/ShowStadiumsList";
import ProfilePage from "./test";
import Footer from "./components/footer";
import AboutUs from "./pages/about";
import Contact from "./pages/contact";
import Auth from "./pages/users/Auth";
import FAQs from "./pages/faqs";
import TermsAndConditions from "./pages/terms";
export function Football() {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/profile", "/test", "/dashboard"];
  const hideFooterRoutes = [
    "/login",
    "/test",
    "/profile",
    "/dashboard",
    "/stadiums",
    "/contact",
    "/faqs",
  ];
  const shouldShowHeader = !hideHeaderRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const shouldShowFooter = !hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div
      style={{ display: "grid", height: "100vh", gridTemplateRows: "auto 1fr" }}
    >
      {shouldShowHeader && <ResponsiveAppBar />}{" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/stadiums/bookings" element={<Bookings />} />
        <Route path="/join-owner" element={<AddNewStadium />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        <Route path="/test" element={<ProfilePage />} />
      </Routes>
      {shouldShowFooter && <Footer></Footer>}
    </div>
  );
}
