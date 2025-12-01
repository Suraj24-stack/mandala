import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MANDALA
                </Link>
                <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className={`nav-links ${isActive('/')}`} onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/product" className={`nav-links ${isActive('/product')}`} onClick={() => setIsOpen(false)}>
                            Product
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className={`nav-links ${isActive('/contact')}`} onClick={() => setIsOpen(false)}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
