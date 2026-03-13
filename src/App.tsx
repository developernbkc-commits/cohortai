import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Thanks from "./pages/Thanks";
import Register from "./pages/Register";
import AdminConsole from "./pages/AdminConsole";
import Platform from "./pages/Platform";
import Reviews from "./pages/Reviews";
import Quiz from "./pages/Quiz";
import Recommendation from "./pages/Recommendation";
import AdminProgramStudio from "./pages/admin/AdminProgramStudio";
import AdminCouponGovernance from "./pages/admin/AdminCouponGovernance";
import AdminAccess from "./pages/AdminAccess";
import StickyBar from "./components/StickyBar";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentsOps from "./pages/admin/PaymentsOps";
import RegistrationsOps from "./pages/admin/RegistrationsOps";

export default function App() {
  const location = useLocation();
  const isAdminSurface = location.pathname.startsWith('/admin');
  const mainPadding = isAdminSurface ? '' : 'pt-16';

  return (
    <div className="min-h-screen font-display page-shell">
      <ScrollToTop />
      {!isAdminSurface && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28, ease: "easeOut" }} className={mainPadding}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/admin-access" element={<AdminAccess />} />
            <Route path="/admin" element={<ProtectedRoute><AdminConsole /></ProtectedRoute>} />
            <Route path="/admin/program-studio" element={<ProtectedRoute><AdminProgramStudio /></ProtectedRoute>} />
            <Route path="/admin/coupons" element={<ProtectedRoute><AdminCouponGovernance /></ProtectedRoute>} />
            <Route path="/admin/payments" element={<ProtectedRoute><PaymentsOps /></ProtectedRoute>} />
            <Route path="/admin/registrations" element={<ProtectedRoute><RegistrationsOps /></ProtectedRoute>} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/thanks" element={<Thanks />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {!isAdminSurface && <Footer />}
      {!isAdminSurface && <StickyBar />}
    </div>
  );
}
