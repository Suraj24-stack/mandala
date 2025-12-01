import React from 'react';
import { Link } from 'react-router-dom';
import painting1 from '../assets/paintings/painting1.jpg';
import painting2 from '../assets/paintings/painting2.jpg';
import painting3 from '../assets/paintings/painting3.jpg';
import painting4 from '../assets/paintings/painting4.jpg';
import painting5 from '../assets/paintings/painting5.png';
import painting6 from '../assets/paintings/painting6.png';
import painting7 from '../assets/paintings/painting7.png';
import painting8 from '../assets/paintings/painting8.png';

const products = [
    {
        id: 1,
        name: 'Lord Ganesha Thangka',
        image: painting1,
        description: 'Intricate Thangka painting of Lord Ganesha, the remover of obstacles.'
    },
    {
        id: 2,
        name: 'Green Tara',
        image: painting2,
        description: 'Beautiful depiction of Green Tara, the Mother of Liberation.'
    },
    {
        id: 3,
        name: 'Mahakala',
        image: painting3,
        description: 'Fierce and protective deity Mahakala, a symbol of power.'
    },
    {
        id: 4,
        name: 'White Tara',
        image: painting4,
        description: 'Serene White Tara, representing compassion and longevity.'
    },
    {
        id: 5,
        name: 'Mandala of Compassion',
        image: painting5,
        description: 'A highly detailed geometric Mandala representing the universe and compassion.'
    },
    {
        id: 6,
        name: 'Wheel of Life',
        image: painting6,
        description: 'Traditional Bhavachakra depicting the cycle of existence and samsara.'
    },
    {
        id: 7,
        name: 'Life of Buddha',
        image: painting7,
        description: 'Narrative Thangka illustrating key moments from the life of Siddhartha Gautama.'
    },
    {
        id: 8,
        name: 'Manjushri',
        image: painting8,
        description: 'The Bodhisattva of Wisdom, wielding the flaming sword of insight.'
    }
];

const Product = () => {
    return (
        <div className="page-container">
            <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Ancient Thangka Collection</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">{product.name}</h3>
                                <p>{product.description}</p>
                                {/* Price is intentionally omitted */}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Product;
