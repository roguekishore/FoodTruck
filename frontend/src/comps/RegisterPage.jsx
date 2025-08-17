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
    const [userType, setUserType] = useState('VENDOR');
    const BASE_URL = process.env.REACT_APP_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        console.log("Attempting to register as:", userType); // Debug log
        console.log("Sending data:", {
            name, email, password, role: userType,
            ...(userType === 'VENDOR' && { phoneNumber, address })
        });

        const userData = {
            name,
            email,
            password,
            role: userType
        };

        // Only include these fields for vendors
        if (userType === 'VENDOR') {
            userData.phoneNumber = phoneNumber;
            userData.address = address;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/users/register`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            onRegister(response.data);

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    console.error('Validation Error:', error.response.data);
                    setError(error.response.data?.error || 'Validation failed.');
                } else if (error.response.status === 404) {
                    setError('Resource not found.');
                } else {
                    setError(`An error occurred with status: ${error.response.status}`);
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
                setError('No response from server. Please try again.');
            } else {
                console.error('Request setup error:', error.message);
                setError('An error occurred. Please try again.');
            }
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
                return 'Register as an administrator to manage the system';
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

                        {userType === 'VENDOR' && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Business Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your business address"
                                        required
                                    />
                                </div>
                            </>
                        )}

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

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="submit-btn">
                            {`Register as ${getUserTypeTitle()}`}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <a href="#" onClick={switchToLogin}>Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;