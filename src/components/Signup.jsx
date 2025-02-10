import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase';
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import googleLogo from '../assets/googleLogo.png'; // Ensure you have a Google logo image

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("User signed in:", result.user);
        })
        .catch((error) => {
            console.error("Error signing in:", error);
        });
};

const Signup = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <button
                className="btn btn-light border d-flex align-items-center px-4 py-2 shadow-sm"
                onClick={signInWithGoogle}
            >
                <img src={googleLogo} alt="Google Logo" className="me-2" style={{ width: "20px", height: "20px" }} />
                Continue with Google
            </button>
        </div>
    );
};

export default Signup;
