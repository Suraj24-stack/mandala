import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/product", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-heritage-blue/20 py-3"
          : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link
            to="/"
            className={`text-2xl font-serif font-bold tracking-[0.3em] transition-colors duration-300 ${
              scrolled ? "text-heritage-dark-red" : "text-white drop-shadow-lg"
            }`}
          >
            RAJKUMAR ARTS
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="relative group"
            >
              <Link
                to={link.path}
                className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 relative ${
                  location.pathname === link.path
                    ? scrolled
                      ? "text-heritage-blue font-semibold"
                      : "text-heritage-blue font-semibold drop-shadow-lg"
                    : scrolled
                    ? "text-heritage-charcoal hover:text-heritage-blue"
                    : "text-white/90 hover:text-heritage-blue drop-shadow-md"
                }`}
              >
                {link.label}
                {/* Animated underline */}
                <motion.span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-heritage-blue ${
                    location.pathname === link.path ? "w-full" : "w-0"
                  } group-hover:w-full transition-all duration-300`}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none transition-colors duration-300 ${
            scrolled ? "text-heritage-charcoal" : "text-white"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="space-y-2">
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              transition={{ duration: 0.3 }}
              className="block w-8 h-0.5 bg-current"
            ></motion.span>
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="block w-8 h-0.5 bg-current"
            ></motion.span>
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              transition={{ duration: 0.3 }}
              className="block w-8 h-0.5 bg-current"
            ></motion.span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-t border-heritage-blue/30 overflow-hidden shadow-xl"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="flex flex-col items-center py-8 space-y-6"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -20 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg tracking-[0.2em] uppercase transition-colors duration-300 ${
                      location.pathname === link.path
                        ? "text-heritage-blue font-semibold"
                        : "text-heritage-charcoal hover:text-heritage-blue"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
