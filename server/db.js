const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file location
const dbPath = path.join(__dirname, "database", "property_management.db");

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to SQLite database");
    }
});

// Enable foreign key support
db.run("PRAGMA foreign_keys = ON");

// Create all required tables
db.serialize(() => {

    // 1. Users Table
    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'tenant',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error creating Users table:", err.message);
        } else {
            console.log("✅ Users table ready");
        }
    });


    // 2. Properties Table
    db.run(`
        CREATE TABLE IF NOT EXISTS Properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            owner_id INTEGER NOT NULL,
            property_name TEXT NOT NULL,
            address TEXT NOT NULL,
            property_type TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES Users(id)
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error creating Properties table:", err.message);
        } else {
            console.log("✅ Properties table ready");
        }
    });


    // 3. Maintenance Requests Table
    db.run(`
        CREATE TABLE IF NOT EXISTS MaintenanceRequests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            property_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            issue_description TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            resolution_date DATETIME,
            FOREIGN KEY (property_id) REFERENCES Properties(id),
            FOREIGN KEY (user_id) REFERENCES Users(id)
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error creating MaintenanceRequests table:", err.message);
        } else {
            console.log("✅ MaintenanceRequests table ready");
        }
    });


    // 4. Amenities Table
    db.run(`
        CREATE TABLE IF NOT EXISTS Amenities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            property_id INTEGER NOT NULL,
            amenity_name TEXT NOT NULL,
            description TEXT,
            availability_status TEXT NOT NULL DEFAULT 'Available',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (property_id) REFERENCES Properties(id)
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error creating Amenities table:", err.message);
        } else {
            console.log("✅ Amenities table ready");
        }
    });


    // 5. Amenity Bookings Table
    db.run(`
        CREATE TABLE IF NOT EXISTS AmenityBookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amenity_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            booking_date DATE NOT NULL,
            check_in_time TIME NOT NULL,
            check_out_time TIME NOT NULL,
            status TEXT NOT NULL DEFAULT 'Booked',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (amenity_id) REFERENCES Amenities(id),
            FOREIGN KEY (user_id) REFERENCES Users(id)
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error creating AmenityBookings table:", err.message);
        } else {
            console.log("✅ AmenityBookings table ready");
        }
    });

});

module.exports = db;