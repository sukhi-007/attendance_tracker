import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import googleLogo from '../assets/googleLogo.png';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const Signup = ({ sendDataToBackend }) => {
    const handleGoogleSignup = async () => {
        if (sendDataToBackend?.current) {
            await sendDataToBackend.current(); // Call bot detection before signing in
        }
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("User signed in:", result.user);
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <button
                className="btn btn-light border d-flex align-items-center px-4 py-2 shadow-sm"
                onClick={handleGoogleSignup}
            >
                <img src={googleLogo} alt="Google Logo" className="me-2" style={{ width: "20px", height: "20px" }} />
                Continue with Google
            </button>
        </div>
    );
};

export default Signup;
