import React, { useEffect, useState, useRef } from 'react';
import Signup from './components/Signup.jsx';
import BotDetection from './components/BotDetection.jsx';
import HumanShieldDashboard from './components/HumanSheildDashboard.jsx';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './firebase';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const AppContent = () => {
  const [user, setUser] = useState(null);
  const sendDataToBackend = useRef(null); // Store bot detection function
  const navigate = useNavigate(); // Navigation Hook

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignOut = async () => {
    if (sendDataToBackend?.current) {
      console.log("Bot Detection Activated 🚨");
      await sendDataToBackend.current(); // Bot Detection API Before Logout
    }
    await signOut(auth);
    navigate('/'); // Navigate to Home After Sign Out
  };

  const handleDashboard = () => {
    navigate('/dashboard'); // Navigate to Dashboard
  };

  return (
    <div>
      {user && (
        <div className="d-flex justify-content-end p-3">
          <button className="btn btn-primary me-2" onClick={handleDashboard}>Dashboard</button>
          <button className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

      <Routes>
        <Route path="/" element={
          user ? (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
              <h1 className="mb-4" style={{ color: 'black', fontFamily: 'inherit' }}>Welcome
                to HumanShield, {user.displayName} 👋</h1>
              <BotDetection sendDataToBackend={sendDataToBackend} /> {/* Bot Detection ✅ */}
            </div>
          ) : (
            <div>
              <Signup sendDataToBackend={sendDataToBackend} />
              <BotDetection sendDataToBackend={sendDataToBackend} />
            </div>
          )
        } />

        <Route path="/dashboard" element={<HumanShieldDashboard />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

