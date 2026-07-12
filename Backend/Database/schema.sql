-- 1. User Directory Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Employee', 'Dept Head', 'Asset Manager', 'Admin') DEFAULT 'Employee',
    department VARCHAR(255) DEFAULT '—',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Asset & Equipment Inventory
CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('AVAILABLE', 'ALLOCATED', 'PENDING', 'DAMAGED', 'MISSING', 'ACTIVE BOOKING') DEFAULT 'AVAILABLE',
    custodian VARCHAR(255) DEFAULT '—',
    department VARCHAR(255) DEFAULT '—',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Maintenance Problem Log (includes Photo Description alternative)
CREATE TABLE IF NOT EXISTS issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_name VARCHAR(255) NOT NULL,
    reported_by VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    photo_description TEXT, -- Supports text representation if no visual file upload is selected
    status VARCHAR(255) DEFAULT 'Awaiting Action',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Supervisor Approvals & Clearances
CREATE TABLE IF NOT EXISTS clearance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_name VARCHAR(255) NOT NULL,
    request_type VARCHAR(255) NOT NULL,
    from_user VARCHAR(255) NOT NULL,
    to_user VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Strategy Schema Configurations (for Dynamic Admin changes)
CREATE TABLE IF NOT EXISTS category_strategies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) UNIQUE NOT NULL,
    warranty_coverage VARCHAR(255),
    safety_audit VARCHAR(255)
);

-- 6. Activities Log Feed
CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(500) NOT NULL,
    time VARCHAR(255) NOT NULL,
    badge VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);