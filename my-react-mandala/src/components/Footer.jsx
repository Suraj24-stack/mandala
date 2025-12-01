import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>MANDALA</h3>
                    <p>Preserving the sacred art of the Himalayas through authentic Thangka paintings.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/product">Products</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/inquiry">Inquiry</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <p>123 Mandala Street, Design District</p>
                    <p>Kathmandu, Nepal</p>
                    <p>Email: rajkumarranamagar23@gmail.com</p>
                    <p>Phone: +977 9841049414</p>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">Facebook</a>
                        <a href="#" aria-label="Instagram">Instagram</a>
                        <a href="#" aria-label="Twitter">Twitter</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 MANDALA. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
