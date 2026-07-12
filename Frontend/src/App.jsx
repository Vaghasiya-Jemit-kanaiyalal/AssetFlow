import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';

export default function App() {
    const [view, setView] = useState('login'); // 'login', 'signup', or 'dashboard'
    const [userRole, setUserRole] = useState('Employee');
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [theme, setTheme] = useState('light'); // 'light' or 'dark' by default

    // In-memory mock database of registered users and their admin-assigned roles
    const [usersDatabase, setUsersDatabase] = useState([
        { email: 'alex@company.com', role: 'Employee', name: 'Alex Johnson' },
        { email: 'bruce@company.com', role: 'Dept Head', name: 'Dr. Bruce Banner' },
        { email: 'tony@company.com', role: 'Asset Manager', name: 'Tony Stark' },
        { email: 'admin@company.com', role: 'Admin', name: 'Nick Fury' }
    ]);

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
        if (newView === 'dashboard') {
            const user = usersDatabase.find(u => u.email.toLowerCase() === payload.toLowerCase());
            if (user) {
                setUserRole(user.role);
            } else {
                setUserRole('Employee'); // Default assigned role for newly registered emails
            }
        }
    };

    const handleSignUpUser = (email, name) => {
        const userExists = usersDatabase.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (!userExists) {
            setUsersDatabase([...usersDatabase, { email, name, role: 'Employee' }]);
        }
    };

    const handleLogout = () => {
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
                    role={userRole}
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
                    onSignUpUser={handleSignUpUser}
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
