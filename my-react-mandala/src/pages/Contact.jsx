import React from 'react';

const Contact = () => {
    return (
        <div className="page-container">
            <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Contact Us</h1>
            <div className="contact-container">
                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p style={{ marginBottom: '2rem' }}>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3>Visit Us</h3>
                        <p>123 Mandala Street, Design District</p>
                        <p>Kathmandu, Nepal</p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3>Email Us</h3>
                        <p>rajkumarranamagar23@gmail.com</p>
                    </div>

                    <div>
                        <h3>Call Us</h3>
                        <p>+977 9841049414</p>
                    </div>
                </div>

                <div className="contact-form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" placeholder="Your Message"></textarea>
                        </div>
                        <button type="submit" className="btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
