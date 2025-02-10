import React from 'react';
import Signup from './components/Signup.jsx';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  if (user === null) {
    return (
      <div>
        <Signup />
      </div>
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4">Welcome, {user.displayName} 👋</h1>
      <button
        className="btn btn-danger px-4 py-2 shadow-sm fw-bold"
        onClick={() => signOut(auth)}
      >
        Sign Out
      </button>
    </div>
  );
};
export default App;
