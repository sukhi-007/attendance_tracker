import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./BotDetection.css";

const BotDetection = ({ sendDataToBackend }) => {
    const [typingIntervals, setTypingIntervals] = useState([]);
    const [mouseMovements, setMouseMovements] = useState([]);
    const [honeypotFilled, setHoneypotFilled] = useState(false);
    const typingStartTime = useRef(null);
    const lastMouseMoveTime = useRef(null);

    // Track typing intervals
    const handleKeyPress = () => {
        const now = Date.now();
        if (typingStartTime.current) {
            const interval = now - typingStartTime.current;
            if (interval < 2000) { // Ignore unrealistic delays (e.g., 2+ seconds)
                setTypingIntervals((prev) => [...prev, interval]);
            }
        }
        typingStartTime.current = now;
    };
    // Track mouse movements
    const handleMouseMove = () => {
        const now = Date.now();
        if (lastMouseMoveTime.current) {
            const interval = now - lastMouseMoveTime.current;
            setMouseMovements((prev) => [...prev, interval]);
        }
        lastMouseMoveTime.current = now;
    };

    // Check if honeypots are filled
    const handleHoneypotChange = (e) => {
        if (e.target.value) {
            setHoneypotFilled(true);
        }
    };

    // Detect WebDriver
    const detectWebDriver = () => {
        return navigator.webdriver || false;
    };

    // Get user agent
    const getUserAgent = () => {
        return navigator.userAgent;
    };


    const sendData = useCallback(async () => {
        const data = {
            typingIntervals,
            mouseMovements,
            honeypotFilled,
            isWebDriver: detectWebDriver(),
            userAgent: getUserAgent(),
        };

        try {
            await axios.post("humansheild-production.up.railway.app/api/detect", data);
            console.log("Bot detection data sent to backend");
        } catch (error) {
            console.error("Error sending bot detection data:", error);
        }
    }, [typingIntervals, mouseMovements, honeypotFilled]);

    useEffect(() => {
        window.addEventListener("keypress", handleKeyPress);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("keypress", handleKeyPress);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (sendDataToBackend) {
            sendDataToBackend.current = sendData;
        }
    }, [sendDataToBackend, sendData]);

    return (
        <div>
            <input type="text" name="honeypot1" className="hidden" onChange={handleHoneypotChange} autoComplete="off" />
            <input type="text" name="honeypot2" className="hidden" onChange={handleHoneypotChange} autoComplete="off" />
            <input type="text" name="honeypot3" className="hidden" onChange={handleHoneypotChange} autoComplete="off" />
        </div>
    );
};

export default BotDetection;
