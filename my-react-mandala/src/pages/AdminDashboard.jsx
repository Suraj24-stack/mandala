import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
        fetchUsers();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/dashboard');
            setDashboardData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Admin Dashboard</h1>
                    <div className="user-info">
                        <span>Welcome, {user?.name}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <h3>{dashboardData?.totalUsers || 0}</h3>
                            <p>Total Users</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">👨‍💼</div>
                        <div className="stat-info">
                            <h3>{dashboardData?.totalAdmins || 0}</h3>
                            <p>Admins</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">👤</div>
                        <div className="stat-info">
                            <h3>{dashboardData?.totalRegularUsers || 0}</h3>
                            <p>Regular Users</p>
                        </div>
                    </div>
                </div>

                <div className="users-section">
                    <h2>All Users</h2>
                    <div className="users-table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`role-badge ${user.role}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
