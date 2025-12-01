import React from 'react';
import { useLocation } from 'react-router-dom';

const Inquiry = () => {
    const location = useLocation();
    const productName = location.state?.productName || 'this product';

    return (
        <div className="page-container">
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Product Inquiry</h1>
            <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>
                Interested in <strong style={{ color: 'var(--accent-color)' }}>{productName}</strong>? Fill out the form below and we'll get back to you.
            </p>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input type="text" id="name" placeholder="Your Full Name" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input type="email" id="email" placeholder="your.email@example.com" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="+977 98XXXXXXXX" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product">Product of Interest</label>
                        <input type="text" id="product" value={productName} readOnly style={{ backgroundColor: '#f0f0f0' }} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Your Message *</label>
                        <textarea
                            id="message"
                            placeholder="Please let us know your questions or requirements..."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        Submit Inquiry
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Inquiry;
