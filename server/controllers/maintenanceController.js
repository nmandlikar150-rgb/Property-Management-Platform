
const db = require("../db");

// Submit a new maintenance request
const createMaintenanceRequest = (req, res) => {
    const { property_id, issue_description } = req.body;
    const user_id = req.user.id;

    if (!property_id || !issue_description || !issue_description.trim()) {
        return res.status(400).json({
            success: false,
            message: "Property ID and issue description are required.",
        });
    }

    // Check whether the property exists
    db.get(
        "SELECT id FROM Properties WHERE id = ?",
        [property_id],
        (err, property) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error checking property.",
                });
            }

            if (!property) {
                return res.status(404).json({
                    success: false,
                    message: "Property not found.",
                });
            }

            // Create the maintenance request
            db.run(
                `INSERT INTO MaintenanceRequests
                (property_id, user_id, issue_description)
                VALUES (?, ?, ?)`,
                [property_id, user_id, issue_description.trim()],
                function (insertError) {
                    if (insertError) {
                        return res.status(500).json({
                            success: false,
                            message: "Failed to create maintenance request.",
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: "Maintenance request submitted successfully.",
                        request: {
                            id: this.lastID,
                            property_id,
                            user_id,
                            issue_description: issue_description.trim(),
                            status: "Pending",
                        },
                    });
                }
            );
        }
    );
};

// Get maintenance requests submitted by the logged-in user
const getMaintenanceRequests = (req, res) => {
    const user_id = req.user.id;

    db.all(
        `SELECT
            mr.id,
            mr.property_id,
            p.property_name,
            mr.user_id,
            mr.issue_description,
            mr.status,
            mr.created_at,
            mr.updated_at,
            mr.resolution_date
        FROM MaintenanceRequests mr
        JOIN Properties p ON mr.property_id = p.id
        WHERE mr.user_id = ?
        ORDER BY mr.created_at DESC`,
        [user_id],
        (err, requests) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to retrieve maintenance requests.",
                });
            }

            res.status(200).json({
                success: true,
                requests,
            });
        }
    );
};

module.exports = {
    createMaintenanceRequest,
    getMaintenanceRequests,
};