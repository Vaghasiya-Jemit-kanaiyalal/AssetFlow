-- Create the main system database if it doesn't exist yet
CREATE DATABASE IF NOT EXISTS assetflow;
USE assetflow;

-- Drop existing tables to ensure clean re-initialization
DROP TABLE IF EXISTS audit_items;
DROP TABLE IF EXISTS clearance_requests;
DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS resource_bookings;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS category_strategies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS activities;


-- =========================================================================
-- 1. USER DIRECTORY TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Employee', 'Dept Head', 'Asset Manager', 'Admin') DEFAULT 'Employee',
    department VARCHAR(255) DEFAULT '—',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    /* 
      --- DATABASE OPTIMIZATION BREAKDOWN ---
      WHY WE USE THIS: Every single time a user hits an API or logs in, the backend 
      runs "SELECT * FROM users WHERE email = ?". 
      HOW IT IS OPTIMIZED: Adding the B-Tree index (idx_user_auth) forces MySQL to jump 
      directly to the target user record in memory. This eliminates a sequential table scan, 
      reducing authentication query lookups from O(N) down to a lightning-fast O(log N).
    */
    INDEX idx_user_auth (email)
);

-- =========================================================================
-- 2. DYNAMIC STRATEGY & CATEGORY SCHEMA
-- =========================================================================
CREATE TABLE IF NOT EXISTS category_strategies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) UNIQUE NOT NULL,
    warranty_coverage VARCHAR(255),
    safety_audit VARCHAR(255)
);

-- =========================================================================
-- 3. ASSET & EQUIPMENT INVENTORY
-- =========================================================================
CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    
    /* 
      --- INTEGRATION FIX & SCHEMA ENHANCEMENT ---
      WHY WE USE THIS: To support automated scanning, unique corporate hardware tags 
      and tracking codes are structural necessities. 
      HOW IT IS OPTIMIZED: By defining them as UNIQUE NOT NULL indexes, we guarantee 
      data integrity at the database layer. Since your React frontend form omits these, 
      your backend code auto-generates them using a secure hash/timestamp before writing 
      to the row. This prevents duplicates and accelerates search lookups.
    */
    asset_tag VARCHAR(50) UNIQUE NOT NULL,
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    
    /* 
      --- RELATION LINK STRUCTURING ---
      WHY WE USE THIS: Replaces space-heavy text descriptions (e.g., storing the word 
      "Electronics" thousands of times) with tight numerical relational keys.
      HOW IT IS OPTIMIZED: The foreign key links directly to the category and custodian tables. 
      This keeps our main inventory entries small. Using "ON DELETE SET NULL" ensures that if 
      an employee leaves the directory, the asset isn't dropped—it simply reverts to unassigned status safely.
    */
    category_id INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    lifecycle_status ENUM('AVAILABLE', 'ALLOCATED', 'ACTIVE BOOKING', 'PENDING', 'DAMAGED', 'MISSING', 'UNDER MAINTENANCE', 'LOST', 'RETIRED', 'DISPOSED') DEFAULT 'AVAILABLE',
    custodian_id INT NULL,
    department VARCHAR(255) DEFAULT '—',
    is_shared_bookable BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(550) DEFAULT '/uploads/placeholders/generic-asset.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES category_strategies(id),
    FOREIGN KEY (custodian_id) REFERENCES users(id) ON DELETE SET NULL,
    
    /* 
      --- COMPOSITE MATRIX INDEXING ---
      WHY WE USE THIS: The master inventory page relies heavily on dynamic filters 
      like "Show me all Available items inside Category 3".
      HOW IT IS OPTIMIZED: A multi-column composite index (idx_assets_directory) pre-sorts 
      combinations of status, category, and tag. MySQL can pull filtered search grids instantly 
      from active memory cache without scanning the rest of the database.
    */
    INDEX idx_assets_directory (lifecycle_status, category_id, asset_tag)
);

