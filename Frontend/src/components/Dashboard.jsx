import React, { useState } from 'react';
import favicon from '../assets/favicon.png';

<<<<<<< Updated upstream
export default function Dashboard({ role, onLogout, theme, toggleTheme }) {
=======
const RESOURCE_CATEGORIES = {
    'Electronics': [
        'Laptop Dell XPS',
        'MacBook Pro',
        'iPad Pro',
        'Projector',
        'Laser Printer'
    ],
    'Furniture': [
        'Ergonomic Office Chair',
        'Adjustable Standing Desk',
        'Conference Table',
        'Whiteboard'
    ],
    'Rooms/Spaces': [
        'Meeting Room C',
        'Conference Hall A',
        'Creative Studio B',
        'Shared Desk 10'
    ],
    'AV System': [
        'Polycom Studio',
        'Smart TV 65"',
        'Wireless Mic Set'
    ],
    'Vehicle': [
        'Company Van',
        'Electric Scooter'
    ]
};

export default function Dashboard({ role, token, currentUser, onLogout, theme, toggleTheme }) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const navTabsRef = React.useRef(null);

    const [activeTab, setActiveTab] = useState('Dashboard');
    const [departmentsList, setDepartmentsList] = useState([]);
    const [orgSubTab, setOrgSubTab] = useState('Departments');
    const [strategiesList, setStrategiesList] = useState([]);

>>>>>>> Stashed changes
    // ----------------------------------------------------
    // MASTER DATABASE STATE
    // ----------------------------------------------------
    const [assets, setAssets] = useState([
<<<<<<< Updated upstream
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
=======
        { id: 1, name: 'Dell Laptop', asset_tag: 'AF-0012', serial_number: 'SN-DELL-0012', type: 'Electronics', location: 'Bengaluru Office', status: 'ALLOCATED', custodian: 'Aditi Rao', department: 'Engineering' },
        { id: 2, name: 'Projector', asset_tag: 'AF-0062', serial_number: 'SN-PROJ-0062', type: 'AV System', location: 'HQ Floor 2', status: 'UNDER MAINTENANCE', custodian: '—', department: 'Facilities' },
        { id: 3, name: 'Office Chair', asset_tag: 'AF-0201', serial_number: 'SN-CHAIR-0201', type: 'Furniture', location: 'Warehouse East', status: 'AVAILABLE', custodian: '—', department: 'Logistics' },
        { id: 4, name: 'MacBook Pro 16"', asset_tag: 'AF-0114', serial_number: 'SN-MAC-0114', type: 'Electronics', location: 'HQ Desk A4', status: 'ALLOCATED', custodian: 'Priya Shah', department: 'Engineering' },
        { id: 5, name: 'Conference room B2', asset_tag: 'AF-0302', serial_number: 'SN-ROOM-0302', type: 'AV System', location: 'Floor 2 East', status: 'AVAILABLE', custodian: '—', department: 'Operations' },
        { id: 6, name: 'Polycom Studio', asset_tag: 'AF-0440', serial_number: 'SN-POLY-0440', type: 'AV System', location: 'Floor 1 Room C', status: 'AVAILABLE', custodian: '—', department: 'Marketing' },
        { id: 7, name: 'Company Van', asset_tag: 'AF-0343', serial_number: 'SN-VAN-0343', type: 'Vehicle', location: 'Garage Slot 3', status: 'AVAILABLE', custodian: '—', department: 'Logistics' }
    ]);
    const [activities, setActivities] = useState([
        { id: 1, text: 'MacBook Pro AF-0114 allocated to Priya Shah — Engineering', badge: 'allocation', time: 'Mar 12' },
        { id: 2, text: 'Asset Projector AF-0062 marked under maintenance: bulb replacement', badge: 'pending', time: 'Jan 04' },
        { id: 3, text: 'New Office Chair AF-0201 registered in Warehouses', badge: 'register', time: 'Jan 02' }
    ]);
    const [users, setUsers] = useState([
        { id: 1, name: 'AssetFlow Admin', email: 'admin@assetflow.com', role: 'Admin', department: 'Executive' },
        { id: 2, name: 'Aditi Rao', email: 'aditi@assetflow.com', role: 'Dept Head', department: 'Engineering' },
        { id: 3, name: 'Sana Iqbal', email: 'sana@assetflow.com', role: 'Dept Head', department: 'Field Ops' },
        { id: 4, name: 'Rohan Mehta', email: 'rohan@assetflow.com', role: 'Dept Head', department: 'Facilities' },
        { id: 5, name: 'Priya Shah', email: 'priya@assetflow.com', role: 'Employee', department: 'Engineering' },
        { id: 6, name: 'Krutin', email: 'krutin@assetflow.com', role: 'Employee', department: 'Engineering' }
    ]);
    const [categoryStrategy, setCategoryStrategy] = useState('[]');
    const [categoriesList, setCategoriesList] = useState(['Electronics', 'Furniture', 'AV System', 'Vehicle']);
    const [issues, setIssues] = useState([
        { id: 1, assetName: 'AF-0062 Projector', details: 'Projector bulb not turning on', status: 'Awaiting Action' },
        { id: 2, assetName: 'AF-003 Dell laptop', details: 'ac unit noisy compressor', status: 'Approved' },
        { id: 3, assetName: 'AF-0078 Forklift', details: 'Forklift tech assignment required', status: 'Technician Assigned' },
        { id: 4, assetName: 'AF-897 Printer', details: 'Printer Jam parts ordered', status: 'Under Maintenance' },
        { id: 5, assetName: 'AF-873 Chair', details: 'Chair repair resolved 7 Jul', status: 'Resolved' }
    ]);
    const [clearanceRequests, setClearanceRequests] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    const fetchData = async () => {
        try {
            setLoadingData(true);
            // 1. Fetch assets
            const assetsRes = await fetch(`${API_URL}/api/assets`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (assetsRes.ok) {
                const assetsData = await assetsRes.json();
                setAssets(assetsData);
            }

            // 2. Fetch activities
            const activitiesRes = await fetch(`${API_URL}/api/activities`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (activitiesRes.ok) {
                const activitiesData = await activitiesRes.json();
                setActivities(activitiesData);
            }

            // 3. Fetch issues
            const issuesRes = await fetch(`${API_URL}/api/issues`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (issuesRes.ok) {
                const issuesData = await issuesRes.json();
                setIssues(issuesData);
            }

            // 4. Fetch clearances
            if (role === 'Dept Head' || role === 'Admin') {
                const clearanceRes = await fetch(`${API_URL}/api/clearance`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (clearanceRes.ok) {
                    const clearanceData = await clearanceRes.json();
                    setClearanceRequests(clearanceData);
                }
            }

            // Fetch strategies (All authenticated roles)
            const strategyRes = await fetch(`${API_URL}/api/admin/strategy`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (strategyRes.ok) {
                const strategyData = await strategyRes.json();
                const strategiesArray = strategyData.strategies || strategyData;
                setCategoryStrategy(JSON.stringify(strategiesArray, null, 4));
                setStrategiesList(strategiesArray);
                const list = strategiesArray.map(item => item.category).filter(Boolean);
                if (list.length > 0) {
                    setCategoriesList(list);
                }
            }

            // Fetch departments (All authenticated roles)
            const departmentsRes = await fetch(`${API_URL}/api/departments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (departmentsRes.ok) {
                const departmentsData = await departmentsRes.json();
                setDepartmentsList(departmentsData);
            }

            // Fetch user directory (Admin only)
            if (role === 'Admin') {
                const usersRes = await fetch(`${API_URL}/api/admin/users`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (usersRes.ok) {
                    const usersData = await usersRes.json();
                    setUsers(usersData);
                }
            }

            // Fetch bookings (All authenticated roles)
            const bookingsRes = await fetch(`${API_URL}/api/bookings`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (bookingsRes.ok) {
                const bookingsData = await bookingsRes.json();
                setBookingsList(bookingsData);
            }
            setLoadingData(false);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setLoadingData(false);
        }
    };

    const getNavItemsByRole = () => {
        const allItems = [
            { id: 'Dashboard', name: 'Dashboard' },
            { id: 'Organization setup', name: 'Organization setup' },
            { id: 'Assets', name: 'Assets' },
            { id: 'Allocation & Transfer', name: 'Allocation & Transfer' },
            { id: 'Resource Booking', name: 'Resource Booking' },
            { id: 'Maintenance', name: 'Maintenance' },
            { id: 'Audit', name: 'Audit' },
            { id: 'Reports', name: 'Reports' },
            { id: 'Notifications', name: 'Notifications' }
        ];

        if (role === 'Admin') {
            return allItems;
        } else if (role === 'Asset Manager') {
            return allItems.filter(item => item.id !== 'Organization setup');
        } else if (role === 'Dept Head') {
            return allItems.filter(item => 
                item.id === 'Dashboard' || 
                item.id === 'Allocation & Transfer' || 
                item.id === 'Resource Booking' || 
                item.id === 'Maintenance' || 
                item.id === 'Notifications'
            );
        } else {
            return allItems.filter(item => 
                item.id === 'Dashboard' || 
                item.id === 'Resource Booking' || 
                item.id === 'Notifications'
            );
        }
    };

    React.useEffect(() => {
        const allowedItems = getNavItemsByRole().map(item => item.id);
        if (!allowedItems.includes(activeTab)) {
            setActiveTab('Dashboard');
        }
    }, [role, activeTab]);

    React.useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token, role]);

    // Organization setup forms state
    const [newDeptForm, setNewDeptForm] = useState({ name: '', head: '', parentDept: '', status: 'Active' });
    const [editingDeptId, setEditingDeptId] = useState(null);
    const [editDeptForm, setEditDeptForm] = useState({ name: '', head: '', parentDept: '', status: 'Active' });

    const [newCatForm, setNewCatForm] = useState({ category: '', warrantyCoverage: '', safetyAudit: '' });
    const [editingCatName, setEditingCatName] = useState(null);
    const [editCatForm, setEditCatForm] = useState({ category: '', warrantyCoverage: '', safetyAudit: '' });

    const [newEmpForm, setNewEmpForm] = useState({ name: '', email: '', password: '', role: 'Employee', department: '' });

    // Active sub-form selection in the "+ Add" tab
    const [activeAddForm, setActiveAddForm] = useState('Department');

    // Assets page search/filters state
    const [assetSearchQuery, setAssetSearchQuery] = useState('');
    const [assetCategoryFilter, setAssetCategoryFilter] = useState('All');
    const [assetStatusFilter, setAssetStatusFilter] = useState('All');
    const [assetDeptFilter, setAssetDeptFilter] = useState('All');

    // ----------------------------------------------------
    // ORGANIZATION SETUP HANDLERS (Admin only)
    // ----------------------------------------------------
    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/departments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newDeptForm)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to create department');
            alert('Department created successfully!');
            setNewDeptForm({ name: '', head: '', parentDept: '', status: 'Active' });
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleUpdateDepartment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/departments/${editingDeptId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editDeptForm)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to update department');
            alert('Department updated successfully!');
            setEditingDeptId(null);
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteDepartment = async (deptId) => {
        if (!confirm('Are you sure you want to delete this department?')) return;
        try {
            const response = await fetch(`${API_URL}/api/departments/${deptId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to delete department');
            alert('Department deleted successfully!');
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const updatedStrategies = [...strategiesList, {
                category: newCatForm.category,
                warrantyCoverage: newCatForm.warrantyCoverage || '12 Months',
                safetyAudit: newCatForm.safetyAudit || 'Annually'
            }];
            const response = await fetch(`${API_URL}/api/admin/strategy`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedStrategies)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to add category');
            alert('Category added successfully!');
            setNewCatForm({ category: '', warrantyCoverage: '', safetyAudit: '' });
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const updatedStrategies = strategiesList.map(s => 
                s.category === editingCatName ? editCatForm : s
            );
            const response = await fetch(`${API_URL}/api/admin/strategy`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedStrategies)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to update category');
            alert('Category updated successfully!');
            setEditingCatName(null);
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteCategory = async (catName) => {
        if (!confirm(`Are you sure you want to delete category '${catName}'?`)) return;
        try {
            const updatedStrategies = strategiesList.filter(s => s.category !== catName);
            const response = await fetch(`${API_URL}/api/admin/strategy`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedStrategies)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to delete category');
            alert('Category deleted successfully!');
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newEmpForm.name,
                    email: newEmpForm.email,
                    password: newEmpForm.password,
                    department: newEmpForm.department || '—'
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to create employee user');

            if (newEmpForm.role !== 'Employee') {
                const roleResponse = await fetch(`${API_URL}/api/admin/users/${data.user.id}/role`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ role: newEmpForm.role })
                });
                const roleData = await roleResponse.json();
                if (!roleResponse.ok) throw new Error(roleData.error || 'User created but failed to assign role');
            }

            alert('Employee user registered successfully!');
            setNewEmpForm({ name: '', email: '', password: '', role: 'Employee', department: '' });
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };


    const handleDeleteEmployee = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to delete user');
            alert('User deleted successfully!');
            fetchData();
        } catch (err) {
            alert(err.message);
>>>>>>> Stashed changes
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
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Additional workspace pages states
    const [bookingsList, setBookingsList] = useState([
        { id: 1, resourceName: 'Conference room B2', userName: 'Procurement Team', startTime: `${new Date().toISOString().split('T')[0]}T09:00:00`, endTime: `${new Date().toISOString().split('T')[0]}T10:00:00`, status: 'Upcoming' }
    ]);
    
    // 1. Allocation & Transfer
    const [allocAssetId, setAllocAssetId] = useState('');
    const [allocToUser, setAllocToUser] = useState('');
    const [allocLocation, setAllocLocation] = useState('');
    const [transferReason, setTransferReason] = useState('');

    // 2. Resource Booking (Screen 6)
    const [selectedBookCategory, setSelectedBookCategory] = useState('Rooms/Spaces');
    const [selectedBookResource, setSelectedBookResource] = useState('Meeting Room C');
    const [bookResourceDate, setBookResourceDate] = useState(new Date().toISOString().split('T')[0]);

    // 3. Maintenance Kanban Board (Screen 7)
    const [technicianMap, setTechnicianMap] = useState({}); // issueId -> technicianName

    // 4. Audit (Screen 8)
    const [auditVerificationStates, setAuditVerificationStates] = useState({
        'AF-003': 'Verified',
        'AF-9921': 'Missing',
        'AF-9838': 'Damaged'
    });

    // Form inputs
    const [registerForm, setRegisterForm] = useState({ name: '', type: 'Electronics', location: '' });
    const [bookForm, setBookForm] = useState({ type: 'Electronics', resource: 'Laptop Dell XPS', timeSlot: '', date: '', priority: false });
    const [requestForm, setRequestForm] = useState({ assetId: '2', notes: '' });
    const [issueForm, setIssueForm] = useState({ assetId: '1', details: '', photo: '' });
    const [transferForm, setTransferForm] = useState({ assetId: '1', recipientName: '', notes: '' });

    // Active Asset under interaction
    const [selectedAssetId, setSelectedAssetId] = useState(null);

    // ----------------------------------------------------
    // WORKFLOW HANDLERS
    // ----------------------------------------------------
    
    // Admin promotional tools
<<<<<<< Updated upstream
    const handleUpdateUserRole = (userId, newRole) => {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        setActivities([
            { id: Date.now(), text: `User role for ${users.find(u => u.id === userId).name} updated to ${newRole}`, time: 'Just now', badge: 'register' },
            ...activities
        ]);
=======
    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to update user role');
            alert('User role assigned successfully!');
            fetchData();
        } catch (err) {
            alert(err.message);
        }
>>>>>>> Stashed changes
    };

    // Employee Issue Reporting
    const submitIssueLog = (e) => {
        e.preventDefault();
<<<<<<< Updated upstream
        const targetAsset = assets.find(a => a.id === parseInt(issueForm.assetId));
        if (!targetAsset) return;
=======
        const targetAssetId = parseInt(issueForm.assetId);
        const targetAsset = assets.find(a => a.id === targetAssetId);
        if (!targetAsset) {
            alert('No valid asset selected. You can only report issues for assets assigned to you.');
            return;
        }
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
        try {
            const response = await fetch(`${API_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    resource: bookForm.resource,
                    type: bookForm.type,
                    timeSlot: bookForm.timeSlot,
                    date: bookForm.date,
                    priority: bookForm.priority
                })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to reserve resource');
            }
            fetchData();
            setBookForm({ type: 'Electronics', resource: 'Laptop Dell XPS', timeSlot: '', date: '', priority: false });
            setModalOpen(null);
        } catch (err) {
            alert(err.message);
        }
>>>>>>> Stashed changes
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

    const handleDirectAllocate = async (e) => {
        e.preventDefault();
        if (!allocAssetId || !allocToUser) {
            alert('Please select an asset and employee.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/assets/${allocAssetId}/allocate`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    custodianName: allocToUser,
                    location: allocLocation || 'HQ Desk',
                    department: users.find(u => u.name === allocToUser)?.department || 'Engineering'
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to allocate asset');
            alert('Asset allocated successfully!');
            setAllocAssetId('');
            setAllocToUser('');
            setAllocLocation('');
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleTransferSubmit = async (e) => {
        e.preventDefault();
        if (!allocAssetId || !allocToUser) {
            alert('Please select an asset and colleague recipient.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/clearance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    assetId: parseInt(allocAssetId),
                    recipientName: allocToUser,
                    notes: transferReason || 'Dynamic horizontal transfer'
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to submit transfer request');
            alert('Transfer request submitted successfully!');
            setAllocAssetId('');
            setAllocToUser('');
            setTransferReason('');
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleQuickBookSlot = async (timeSlotStr) => {
        try {
            const response = await fetch(`${API_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    resource: selectedBookResource,
                    type: 'Rooms/Spaces',
                    timeSlot: timeSlotStr,
                    date: bookResourceDate,
                    priority: false
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to book slot');
            alert('Resource slot reserved successfully!');
            fetchData();
        } catch (err) {
            alert(err.message);
        }
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

    const getAssetsPageFilteredAssets = () => {
        return assets.filter(asset => {
            const tagVal = asset.asset_tag || '';
            const nameVal = asset.name || '';
            const serialVal = asset.serial_number || '';
            const matchesSearch = tagVal.toLowerCase().includes(assetSearchQuery.toLowerCase()) || 
                                  nameVal.toLowerCase().includes(assetSearchQuery.toLowerCase()) ||
                                  serialVal.toLowerCase().includes(assetSearchQuery.toLowerCase());

            const matchesCategory = assetCategoryFilter === 'All' || asset.type === assetCategoryFilter;
            const matchesStatus = assetStatusFilter === 'All' || asset.status === assetStatusFilter;
            const matchesDept = assetDeptFilter === 'All' || asset.department === assetDeptFilter;

            return matchesSearch && matchesCategory && matchesStatus && matchesDept;
        });
    };

    const displayedAssets = getRoleFilteredAssets();

    return (
        <div className="dashboard-layout-wrapper" style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', background: 'var(--bg-main)' }}>
            
            {/* Main container */}
            <div className="dashboard-layout" style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
                {/* Top Navigation Bar */}
                <header className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                    <div className="dash-brand" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={favicon} alt="AssetFlow" style={{ height: '46px', objectFit: 'contain' }} />
                    </div>

                    {/* Center Horizontal Navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1, margin: '0 16px', position: 'relative' }}>
                        <nav 
                            ref={navTabsRef}
                            className="dash-nav-tabs" 
                            style={{ 
                                display: 'flex', 
                                gap: '8px', 
                                overflowX: 'auto', 
                                flex: 1, 
                                scrollbarWidth: 'none', /* Firefox */
                                msOverflowStyle: 'none' /* IE/Edge */
                            }}
                        >
                            {getNavItemsByRole().map(item => {
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '0.85rem',
                                            whiteSpace: 'nowrap'
                                        }}
                                        className={isActive ? 'sidebar-btn active' : 'sidebar-btn'}
                                    >
                                        {item.name}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right controls */}
                    <div className="dash-header-actions">
                        {/* Only Asset Manager and Admin can register assets directly in the global header */}
                        {(role === 'Admin' || role === 'Asset Manager') && (
                            <button onClick={() => setModalOpen('register')} className="header-btn-register">
                                <span className="plus-symbol">+</span> Register Asset
                            </button>
                        )}

<<<<<<< Updated upstream
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
=======
                        {/* Notification icon showing count */}
                        <div className="notify-bell-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="notify-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                            <span className="notify-badge-count">3</span>
>>>>>>> Stashed changes
                        </div>

                        {/* Theme Toggler switcher button */}
                        <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme Mode">
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>

                        {/* Explicit Vertical Divider Line */}
                        <div style={{ width: '1px', height: '28px', background: 'var(--border-color)', margin: '0 8px', opacity: 0.8 }}></div>

                        {/* User profile dropdown - click to sign out */}
                        <div className="user-profile-badge-group-hifi" style={{ position: 'relative', borderLeft: 'none', paddingLeft: '0' }} onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} title="Sign Out">
                            <div className="user-profile-circle" style={{ background: '#0a0f1d', color: '#ffffff', fontWeight: 'bold' }}>
                                {currentUser ? currentUser.name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase() : 'K'}
                            </div>
                            <div className="user-profile-info-text">
                                <span className="profile-name-span" style={{ fontWeight: '700', fontSize: '0.85rem' }}>{currentUser ? currentUser.name : 'krutin'}</span>
                                <span className="profile-role-span" style={{ color: '#2563eb', fontWeight: '600', fontSize: '0.75rem' }}>{role === 'Dept Head' ? 'Dept Head' : role}</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="profile-chevron" style={{ color: '#94a3b8', marginLeft: '4px' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                            
                            {profileDropdownOpen && (
                                <div className="profile-dropdown-menu" onClick={(e) => e.stopPropagation()} style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: '0',
                                    marginTop: '8px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '10px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                    padding: '8px',
                                    minWidth: '150px',
                                    zIndex: 100
                                }}>
                                    <button onClick={onLogout} className="btn-table-view-hifi" style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '8px 12px',
                                        color: '#ef4444',
                                        background: '#fef2f2',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span>🚪</span> Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* TAB VIEW 1: DASHBOARD VIEW */}
                {activeTab === 'Dashboard' && (
                    <>
                        {/* Welcome banner and role info */}
                        <div className="welcome-banner-section-hifi">
                            <div className="welcome-text-block">
                                <span className="welcome-greet">Welcome back, {currentUser ? currentUser.name.split(' ')[0] : 'User'}! 👋</span>
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

                                {/* 1. Employee / Dept Head Controls Panel */}
                                {(role === 'Employee' || role === 'Dept Head') && (
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
                                            <button onClick={() => {
                                                const userAssets = assets.filter(a => a.custodian === (currentUser ? currentUser.name : ''));
                                                setIssueForm({
                                                    assetId: userAssets.length > 0 ? userAssets[0].id.toString() : '',
                                                    details: '',
                                                    photo: '',
                                                    photoDescription: ''
                                                });
                                                setModalOpen('report-issue');
                                            }} className="btn-table-view-hifi" style={{ flex: 1, padding: '10px 14px', borderRadius: '10px' }}>
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
                                                        <th>ASSET / EQUIPMENT</th>
                                                        <th>EMPLOYEE FROM</th>
                                                        <th>TRANSFER TO</th>
                                                        <th>REASON</th>
                                                        <th>STATUS</th>
                                                        <th>DECISION</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {clearanceRequests.length > 0 ? (
                                                        clearanceRequests.map(req => (
                                                            <tr key={req.id}>
                                                                <td className="font-semibold">{req.assetName}</td>
                                                                <td>{req.fromUser}</td>
                                                                <td>{req.toUser}</td>
                                                                <td className="text-muted">{req.notes}</td>
                                                                <td>
                                                                    <span className="status-badge-hifi badge-hifi-pending">{req.status}</span>
                                                                </td>
                                                                <td>
                                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                                        <button onClick={() => handleApproveClearance(req.id)} className="btn-table-view-hifi" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                                                                            Approve
                                                                        </button>
                                                                        <button onClick={() => handleRejectClearance(req.id)} className="btn-table-view-hifi" style={{ background: '#fef2f2', color: '#ef4444' }}>
                                                                            Reject
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="6" className="table-empty">No pending transfers awaiting your signature clearance.</td>
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
                                                                {role === 'Employee' && asset.custodian === (currentUser ? currentUser.name : '') && (
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
                                    </div>
                                </div>
                            </section>

                            {/* Right Column Sidebar Area */}
                            <section className="dash-side-pane">
                                
                                {/* Corporate Activity Feed */}
                                <div className="side-card-hifi">
                                    <div className="side-card-header-row">
                                        <div className="header-side-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="activity-bell-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                                            <h4>Corporate Activity Feed</h4>
                                        </div>
                                    </div>
                                    <div className="activity-timeline-feed-hifi">
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
                    </>
                )}

                {/* TAB VIEW 2: ORGANIZATION SETUP VIEW */}
                {activeTab === 'Organization setup' && (
                    <div className="org-setup-container">
                        <div style={{ marginBottom: '24px' }}>
                            <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Organization Setup</h1>
                            <p className="welcome-sub">Configure departments, dynamic asset categories, and corporate directory access.</p>
                        </div>

                        {/* Sub-tabs Selection Bar */}
                        <div className="org-tab-bar">
                            {['Departments', 'Categories', 'Employee', '+ Add'].map(sub => (
                                <button
                                    key={sub}
                                    className={`org-tab-btn ${orgSubTab === sub ? 'active' : ''}`}
                                    onClick={() => setOrgSubTab(sub)}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>

                        {/* Tab 1: Departments */}
                        {orgSubTab === 'Departments' && (
                            <div className="table-card-hifi">
                                <div className="table-card-header">
                                    <h3>Active Business Departments</h3>
                                </div>
                                <div className="table-wrapper-hifi">
                                    <table className="dash-table-hifi">
                                        <thead>
                                            <tr>
                                                <th>DEPARTMENT</th>
                                                <th>HEAD</th>
                                                <th>PARENT DEPT</th>
                                                <th>STATUS</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {departmentsList.map(dept => (
                                                <tr key={dept.id}>
                                                    {editingDeptId === dept.id ? (
                                                        <>
                                                            <td>
                                                                <input 
                                                                    type="text" 
                                                                    className="input-wrapper" 
                                                                    style={{ padding: '6px', fontSize: '0.85rem' }}
                                                                    value={editDeptForm.name} 
                                                                    onChange={(e) => setEditDeptForm({...editDeptForm, name: e.target.value})} 
                                                                />
                                                            </td>
                                                            <td>
                                                                <select 
                                                                    className="input-wrapper"
                                                                    style={{ padding: '6px', fontSize: '0.85rem' }}
                                                                    value={editDeptForm.head}
                                                                    onChange={(e) => setEditDeptForm({...editDeptForm, head: e.target.value})}
                                                                >
                                                                    <option value="—">—</option>
                                                                    {users.map(u => (
                                                                        <option key={u.id} value={u.name}>{u.name}</option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input 
                                                                    type="text" 
                                                                    className="input-wrapper" 
                                                                    style={{ padding: '6px', fontSize: '0.85rem' }}
                                                                    value={editDeptForm.parentDept} 
                                                                    onChange={(e) => setEditDeptForm({...editDeptForm, parentDept: e.target.value})} 
                                                                />
                                                            </td>
                                                            <td>
                                                                <select 
                                                                    className="input-wrapper"
                                                                    style={{ padding: '6px', fontSize: '0.85rem' }}
                                                                    value={editDeptForm.status}
                                                                    onChange={(e) => setEditDeptForm({...editDeptForm, status: e.target.value})}
                                                                >
                                                                    <option value="Active">Active</option>
                                                                    <option value="Inactive">Inactive</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                                    <button onClick={handleUpdateDepartment} className="btn-table-view-hifi" style={{ background: '#f0fdf4', color: '#16a34a' }}>Save</button>
                                                                    <button onClick={() => setEditingDeptId(null)} className="btn-table-view-hifi">Cancel</button>
                                                                </div>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="font-semibold">{dept.name}</td>
                                                            <td>{dept.head}</td>
                                                            <td>{dept.parentDept}</td>
                                                            <td>
                                                                <span className={`status-badge-hifi badge-hifi-${dept.status.toLowerCase()}`}>
                                                                    {dept.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                                    <button onClick={() => {
                                                                        setEditingDeptId(dept.id);
                                                                        setEditDeptForm({
                                                                            name: dept.name,
                                                                            head: dept.head,
                                                                            parentDept: dept.parentDept,
                                                                            status: dept.status
                                                                        });
                                                                    }} className="btn-table-view-hifi">Edit</button>
                                                                    <button onClick={() => handleDeleteDepartment(dept.id)} className="btn-table-view-hifi" style={{ background: '#fef2f2', color: '#ef4444' }}>Delete</button>
                                                                </div>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Categories */}
                        {orgSubTab === 'Categories' && (
                            <div className="table-card-hifi">
                                <div className="table-card-header">
                                    <h3>Platform Categories & Lifecycle Strategy</h3>
                                </div>
                                <div className="table-wrapper-hifi">
                                    <table className="dash-table-hifi">
                                        <thead>
                                            <tr>
                                                <th>CATEGORY NAME</th>
                                                <th>WARRANTY COVERAGE</th>
                                                <th>SAFETY AUDIT INTERVAL</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {strategiesList.map(strat => (
                                                <tr key={strat.category}>
                                                    {editingCatName === strat.category ? (
                                                        <>
                                                            <td>
                                                                <input 
                                                                    type="text" 
                                                                    className="input-wrapper" 
                                                                    style={{ padding: '6px', fontSize: '0.85rem' }}
                                                                    value={editCatForm.category} 
                                                                    onChange={(e) => setEditCatForm({...editCatForm, category: e.target.value})} 
                                                                />
                                                            </td>
                                                            <td>
                                                                <input 
                                                                    type="text" 
                                                                    className="input-wrapper" 
                                                                    style={{ padding: '6px', fontSize: '0.85rem' }}
                                                                    value={editCatForm.warrantyCoverage} 
                                                                    onChange={(e) => setEditCatForm({...editCatForm, warrantyCoverage: e.target.value})} 
                                                                />
                                                            </td>
                                                            <td>
                                                                <input 
                                                                    type="text" 
                                                                    className="input-wrapper" 
                                                                    style={{ padding: '6px', fontSize: '0.85rem' }}
                                                                    value={editCatForm.safetyAudit} 
                                                                    onChange={(e) => setEditCatForm({...editCatForm, safetyAudit: e.target.value})} 
                                                                />
                                                            </td>
                                                            <td>
                                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                                    <button onClick={handleUpdateCategory} className="btn-table-view-hifi" style={{ background: '#f0fdf4', color: '#16a34a' }}>Save</button>
                                                                    <button onClick={() => setEditingCatName(null)} className="btn-table-view-hifi">Cancel</button>
                                                                </div>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="font-semibold">{strat.category}</td>
                                                            <td>{strat.warrantyCoverage}</td>
                                                            <td>{strat.safetyAudit}</td>
                                                            <td>
                                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                                    <button onClick={() => {
                                                                        setEditingCatName(strat.category);
                                                                        setEditCatForm({
                                                                            category: strat.category,
                                                                            warrantyCoverage: strat.warrantyCoverage,
                                                                            safetyAudit: strat.safetyAudit
                                                                        });
                                                                    }} className="btn-table-view-hifi">Edit</button>
                                                                    <button onClick={() => handleDeleteCategory(strat.category)} className="btn-table-view-hifi" style={{ background: '#fef2f2', color: '#ef4444' }}>Delete</button>
                                                                </div>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Employee */}
                        {orgSubTab === 'Employee' && (
                            <div className="table-card-hifi">
                                <div className="table-card-header">
                                    <h3>Corporate Directory & Access Control</h3>
                                </div>
                                <div className="table-wrapper-hifi">
                                    <table className="dash-table-hifi">
                                        <thead>
                                            <tr>
                                                <th>EMPLOYEE NAME</th>
                                                <th>EMAIL ADDRESS</th>
                                                <th>ERP ROLE</th>
                                                <th>ASSIGNED DEPARTMENT</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(u => (
                                                <tr key={u.id}>
                                                    <td className="font-semibold">{u.name}</td>
                                                    <td>{u.email}</td>
                                                    <td>
                                                        <span className="status-badge-hifi badge-hifi-active" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
                                                            {u.role === 'Dept Head' ? `Dept Head (${u.department || '—'})` : u.role}
                                                        </span>
                                                    </td>
                                                    <td>{u.department}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <button onClick={() => {
                                                                const newRole = prompt(`Update role for ${u.name} (Employee, Dept Head, Asset Manager, Admin):`, u.role);
                                                                if (newRole) handleUpdateUserRole(u.id, newRole);
                                                            }} className="btn-table-view-hifi">Modify Role</button>
                                                            <button onClick={() => handleDeleteEmployee(u.id)} className="btn-table-view-hifi" style={{ background: '#fef2f2', color: '#ef4444' }}>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tab 4: + Add */}
                        {orgSubTab === '+ Add' && (
                            <div className="side-card-hifi" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                    {['Department', 'Category', 'Employee'].map(formType => (
                                        <button
                                            key={formType}
                                            className={`org-tab-btn ${activeAddForm === formType ? 'active' : ''}`}
                                            onClick={() => setActiveAddForm(formType)}
                                        >
                                            Add {formType}
                                        </button>
                                    ))}
                                </div>

                                {activeAddForm === 'Department' && (
                                    <form onSubmit={handleCreateDepartment} className="auth-form" style={{ maxWidth: '480px' }}>
                                        <div className="form-group">
                                            <label>Department Name</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Sales" 
                                                    value={newDeptForm.name} 
                                                    onChange={(e) => setNewDeptForm({...newDeptForm, name: e.target.value})} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Department Head</label>
                                            <div className="input-wrapper">
                                                <select 
                                                    value={newDeptForm.head} 
                                                    onChange={(e) => setNewDeptForm({...newDeptForm, head: e.target.value})}
                                                >
                                                    <option value="—">— None —</option>
                                                    {users.map(u => (
                                                        <option key={u.id} value={u.name}>{u.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Parent Department</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Executive" 
                                                    value={newDeptForm.parentDept} 
                                                    onChange={(e) => setNewDeptForm({...newDeptForm, parentDept: e.target.value})} 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <div className="input-wrapper">
                                                <select 
                                                    value={newDeptForm.status} 
                                                    onChange={(e) => setNewDeptForm({...newDeptForm, status: e.target.value})}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-primary-gradient" style={{ marginTop: '12px' }}>
                                            Save Department
                                        </button>
                                    </form>
                                )}

                                {activeAddForm === 'Category' && (
                                    <form onSubmit={handleCreateCategory} className="auth-form" style={{ maxWidth: '480px' }}>
                                        <div className="form-group">
                                            <label>Category Name</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Vehicle" 
                                                    value={newCatForm.category} 
                                                    onChange={(e) => setNewCatForm({...newCatForm, category: e.target.value})} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Warranty Coverage</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 12 Months" 
                                                    value={newCatForm.warrantyCoverage} 
                                                    onChange={(e) => setNewCatForm({...newCatForm, warrantyCoverage: e.target.value})} 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Safety Audit Interval</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Annually" 
                                                    value={newCatForm.safetyAudit} 
                                                    onChange={(e) => setNewCatForm({...newCatForm, safetyAudit: e.target.value})} 
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-primary-gradient" style={{ marginTop: '12px' }}>
                                            Save Category
                                        </button>
                                    </form>
                                )}

                                {activeAddForm === 'Employee' && (
                                    <form onSubmit={handleCreateEmployee} className="auth-form" style={{ maxWidth: '480px' }}>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Jane Doe" 
                                                    value={newEmpForm.name} 
                                                    onChange={(e) => setNewEmpForm({...newEmpForm, name: e.target.value})} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="email" 
                                                    placeholder="e.g. jane@company.com" 
                                                    value={newEmpForm.email} 
                                                    onChange={(e) => setNewEmpForm({...newEmpForm, email: e.target.value})} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Temporary Password</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="password" 
                                                    placeholder="Min 6 characters" 
                                                    value={newEmpForm.password} 
                                                    onChange={(e) => setNewEmpForm({...newEmpForm, password: e.target.value})} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Corporate ERP Role</label>
                                            <div className="input-wrapper">
                                                <select 
                                                    value={newEmpForm.role} 
                                                    onChange={(e) => setNewEmpForm({...newEmpForm, role: e.target.value})}
                                                >
                                                    <option value="Employee">Employee</option>
                                                    <option value="Dept Head">Dept Head</option>
                                                    <option value="Asset Manager">Asset Manager</option>
                                                    <option value="Admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Assigned Department</label>
                                            <div className="input-wrapper">
                                                <select 
                                                    value={newEmpForm.department} 
                                                    onChange={(e) => setNewEmpForm({...newEmpForm, department: e.target.value})}
                                                >
                                                    <option value="—">— None —</option>
                                                    {departmentsList.map(dept => (
                                                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-primary-gradient" style={{ marginTop: '12px' }}>
                                            Register Employee
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB VIEW 3: ASSETS VIEW */}
                {activeTab === 'Assets' && (
                    <div className="org-setup-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                            <div>
                                <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Asset Directory</h1>
                                <p className="welcome-sub">View master hardware registrations, check location logs, and manage statuses.</p>
                            </div>
                            {(role === 'Admin' || role === 'Asset Manager') && (
                                <button onClick={() => setModalOpen('register')} className="btn-primary-gradient" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px' }}>
                                    <span>+</span> Register Asset
                                </button>
                            )}
                        </div>

                        {/* Filter toolbar matching Screen 4 wireframes */}
                        <div className="table-card-header" style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '12px 12px 0 0', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
                            <div className="table-search-wrapper" style={{ flex: '1', minWidth: '240px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input 
                                    type="text" 
                                    placeholder="Search by tag, serial, or name..." 
                                    value={assetSearchQuery}
                                    onChange={(e) => setAssetSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="table-filter-select-wrapper" style={{ minWidth: '150px' }}>
                                <select value={assetCategoryFilter} onChange={(e) => setAssetCategoryFilter(e.target.value)}>
                                    <option value="All">All Categories</option>
                                    {categoriesList.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="table-filter-select-wrapper" style={{ minWidth: '150px' }}>
                                <select value={assetStatusFilter} onChange={(e) => setAssetStatusFilter(e.target.value)}>
                                    <option value="All">All Statuses</option>
                                    <option value="AVAILABLE">AVAILABLE</option>
                                    <option value="ALLOCATED">ALLOCATED</option>
                                    <option value="PENDING">PENDING</option>
                                    <option value="UNDER MAINTENANCE">UNDER MAINTENANCE</option>
                                    <option value="DAMAGED">DAMAGED</option>
                                    <option value="MISSING">MISSING</option>
                                </select>
                            </div>

                            {/* Department Filter */}
                            <div className="table-filter-select-wrapper" style={{ minWidth: '150px' }}>
                                <select value={assetDeptFilter} onChange={(e) => setAssetDeptFilter(e.target.value)}>
                                    <option value="All">All Departments</option>
                                    {departmentsList.map(dept => (
                                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Master Table matching Screen 4 wireframes */}
                        <div className="table-card-hifi" style={{ marginTop: '0', borderRadius: '0 0 12px 12px' }}>
                            <div className="table-wrapper-hifi">
                                <table className="dash-table-hifi">
                                    <thead>
                                        <tr>
                                            <th>TAG</th>
                                            <th>NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                            <th>LOCATION</th>
                                            <th>CUSTODIAN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getAssetsPageFilteredAssets().length > 0 ? (
                                            getAssetsPageFilteredAssets().map(asset => (
                                                <tr key={asset.id}>
                                                    <td className="font-semibold">{asset.asset_tag}</td>
                                                    <td>{asset.name}</td>
                                                    <td><span className="type-label-text">{asset.type}</span></td>
                                                    <td>
                                                        <span className={`status-badge-hifi badge-hifi-${asset.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                                            {asset.status}
                                                        </span>
                                                    </td>
                                                    <td>{asset.location}</td>
                                                    <td className="text-muted">{asset.custodian}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="table-empty">No assets found matching the filter query.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB VIEW 4: ALLOCATION & TRANSFER VIEW */}
                {activeTab === 'Allocation & Transfer' && (
                    <div className="org-setup-container">
                        <div style={{ marginBottom: '24px' }}>
                            <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Asset Allocation & Transfer</h1>
                            <p className="welcome-sub">Manage custodianship, record assignments, and process department transfers.</p>
                        </div>

                        <div className="side-card-hifi" style={{ padding: '24px', marginBottom: '24px' }}>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>Select Target Asset to Allocate/Transfer</label>
                                <div className="input-wrapper">
                                    <select value={allocAssetId} onChange={(e) => setAllocAssetId(e.target.value)}>
                                        <option value="">— Select Asset —</option>
                                        {assets.map(a => (
                                            <option key={a.id} value={a.id}>{a.asset_tag} - {a.name} ({a.status})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {allocAssetId && (() => {
                                const selectedAsset = assets.find(a => a.id === parseInt(allocAssetId));
                                if (!selectedAsset) return null;

                                const isAllocated = selectedAsset.custodian && selectedAsset.custodian !== '—' && selectedAsset.custodian !== '';

                                return (
                                    <div>
                                        {isAllocated ? (
                                            <>
                                                {/* Red warning box matching Screen 5 mockup */}
                                                <div style={{
                                                    background: '#fee2e2',
                                                    border: '1px solid #fca5a5',
                                                    borderRadius: '12px',
                                                    padding: '16px',
                                                    color: '#991b1b',
                                                    marginBottom: '20px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600'
                                                }}>
                                                    Already Allocated to {selectedAsset.custodian} ({selectedAsset.department})<br/>
                                                    <span style={{ fontSize: '0.8rem', fontWeight: '500', color: '#b91c1c' }}>Direct re-allocation is blocked - submit a transfer request below</span>
                                                </div>

                                                <form onSubmit={handleTransferSubmit} className="auth-form" style={{ maxWidth: '600px' }}>
                                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--text-primary)' }}>Submit Transfer Request</h3>
                                                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                                        <div className="form-group" style={{ flex: 1 }}>
                                                            <label>From Custodian</label>
                                                            <div className="input-wrapper">
                                                                <input type="text" value={selectedAsset.custodian} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group" style={{ flex: 1 }}>
                                                            <label>To Recipient Employee</label>
                                                            <div className="input-wrapper">
                                                                <select value={allocToUser} onChange={(e) => setAllocToUser(e.target.value)} required>
                                                                    <option value="">Select Employee...</option>
                                                                    {users.filter(u => u.name !== selectedAsset.custodian).map(u => (
                                                                        <option key={u.id} value={u.name}>{u.name} ({u.department})</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
<<<<<<< Updated upstream
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
=======
                                                    <div className="form-group">
                                                        <label>Reason for Transfer</label>
                                                        <div className="input-wrapper">
                                                            <textarea 
                                                                value={transferReason} 
                                                                onChange={(e) => setTransferReason(e.target.value)} 
                                                                placeholder="Enter business justification details..." 
                                                                required
                                                                style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                                                            />
>>>>>>> Stashed changes
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="btn-primary-gradient" style={{ marginTop: '12px' }}>
                                                        Submit Request
                                                    </button>
                                                </form>
                                            </>
                                        ) : (
                                            <form onSubmit={handleDirectAllocate} className="auth-form" style={{ maxWidth: '600px' }}>
                                                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px', color: '#166534', marginBottom: '20px', fontSize: '0.9rem', fontWeight: '600' }}>
                                                    Asset is currently Available for direct assignment.
                                                </div>
                                                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--text-primary)' }}>Assign Custodian</h3>
                                                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                                    <div className="form-group" style={{ flex: 1 }}>
                                                        <label>Allocate To Employee</label>
                                                        <div className="input-wrapper">
                                                            <select value={allocToUser} onChange={(e) => setAllocToUser(e.target.value)} required>
                                                                <option value="">Select Employee...</option>
                                                                {users.map(u => (
                                                                    <option key={u.id} value={u.name}>{u.name} ({u.department})</option>
                                                                ))}
                                                            </select>
                                                        </div>
<<<<<<< Updated upstream
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
=======
                                                    </div>
                                                    <div className="form-group" style={{ flex: 1 }}>
                                                        <label>Desk / Office Location</label>
                                                        <div className="input-wrapper">
                                                            <input 
                                                                type="text" 
                                                                placeholder="e.g. Desk E14" 
                                                                value={allocLocation} 
                                                                onChange={(e) => setAllocLocation(e.target.value)} 
                                                                required 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn-primary-gradient">
                                                    Allocate Asset
                                                </button>
                                            </form>
                                        )}
>>>>>>> Stashed changes

                                        {/* Allocation history list matching Screen 5 mockup */}
                                        <div style={{ marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                                            <h4 style={{ fontSize: '1rem', marginBottom: '14px', color: 'var(--text-primary)' }}>Allocation history</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {activities.filter(act => act.text.toLowerCase().includes(selectedAsset.name.toLowerCase())).length > 0 ? (
                                                    activities.filter(act => act.text.toLowerCase().includes(selectedAsset.name.toLowerCase())).map(act => (
                                                        <div key={act.id} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                            <strong>{act.time}</strong> — {act.text}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <>
                                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                            Mar 12 — Allocated to {selectedAsset.custodian || 'Priya shah'} — {selectedAsset.department || 'Engineering'}
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                            Jan 04 — Returned by Arjun Nair — condition: good
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {/* TAB VIEW 5: RESOURCE BOOKING VIEW */}
                {activeTab === 'Resource Booking' && (
                    <div className="org-setup-container">
                        <div style={{ marginBottom: '24px' }}>
                            <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Resource Booking Scheduler</h1>
                            <p className="welcome-sub">Reserve conference halls, workspaces, and AV equipment slots in real time.</p>
                        </div>

                        <div className="side-card-hifi" style={{ padding: '24px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                <div className="form-group" style={{ flex: '1', minWidth: '150px' }}>
                                    <label>Resource Category</label>
                                    <div className="input-wrapper">
                                        <select value={selectedBookCategory} onChange={(e) => {
                                            const newCat = e.target.value;
                                            setSelectedBookCategory(newCat);
                                            setSelectedBookResource(RESOURCE_CATEGORIES[newCat][0]);
                                        }}>
                                            {Object.keys(RESOURCE_CATEGORIES).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group" style={{ flex: '1.5', minWidth: '200px' }}>
                                    <label>Bookable Resource Item</label>
                                    <div className="input-wrapper">
                                        <select value={selectedBookResource} onChange={(e) => setSelectedBookResource(e.target.value)}>
                                            {(RESOURCE_CATEGORIES[selectedBookCategory] || []).map(res => (
                                                <option key={res} value={res}>{res}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group" style={{ flex: '1', minWidth: '150px' }}>
                                    <label>Select Date</label>
                                    <div className="input-wrapper">
                                        <input type="date" value={bookResourceDate} onChange={(e) => setBookResourceDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Time Slots Surf Listing matching Screen 6 mockup */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                                {[
                                    { hourVal: 9, label: '9:00 AM - 10:00 AM', slotStr: '9:00 AM - 10:00 AM' },
                                    { hourVal: 10, label: '10:00 AM - 11:00 AM', slotStr: '10:00 AM - 11:00 AM' },
                                    { hourVal: 11, label: '11:00 AM - 12:00 PM', slotStr: '11:00 AM - 12:00 PM' },
                                    { hourVal: 12, label: '12:00 PM - 1:00 PM', slotStr: '12:00 PM - 1:00 PM' },
                                    { hourVal: 13, label: '1:00 PM - 2:00 PM', slotStr: '1:00 PM - 2:00 PM' }
                                ].map(slot => {
                                    // Search bookingsList for overlapping reservations
                                    const booking = bookingsList.find(b => 
                                        b.resourceName.replace(/^\[PRIORITY\]\s*/, '').toLowerCase() === selectedBookResource.toLowerCase() &&
                                        new Date(b.startTime).getHours() === slot.hourVal &&
                                        new Date(b.startTime).toISOString().split('T')[0] === bookResourceDate
                                    );

                                    return (
                                        <div key={slot.hourVal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-main)' }}>
                                            <div style={{ fontWeight: '700', color: 'var(--text-primary)', width: '80px' }}>
                                                {slot.hourVal === 12 ? '12:00' : slot.hourVal > 12 ? `${slot.hourVal - 12}:00` : `${slot.hourVal}:00`}
                                            </div>
                                            
                                            <div style={{ flex: 1, padding: '0 16px' }}>
                                                {booking ? (
                                                    <span style={{ 
                                                        background: '#e0f2fe', 
                                                        color: '#0369a1', 
                                                        padding: '6px 12px', 
                                                        borderRadius: '8px', 
                                                        fontSize: '0.85rem', 
                                                        fontWeight: '600',
                                                        display: 'inline-block'
                                                    }}>
                                                        Booked - {booking.userName} - {slot.slotStr}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                                                        — Open / Available slot —
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                {booking ? (
                                                    <button disabled style={{ background: '#f1f5f9', color: '#94a3b8', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'not-allowed', fontSize: '0.8rem', fontWeight: '600' }}>
                                                        Reserved
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleQuickBookSlot(slot.slotStr)} className="btn-table-view-hifi" style={{ padding: '6px 12px', background: '#f0fdf4', color: '#16a34a' }}>
                                                        Book slot
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB VIEW 6: MAINTENANCE VIEW */}
                {activeTab === 'Maintenance' && (
                    <div className="org-setup-container">
                        <div style={{ marginBottom: '24px' }}>
                            <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Maintenance Dispatch</h1>
                            <p className="welcome-sub">Resolve reported asset defects, track diagnostic flows, and manage work orders.</p>
                        </div>

                        {/* Kanban Board Layout matching Screen 7 mockup */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', overflowX: 'auto', minHeight: '420px', paddingBottom: '16px' }}>
                            {[
                                { key: 'Awaiting Action', label: 'Pending' },
                                { key: 'Approved', label: 'Approved' },
                                { key: 'Technician Assigned', label: 'Technician assigned' },
                                { key: 'Under Maintenance', label: 'in progress' },
                                { key: 'Resolved', label: 'Resolved' }
                            ].map(col => {
                                // Filter issues belonging to this column
                                const colIssues = issues.filter(issue => issue.status === col.key);

                                return (
                                    <div key={col.key} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', textAlign: 'center' }}>
                                            {col.label} ({colIssues.length})
                                        </h3>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
                                            {colIssues.length > 0 ? (
                                                colIssues.map(issue => (
                                                    <div key={issue.id} style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px', fontSize: '0.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                        <div style={{ fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>
                                                            {issue.assetName}
                                                        </div>
                                                        <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                                            {issue.details}
                                                        </div>
                                                        {col.key === 'Technician Assigned' && (
                                                            <div style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600', marginBottom: '8px' }}>
                                                                Tech: {technicianMap[issue.id] || 'R Varma'}
                                                            </div>
                                                        )}
                                                        
                                                        {/* Action Buttons based on status */}
                                                        {col.key === 'Awaiting Action' && (
                                                            <button 
                                                                onClick={async () => {
                                                                    await fetch(`${API_URL}/api/issues/${issue.id}/status`, {
                                                                        method: 'PATCH',
                                                                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                                                        body: JSON.stringify({ status: 'Approved' })
                                                                    });
                                                                    fetchData();
                                                                }} 
                                                                style={{ width: '100%', padding: '6px', background: '#f0fdf4', color: '#16a34a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                                                            >
                                                                Approve
                                                            </button>
                                                        )}
                                                        {col.key === 'Approved' && (
                                                            <button 
                                                                onClick={async () => {
                                                                    const name = prompt('Enter Technician Name to assign:', 'R Varma');
                                                                    if (!name) return;
                                                                    setTechnicianMap({ ...technicianMap, [issue.id]: name });
                                                                    await fetch(`${API_URL}/api/issues/${issue.id}/status`, {
                                                                        method: 'PATCH',
                                                                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                                                        body: JSON.stringify({ status: 'Technician Assigned' })
                                                                    });
                                                                    fetchData();
                                                                }} 
                                                                style={{ width: '100%', padding: '6px', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                                                            >
                                                                Assign Tech
                                                            </button>
                                                        )}
                                                        {col.key === 'Technician Assigned' && (
                                                            <button 
                                                                onClick={async () => {
                                                                    await fetch(`${API_URL}/api/issues/${issue.id}/status`, {
                                                                        method: 'PATCH',
                                                                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                                                        body: JSON.stringify({ status: 'Under Maintenance' })
                                                                    });
                                                                    fetchData();
                                                                }} 
                                                                style={{ width: '100%', padding: '6px', background: '#fffbeb', color: '#d97706', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                                                            >
                                                                Start Work
                                                            </button>
                                                        )}
                                                        {col.key === 'Under Maintenance' && (
                                                            <button 
                                                                onClick={async () => {
                                                                    await fetch(`${API_URL}/api/issues/${issue.id}/status`, {
                                                                        method: 'PATCH',
                                                                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                                                        body: JSON.stringify({ status: 'Resolved' })
                                                                    });
                                                                    fetchData();
                                                                }} 
                                                                style={{ width: '100%', padding: '6px', background: '#f0fdf4', color: '#16a34a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                                                            >
                                                                Resolve
                                                            </button>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '0.75rem', fontStyle: 'italic', padding: '16px', textAlign: 'center' }}>
                                                    Empty Column
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                            * Approving a card moves the asset to under maintenance; resolving it returns it back to the available inventory pool.
                        </div>
                    </div>
                )}

                {/* TAB VIEW 7: AUDIT VIEW */}
                {activeTab === 'Audit' && (
                    <div className="org-setup-container">
                        <div style={{ marginBottom: '24px' }}>
                            <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Asset Auditing</h1>
                            <p className="welcome-sub">Perform visual status checks, update location verifications, and compile discrepancies.</p>
                        </div>

                        {/* Audit Details block matching Screen 8 mockup */}
                        <div className="side-card-hifi" style={{ padding: '20px', marginBottom: '24px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>Q3 audit: Engineering dept - 1-15 jul</h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Auditors: Aditi Rao, Sana Iqbal</span>
                        </div>

                        <div className="table-card-hifi" style={{ marginTop: '0' }}>
                            <div className="table-wrapper-hifi">
                                <table className="dash-table-hifi">
                                    <thead>
                                        <tr>
                                            <th>ASSET</th>
                                            <th>EXPECTED LOCATION</th>
                                            <th>VERIFICATION STATUS</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { tag: 'AF-003', name: 'Dell laptop', location: 'Desk E12' },
                                            { tag: 'AF-9921', name: 'Office chair', location: 'Desk E14' },
                                            { tag: 'AF-9838', name: 'Monitor', location: 'Desk E15' }
                                        ].map(item => {
                                            const status = auditVerificationStates[item.tag] || 'Pending';
                                            return (
                                                <tr key={item.tag}>
                                                    <td className="font-semibold">{item.tag} - {item.name}</td>
                                                    <td>{item.location}</td>
                                                    <td>
                                                        <span className={`status-badge-hifi badge-hifi-${status.toLowerCase()}`}>
                                                            {status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <button 
                                                                onClick={() => setAuditVerificationStates({...auditVerificationStates, [item.tag]: 'Verified'})} 
                                                                className="btn-table-view-hifi" style={{ background: '#f0fdf4', color: '#16a34a' }}
                                                            >
                                                                Verify
                                                            </button>
                                                            <button 
                                                                onClick={() => setAuditVerificationStates({...auditVerificationStates, [item.tag]: 'Missing'})} 
                                                                className="btn-table-view-hifi" style={{ background: '#fef2f2', color: '#ef4444' }}
                                                            >
                                                                Missing
                                                            </button>
                                                            <button 
                                                                onClick={() => setAuditVerificationStates({...auditVerificationStates, [item.tag]: 'Damaged'})} 
                                                                className="btn-table-view-hifi" style={{ background: '#fffbeb', color: '#d97706' }}
                                                            >
                                                                Damaged
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary Bar matching Screen 8 mockup */}
                        <div style={{
                            background: '#fef3c7',
                            border: '1px solid #fcd34d',
                            borderRadius: '10px',
                            padding: '16px',
                            color: '#92400e',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '20px'
                        }}>
                            <span>
                                {Object.values(auditVerificationStates).filter(s => s === 'Missing' || s === 'Damaged').length} assets flagged - discrepancy report generated automatically
                            </span>
                            <button 
                                onClick={() => {
                                    alert('Audit cycle closed! Discrepancy reports compiled and dispatched to Logistics Manager.');
                                }} 
                                style={{ background: '#92400e', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}
                            >
                                Close audit cycle
                            </button>
                        </div>
                    </div>
                )}

                {/* TAB VIEW 8: REPORTS VIEW */}
                {activeTab === 'Reports' && (
                    <div className="org-setup-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div>
                                <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Reports & Analytics</h1>
                                <p className="welcome-sub">View master hardware utilization metrics and maintenance trends.</p>
                            </div>
                            <button onClick={() => alert('Master Report PDF exported!')} className="btn-primary-gradient" style={{ padding: '8px 16px', borderRadius: '8px' }}>
                                Export report
                            </button>
                        </div>

                        {/* Graphical representation rows matching Screen 9 mockup */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                            <div className="side-card-hifi" style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '14px', color: 'var(--text-primary)' }}>Utilization by department</h3>
                                <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '20px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
                                    {[
                                        { dept: 'Eng', val: 80, color: 'linear-gradient(to top, #3b82f6, #60a5fa)' },
                                        { dept: 'Fac', val: 60, color: 'linear-gradient(to top, #8b5cf6, #a78bfa)' },
                                        { dept: 'Ops', val: 30, color: 'linear-gradient(to top, #f59e0b, #fbbf24)' },
                                        { dept: 'Sales', val: 45, color: 'linear-gradient(to top, #10b981, #34d399)' }
                                    ].map(bar => (
                                        <div key={bar.dept} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '100%', height: `${bar.val}%`, background: bar.color, borderRadius: '6px 6px 0 0', position: 'relative' }} title={`${bar.val}%`}>
                                                <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{bar.val}%</span>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{bar.dept}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="side-card-hifi" style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '14px', color: 'var(--text-primary)' }}>Maintenance Frequency</h3>
                                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg viewBox="0 0 100 40" style={{ width: '100%', height: '100%' }}>
                                        <path d="M 0 35 L 20 25 L 40 28 L 60 15 L 80 18 L 100 5" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="20" cy="25" r="1.5" fill="#ef4444" />
                                        <circle cx="40" cy="28" r="1.5" fill="#ef4444" />
                                        <circle cx="60" cy="15" r="1.5" fill="#ef4444" />
                                        <circle cx="80" cy="18" r="1.5" fill="#ef4444" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Informational lists matching Screen 9 mockup */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                            <div className="side-card-hifi" style={{ padding: '16px' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: '#2563eb' }}>Most used assets</h4>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <li>🏢 Room B2: 34 bookings this month</li>
                                    <li>🚐 Van AF-343: 21 trips this month</li>
                                    <li>📹 Projector AF-335: 18 uses</li>
                                </ul>
                            </div>

                            <div className="side-card-hifi" style={{ padding: '16px' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: '#d97706' }}>Idle assets</h4>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <li>📷 Camera AF-0301: unused 60+ days</li>
                                    <li>🪑 Chair AF-0410: unused 45 days</li>
                                </ul>
                            </div>

                            <div className="side-card-hifi" style={{ padding: '16px' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: '#ef4444' }}>Assets due for maintenance</h4>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <li>🚜 Forklift AF-0087: service due in 5 days</li>
                                    <li>💻 Laptop AF-0020: 4 years old: nearing retirement</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB VIEW 9: NOTIFICATIONS VIEW */}
                {activeTab === 'Notifications' && (
                    <div className="org-setup-container">
                        <div style={{ marginBottom: '24px' }}>
                            <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>System Notifications</h1>
                            <p className="welcome-sub">Check recent alerts, logistics warnings, and approval requests status logs.</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { text: 'Q3 audit cycle was opened for Engineering department by sana iqbal', time: '2 hours ago', badge: 'pending' },
                                { text: 'Your transfer request for Dell Laptop AF-0012 was approved by Supervisor Rohan', time: '1 day ago', badge: 'resolve' },
                                { text: 'Smart TV 65" in Meeting Room C marked under maintenance; parts ordered', time: '2 days ago', badge: 'booking' },
                                { text: 'New Office Chair AF-0201 registered in Warehouse repository', time: '3 days ago', badge: 'register' }
                            ].map((note, index) => (
                                <div key={index} className="activity-item-hifi">
                                    <div className={`timeline-dot-hifi dot-color-${note.badge}`}></div>
                                    <div className="activity-body-hifi">
                                        <p className="activity-desc">{note.text}</p>
                                        <span className="activity-timestamp">{note.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

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
                                <label htmlFor="book-type">Resource Category</label>
                                <div className="input-wrapper">
                                    <select 
                                        id="book-type"
                                        value={bookForm.type || 'Electronics'}
                                        onChange={(e) => {
                                            const newType = e.target.value;
                                            const defaultResource = RESOURCE_CATEGORIES[newType][0];
                                            setBookForm({
                                                ...bookForm,
                                                type: newType,
                                                resource: defaultResource
                                            });
                                        }}
                                    >
                                        {Object.keys(RESOURCE_CATEGORIES).map(catName => (
                                            <option key={catName} value={catName}>{catName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="book-res">Resource Item</label>
                                <div className="input-wrapper">
                                    <select 
                                        id="book-res"
                                        value={bookForm.resource}
                                        onChange={(e) => setBookForm({...bookForm, resource: e.target.value})}
                                    >
                                        {(RESOURCE_CATEGORIES[bookForm.type || 'Electronics'] || []).map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
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
