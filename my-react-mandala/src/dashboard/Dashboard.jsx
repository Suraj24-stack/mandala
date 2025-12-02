import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Products state
    const [products, setProducts] = useState([
        { id: 1, name: 'Lord Ganesha Thangka', status: 'Active', sales: 12, category: 'Thangka Paintings', image: '/assets/paintings/painting1.jpg' },
        { id: 2, name: 'Green Tara', status: 'Active', sales: 8, category: 'Buddhist Deities', image: '/assets/paintings/painting2.jpg' },
        { id: 3, name: 'Mahakala', status: 'Active', sales: 15, category: 'Buddhist Deities', image: '/assets/paintings/painting3.jpg' },
        { id: 4, name: 'White Tara', status: 'Active', sales: 10, category: 'Thangka Paintings', image: '/assets/paintings/painting4.jpg' }
    ]);

    // Inquiries/Contacts state
    const [inquiries, setInquiries] = useState([
        { id: 1, product: 'Lord Ganesha', customer: 'John Doe', email: 'john@example.com', phone: '+977 9841234567', message: 'Interested in purchasing', date: '2025-12-01', status: 'Pending' },
        { id: 2, product: 'Green Tara', customer: 'Jane Smith', email: 'jane@example.com', phone: '+977 9849876543', message: 'Need more details', date: '2025-11-30', status: 'Responded' },
        { id: 3, product: 'Mahakala', customer: 'Bob Wilson', email: 'bob@example.com', phone: '+977 9847654321', message: 'Bulk order inquiry', date: '2025-11-29', status: 'Pending' }
    ]);

    // Form states
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [showViewInquiryModal, setShowViewInquiryModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        category: 'Thangka Paintings',
        specifications: '',
        image: null,
        status: 'Active'
    });

    // Product handlers
    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = {
            id: products.length + 1,
            name: newProduct.name,
            status: newProduct.status,
            sales: 0,
            category: newProduct.category,
            image: newProduct.image ? URL.createObjectURL(newProduct.image) : '/default-image.jpg'
        };
        setProducts([...products, product]);
        setShowAddProductModal(false);
        setNewProduct({ name: '', description: '', category: 'Thangka Paintings', specifications: '', image: null, status: 'Active' });
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowEditProductModal(true);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        setProducts(products.map(p => p.id === selectedProduct.id ? selectedProduct : p));
        setShowEditProductModal(false);
        setSelectedProduct(null);
    };

    // Inquiry handlers
    const handleViewInquiry = (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowViewInquiryModal(true);
    };

    const handleUpdateInquiryStatus = (id, newStatus) => {
        setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
    };

    const handleDeleteInquiry = (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            setInquiries(inquiries.filter(i => i.id !== id));
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <Link to="/" className="btn-secondary">Back to Site</Link>
            </div>

            <div className="admin-tabs">
                <button className={activeTab === 'overview' ? 'tab-active' : ''} onClick={() => setActiveTab('overview')}>
                    Overview
                </button>
                <button className={activeTab === 'products' ? 'tab-active' : ''} onClick={() => setActiveTab('products')}>
                    Products
                </button>
                <button className={activeTab === 'inquiries' ? 'tab-active' : ''} onClick={() => setActiveTab('inquiries')}>
                    Inquiries
                </button>
            </div>

            <div className="admin-content">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="overview-section">
                        <h2>Dashboard Overview</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Products</h3>
                                <p className="stat-number">{products.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Inquiries</h3>
                                <p className="stat-number">{inquiries.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Pending Inquiries</h3>
                                <p className="stat-number">{inquiries.filter(i => i.status === 'Pending').length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Sales</h3>
                                <p className="stat-number">{products.reduce((sum, p) => sum + p.sales, 0)}</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Recent Inquiries</h3>
                            <div className="recent-inquiries">
                                {inquiries.slice(0, 3).map(inquiry => (
                                    <div key={inquiry.id} className="inquiry-card">
                                        <div>
                                            <strong>{inquiry.customer}</strong>
                                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{inquiry.product}</p>
                                        </div>
                                        <span className={`status-badge ${inquiry.status.toLowerCase()}`}>{inquiry.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <div className="products-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2>Manage Products</h2>
                            <button className="btn-primary" onClick={() => setShowAddProductModal(true)}>
                                + Add New Product
                            </button>
                        </div>

                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Sales</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td><span className="status-badge">{product.status}</span></td>
                                        <td>{product.sales}</td>
                                        <td>
                                            <button className="btn-small" onClick={() => handleEditProduct(product)}>Edit</button>
                                            <button className="btn-small btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* INQUIRIES TAB */}
                {activeTab === 'inquiries' && (
                    <div className="inquiries-section">
                        <h2>Customer Inquiries & Contacts</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Customer</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map(inquiry => (
                                    <tr key={inquiry.id}>
                                        <td>{inquiry.id}</td>
                                        <td>{inquiry.product}</td>
                                        <td>{inquiry.customer}</td>
                                        <td>{inquiry.email}</td>
                                        <td>{inquiry.date}</td>
                                        <td><span className={`status-badge ${inquiry.status.toLowerCase()}`}>{inquiry.status}</span></td>
                                        <td>
                                            <button className="btn-small" onClick={() => handleViewInquiry(inquiry)}>View</button>
                                            <button className="btn-small" onClick={() => handleUpdateInquiryStatus(inquiry.id, inquiry.status === 'Pending' ? 'Responded' : 'Pending')}>
                                                {inquiry.status === 'Pending' ? 'Mark Responded' : 'Mark Pending'}
                                            </button>
                                            <button className="btn-small btn-danger" onClick={() => handleDeleteInquiry(inquiry.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ADD PRODUCT MODAL */}
            {showAddProductModal && (
                <div className="modal-overlay" onClick={() => setShowAddProductModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Add New Product</h2>
                        <form onSubmit={handleAddProduct} className="upload-form">
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    placeholder="Enter product description"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    required
                                >
                                    <option>Thangka Paintings</option>
                                    <option>Mandala Art</option>
                                    <option>Buddhist Deities</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Specifications</label>
                                <textarea
                                    value={newProduct.specifications}
                                    onChange={(e) => setNewProduct({ ...newProduct, specifications: e.target.value })}
                                    placeholder="Material: Cotton Canvas&#10;Dimensions: 50cm x 70cm"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn-primary">Add Product</button>
                                <button type="button" className="btn-secondary" onClick={() => setShowAddProductModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT PRODUCT MODAL */}
            {showEditProductModal && selectedProduct && (
                <div className="modal-overlay" onClick={() => setShowEditProductModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Product</h2>
                        <form onSubmit={handleUpdateProduct} className="upload-form">
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    value={selectedProduct.name}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    value={selectedProduct.category}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                                    required
                                >
                                    <option>Thangka Paintings</option>
                                    <option>Mandala Art</option>
                                    <option>Buddhist Deities</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Status *</label>
                                <select
                                    value={selectedProduct.status}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, status: e.target.value })}
                                    required
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Out of Stock</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn-primary">Update Product</button>
                                <button type="button" className="btn-secondary" onClick={() => setShowEditProductModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW INQUIRY MODAL */}
            {showViewInquiryModal && selectedInquiry && (
                <div className="modal-overlay" onClick={() => setShowViewInquiryModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Inquiry Details</h2>
                        <div className="inquiry-details">
                            <div className="detail-row">
                                <strong>Customer:</strong>
                                <span>{selectedInquiry.customer}</span>
                            </div>
                            <div className="detail-row">
                                <strong>Email:</strong>
                                <span>{selectedInquiry.email}</span>
                            </div>
                            <div className="detail-row">
                                <strong>Phone:</strong>
                                <span>{selectedInquiry.phone}</span>
                            </div>
                            <div className="detail-row">
                                <strong>Product:</strong>
                                <span>{selectedInquiry.product}</span>
                            </div>
                            <div className="detail-row">
                                <strong>Date:</strong>
                                <span>{selectedInquiry.date}</span>
                            </div>
                            <div className="detail-row">
                                <strong>Status:</strong>
                                <span className={`status-badge ${selectedInquiry.status.toLowerCase()}`}>{selectedInquiry.status}</span>
                            </div>
                            <div className="detail-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <strong>Message:</strong>
                                <p style={{ marginTop: '0.5rem', color: '#666' }}>{selectedInquiry.message}</p>
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <button className="btn-secondary" onClick={() => setShowViewInquiryModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