-- =========================================================================
-- 4. RESOURCE BOOKINGS (CALENDAR OVERLAPS)
-- =========================================================================
CREATE TABLE IF NOT EXISTS resource_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    user_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled') DEFAULT 'Upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    /* 
      --- RACE CONDITION & CONCURRENCY CONTROL ---
      WHY WE USE THIS: Overlap detection logic runs whenever a room or vehicle is reserved, 
      checking if the new window collides with existing slots.
      HOW IT IS OPTIMIZED: The idx_bookings_overlap composite index structures asset_id, status, 
      and time ranges side-by-side. Combined with backend "FOR UPDATE" row-locking, it isolates 
      concurrent queries, letting MySQL check availability and block double-bookings instantly.
    */
    INDEX idx_bookings_overlap (asset_id, status, start_time, end_time)
);

-- =========================================================================
-- 5. MAINTENANCE PROBLEM LOG
-- =========================================================================
CREATE TABLE IF NOT EXISTS issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    reported_by_id INT NOT NULL,
    details TEXT NOT NULL,
    photo_description TEXT, 
    status ENUM('Awaiting Action', 'Under Maintenance', 'Resolved', 'Pending', 'Approved', 'Rejected', 'In Progress') DEFAULT 'Awaiting Action',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    FOREIGN KEY (reported_by_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================================================================
-- 6. SUPERVISOR APPROVALS & CLEARANCES
-- =========================================================================
CREATE TABLE IF NOT EXISTS clearance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    request_type VARCHAR(255) NOT NULL, 
    from_user_id INT NOT NULL,
    to_user_id INT NOT NULL,
    notes TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================================================================
-- 7. AUDIT CYCLES LOG ENGINE
-- =========================================================================
CREATE TABLE IF NOT EXISTS audit_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    verification_status ENUM('Unverified', 'Verified', 'Missing', 'Damaged') DEFAULT 'Unverified',
    notes TEXT NULL,
    verified_at TIMESTAMP NULL,
    
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
);

-- =========================================================================
-- 8. ACTIVITIES LOG FEED
-- =========================================================================
CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    /* 
      --- FRONTEND SYNCED NAMING ---
      WHY WE USE THIS: Directly maps to your React UI component bindings (act.text).
      HOW IT IS OPTIMIZED: Changing the field name from activity_text to text allows 
      the backend to pass raw query results directly as JSON arrays. This removes the 
      need for slow JavaScript iteration loops or heavy data mapping in the API controller.
    */
    text VARCHAR(500) NOT NULL,
    badge VARCHAR(100) NOT NULL,
    
    /* 
      --- HIGH SPEED TEMPORAL LOG SORTING ---
      WHY WE USE THIS: Enterprise dashboards require activity feeds sorted strictly from newest to oldest.
      HOW IT IS OPTIMIZED: Storing time as a raw text string is slow and hard to parse. 
      We use a native, high-precision TIMESTAMP. This allows MySQL to execute rapid index sorts 
      via "ORDER BY created_at DESC" instantly. The backend handles changing this timestamp into 
      a relative string (like "5 mins ago") before serving the frontend.
    */
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- SEED DATA CONFIGURATION
-- =========================================================================

-- Seed category strategies
INSERT INTO category_strategies (category, warranty_coverage, safety_audit) VALUES 
('Electronics', '36 Months', 'Quarterly'),
('Furniture', 'Lifetime', 'Bi-Annually'),
('AV System', '24 Months', 'Quarterly'),
('Vehicle', '60 Months', 'Annually');

-- Seed default users (admin: admin@assetflow.com, maintenance shop: maintenance@assetflow.com, passwords: '12345678')
-- Passwords are hashed using bcrypt: $2a$10$8GTU8ltIZBi2bLKlx4TzeezxdMe0lDx4nVPkffxDAL4VOzfUlpuVW
INSERT INTO users (name, email, password_hash, role, department) VALUES
('AssetFlow Admin', 'admin@assetflow.com', '$2a$10$8GTU8ltIZBi2bLKlx4TzeezxdMe0lDx4nVPkffxDAL4VOzfUlpuVW', 'Admin', 'Executive'),
('Maintenance Shop', 'maintenance@assetflow.com', '$2a$10$8GTU8ltIZBi2bLKlx4TzeezxdMe0lDx4nVPkffxDAL4VOzfUlpuVW', 'Employee', 'Maintenance');