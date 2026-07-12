import React, { useState } from 'react';
import LeftPanel from './LeftPanel';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


export default function Login({ onSwitchView, onForgotPassword, theme, toggleTheme }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [shakingField, setShakingField] = useState(null);

    const validateEmail = (val) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(val).toLowerCase());
    };

    const triggerShake = (fieldName) => {
        setShakingField(fieldName);
        setTimeout(() => setShakingField(null), 400);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            triggerShake('email');
            isValid = false;
        } else if (!validateEmail(email.trim())) {
            newErrors.email = 'Please enter a valid email';
            triggerShake('email');
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            if (isValid) triggerShake('password');
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            if (isValid) triggerShake('password');
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email.trim(), password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Login failed');
                }

                setLoading(false);
                onSwitchView('dashboard', { email: email.trim(), user: data.user, token: data.token });
            } catch (err) {
                setLoading(false);
                setErrors(prev => ({ ...prev, apiError: err.message }));
            }
        }
    };

    return (
        <div className="split-layout-container">
            {/* Theme switcher floating on login screen */}
            <div className="login-theme-switcher-wrapper">
                <button onClick={toggleTheme} className="theme-toggle-btn floating-theme-btn" title="Toggle Light/Dark Theme">
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    )}
                </button>
            </div>

            {/* Left Hero Column */}
            <LeftPanel />

            {/* Right Authentication Form Column (Floating Card) */}
            <div className="auth-form-pane">
                <div className="form-pane-header">
                    <h3>Welcome <span className="highlight-text">Back!</span></h3>
                    <p>Sign in to continue to AssetFlow</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form" noValidate>
                    {errors.apiError && (
                        <div className="error-msg" style={{ 
                            marginBottom: '14px', 
                            textAlign: 'center', 
                            background: '#fef2f2', 
                            padding: '8px 12px', 
                            borderRadius: '6px',
                            color: '#ef4444',
                            fontSize: '0.8rem',
                            border: '1px solid #fee2e2'
                        }}>
                            ⚠️ {errors.apiError}
                        </div>
                    )}
                    {/* Email address field */}
                    <div className={`form-group ${errors.email ? 'has-error' : ''} ${shakingField === 'email' ? 'shake' : ''}`}>
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <span className="input-icon-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </span>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@assetflow.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors(prev => ({ ...prev, email: '' }));
                                }}
                                disabled={loading}
                            />
                        </div>
                        {errors.email && <div className="error-msg">{errors.email}</div>}
                    </div>

                    {/* Password field */}
                    <div className={`form-group ${errors.password ? 'has-error' : ''} ${shakingField === 'password' ? 'shake' : ''}`}>
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors(prev => ({ ...prev, password: '' }));
                                }}
                                disabled={loading}
                            />
                            <span className="input-icon-right">
                                <span 
                                    className="input-icon-interactive" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    )}
                                </span>
                            </span>
                        </div>
                        {errors.password && <div className="error-msg">{errors.password}</div>}
                    </div>

                    {/* Checkbox and Forgot Password link */}
                    <div className="form-actions-row">
                        <label className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={loading}
                            />
                            Remember me
                        </label>
                        <button
                            type="button"
                            className="forgot-password-link"
                            onClick={onForgotPassword}
                            disabled={loading}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Capsule gradient submit button */}
                    <button 
                        type="submit" 
                        className="btn-primary-gradient" 
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner" style={{ borderTopColor: '#ffffff' }}></span>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                {/* Footer redirect text link */}
                <div className="auth-footer-link">
                    Don't have an account? <span onClick={() => onSwitchView('signup')}>Register</span>
                </div>
            </div>
        </div>
    );
}
