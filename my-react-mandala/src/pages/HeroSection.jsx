import React from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import painting1 from '../assets/paintings/painting1.jpg';
import painting2 from '../assets/paintings/painting2.jpg';
import painting3 from '../assets/paintings/painting3.jpg';
import painting4 from '../assets/paintings/painting4.jpg';
import painting5 from '../assets/paintings/painting5.png';
import painting6 from '../assets/paintings/painting6.png';
import painting8 from '../assets/paintings/painting8.png';

gsap.registerPlugin(useGSAP);

const heroImages = [
    { id: 1, image: painting4, title: 'White Tara', description: 'Symbol of compassion and longevity' },
    { id: 2, image: painting5, title: 'Mandala of Compassion', description: 'Sacred geometric representation' },
    { id: 3, image: painting6, title: 'Wheel of Life', description: 'The cycle of existence' },
    { id: 4, image: painting8, title: 'Manjushri', description: 'Bodhisattva of Wisdom' }
];

const HeroSection = () => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        gsap.from('.hero-main-title', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
        gsap.from('.hero-main-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.8 });
        gsap.from('.btn-primary', { opacity: 0, scale: 0.8, duration: 0.5, delay: 1.2 });
    });

    const currentImage = heroImages[currentImageIndex];

    return (
        <div className="page-container">
            <section
                className="hero-section"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${currentImage.image})`,
                    transition: 'background-image 1s ease-in-out'
                }}
            >
                <h1 className="hero-main-title">Sacred Art of the Himalayas</h1>
                <p className="hero-main-subtitle">{currentImage.title} - {currentImage.description}</p>
                <Link to="/product" className="btn-primary">View Collection</Link>
            </section>

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

export default HeroSection;
