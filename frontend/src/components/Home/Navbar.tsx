import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "../../assets/Mung Dev.png";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Features", id: "courses" },
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
    <header className="w-full bg-gradient-to-r from-[#E4004B] to-[#ED775A] px-6 py-4 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <NavLink to="/" className=" tracking-wide p-0">
        <img src={Image} alt="" width={90} height={80}/>
      </NavLink>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            className="relative font-semibold text-white hover:text-[#FAD691] transition-colors"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FAD691] transition-all group-hover:w-full"></span>
          </button>
        ))}
      </nav>

      {/* Desktop Login Button */}
      <div className="hidden md:block">
        <NavLink to="/login">
          <Button className="bg-[#FAD691] text-[#E4004B] hover:bg-[#C9CDCF] font-semibold px-5 rounded-xl shadow-md">
            Login
          </Button>
        </NavLink>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FAD691]"
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
            className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#E4004B] to-[#ED775A] shadow-lg flex flex-col p-8 z-50 md:hidden"
          >
            <div className="flex flex-col gap-6 text-white">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="text-lg hover:text-[#FAD691] transition-colors font-medium text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full py-3 bg-[#FAD691] text-[#E4004B] hover:bg-[#C9CDCF] font-semibold rounded-xl shadow-md">
                Login
              </Button>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
