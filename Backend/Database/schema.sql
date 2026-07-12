CREATE DATABASE IF NOT EXISTS assetflow;
USE assetflow;

-- 1. Departments Management
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Employees Directory & Roles System
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    department_id INT NULL,
    role ENUM('Admin', 'Asset Manager', 'Department Head', 'Employee') DEFAULT 'Employee',
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_user_auth (email, status)
);

-- 3. Asset Categories
CREATE TABLE IF NOT EXISTS asset_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Centralized Inventory (Assets Master Table)
CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_tag VARCHAR(50) UNIQUE NOT NULL,
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    is_shared_bookable BOOLEAN DEFAULT FALSE,
    lifecycle_status ENUM('Available', 'Allocated', 'Reserved', 'Under Maintenance', 'Lost', 'Retired', 'Disposed') DEFAULT 'Available',
    image_url VARCHAR(550) DEFAULT '/uploads/placeholders/generic-asset.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES asset_categories(id),
    INDEX idx_assets_lookup (lifecycle_status, category_id, asset_tag)
);

-- 5. Asset Allocation & Checkouts Log
CREATE TABLE IF NOT EXISTS asset_allocations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    employee_id INT NULL,
    allocated_by INT NOT NULL,
    allocation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expected_return_date DATE NULL,
    status ENUM('Active', 'Returned', 'Overdue') DEFAULT 'Active',
    FOREIGN KEY (asset_id) REFERENCES assets(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (allocated_by) REFERENCES employees(id),
    INDEX idx_allocations_due (status, expected_return_date)
);

-- 6. Resource Booking Schedule (Calendar Control)
CREATE TABLE IF NOT EXISTS resource_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    employee_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled') DEFAULT 'Upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES assets(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    INDEX idx_bookings_overlap (asset_id, status, start_time, end_time)
);

-- 7. Maintenance Request Pipelines
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    raised_by INT NOT NULL,
    issue_description TEXT NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    status ENUM('Pending', 'Approved', 'Rejected', 'In Progress', 'Resolved') DEFAULT 'Pending',
    evidence_image_url VARCHAR(550) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES assets(id),
    FOREIGN KEY (raised_by) REFERENCES employees(id)
);

-- 8. Physical Audit Tracking Items
CREATE TABLE IF NOT EXISTS audit_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    verification_status ENUM('Unverified', 'Verified', 'Missing', 'Damaged') DEFAULT 'Unverified',
    notes TEXT NULL,
    verified_at TIMESTAMP NULL,
    FOREIGN KEY (asset_id) REFERENCES assets(id)
);