import React, { useState } from 'react';
import favicon from '../assets/favicon.png';

export default function Dashboard({ role, onLogout, theme, toggleTheme }) {
    // ----------------------------------------------------
    // MASTER DATABASE STATE
    // ----------------------------------------------------
    const [assets, setAssets] = useState([
        { id: 1, name: 'MacBook Pro 16"', type: 'Electronics', location: 'London Hub', status: 'ALLOCATED', custodian: 'Alex Johnson', department: 'Engineering' },
        { id: 2, name: 'Ergonomic Desk Chair', type: 'Furniture', location: 'Room 302', status: 'AVAILABLE', custodian: '—', department: '—' },
        { id: 3, name: 'Conference Room C Video System', type: 'AV System', location: 'Meeting Room C', status: 'ACTIVE BOOKING', custodian: 'Sarah Connor', department: 'Marketing' },
        { id: 4, name: 'Toyota Prius (Company Pool)', type: 'Vehicle', location: 'Garage A', status: 'PENDING', custodian: 'Mark R.', department: 'Operations' },
        { id: 5, name: 'Dell UltraSharp 32" Monitor', type: 'Electronics', location: 'Warehouse 1', status: 'AVAILABLE', custodian: '—', department: '—' },
        { id: 6, name: 'Department Head Desk Laptop', type: 'Electronics', location: 'Office 405', status: 'ALLOCATED', custodian: 'Dr. Bruce Banner', department: 'Engineering' }
    ]);

    const [activities, setActivities] = useState([
        { id: 1, text: 'John Doe checked out MacBook Pro 16"', time: '10 mins ago', badge: 'allocation' },
        { id: 2, text: 'Meeting Room C booked by Sarah Connor', time: '1 hr ago', badge: 'booking' },
        { id: 3, text: 'Mark R. requested Toyota Prius allocation', time: '3 hrs ago', badge: 'pending' },
        { id: 4, text: 'New Ergonomic Desk Chair registered', time: 'Yesterday', badge: 'register' }
    ]);

    // Role-based mock directory (For Admin controls)
    const [users, setUsers] = useState([
        { id: 101, name: 'Alex Johnson', role: 'Employee', department: 'Engineering' },
        { id: 102, name: 'Dr. Bruce Banner', role: 'Dept Head', department: 'Engineering' },
        { id: 103, name: 'Sarah Connor', role: 'Employee', department: 'Marketing' },
        { id: 104, name: 'Tony Stark', role: 'Asset Manager', department: 'Operations' },
        { id: 105, name: 'Nick Fury', role: 'Admin', department: 'Executive' }
    ]);

    // JSON Category Strategy (For Admin schema strategies)
    const [categoryStrategy, setCategoryStrategy] = useState(
        JSON.stringify([
            { category: "Electronics", warrantyCoverage: "36 Months", safetyAudit: "Quarterly" },
            { category: "Furniture", warrantyCoverage: "Lifetime", safetyAudit: "Bi-Annually" },
            { category: "AV System", warrantyCoverage: "24 Months", safetyAudit: "Quarterly" },
            { category: "Vehicle", warrantyCoverage: "60 Months", safetyAudit: "Annually" }
        ], null, 4)
    );

    const [categoriesList, setCategoriesList] = useState(['Electronics', 'Furniture', 'AV System', 'Vehicle']);

    const handleSaveSchema = () => {
        try {
            const parsed = JSON.parse(categoryStrategy);
            if (Array.isArray(parsed)) {
                const list = parsed.map(item => item.category || item.Category).filter(Boolean);
                if (list.length > 0) {
                    setCategoriesList(list);
                    alert('Success: Platform categories updated successfully! New options compiled: ' + list.join(', '));
                } else {
                    alert('Error: JSON objects must include a "category" property.');
                }
            } else {
                alert('Error: JSON must be configured as an array of category configurations.');
            }
        } catch (e) {
            alert('Error: Invalid JSON syntax. Please verify brackets, quotes, and commas.');
        }
    };

    // Issue logs queue (For Employee reports and Asset Manager maintenance dispatches)
    const [issues, setIssues] = useState([
        { id: 201, assetName: 'Department Head Desk Laptop', reportedBy: 'Dr. Bruce Banner', details: 'Battery swelling and keyboard keys unresponsive', status: 'Awaiting Action' }
    ]);

    // Approvals/Clearance Queue (For Department Head workflows)
    const [clearanceRequests, setClearanceRequests] = useState([
        { id: 301, assetName: 'MacBook Pro 16"', requestType: 'Transfer', fromUser: 'John Doe', toUser: 'Jane Smith', department: 'Engineering', notes: 'Handing off code workstation' }
    ]);

    // ----------------------------------------------------
    // MODALS & INPUT STATES
    // ----------------------------------------------------
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [modalOpen, setModalOpen] = useState(null); // null, 'register', 'book', 'request', 'report-issue', 'transfer'

    // Form inputs
    const [registerForm, setRegisterForm] = useState({ name: '', type: 'Electronics', location: '' });
    const [bookForm, setBookForm] = useState({ resource: 'Meeting Room C', timeSlot: '', date: '', priority: false });
    const [requestForm, setRequestForm] = useState({ assetId: '2', notes: '' });
    const [issueForm, setIssueForm] = useState({ assetId: '1', details: '', photo: '' });
    const [transferForm, setTransferForm] = useState({ assetId: '1', recipientName: '', notes: '' });

    // Active Asset under interaction
    const [selectedAssetId, setSelectedAssetId] = useState(null);

    // ----------------------------------------------------
    // WORKFLOW HANDLERS
    // ----------------------------------------------------
    
    // Admin promotional tools
    const handleUpdateUserRole = (userId, newRole) => {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        setActivities([
            { id: Date.now(), text: `User role for ${users.find(u => u.id === userId).name} updated to ${newRole}`, time: 'Just now', badge: 'register' },
            ...activities
        ]);
    };

    // Employee Issue Reporting
    const submitIssueLog = (e) => {
        e.preventDefault();
        const targetAsset = assets.find(a => a.id === parseInt(issueForm.assetId));
        if (!targetAsset) return;

        // Combine description fields if both are filled
        const combinedDetails = issueForm.details + 
            (issueForm.photoDescription ? ` | Visual Details: ${issueForm.photoDescription}` : '');

        const newIssue = {
            id: Date.now(),
            assetName: targetAsset.name,
            reportedBy: 'Alex Johnson',
            details: combinedDetails,
            status: 'Awaiting Action'
        };

        setIssues([newIssue, ...issues]);
        setActivities([
            { id: Date.now(), text: `Issue reported on ${targetAsset.name} by Alex`, time: 'Just now', badge: 'pending' },
            ...activities
        ]);

        setIssueForm({ assetId: '1', details: '', photo: '', photoDescription: '' });
        setModalOpen(null);
    };

    // Employee Transfer sequence
    const submitTransferRequest = (e) => {
        e.preventDefault();
        const targetAsset = assets.find(a => a.id === parseInt(transferForm.assetId));
        if (!targetAsset) return;

        const newClearance = {
            id: Date.now(),
            assetName: targetAsset.name,
            requestType: 'Transfer',
            fromUser: 'Alex Johnson',
            toUser: transferForm.recipientName,
            department: 'Engineering',
            notes: transferForm.notes
        };

        setClearanceRequests([newClearance, ...clearanceRequests]);
        setAssets(assets.map(a => a.id === targetAsset.id ? { ...a, status: 'PENDING' } : a));
        setActivities([
            { id: Date.now(), text: `Transfer request logged for ${targetAsset.name}`, time: 'Just now', badge: 'pending' },
            ...activities
        ]);

        setTransferForm({ assetId: '1', recipientName: '', notes: '' });
        setModalOpen(null);
    };

    // Supervisor Approvals
    const handleApproveClearance = (reqId) => {
        const req = clearanceRequests.find(r => r.id === reqId);
        if (!req) return;

        // Swap custodian and clear pending status
        setAssets(assets.map(a => a.name === req.assetName ? { ...a, status: 'ALLOCATED', custodian: req.toUser, department: req.department } : a));
        setClearanceRequests(clearanceRequests.filter(r => r.id !== reqId));
        setActivities([
            { id: Date.now(), text: `Transfer of ${req.assetName} to ${req.toUser} approved`, time: 'Just now', badge: 'allocation' },
            ...activities
        ]);
    };

    const handleRejectClearance = (reqId) => {
        const req = clearanceRequests.find(r => r.id === reqId);
        if (!req) return;

        // Restore allocated status
        setAssets(assets.map(a => a.name === req.assetName ? { ...a, status: 'ALLOCATED' } : a));
        setClearanceRequests(clearanceRequests.filter(r => r.id !== reqId));
        setActivities([
            { id: Date.now(), text: `Transfer of ${req.assetName} to ${req.toUser} rejected`, time: 'Just now', badge: 'pending' },
            ...activities
        ]);
    };

    // Employee initiates Return Sequence
    const handleReturnAsset = (assetId) => {
        const targetAsset = assets.find(a => a.id === assetId);
        if (!targetAsset) return;

        setAssets(assets.map(a => a.id === assetId ? { ...a, status: 'PENDING' } : a));
        setActivities([
            { id: Date.now(), text: `Return sequence initiated for ${targetAsset.name}`, time: 'Just now', badge: 'pending' },
            ...activities
        ]);
    };

    // Asset Manager actions
    const handleDispatchMaintenance = (issueId) => {
        const targetIssue = issues.find(i => i.id === issueId);
        if (!targetIssue) return;

        setIssues(issues.map(i => i.id === issueId ? { ...i, status: 'Under Maintenance' } : i));
        setAssets(assets.map(a => a.name === targetIssue.assetName ? { ...a, status: 'PENDING', custodian: 'Maintenance Shop' } : a));
        setActivities([
            { id: Date.now(), text: `Dispatched technician for ${targetIssue.assetName}`, time: 'Just now', badge: 'pending' },
            ...activities
        ]);
    };

    const handleResolveMaintenance = (issueId) => {
        const targetIssue = issues.find(i => i.id === issueId);
        if (!targetIssue) return;

        setIssues(issues.filter(i => i.id !== issueId));
        setAssets(assets.map(a => a.name === targetIssue.assetName ? { ...a, status: 'AVAILABLE', custodian: '—' } : a));
        setActivities([
            { id: Date.now(), text: `Maintenance resolved: ${targetIssue.assetName} returned to inventory`, time: 'Just now', badge: 'register' },
            ...activities
        ]);
    };

    const handleMarkDiscrepancy = (assetId, type) => {
        // Mark missing or damaged
        setAssets(assets.map(a => a.id === assetId ? { ...a, status: type } : a));
        setActivities([
            { id: Date.now(), text: `Audit check: ${assets.find(a => a.id === assetId).name} marked as ${type}`, time: 'Just now', badge: 'pending' },
            ...activities
        ]);
    };

    // Basic Action triggers
    const handleRegister = (e) => {
        e.preventDefault();
        if (!registerForm.name.trim()) return;

        const newAsset = {
            id: Date.now(),
            name: registerForm.name,
            type: registerForm.type,
            location: registerForm.location || 'Central Hub',
            status: 'AVAILABLE',
            custodian: '—',
            department: '—'
        };

        setAssets([newAsset, ...assets]);
        setActivities([
            { id: Date.now(), text: `New ${registerForm.name} registered into database`, time: 'Just now', badge: 'register' },
            ...activities
        ]);

        setRegisterForm({ name: '', type: 'Electronics', location: '' });
        setModalOpen(null);
    };

    const handleBook = (e) => {
        e.preventDefault();
        if (!bookForm.timeSlot || !bookForm.date) return;

        const newBooking = {
            id: Date.now(),
            name: bookForm.resource,
            type: 'AV System',
            location: 'Meeting Room C',
            status: 'ACTIVE BOOKING',
            custodian: 'Alex Johnson',
            department: 'Engineering'
        };

        setAssets([newBooking, ...assets]);
        setActivities([
            { id: Date.now(), text: `${bookForm.priority ? '[PRIORITY] ' : ''}${bookForm.resource} reserved for ${bookForm.date}`, time: 'Just now', badge: 'booking' },
            ...activities
        ]);

        setBookForm({ resource: 'Meeting Room C', timeSlot: '', date: '', priority: false });
        setModalOpen(null);
    };

    const handleRequest = (e) => {
        e.preventDefault();
        const selectedAsset = assets.find(a => a.id === parseInt(requestForm.assetId));
        if (!selectedAsset) return;

        setAssets(assets.map(a => a.id === selectedAsset.id ? { ...a, status: 'PENDING' } : a));
        setActivities([
            { id: Date.now(), text: `Requisition request submitted for ${selectedAsset.name}`, time: 'Just now', badge: 'pending' },
            ...activities
        ]);

        setModalOpen(null);
    };

    // ----------------------------------------------------
    // ROLE FILTERED VIEW DATA
    // ----------------------------------------------------
    
    // Helper to get category icon colors
    const getCategoryIcon = (type) => {
        switch (type) {
            case 'Electronics':
                return (
                    <div className="cat-icon bg-blue-dim text-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                    </div>
                );
            case 'Furniture':
                return (
                    <div className="cat-icon bg-purple-dim text-purple">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                );
            case 'AV System':
                return (
                    <div className="cat-icon bg-yellow-dim text-yellow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"></path></svg>
                    </div>
                );
            default:
                return (
                    <div className="cat-icon bg-green-dim text-green">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="14.5" cy="18.5" r="2.5"></circle></svg>
                    </div>
                );
        }
    };

    // Calculate metrics
    const totalAssets = 24;
    const totalAssetsCount = totalAssets;
    const availableCountTotal = assets.filter(a => a.status === 'AVAILABLE').length + 10;
    const activeBookingCountTotal = assets.filter(a => a.status === 'ACTIVE BOOKING').length + 4;
    const pendingCountTotal = assets.filter(a => a.status === 'PENDING').length + 2;

    // Filter table view assets by role
    const getRoleFilteredAssets = () => {
        let baseList = [...assets];
        
        if (role === 'Employee') {
            // Employee sees items assigned to them OR available resources
            baseList = assets.filter(a => a.custodian === 'Alex Johnson' || a.status === 'AVAILABLE' || a.status === 'ACTIVE BOOKING');
        } else if (role === 'Dept Head') {
            // Dept Head sees department equipment
            baseList = assets.filter(a => a.department === 'Engineering' || a.status === 'AVAILABLE' || a.status === 'ACTIVE BOOKING');
        }
        
        // Apply search filter and selector type
        return baseList.filter(asset => {
            const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  asset.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedType === 'All' || asset.type === selectedType;
            return matchesSearch && matchesType;
        });
    };

    const displayedAssets = getRoleFilteredAssets();

    return (
        <div className="dashboard-layout">
            {/* Top Navigation Bar */}
            <header className="dash-header">
                <div className="dash-brand">
                    <img src={favicon} alt="AssetFlow" className="dash-logo-img-hifi" />
                </div>

                {/* Center Navigation Tabs */}
                <nav className="dash-nav-tabs">
                    <a className="nav-tab-item active" onClick={() => console.log('Dashboard')}>Dashboard</a>
                    <a className="nav-tab-item" onClick={() => console.log('Bookings')}>My Bookings</a>
                    <a className="nav-tab-item" onClick={() => console.log('Assets')}>Assets</a>
                    <a className="nav-tab-item" onClick={() => console.log('Requests')}>Requests</a>
                    <a className="nav-tab-item" onClick={() => console.log('Reports')}>Reports</a>
                </nav>

                {/* Right controls */}
                <div className="dash-header-actions">
                    {/* Only Asset Manager and Admin can register assets directly in the global header */}
                    {(role === 'Admin' || role === 'Asset Manager') && (
                        <button onClick={() => setModalOpen('register')} className="header-btn-register">
                            <span className="plus-symbol">+</span> Register Asset
                        </button>
                    )}

                    {/* Notification icon showing count */}
                    <div className="notify-bell-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="notify-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                        <span className="notify-badge-count">3</span>
                    </div>

                    {/* Theme Toggler switcher button */}
                    <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme Mode">
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>

                    {/* User profile dropdown - click to sign out */}
                    <div className="user-profile-badge-group-hifi" onClick={onLogout} title="Sign Out">
                        <div className="user-profile-circle">AF</div>
                        <div className="user-profile-info-text">
                            <span className="profile-name-span">Alex Johnson</span>
                            <span className="profile-role-span">{role === 'Dept Head' ? 'Dept Head' : role}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="profile-chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </header>

            {/* Welcome banner and role info */}
            <div className="welcome-banner-section-hifi">
                <div className="welcome-text-block">
                    <span className="welcome-greet">Welcome back, Alex! 👋</span>
                    <h1 className="welcome-title">Manage <span className="highlight-dashboard">Dashboard</span></h1>
                    <p className="welcome-sub">Here's an overview of your assets and activities.</p>
                </div>

                {/* Desktop representation showcase card graphic */}
                <div className="welcome-showcase-graphic">
                    <div className="showcase-desk-card">
                        <div className="showcase-laptop">
                            <div className="laptop-screen"></div>
                            <div className="laptop-keyboard"></div>
                        </div>
                        <div className="showcase-chair"></div>
                        <div className="showcase-plant"></div>
                    </div>
                </div>
            </div>

            <main className="dash-content-grid">
                {/* Left Column Area */}
                <section className="dash-main-pane">
                    
                    {/* HiFi Metrics Grid */}
                    <div className="metrics-grid-hifi">
                        <div className="metric-card-hifi">
                            <div className="metric-icon-square bg-blue-dim text-blue">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                            </div>
                            <div className="metric-info">
                                <span className="metric-label-hifi">Total Assets</span>
                                <span className="metric-value-hifi">{totalAssetsCount}</span>
                                <span className="metric-subtext-hifi">All available assets</span>
                            </div>
                        </div>

                        <div className="metric-card-hifi">
                            <div className="metric-icon-square bg-green-dim text-green">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div className="metric-info">
                                <span className="metric-label-hifi">Available</span>
                                <span className="metric-value-hifi">{availableCountTotal}</span>
                                <span className="metric-subtext-hifi">Ready to use</span>
                            </div>
                        </div>

                        <div className="metric-card-hifi">
                            <div className="metric-icon-square bg-purple-dim text-purple">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <div className="metric-info">
                                <span className="metric-label-hifi">Active Bookings</span>
                                <span className="metric-value-hifi">{activeBookingCountTotal}</span>
                                <span className="metric-subtext-hifi">Currently in use</span>
                            </div>
                        </div>

                        <div className="metric-card-hifi">
                            <div className="metric-icon-square bg-yellow-dim text-yellow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <div className="metric-info">
                                <span className="metric-label-hifi">Pending Requests</span>
                                <span className="metric-value-hifi">{pendingCountTotal}</span>
                                <span className="metric-subtext-hifi">Awaiting approval</span>
                            </div>
                        </div>
                    </div>

                    {/* ----------------------------------------------------
                        ROLE SEGMENTED ACTION WORKSPACES
                    ---------------------------------------------------- */}
                    
                    {/* 1. Employee Controls Panel */}
                    {role === 'Employee' && (
                        <div className="side-card-hifi" style={{ background: 'var(--bg-card)' }}>
                            <div className="side-card-header-row" style={{ marginBottom: '10px' }}>
                                <div className="header-side-left">
                                    <h4>Self-Service Reservation & Requests</h4>
                                </div>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '14px' }}>
                                Log resource schedules (rooms, spaces) or report issues against equipment you hold.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => setModalOpen('book')} className="btn-table-view-hifi" style={{ flex: 1, padding: '10px 14px', borderRadius: '10px' }}>
                                    📅 Book Shared Space
                                </button>
                                <button onClick={() => setModalOpen('report-issue')} className="btn-table-view-hifi" style={{ flex: 1, padding: '10px 14px', borderRadius: '10px' }}>
                                    ⚠️ Report Asset Issue
                                </button>
                                <button onClick={() => setModalOpen('transfer')} className="btn-table-view-hifi" style={{ flex: 1, padding: '10px 14px', borderRadius: '10px' }}>
                                    🔄 Hand-off Asset
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 2. Department Head Supervisor Approvals */}
                    {role === 'Dept Head' && (
                        <div className="table-card-hifi">
                            <div className="table-card-header">
                                <div className="header-title-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="box-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                    <h3>Supervisor clearance Requests Queue</h3>
                                </div>
                            </div>
                            <div className="table-wrapper-hifi">
                                <table className="dash-table-hifi">
                                    <thead>
                                        <tr>
                                            <th>ITEM</th>
                                            <th>TRANSACTION</th>
                                            <th>FROM MEMBER</th>
                                            <th>TO RECIPIENT</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clearanceRequests.length > 0 ? (
                                            clearanceRequests.map(req => (
                                                <tr key={req.id}>
                                                    <td className="font-semibold">{req.assetName}</td>
                                                    <td><span className="type-label-text">{req.requestType}</span></td>
                                                    <td>{req.fromUser}</td>
                                                    <td>{req.toUser}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <button onClick={() => handleApproveClearance(req.id)} className="btn-table-view-hifi" style={{ background: '#eff6ff', color: '#10b981' }}>Approve</button>
                                                            <button onClick={() => handleRejectClearance(req.id)} className="btn-table-view-hifi" style={{ background: '#fef2f2', color: '#ef4444' }}>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="table-empty">No pending allocation clearance hand-offs.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 3. Asset Manager Logistics Console */}
                    {role === 'Asset Manager' && (
                        <div className="table-card-hifi">
                            <div className="table-card-header">
                                <div className="header-title-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="box-icon"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                                    <h3>Maintenance Dispatch & Auditing Queue</h3>
                                </div>
                            </div>
                            <div className="table-wrapper-hifi">
                                <table className="dash-table-hifi">
                                    <thead>
                                        <tr>
                                            <th>ITEM NAME</th>
                                            <th>REPORTED BY</th>
                                            <th>ISSUE DETAILS</th>
                                            <th>VERIFICATION STATUS</th>
                                            <th>DISPATCH ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {issues.length > 0 ? (
                                            issues.map(issue => (
                                                <tr key={issue.id}>
                                                    <td className="font-semibold">{issue.assetName}</td>
                                                    <td>{issue.reportedBy}</td>
                                                    <td className="text-muted">{issue.details}</td>
                                                    <td>
                                                        <span className="status-badge-hifi badge-hifi-pending">{issue.status}</span>
                                                    </td>
                                                    <td>
                                                        {issue.status === 'Awaiting Action' ? (
                                                            <button onClick={() => handleDispatchMaintenance(issue.id)} className="btn-table-view-hifi">
                                                                Dispatch Tech
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => handleResolveMaintenance(issue.id)} className="btn-table-view-hifi" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                                                                Verify & Complete
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="table-empty">All maintenance tasks verified. Master inventory checks clear.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 4. Admin Strategy Settings Console */}
                    {role === 'Admin' && (
                        <div className="dash-content-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {/* Directory access promotion controller */}
                            <div className="side-card-hifi">
                                <div className="side-card-header-row">
                                    <div className="header-side-left">
                                        <h4>Corporate Directory Roles</h4>
                                    </div>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="dash-table-hifi">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Current Role</th>
                                                <th>Promote/Demote Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(u => (
                                                <tr key={u.id}>
                                                    <td className="font-semibold">{u.name}</td>
                                                    <td className="text-muted">{u.role}</td>
                                                    <td>
                                                        <div className="table-filter-select-wrapper" style={{ padding: '2px 4px' }}>
                                                            <select value={u.role} onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}>
                                                                <option value="Employee">Employee</option>
                                                                <option value="Dept Head">Dept Head</option>
                                                                <option value="Asset Manager">Asset Manager</option>
                                                                <option value="Admin">Admin</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Schema Strategic Array Strategies */}
                            <div className="side-card-hifi">
                                <div className="side-card-header-row">
                                    <div className="header-side-left">
                                        <h4>JSON Strategy Configuration</h4>
                                    </div>
                                </div>
                                <p className="text-muted" style={{ fontSize: '0.72rem', marginBottom: '8px' }}>
                                    Configure core categories data architectures and verification coverage arrays:
                                </p>
                                <textarea 
                                    className="input-wrapper"
                                    spellCheck={false}
                                    style={{
                                        width: '100%',
                                        height: '140px',
                                        background: 'var(--bg-input)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'monospace',
                                        fontSize: '0.78rem',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        resize: 'none'
                                    }}
                                    value={categoryStrategy}
                                    onChange={(e) => setCategoryStrategy(e.target.value)}
                                />
                                <button className="btn-primary-gradient" style={{ marginTop: '10px', padding: '8px' }} onClick={handleSaveSchema}>
                                    Save Schema Strategics
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Master Inventory Ledger Table */}
                    <div className="table-card-hifi">
                        <div className="table-card-header">
                            <div className="header-title-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="box-icon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                <h3>{role === 'Employee' ? 'My Personal Inventory & Resources' : role === 'Dept Head' ? 'Department Inventory Ledger' : 'All Master Assets'}</h3>
                            </div>
                            <div className="header-filters-right">
                                <div className="table-search-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    <input 
                                        type="text" 
                                        placeholder="Search assets..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="table-filter-select-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="funnel-icon"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                    <select 
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        <option value="All">All Types</option>
                                        {categoriesList.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* High Fidelity Table grid */}
                        <div className="table-wrapper-hifi">
                            <table className="dash-table-hifi">
                                <thead>
                                    <tr>
                                        <th>ASSET / RESOURCE</th>
                                        <th>TYPE</th>
                                        <th>LOCATION</th>
                                        <th>STATUS</th>
                                        <th>BOOKED BY / UNTIL</th>
                                        <th>ACTION</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedAssets.length > 0 ? (
                                        displayedAssets.map(asset => (
                                            <tr key={asset.id}>
                                                <td>
                                                    <div className="asset-name-column">
                                                        {getCategoryIcon(asset.type)}
                                                        <span className="asset-title-text">{asset.name}</span>
                                                    </div>
                                                </td>
                                                <td><span className="type-label-text">{asset.type}</span></td>
                                                <td><span className="loc-label-text">{asset.location}</span></td>
                                                <td>
                                                    <span className={`status-badge-hifi badge-hifi-${asset.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                                        {asset.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="booking-info-text">{asset.custodian}</span>
                                                </td>
                                                <td>
                                                    {/* Context-aware action buttons depending on active logged in Role */}
                                                    {role === 'Employee' && asset.custodian === 'Alex Johnson' && (
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <button onClick={() => handleReturnAsset(asset.id)} className="btn-table-view-hifi" style={{ background: '#fef2f2', color: '#ef4444' }}>
                                                                Return
                                                            </button>
                                                            <button onClick={() => { setSelectedAssetId(asset.id); setModalOpen('transfer'); }} className="btn-table-view-hifi">
                                                                Hand-off
                                                            </button>
                                                        </div>
                                                    )}
                                                    {role === 'Asset Manager' && (
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <button onClick={() => handleMarkDiscrepancy(asset.id, 'DAMAGED')} className="btn-table-view-hifi" style={{ background: '#fef2f2', color: '#ef4444' }}>
                                                                Damaged
                                                            </button>
                                                            <button onClick={() => handleMarkDiscrepancy(asset.id, 'MISSING')} className="btn-table-view-hifi" style={{ background: '#fffbeb', color: '#d97706' }}>
                                                                Missing
                                                            </button>
                                                        </div>
                                                    )}
                                                    {/* Default fallback View pill */}
                                                    {!(role === 'Employee' && asset.custodian === 'Alex Johnson') && !(role === 'Asset Manager') && (
                                                        <button className="btn-table-view-hifi">
                                                            View
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="action-three-dots">⋮</div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="table-empty">No resources found in current directory view.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer / Pagination */}
                        <div className="table-card-footer-hifi">
                            <span className="footer-showing-text">Showing 1 to {displayedAssets.length} of {displayedAssets.length} assets</span>
                            <div className="pagination-wrapper">
                                <button className="pag-btn">‹</button>
                                <button className="pag-number active">1</button>
                                <button className="pag-number">2</button>
                                <button className="pag-number">3</button>
                                <button className="pag-btn">›</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Column Sidebar Area */}
                <section className="dash-side-pane">
                    {/* User Role Clearance Info Card */}
                    <div className="side-card-hifi" style={{ marginBottom: '0px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div className="role-badge-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                            <div className="role-badge-text">
                                <span className="role-badge-label">Your Role</span>
                                <span className="role-badge-value" style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                    {role === 'Dept Head' ? 'Department Head' : role}
                                </span>
                            </div>
                        </div>
                        <p className="text-muted" style={{ fontSize: '0.78rem', marginTop: '10px', lineHeight: '1.4' }}>
                            {role === 'Employee' && "You can view personal checkout inventory, reservation calendars & reports."}
                            {role === 'Dept Head' && "You can manage department equipment and approve allocation clearance hand-offs."}
                            {role === 'Asset Manager' && "You can authorize inventory checks, dispatch repairs, and register assets."}
                            {role === 'Admin' && "You can configure schemas, platform groups, and manage account authorization tags."}
                        </p>
                    </div>

                    {/* Activity Panel */}
                    <div className="side-card-hifi">
                        <div className="side-card-header-row">
                            <div className="header-side-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="activity-pulse-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                                <h4>Recent Activity</h4>
                            </div>
                            <a className="link-view-all">View all</a>
                        </div>
                        
                        {/* Connected Timeline list */}
                        <div className="timeline-wrapper-hifi">
                            <div className="timeline-connecting-line"></div>
                            <div className="activity-list-hifi">
                                {activities.map(act => (
                                    <div key={act.id} className="activity-item-hifi">
                                        <div className={`timeline-dot-hifi dot-color-${act.badge}`}></div>
                                        <div className="activity-body-hifi">
                                            <p className="activity-desc">{act.text}</p>
                                            <span className="activity-timestamp">{act.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Panel */}
                    <div className="side-card-hifi">
                        <div className="side-card-header-row">
                            <div className="header-side-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="chain-link-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                <h4>Quick Links</h4>
                            </div>
                        </div>

                        <div className="quick-links-list">
                            <a className="quick-link-row" onClick={() => console.log('My Bookings')}>
                                <div className="link-label">
                                    <span className="link-bullet">📅</span> My Bookings
                                </div>
                                <span className="arrow-right-icon">›</span>
                            </a>
                            <a className="quick-link-row" onClick={() => console.log('My Requests')}>
                                <div className="link-label">
                                    <span className="link-bullet">📄</span> My Requests
                                </div>
                                <span className="arrow-right-icon">›</span>
                            </a>
                            <a className="quick-link-row" onClick={() => console.log('Browse')}>
                                <div className="link-label">
                                    <span className="link-bullet">📦</span> Browse All Assets
                                </div>
                                <span className="arrow-right-icon">›</span>
                            </a>
                            <a className="quick-link-row" onClick={() => console.log('Reports')}>
                                <div className="link-label">
                                    <span className="link-bullet">📈</span> Reports & Analytics
                                </div>
                                <span className="arrow-right-icon">›</span>
                            </a>
                        </div>
                    </div>

                    {/* Need Help Support Panel */}
                    <div className="support-banner-card-hifi">
                        <div className="support-row-content">
                            <div className="support-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 1 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                            </div>
                            <div className="support-text-info">
                                <h5>Need Help?</h5>
                                <p>Contact support team</p>
                            </div>
                        </div>
                        <span className="support-chevron">›</span>
                    </div>
                </section>
            </main>

            {/* Modal Dialog Form Overlays */}
            
            {/* Modal 1: Register Asset */}
            {modalOpen === 'register' && (
                <div className="modal-overlay active">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h2>Register Asset</h2>
                            <button onClick={() => setModalOpen(null)} className="modal-close">×</button>
                        </div>
                        <form onSubmit={handleRegister} className="modal-body auth-form">
                            <div className="form-group">
                                <label htmlFor="reg-name">Asset Name</label>
                                <div className="input-wrapper">
                                    <input 
                                        id="reg-name" 
                                        type="text" 
                                        placeholder="e.g. MacBook Pro 14" 
                                        value={registerForm.name}
                                        onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-type">Category Type</label>
                                <div className="input-wrapper">
                                    <select 
                                        id="reg-type"
                                        value={registerForm.type}
                                        onChange={(e) => setRegisterForm({...registerForm, type: e.target.value})}
                                    >
                                        {categoriesList.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-loc">Storage Location</label>
                                <div className="input-wrapper">
                                    <input 
                                        id="reg-loc" 
                                        type="text" 
                                        placeholder="e.g. London Hub" 
                                        value={registerForm.location}
                                        onChange={(e) => setRegisterForm({...registerForm, location: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary-gradient" style={{ marginTop: '10px' }}>
                                Register Asset
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal 2: Book Asset */}
            {modalOpen === 'book' && (
                <div className="modal-overlay active">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h2>Book Resource</h2>
                            <button onClick={() => setModalOpen(null)} className="modal-close">×</button>
                        </div>
                        <form onSubmit={handleBook} className="modal-body auth-form">
                            <div className="form-group">
                                <label htmlFor="book-res">Resource Space</label>
                                <div className="input-wrapper">
                                    <select 
                                        id="book-res"
                                        value={bookForm.resource}
                                        onChange={(e) => setBookForm({...bookForm, resource: e.target.value})}
                                    >
                                        <option value="Meeting Room C">Meeting Room C</option>
                                        <option value="Conference Hall A">Conference Hall A</option>
                                        <option value="Creative Studio B">Creative Studio B</option>
                                        <option value="Shared Desk 10">Shared Desk 10</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="book-date">Reservation Date</label>
                                <div className="input-wrapper">
                                    <input 
                                        id="book-date" 
                                        type="date" 
                                        value={bookForm.date}
                                        onChange={(e) => setBookForm({...bookForm, date: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="book-time">Time Slot</label>
                                <div className="input-wrapper">
                                    <input 
                                        id="book-time" 
                                        type="text" 
                                        placeholder="e.g. 10:00 AM - 12:00 PM" 
                                        value={bookForm.timeSlot}
                                        onChange={(e) => setBookForm({...bookForm, timeSlot: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Supervisor scheduling bypass clearance checkbox (Only shown to Dept Head) */}
                            {role === 'Dept Head' && (
                                <div className="form-actions-row">
                                    <label className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            checked={bookForm.priority}
                                            onChange={(e) => setBookForm({...bookForm, priority: e.target.checked})}
                                        />
                                        Priority Department Bypass Reservation
                                    </label>
                                </div>
                            )}

                            <button type="submit" className="btn-primary-gradient" style={{ marginTop: '10px' }}>
                                Book Resource
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal 3: Report Issue */}
            {modalOpen === 'report-issue' && (
                <div className="modal-overlay active">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h2>Report Asset Issue</h2>
                            <button onClick={() => setModalOpen(null)} className="modal-close">×</button>
                        </div>
                        <form onSubmit={submitIssueLog} className="modal-body auth-form">
                            <div className="form-group">
                                <label htmlFor="issue-asset">Choose Assigned Asset</label>
                                <div className="input-wrapper">
                                    <select 
                                        id="issue-asset"
                                        value={issueForm.assetId}
                                        onChange={(e) => setIssueForm({...issueForm, assetId: e.target.value})}
                                    >
                                        {assets.filter(a => a.custodian === 'Alex Johnson').map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="issue-details">Describe Problem</label>
                                <div className="input-wrapper">
                                    <input 
                                        id="issue-details" 
                                        type="text" 
                                        placeholder="e.g. Screen flickering or physical damage" 
                                        value={issueForm.details}
                                        onChange={(e) => setIssueForm({...issueForm, details: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="issue-photo">Upload Reference Photo</label>
                                <div className="input-wrapper">
                                    <input 
                                        id="issue-photo" 
                                        type="file" 
                                        onChange={(e) => setIssueForm({...issueForm, photo: e.target.value})}
                                    />
                                </div>
                                <div style={{ textAlign: 'center', margin: '4px 0', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>— OR —</div>
                                <div className="input-wrapper">
                                    <input 
                                        type="text" 
                                        placeholder="Describe visual details / photo description" 
                                        value={issueForm.photoDescription || ''}
                                        onChange={(e) => setIssueForm({...issueForm, photoDescription: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary-gradient" style={{ marginTop: '10px' }}>
                                Submit Issue Log
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal 4: Transfer Hand-off */}
            {modalOpen === 'transfer' && (
                <div className="modal-overlay active">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h2>Asset Hand-off Request</h2>
                            <button onClick={() => setModalOpen(null)} className="modal-close">×</button>
                        </div>
                        <form onSubmit={submitTransferRequest} className="modal-body auth-form">
                            <div className="form-group">
                                <label htmlFor="trans-recipient">Colleague Recipient Name</label>
                                <div className="input-wrapper">
                                    <input 
                                        id="trans-recipient" 
                                        type="text" 
                                        placeholder="e.g. Jane Smith" 
                                        value={transferForm.recipientName}
                                        onChange={(e) => setTransferForm({...transferForm, recipientName: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="trans-notes">Transfer Justification Notes</label>
                                <div className="input-wrapper">
                                    <input 
                                        id="trans-notes" 
                                        type="text" 
                                        placeholder="e.g. Assigned to new team branch" 
                                        value={transferForm.notes}
                                        onChange={(e) => setTransferForm({...transferForm, notes: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary-gradient" style={{ marginTop: '10px' }}>
                                Submit Transfer Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
