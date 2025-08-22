import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css';

const Register = ({ onRegister, switchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userType, setUserType] = useState('VENDOR');
    const BASE_URL = process.env.REACT_APP_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Determine the endpoint based on user type
        const endpoint = userType === 'VENDOR'
            ? `${BASE_URL}/api/vendors/register`
            : `${BASE_URL}/api/users/register`;

        const userData = {
            name,
            email,
            password,
            ...(userType !== 'VENDOR' && { role: userType }) // Only include role for non-vendors
        };

        // Only include these fields for vendors
        if (userType === 'VENDOR') {
            userData.phoneNumber = phoneNumber;
            userData.address = address;
        }

        try {
            const response = await axios.post(
                endpoint,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const responseData = response.data;
            
            // Check if it's an admin registration request (pending approval)
            if (userType === 'ADMIN' && responseData.status === 'PENDING') {
                setSuccessMessage(responseData.message);
                // Clear the form
                setName('');
                setEmail('');
                setPassword('');
                // Don't call onRegister since the account isn't created yet
                return;
            }

            // For vendors and other successful registrations
            if (userType === 'VENDOR') {
                responseData.role = 'VENDOR';
            }
            onRegister(responseData);

        } catch (error) {
            let errorMsg = 'Registration failed';
            if (error.response && error.response.data) {
                // Try to get the error message for both vendor and user
                if (typeof error.response.data === 'string') {
                    errorMsg = error.response.data;
                } else if (error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
            }
            setError(errorMsg);
        }
    };

    const getHeaderText = () => {
        switch (userType) {
            case 'VENDOR':
                return 'Join our food truck vendor community and start serving delicious meals';
            case 'INSPECTOR':
                return 'Register as an inspector to manage food truck inspections';
            case 'REVIEWER':
                return 'Register as a reviewer to rate and review food trucks';
            case 'ADMIN':
                return 'Register as an administrator to manage the system (requires approval)';
            default:
                return 'Create your account';
        }
    };

    const getUserTypeTitle = () => {
        switch (userType) {
            case 'VENDOR': return 'Vendor';
            case 'INSPECTOR': return 'Inspector';
            case 'REVIEWER': return 'Reviewer';
            case 'ADMIN': return 'Admin';
            default: return 'User';
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form-content">
                    <div className="auth-header">
                        <h1>Register as <span className="user-type-title">{getUserTypeTitle()}</span></h1>
                        <p>{getHeaderText()}</p>
                    </div>

                    <div className="user-type-toggle">
                        <span>Register as: </span>
                        <button
                            type="button"
                            className={userType === 'VENDOR' ? 'active' : ''}
                            onClick={() => setUserType('VENDOR')}
                        >
                            Vendor
                        </button>
                        <button
                            type="button"
                            className={userType === 'INSPECTOR' ? 'active' : ''}
                            onClick={() => setUserType('INSPECTOR')}
                        >
                            Inspector
                        </button>
                        <button
                            type="button"
                            className={userType === 'REVIEWER' ? 'active' : ''}
                            onClick={() => setUserType('REVIEWER')}
                        >
                            Reviewer
                        </button>
                        <button
                            type="button"
                            className={userType === 'ADMIN' ? 'active' : ''}
                            onClick={() => setUserType('ADMIN')}
                        >
                            Admin
                        </button>
                    </div>

                    {/* Success Message for Admin Registration */}
                    {successMessage && (
                        <div className="success-message">
                            <div className="success-content">
                                <h3>✓ Request Submitted Successfully!</h3>
                                <p>{successMessage}</p>
                                <div className="success-actions">
                                    <button 
                                        type="button" 
                                        className="switch-to-login-btn"
                                        onClick={switchToLogin}
                                    >
                                        Go to Login
                                    </button>
                                    <button 
                                        type="button" 
                                        className="submit-another-btn"
                                        onClick={() => {
                                            setSuccessMessage('');
                                            setUserType('VENDOR');
                                        }}
                                    >
                                        Submit Another Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Registration Form - Hide when success message is shown */}
                    {!successMessage && (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">
                                    {userType === 'VENDOR' ? 'Business Name' : 'Full Name'}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={
                                        userType === 'VENDOR'
                                            ? 'Enter your business name'
                                            : 'Enter your full name'
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                    required
                                />
                            </div>

                            {userType === 'ADMIN' && (
                                <div className="admin-notice">
                                    <p><strong>Note:</strong> Admin registration requires approval from the Super Admin. You will be notified once your request is reviewed.</p>
                                </div>
                            )}

                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="submit-btn">
                                {userType === 'ADMIN' ? 'Submit Admin Request' : `Register as ${getUserTypeTitle()}`}
                            </button>
                        </form>
                    )}

                    {!successMessage && (
                        <div className="auth-footer">
                            Already have an account? <a href="#" onClick={switchToLogin}>Sign In</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
