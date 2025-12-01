import React from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import painting1 from '../assets/paintings/painting1.jpg';
import painting2 from '../assets/paintings/painting2.jpg';
import painting3 from '../assets/paintings/painting3.jpg';
import painting4 from '../assets/paintings/painting4.jpg';

gsap.registerPlugin(useGSAP);

const Homepage = () => {
    useGSAP(() => {
        gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
        gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.8 });
        gsap.from('.btn-primary', { opacity: 0, scale: 0.8, duration: 0.5, delay: 1.2 });
    });

    return (
        <div className="page-container">
            <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${painting4})` }}>
                <h1 className="hero-title">Sacred Art of the Himalayas</h1>
                <p className="hero-subtitle">Discover the spiritual depth of ancient Thangka paintings</p>
                <Link to="/product" className="btn-primary">View Collection</Link>
            </section>

            <section style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Featured Masterpieces</h2>
                <div className="product-grid">
                    <div className="product-card">
                        <img src={painting1} alt="Ganesha" className="product-image" />
                        <div className="product-info">
                            <h3 className="product-title">Lord Ganesha</h3>
                            <p>Remover of Obstacles</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <img src={painting2} alt="Green Tara" className="product-image" />
                        <div className="product-info">
                            <h3 className="product-title">Green Tara</h3>
                            <p>Mother of Liberation</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <img src={painting3} alt="Mahakala" className="product-image" />
                        <div className="product-info">
                            <h3 className="product-title">Mahakala</h3>
                            <p>The Great Protector</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
