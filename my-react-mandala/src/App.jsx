import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import ProductDetail from './pages/productDetail';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
