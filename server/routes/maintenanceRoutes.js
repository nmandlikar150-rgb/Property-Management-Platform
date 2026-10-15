
const express = require("express");

const authenticateUser = require("../middleware/authMiddleware");

const {
    createMaintenanceRequest,
    getMaintenanceRequests,
} = require("../controllers/maintenanceController");

const router = express.Router();

// Submit a maintenance request
router.post("/", authenticateUser, createMaintenanceRequest);

// View the logged-in user's requests
router.get("/", authenticateUser, getMaintenanceRequests);

module.exports = router;