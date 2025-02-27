import React, { useEffect, useState, useRef } from 'react';
import Signup from './components/Signup.jsx';
import BotDetection from './components/BotDetection.jsx';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './firebase';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);
  const sendDataToBackend = useRef(null); // Store bot detection function

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
  }, []);

  const handleSignOut = async () => {
    if (sendDataToBackend?.current) {
      await sendDataToBackend.current(); // Call bot detection before signing out
    }
    signOut(auth);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          user ? (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
              <h1 className="mb-4">Welcome, {user.displayName} 👋</h1>
              <button className="btn btn-danger px-4 py-2 shadow-sm fw-bold" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <Signup sendDataToBackend={sendDataToBackend} />
              <BotDetection sendDataToBackend={sendDataToBackend} />
            </div>
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;
