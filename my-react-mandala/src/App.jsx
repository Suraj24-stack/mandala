import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './pages/HeroSection';
import Footer from './components/Footer';
import Featured from './pages/Featured';
import Product from './pages/Product';
import ProductDetail from './pages/productDetail';
import Contact from './pages/Contact';
import Inquiry from './pages/Inquiry';
import AdminDashboard from './pages/AdminDashboard';


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}
