const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");

const {
    createProperty,
    getOwnerProperties
} = require("../controllers/propertyController");

const router = express.Router();

router.post("/", authenticateUser, createProperty);
router.get("/", authenticateUser, getOwnerProperties);

module.exports = router;