import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';

export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch {
            return null;
        }
    });
    const [view, setView] = useState(() => {
        return localStorage.getItem('token') ? 'dashboard' : 'login';
    });
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [theme, setTheme] = useState('light'); // 'light' or 'dark' by default

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        if (nextTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    // Switch view handler that resolves email addresses to roles dynamically
    const handleSwitchView = (newView, payload) => {
        setView(newView);
        if (newView === 'dashboard' && payload && payload.token) {
            setToken(payload.token);
            setCurrentUser(payload.user);
            localStorage.setItem('token', payload.token);
            localStorage.setItem('user', JSON.stringify(payload.user));
        }
    };

    const handleLogout = () => {
        setToken('');
        setCurrentUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setView('login');
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Animated Moving Background Dots */}
            <div className="bg-dots-container">
                <div className="floating-dot dot-1"></div>
                <div className="floating-dot dot-2"></div>
                <div className="floating-dot dot-3"></div>
                <div className="floating-dot dot-4"></div>
                <div className="floating-dot dot-5"></div>
                <div className="floating-dot dot-6"></div>
                <div className="floating-dot dot-7"></div>
                <div className="floating-dot dot-8"></div>
                <div className="floating-dot dot-9"></div>
                <div className="floating-dot dot-10"></div>
            </div>

            {view === 'dashboard' ? (
                <Dashboard 
                    role={currentUser ? currentUser.role : 'Employee'}
                    token={token}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
            ) : view === 'login' ? (
                <Login 
                    onSwitchView={handleSwitchView} 
                    onForgotPassword={() => setIsForgotPasswordOpen(true)}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
            ) : (
                <SignUp 
                    onSwitchView={handleSwitchView} 
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
            )}

            <ForgotPassword 
                isOpen={isForgotPasswordOpen} 
                onClose={() => setIsForgotPasswordOpen(false)} 
            />
        </div>
    );
}
