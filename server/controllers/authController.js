const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

// REGISTER USER
const registerUser = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }

    const normalizedEmail = email.toLowerCase().trim();

    db.get(
        "SELECT id FROM Users WHERE email = ?",
        [normalizedEmail],
        async function (err, user) {
            if (err) {
                console.error("Database error:", err.message);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            if (user) {
                return res.status(409).json({
                    success: false,
                    message: "User with this email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const allowedRoles = ["tenant", "owner", "admin"];
            let userRole = "tenant";

            if (allowedRoles.includes(role)) {
                userRole = role;
            }

            const sql =
                "INSERT INTO Users (name, email, password, role) " +
                "VALUES (?, ?, ?, ?)";

            db.run(
                sql,
                [
                    name.trim(),
                    normalizedEmail,
                    hashedPassword,
                    userRole
                ],
                function (insertError) {
                    if (insertError) {
                        console.error(
                            "Error creating user:",
                            insertError.message
                        );

                        return res.status(500).json({
                            success: false,
                            message: "Unable to create user"
                        });
                    }

                    return res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: {
                            id: this.lastID,
                            name: name.trim(),
                            email: normalizedEmail,
                            role: userRole
                        }
                    });
                }
            );
        }
    );
};

// LOGIN USER
const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    const normalizedEmail = email.toLowerCase().trim();

    db.get(
        "SELECT * FROM Users WHERE email = ?",
        [normalizedEmail],
        async function (err, user) {
            if (err) {
                console.error("Database error:", err.message);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.status(200).json({
                success: true,
                message: "Login successful",
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    );
};

// EXPORT
module.exports = {
    registerUser,
    loginUser
};