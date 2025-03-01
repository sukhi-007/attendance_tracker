import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, signOut }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">

            <button
                className="btn btn-danger position-absolute top-0 end-0 m-3"
                onClick={signOut}
            >
                Sign Out
            </button>

            <h1 className="mb-4">Welcome, {user.displayName} 👋</h1>

            <button
                className="btn btn-primary px-4 py-2 shadow-sm fw-bold"
                onClick={() => navigate("/student-info")}
            >
                Get Started
            </button>
        </div>
    );
};

export default Dashboard;
