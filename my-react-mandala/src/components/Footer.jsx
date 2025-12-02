import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-heritage-charcoal bg-blue-700 text-white py-12 mt-auto border-t-4 border-heritage-dark-red">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-heritage-dark-red tracking-wide">
            RAJKUMAR ARTS
          </h3>
          <p className="text-gray-300 font-light leading-relaxed">
            Preserving the sacred art of the Himalayas through authentic Thangka
            paintings.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-serif text-heritage-cream border-b border-heritage-blue/30 pb-2 inline-block">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-heritage-blue transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="text-gray-300 hover:text-heritage-blue transition-colors duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-heritage-blue transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/inquiry"
                className="text-gray-300 hover:text-heritage-blue transition-colors duration-300"
              >
                Inquiry
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-serif text-heritage-cream border-b border-heritage-blue/30 pb-2 inline-block">
            Contact Info
          </h4>
          <div className="text-gray-300 space-y-2 font-light">
            <p>Changathali, Mahalaxmi Municipality</p>
            <p>Lalitpur, Nepal</p>
            <p>Email: rajkumarranamagar23@gmail.com</p>
            <p>Phone: +977 9841049414</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-serif text-heritage-cream border-b border-heritage-blue/30 pb-2 inline-block">
            Follow Us
          </h4>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-300 hover:text-heritage-blue transition-colors duration-300"
            >
              Facebook
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-300 hover:text-heritage-blue transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-300 hover:text-heritage-blue transition-colors duration-300"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-gray-400 font-light text-sm">
        <p>&copy; 2025 MANDALA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
