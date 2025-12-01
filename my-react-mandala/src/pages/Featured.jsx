import React from 'react';
import { Link } from 'react-router-dom';
import painting1 from '../assets/paintings/painting1.jpg';
import painting2 from '../assets/paintings/painting2.jpg';
import painting3 from '../assets/paintings/painting3.jpg';
import painting5 from '../assets/paintings/painting5.png';
import painting6 from '../assets/paintings/painting6.png';
import painting8 from '../assets/paintings/painting8.png';

const Homepage = () => {
    return (
        <div className="page-container">
            <section style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Featured Masterpieces</h2>
                <div className="product-grid">
                    <Link to="/product/1" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="product-card">
                            <img src={painting1} alt="Ganesha" className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">Lord Ganesha</h3>
                                <p>Remover of Obstacles</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product/2" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="product-card">
                            <img src={painting2} alt="Green Tara" className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">Green Tara</h3>
                                <p>Mother of Liberation</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product/3" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="product-card">
                            <img src={painting3} alt="Mahakala" className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">Mahakala</h3>
                                <p>The Great Protector</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product/5" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="product-card">
                            <img src={painting5} alt="Mandala" className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">Mandala</h3>
                                <p>Circle of Compassion</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product/6" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="product-card">
                            <img src={painting6} alt="Wheel of Life" className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">Wheel of Life</h3>
                                <p>Cycle of Existence</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product/8" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="product-card">
                            <img src={painting8} alt="Manjushri" className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">Manjushri</h3>
                                <p>Wisdom & Insight</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
