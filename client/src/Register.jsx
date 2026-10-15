import { useState } from "react";
import { registerUser } from "./services/authService";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "tenant",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const data = await registerUser(formData);

            setMessage(data.message || "Registration successful!");

            setFormData({
                name: "",
                email: "",
                password: "",
                role: "tenant",
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Create Account</h1>

                <p style={styles.subtitle}>
                    Property Management Platform
                </p>

                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="tenant">Tenant</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit">
                        Register
                    </button>
                </form>

                {message && (
                    <p style={styles.success}>
                        {message}
                    </p>
                )}

                {error && (
                    <p style={styles.error}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        padding: "20px",
    },

    card: {
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "#ffffff",
        padding: "35px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    },

    title: {
        textAlign: "center",
        marginBottom: "8px",
    },

    subtitle: {
        textAlign: "center",
        color: "#666",
        marginBottom: "25px",
    },

    success: {
        color: "green",
        textAlign: "center",
        marginTop: "15px",
    },

    error: {
        color: "red",
        textAlign: "center",
        marginTop: "15px",
    },
};

export default Register;