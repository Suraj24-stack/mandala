import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [products, setProducts] = useState([
        { id: 1, name: 'Lord Ganesha Thangka', status: 'Active', sales: 12 },
        { id: 2, name: 'Green Tara', status: 'Active', sales: 8 },
        { id: 3, name: 'Mahakala', status: 'Active', sales: 15 },
        { id: 4, name: 'White Tara', status: 'Active', sales: 10 }
    ]);

    const [inquiries, setInquiries] = useState([
        { id: 1, product: 'Lord Ganesha', customer: 'John Doe', email: 'john@example.com', date: '2025-12-01', status: 'Pending' },
        { id: 2, product: 'Green Tara', customer: 'Jane Smith', email: 'jane@example.com', date: '2025-11-30', status: 'Responded' },
        { id: 3, product: 'Mahakala', customer: 'Bob Wilson', email: 'bob@example.com', date: '2025-11-29', status: 'Pending' }
    ]);

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <Link to="/" className="btn-secondary">Back to Site</Link>
            </div>

            <div className="admin-tabs">
                <button
                    className={activeTab === 'overview' ? 'tab-active' : ''}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={activeTab === 'products' ? 'tab-active' : ''}
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
                <button
                    className={activeTab === 'inquiries' ? 'tab-active' : ''}
                    onClick={() => setActiveTab('inquiries')}
                >
                    Inquiries
                </button>
                <button
                    className={activeTab === 'upload' ? 'tab-active' : ''}
                    onClick={() => setActiveTab('upload')}
                >
                    Upload New
                </button>
            </div>

            <div className="admin-content">
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
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="products-section">
                        <h2>Manage Products</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
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
                                        <td><span className="status-badge">{product.status}</span></td>
                                        <td>{product.sales}</td>
                                        <td>
                                            <button className="btn-small">Edit</button>
                                            <button className="btn-small btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'inquiries' && (
                    <div className="inquiries-section">
                        <h2>Customer Inquiries</h2>
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
                                            <button className="btn-small">View</button>
                                            <button className="btn-small">Respond</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'upload' && (
                    <div className="upload-section">
                        <h2>Upload New Product</h2>
                        <form className="upload-form">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" placeholder="Enter product name" />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Enter product description" rows="4"></textarea>
                            </div>

                            <div className="form-group">
                                <label>Product Image</label>
                                <input type="file" accept="image/*" />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select>
                                    <option>Thangka Paintings</option>
                                    <option>Mandala Art</option>
                                    <option>Buddhist Deities</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Specifications (one per line)</label>
                                <textarea placeholder="Material: Cotton Canvas&#10;Dimensions: 50cm x 70cm" rows="4"></textarea>
                            </div>

                            <button type="submit" className="btn-primary">Upload Product</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
