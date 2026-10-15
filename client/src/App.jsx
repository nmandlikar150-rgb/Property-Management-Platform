
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
    const [page, setPage] = useState(() => {
        return localStorage.getItem("user") ? "dashboard" : "login";
    });

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    });

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        setPage("dashboard");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setPage("login");
    };

    if (page === "dashboard" && user) {
        return (
            <Dashboard
                user={user}
                onLogout={handleLogout}
            />
        );
    }

    return (
        <div>
            <div style={{ textAlign: "center", padding: "15px" }}>
                <button onClick={() => setPage("login")}>
                    Login
                </button>

                <button
                    onClick={() => setPage("register")}
                    style={{ marginLeft: "10px" }}
                >
                    Register
                </button>
            </div>

            {page === "login" ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Register />
            )}
        </div>
    );
}

export default App;