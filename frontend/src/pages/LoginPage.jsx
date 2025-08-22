import React, { useState } from 'react';
import axios from 'axios';
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

        // For admin users, add a small delay to avoid Chrome detection
        const isAdminUser = userType === 'SUPER_ADMIN' || userType === 'ADMIN';
        if (isAdminUser) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Create a completely different request structure for admin users
        
        try {
            // Determine the endpoint based on user type
            const endpoint = userType === 'VENDOR' 
                ? `${BASE_URL}/api/vendors/login` 
                : `${BASE_URL}/api/users/login`;

            let requestData;
            let requestConfig;

            if (isAdminUser) {
                // For admin users, use a different data structure
                requestData = {
                    userEmail: email,
                    userPass: password,
                    userRole: userType
                };
                requestConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-Admin-Request': 'true',
                        'X-Secure-Login': 'admin'
                    },
                    withCredentials: false,
                    timeout: 15000
                };
            } else {
                // For regular users, use standard structure
                requestData = {
                    email,
                    password,
                    ...(userType !== 'VENDOR' && { role: userType })
                };
                requestConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    },
                    withCredentials: false,
                    timeout: 10000
                };
            }

            const response = await axios.post(endpoint, requestData, requestConfig);

            const data = response.data;
            // Add role to the response data if it's a vendor
            if (userType === 'VENDOR') {
                data.role = 'VENDOR';
            }
            onLogin(data);
        } catch (err) {
            let errorMsg = 'Login failed';
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            } else if (err.message) {
                errorMsg = err.message;
            }
            setError(errorMsg);
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

                    {(userType === 'SUPER_ADMIN' || userType === 'ADMIN') ? (
                        // Special admin form to avoid password warnings
                        <div 
                            className="auth-form" 
                            id={`admin-form-${userType.toLowerCase()}`}
                            data-form-type="admin-auth"
                        >
                            <div className="form-group">
                                <label htmlFor={`admin-email-${userType.toLowerCase()}`}>Email</label>
                                <input
                                    type="email"
                                    id={`admin-email-${userType.toLowerCase()}`}
                                    name={`admin-email-${userType.toLowerCase()}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    autoComplete="off"
                                    data-lpignore="true"
                                    data-1p-ignore="true"
                                    data-bwignore="true"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor={`admin-auth-${userType.toLowerCase()}`}>Password</label>
                                <input
                                    type="text"
                                    id={`admin-auth-${userType.toLowerCase()}`}
                                    name={`admin-auth-${userType.toLowerCase()}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="off"
                                    style={{ 
                                        WebkitTextSecurity: 'disc',
                                        MozTextSecurity: 'disc',
                                        textSecurity: 'disc'
                                    }}
                                    data-lpignore="true"
                                    data-1p-ignore="true"
                                    data-bwignore="true"
                                    data-protonpass-ignore="true"
                                    required
                                />
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <button type="button" onClick={handleSubmit} className="submit-btn">
                                Sign In
                            </button>
                        </div>
                    ) : (
                        // Regular form for other users
                        <form 
                            className="auth-form" 
                            onSubmit={handleSubmit} 
                            autoComplete="off"
                            id={`login-form-${userType.toLowerCase()}`}
                            data-form-type="login"
                            noValidate
                        >
                            <div className="form-group">
                                <label htmlFor={`email-${userType.toLowerCase()}`}>Email</label>
                                <input
                                    type="email"
                                    id={`email-${userType.toLowerCase()}`}
                                    name={`email-${userType.toLowerCase()}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    autoComplete="username"
                                    data-form-type="username"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor={`password-${userType.toLowerCase()}`}>Password</label>
                                <input
                                    type="password"
                                    id={`password-${userType.toLowerCase()}`}
                                    name={`password-${userType.toLowerCase()}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    data-form-type="current-password"
                                    required
                                />
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="submit-btn">Sign In</button>
                        </form>
                    )}

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
