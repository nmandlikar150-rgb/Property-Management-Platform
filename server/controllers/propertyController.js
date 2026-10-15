const db = require("../db");

// CREATE PROPERTY
const createProperty = (req, res) => {
    const owner_id = req.user.id;
    const { property_name, address, property_type } = req.body;

    if (!property_name || !address || !property_type) {
        return res.status(400).json({
            success: false,
            message: "Property name, address and property type are required"
        });
    }

    db.run(
        `INSERT INTO Properties
        (owner_id, property_name, address, property_type)
        VALUES (?, ?, ?, ?)`,
        [
            owner_id,
            property_name.trim(),
            address.trim(),
            property_type.trim()
        ],
        function (err) {
            if (err) {
                console.error("Error creating property:", err.message);

                return res.status(500).json({
                    success: false,
                    message: "Failed to create property"
                });
            }

            return res.status(201).json({
                success: true,
                message: "Property created successfully",
                property: {
                    id: this.lastID,
                    owner_id: owner_id,
                    property_name: property_name.trim(),
                    address: address.trim(),
                    property_type: property_type.trim()
                }
            });
        }
    );
};

// GET OWNER PROPERTIES
const getOwnerProperties = (req, res) => {
    const owner_id = req.user.id;

    db.all(
        `SELECT
            id,
            owner_id,
            property_name,
            address,
            property_type,
            created_at
        FROM Properties
        WHERE owner_id = ?
        ORDER BY created_at DESC`,
        [owner_id],
        (err, properties) => {
            if (err) {
                console.error("Error retrieving properties:", err.message);

                return res.status(500).json({
                    success: false,
                    message: "Failed to retrieve properties"
                });
            }

            return res.status(200).json({
                success: true,
                properties: properties
            });
        }
    );
};

module.exports = {
    createProperty,
    getOwnerProperties
};