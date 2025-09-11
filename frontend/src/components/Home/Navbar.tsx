import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Courses", id: "courses" },
  { name: "About", id: "about" },
  { name: "Testimonials", id: "testimonials" },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false); // tutup menu mobile setelah klik
  };

  return (
    <header className="w-full bg-white px-6 py-4 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <NavLink to="/" className="text-xl font-bold">
        LMS App
      </NavLink>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            className="hover:text-blue-600 transition-colors font-bold"
          >
            {link.name}
          </button>
        ))}
      </nav>

      {/* Desktop Login Button */}
      <div className="hidden md:block">
        <NavLink to="/login">
          <Button>Login</Button>
        </NavLink>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <span className="text-2xl">&times;</span>
        ) : (
          <span className="text-2xl">&#9776;</span>
        )}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg flex flex-col p-8 z-50 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="text-lg hover:text-blue-600 transition-colors font-medium text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full py-3">Login</Button>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
