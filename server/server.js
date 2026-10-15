const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// AUTH ROUTES
// ===============================

app.use("/api/auth", authRoutes);

// ===============================
// MAINTENANCE ROUTES
// ===============================

app.use("/api/maintenance", maintenanceRoutes);

// ===============================
// PROPERTY ROUTES
// ===============================

app.use("/api/properties", propertyRoutes);

// ===============================
// TEST API
// ===============================

app.get("/api/test", (req, res) => {
res.json({
success: true,
message: "Property Management Backend is Running 🚀"
});
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
