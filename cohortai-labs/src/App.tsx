import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminSchedule from "./pages/AdminSchedule";
import Quiz from "./pages/Quiz";
import Mentors from "./pages/Mentors";
import Locations from "./pages/Locations";
import Thanks from "./pages/Thanks";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen font-display pearl-bg">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pt-16"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/schedule" element={<AdminSchedule />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/thanks" element={<Thanks />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <FloatingCTA />
      <Footer />
    </div>
  );
}
