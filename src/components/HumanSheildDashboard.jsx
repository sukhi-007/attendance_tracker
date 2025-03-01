import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Humansheild.css";

const botTrafficData = [
    { time: "10:00 AM", bots: 40, humans: 300 },
    { time: "11:00 AM", bots: 70, humans: 250 },
    { time: "12:00 PM", bots: 100, humans: 400 },
    { time: "1:00 PM", bots: 50, humans: 350 },
];

const attackPatterns = [
    { timestamp: "Feb 27, 10:15 AM", method: "DDoS", impact: "High" },
    { timestamp: "Feb 27, 11:20 AM", method: "Credential Stuffing", impact: "Medium" },
    { timestamp: "Feb 27, 12:40 PM", method: "Web Scraping", impact: "Low" },
];

const HumanShieldDashboard = () => {
    const [config, setConfig] = useState({ detectionThreshold: 70, alertsEnabled: true });

    return (
        <div className="container py-4 bg-white">
            {/* Real-Time Analytics */}
            <div className="card p-4 shadow bg-white mb-4">
                <h2 className="text-center fw-bold text-primary">Real-Time Traffic Analysis</h2>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={botTrafficData}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="bots" stroke="#FF0000" name="Bots" />
                            <Line type="monotone" dataKey="humans" stroke="#00FF00" name="Humans" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="row g-4">
                {/* Recent Bot Attacks */}
                <div className="col-md-6">
                    <div className="card p-4 shadow bg-white">
                        <h2 className="text-center fw-bold text-danger">Recent Bot Attacks</h2>
                        {attackPatterns.map((attack, index) => (
                            <div key={index} className="border-bottom pb-2 mb-2">
                                <p><strong>{attack.timestamp}</strong></p>
                                <p>{attack.method} - <span className="fw-bold text-danger">{attack.impact}</span></p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Attack Patterns */}
                <div className="col-md-6">
                    <div className="card p-4 shadow bg-white">
                        <h2 className="text-center fw-bold text-warning">Recent Attack Patterns</h2>
                        {attackPatterns.map((attack, index) => (
                            <div key={index} className="border-bottom pb-2 mb-2">
                                <p><strong>{attack.timestamp}</strong></p>
                                <p>{attack.method} - <span className="fw-bold text-warning">{attack.impact}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Configuration Panel */}
            <div className="card p-4 shadow bg-white mt-4">
                <h2 className="text-center fw-bold text-info">Configuration Panel</h2>
                <div className="mb-3">
                    <label className="form-label fw-bold">Detection Threshold</label>
                    <input type="range" className="form-range" min="50" max="100" value={config.detectionThreshold}
                        onChange={(e) => setConfig({ ...config, detectionThreshold: e.target.value })} />
                    <span className="d-block text-center mt-2 text-primary fw-bold">{config.detectionThreshold}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-secondary">Enable Alerts</span>
                    <button className="btn btn-outline-danger fw-bold" onClick={() => setConfig({ ...config, alertsEnabled: !config.alertsEnabled })}>
                        {config.alertsEnabled ? "Disable" : "Enable"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HumanShieldDashboard;