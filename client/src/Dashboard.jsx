
function Dashboard({ user, onLogout }) {
    const dashboardItems = [
        {
            title: "My Properties",
            description: "View your property details.",
            icon: "🏠",
        },
        {
            title: "Maintenance",
            description: "Submit and track maintenance requests.",
            icon: "🔧",
        },
        {
            title: "Amenities",
            description: "Explore and book available amenities.",
            icon: "🏊",
        },
        {
            title: "My Profile",
            description: "View your account information.",
            icon: "👤",
        },
    ];

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div>
                    <h2 style={styles.logo}>Property Manager</h2>
                </div>

                <div style={styles.userSection}>
                    <span>{user.name}</span>
                    <button
                        onClick={onLogout}
                        style={styles.logoutButton}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main style={styles.main}>
                <h1>Welcome, {user.name}!</h1>
                <p style={styles.subtitle}>
                    Manage your property, maintenance requests,
                    and amenities in one place.
                </p>

                <div style={styles.grid}>
                    {dashboardItems.map((item) => (
                        <div key={item.title} style={styles.card}>
                            <div style={styles.icon}>{item.icon}</div>
                            <h2 style={styles.cardTitle}>
                                {item.title}
                            </h2>
                            <p style={styles.description}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={styles.accountCard}>
                    <h2>Account Information</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            </main>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        backgroundColor: "#1e3a5f",
        color: "white",
        padding: "16px 5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
    },
    logo: {
        margin: 0,
        fontSize: "22px",
    },
    userSection: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    logoutButton: {
        backgroundColor: "#ffffff",
        color: "#1e3a5f",
        border: "none",
        padding: "9px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    main: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "35px 20px",
    },
    subtitle: {
        color: "#64748b",
        marginBottom: "30px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "25px",
    },
    card: {
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.07)",
        border: "1px solid #e2e8f0",
    },
    icon: {
        fontSize: "32px",
        marginBottom: "12px",
    },
    cardTitle: {
        fontSize: "19px",
        color: "#1e3a5f",
    },
    description: {
        color: "#64748b",
        lineHeight: 1.5,
    },
    accountCard: {
        backgroundColor: "white",
        marginTop: "30px",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
    },
};

export default Dashboard;