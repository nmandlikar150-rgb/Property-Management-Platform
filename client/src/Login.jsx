
import { useState } from "react";
import { loginUser } from "./services/authService";

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
            const data = await loginUser(formData);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            onLogin(data.user);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome Back</h1>
                <p style={styles.subtitle}>
                    Property Management Platform
                </p>

                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Login</button>
                </form>

                {message && (
                    <p style={styles.success}>{message}</p>
                )}

                {error && (
                    <p style={styles.error}>{error}</p>
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
        backgroundColor: "#fff",
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

export default Login;