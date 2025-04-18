import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Swal from "sweetalert2";
import Settings from "./Settings";
const Profile = ({ loginTOhome, sidebar, setSidebar }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  

    avatarURL: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("currLoggedInUser");
      if (!email) return;

      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setFormData(userData);
      }
    };

    fetchUserData();
  }, []);
  const SignOut = () => {
    localStorage.removeItem("currLoggedInUser");
    loginTOhome(0);
    showAlert("success", "Success", "Logged out successfully");
  };
  console.log(formData.avatarURL);
  const showAlert = (icon, title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonText: "OK",
      background: "#f8f9fa",
      color: "#000",
      timer: 3000,
    });
  };
  return (
    <div
      className={styles.profileContainer}
      onClick={() => {
        if (sidebar === 1) {
          setSidebar(0);
        }
      }}
    >
      <div className={styles.profileCard}>
        <img
          src={
            formData.avatarURL ||
            `https://ui-avatars.com/api/?name=${(formData.username ||
              "U")[0].toUpperCase()}&length=1&background=4CAF50&color=fff&bold=true`
          }
          alt="User Avatar"
          className={styles.avatar}
        />

        <h2>User Profile</h2>
        <div className={styles.profileInfo}>
          <label>Name</label>
          <p>{formData.username}</p>

          <label>Email</label>
          <p>{formData.email}</p>

         
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.logoutBtn} onClick={SignOut}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
