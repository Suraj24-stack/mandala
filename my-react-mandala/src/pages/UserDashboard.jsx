import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
        fetchProfile();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/dashboard');
            setDashboardData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/profile');
            setProfile(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
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
        <div className="user-dashboard">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>User Dashboard</h1>
                    <div className="user-info">
                        <span>Welcome, {user?.name}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="welcome-card">
                    <div className="welcome-icon">🎉</div>
                    <div className="welcome-text">
                        <h2>{dashboardData?.message}</h2>
                        <p>You're logged in as a user</p>
                    </div>
                </div>

                <div className="profile-section">
                    <h2>Your Profile</h2>
                    <div className="profile-grid">
                        <div className="profile-item">
                            <div className="profile-label">Name</div>
                            <div className="profile-value">{profile?.name}</div>
                        </div>

                        <div className="profile-item">
                            <div className="profile-label">Email</div>
                            <div className="profile-value">{profile?.email}</div>
                        </div>

                        <div className="profile-item">
                            <div className="profile-label">Role</div>
                            <div className="profile-value">
                                <span className="role-badge">{profile?.role}</span>
                            </div>
                        </div>

                        <div className="profile-item">
                            <div className="profile-label">Member Since</div>
                            <div className="profile-value">
                                {new Date(profile?.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="features-section">
                    <h2>Quick Actions</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>View Analytics</h3>
                            <p>Check your activity and statistics</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⚙️</div>
                            <h3>Settings</h3>
                            <p>Manage your account preferences</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📧</div>
                            <h3>Messages</h3>
                            <p>View your notifications and messages</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
