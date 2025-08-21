import React, { useState } from 'react';
import '../css/LoginPage.css';

const Login = ({ onLogin, switchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userType, setUserType] = useState('VENDOR'); // Default to VENDOR
    const BASE_URL = process.env.REACT_APP_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Determine the endpoint based on user type
            const endpoint = userType === 'VENDOR' 
                ? `${BASE_URL}/api/vendors/login` 
                : `${BASE_URL}/api/users/login`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    password,
                    ...(userType !== 'VENDOR' && { role: userType }) // Only send role for non-vendors
                }),
            });

            if (!response.ok) {
                let errorMsg = 'Login failed';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (e) {}
                throw new Error(errorMsg);
            }

            const data = await response.json();
            // Add role to the response data if it's a vendor
            if (userType === 'VENDOR') {
                data.role = 'VENDOR';
            }
            onLogin(data);
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    const getUserTypeText = () => {
        switch(userType) {
            case 'VENDOR':
                return 'Sign in to manage your food truck business';
            case 'INSPECTOR':
                return 'Sign in to inspect food trucks';
            case 'REVIEWER':
                return 'Sign in to review food trucks';
            case 'ADMIN':
                return 'Sign in to manage system settings';
            case 'SUPER_ADMIN':
                return 'Sign in to access super admin controls';
            default:
                return 'Sign in to your account';
        }
    };

    const getUserTypeTitle = () => {
        switch(userType) {
            case 'VENDOR': return 'Vendor';
            case 'INSPECTOR': return 'Inspector';
            case 'REVIEWER': return 'Reviewer';
            case 'ADMIN': return 'Admin';
            case 'SUPER_ADMIN': return 'Super Admin';
            default: return 'User';
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form-content">
                    <div className="auth-header">
                        <h1>Welcome <span className="user-type-title">{getUserTypeTitle()}</span></h1>
                        <p>{getUserTypeText()}</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="submit-btn">Sign In</button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account? <a href="#" onClick={switchToRegister}>Create Account</a>
                        <div className="user-type-options">
                            <span>Login as: </span>
                            <a href="#" 
                               onClick={() => setUserType('VENDOR')}
                               className={userType === 'VENDOR' ? 'active' : ''}>
                                Vendor
                            </a>
                            <span> | </span>
                            <a href="#" 
                               onClick={() => setUserType('INSPECTOR')}
                               className={userType === 'INSPECTOR' ? 'active' : ''}>
                                Inspector
                            </a>
                            <span> | </span>
                            <a href="#" 
                               onClick={() => setUserType('REVIEWER')}
                               className={userType === 'REVIEWER' ? 'active' : ''}>
                                Reviewer
                            </a>
                            <span> | </span>
                            <a href="#" 
                               onClick={() => setUserType('ADMIN')}
                               className={userType === 'ADMIN' ? 'active' : ''}>
                                Admin
                            </a>
                            <span> | </span>
                            <a href="#" 
                               onClick={() => setUserType('SUPER_ADMIN')}
                               className={userType === 'SUPER_ADMIN' ? 'active' : ''}>
                                Super Admin
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
