import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: "#333",
      padding: "10px",
    },
    navList: {
      display: "flex",
      listStyleType: "none",
      justifyContent: "start",
      margin: 0,
      padding: 0,
    },
    navItem: {
      margin: "0 10px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      padding: "8px 16px", // Add padding for button-like appearance
      backgroundColor: "#007BFF", // Button background color
      border: "none", // Remove border
      borderRadius: "4px", // Rounded corners
      display: "inline-block", // Ensure proper button-like display
      textAlign: "center", // Center text
      cursor: "pointer", // Pointer cursor on hover
    },
    navLinkHover: {
      backgroundColor: "#0056b3", // Darker background on hover
    },
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        {localStorage.getItem("role") === "patient" && (
          <>
            <li style={styles.navItem}>
              <Link to="/patient/profile" style={styles.navLink}>
                Profile
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/patient/vaccine-list" style={styles.navLink}>
                Vaccine List
              </Link>
            </li>
          </>
        )}
        {localStorage.getItem("role") === "provider" && (
          <>
            <li style={styles.navItem}>
              <Link to="/provider/patient-list" style={styles.navLink}>
                Patient List
              </Link>
            </li>
          </>
        )}

        <li style={styles.navItem}>
          <Link
            to="/"
            style={styles.navLink}
            onClick={() => localStorage.clear("role")}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
