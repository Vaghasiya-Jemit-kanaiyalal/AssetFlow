import React, { useState, useRef, useEffect } from 'react';

export default function ForgotPassword({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const validateEmail = (val) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(val).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setError('Email is required');
            triggerShake();
            return;
        }
        
        if (!validateEmail(email.trim())) {
            setError('Please enter a valid email');
            triggerShake();
            return;
        }

        setLoading(true);
        setError('');

        setTimeout(() => {
            setLoading(false);
            console.log('Password Reset Request:', {
                email: email.trim(),
                timestamp: new Date().toISOString()
            });
            alert(`Password reset link sent to ${email.trim()}!`);
            handleClose();
        }, 1200);
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 400);
    };

    const handleClose = () => {
        setEmail('');
        setError('');
        onClose();
    };

    return (
        <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && handleClose()}>
            <div className="modal-card">
                <div className="modal-header">
                    <h2>Reset Password</h2>
                    <button className="modal-close" onClick={handleClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>Enter your email and we'll send a password recovery link.</p>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className={`form-group ${error ? 'has-error' : ''} ${shake ? 'shake' : ''}`}>
                            <div className="input-wrapper">
                                <input
                                    id="forgot-email"
                                    type="email"
                                    ref={inputRef}
                                    placeholder="name@assetflow.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                />
                            </div>
                            {error && <div className="error-msg">{error}</div>}
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn-primary-capsule" 
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span> &nbsp; Sending...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
