import React, { useEffect, useState } from "react";

const Settings = ({sidebar,setSidebar}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleToggle = (setter) => {
    setter((prev) => !prev);
  };

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const currentStyles = {
    container: {
      ...styles.container,
      background: darkMode ? "#1e1e1e" : "#f5f5f5",
      color: darkMode ? "#ffffff" : "#000000",
      boxShadow: darkMode
        ? "0 0 10px rgba(255,255,255,0.1)"
        : "0 0 10px rgba(0,0,0,0.1)",
    },
    summary: {
      ...styles.summary,
      background: darkMode ? "#2a2a2a" : "#ffffff",
      color: darkMode ? "#ffffff" : "#000000",
    },
  };

  return (
    <div style={currentStyles.container}  onClick={() => {
      if (sidebar === 1) {
        setSidebar(0);
      }
    }}>
      <h2 style={styles.heading}>Settings</h2>

      <div style={styles.option}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => handleToggle(setDarkMode)}
          />
          Enable Dark Mode
        </label>
      </div>

      <div style={styles.option}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => handleToggle(setNotifications)}
          />
          Enable Notifications
        </label>
      </div>

      <div style={styles.option}>
        <label>
          <input
            type="checkbox"
            checked={emailUpdates}
            onChange={() => handleToggle(setEmailUpdates)}
          />
          Receive Email Updates
        </label>
      </div>

      <div style={currentStyles.summary}>
        <h4>Summary</h4>
        <p>Dark Mode: {darkMode ? "On" : "Off"}</p>
        <p>Notifications: {notifications ? "Enabled" : "Disabled"}</p>
        <p>Email Updates: {emailUpdates ? "Subscribed" : "Unsubscribed"}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "400px",
    margin: "0 auto",
    borderRadius: "10px",
    fontFamily: "sans-serif",
  },
  heading: {
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  option: {
    marginBottom: "1rem",
  },
  summary: {
    marginTop: "2rem",
    padding: "1rem",
    borderRadius: "8px",
  },
};

export default Settings;
