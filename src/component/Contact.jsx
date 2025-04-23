import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Make sure you have this
const Contact = ({ sidebar, setSidebar }) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const userEmail = localStorage.getItem("currLoggedInUser");
  
    if (!userEmail) {
      Swal.fire("Not Logged In", "Please log in to send us a message.", "error");
      return;
    }
  
    if (message.trim().length === 0) {
      Swal.fire("Empty Message", "Please write something before sending.", "warning");
      return;
    }
  
    try {
      await addDoc(collection(db, "ContactMessages"), {
        email: userEmail,
        message: message.trim(),
        timestamp: Timestamp.now(),
      });
  
      Swal.fire("Sent!", "Your message has been sent successfully 📩", "success");
      setMessage("");
    } catch (err) {
      console.error("Firestore Error:", err);
      Swal.fire("Error", "Could not send message. Please try again later.", "error");
    }
  };

  return (
    <>
      <div
        className="contact-container"
        onClick={() => {
          if (sidebar === 1) {
            setSidebar(0);
          }
        }}
      >
        <h1 className="contact-header">Contact SmartBasket Support</h1>
        <p className="contact-subtext">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <div className="contact-form">
          <textarea
            className="contact-textarea"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
          <button className="contact-send-btn" onClick={handleSend}>
            Send Message
          </button>
        </div>

        <p className="contact-footer">
          We’ll get back to you via your registered email.
        </p>
        <div className="contact-other-methods">
          <h2 className="contact-subheader">Other Ways to Reach Us</h2>

          <a href="mailto:smartbasket18@gmail.com" className="contact-link">
            <FaEnvelope style={{ marginRight: "8px" }} />
            smartbasket18@gmail.com
          </a>

          <a href="tel:+18001234567" className="contact-link">
            <FaPhoneAlt style={{ marginRight: "8px" }} />
            +91 2731-23-4567
          </a>

          <a
            href="https://wa.me/918699872587"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            {" "}
            <FaWhatsapp style={{ marginRight: "8px" }} />
            WhatsApp Chat
          </a>

          <a
            href="https://instagram.com/smartbasket"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaInstagram style={{ marginRight: "8px" }} />
            Instagram
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;
