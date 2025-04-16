import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./AboutUs.module.css";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { SiTicktick } from "react-icons/si";
const AboutUs = ({sidebar,setSidebar}) => {
  const [confirm, setConfirm] = useState("");

  const handleEmail = async () => {
    const email = localStorage.getItem("currLoggedInUser");

    if (!email) {
      Swal.fire("Not Logged In", "Please log in to subscribe.", "error");
      return;
    }

    if (confirm.trim().toUpperCase() === "CONFIRM") {
      if (!localStorage.getItem("newsLetter")) {
        try {
          await addDoc(collection(db, "NewsletterEmails"), {
            email,
            timestamp: Timestamp.now(),
          });

          Swal.fire(
            "Subscribed!",
            "You've been added to our newsletter 💌",
            "success"
          );
          localStorage.setItem("newsLetter", "true");
          setConfirm("");
        } catch (error) {
         
          Swal.fire("Oops!", "Something went wrong. Try again later.", "error");
        }
      } else {
        Swal.fire(
          "Already Subscribed",
          "You're already on the list ✅",
          "info"
        );
      }
    } else {
      Swal.fire("Invalid Entry", "Type CONFIRM to subscribe 📧", "warning");
    }
  };

  return (
    <>
    <div onClick={() => {
            if (sidebar === 1) {
              setSidebar(0);
            }
          }}>
      <div>
        <ul className="listabu">
          <h1 className="headerof"> About Us</h1>
          <li>
            {" "}
            <strong>SmartBasket</strong> is your intelligent shopping companion,
            designed to make your in-store experience faster, smarter, and
            smoother. Just scan the barcode of any product, and SmartBasket
            automatically adds it to your virtual cart in real-time.
          </li>
          <li>
            {" "}
            Our mission is to revolutionize how people shop by combining the
            power of technology with real-world convenience. No more waiting in
            long queues or forgetting what you’ve picked — SmartBasket keeps it
            all tracked and organized for you.
          </li>
          <li>
            {" "}
            From barcode scanning and smart billing to personalized profiles and
            ride-sharing for malls, SmartBasket is more than just an app — it’s
            your entire shopping journey in one place.
          </li>
          <li>
            <h1 className="headerof">What we Do?</h1>
            <p>
              SmartBasket is a next-gen shopping solution that blends
              convenience, speed, and technology to transform your in-store
              shopping into a seamless digital experience. With features like
              real-time barcode scanning, smart cart management, and automated
              billing, we remove the hassle from shopping so you can focus on
              what really matters—your products.
            </p>
          </li>
          <li>
            <h1 className="headerof">Why SmartBasket?</h1>
            <ul className="ulabout">
              <li> Skip long queues <SiTicktick /></li>
              <li>Track your cart in real time <SiTicktick /></li>
              <li>Get instant cost breakdowns <SiTicktick /></li>
              <li>Personalized user profiles <SiTicktick /></li>
              <li> Ride-sharing integration for malls and markets <SiTicktick /></li>
            </ul>
            <p>
              Whether you're shopping solo or with friends, SmartBasket keeps
              your experience smooth, efficient, and organized.
            </p>
          </li>
          <li>
            <h1 className="headerof">Our Vision</h1>
            <p>
              We believe shopping should be intelligent, enjoyable, and
              efficient. Our goal is to digitize every aspect of physical
              shopping—from carting to checkout—while keeping the human
              experience at its core.
            </p>
          </li>
          <li>
            <h1 className="headerof">Our Mission</h1>
            <p>
              To provide a smart ecosystem for shoppers and retailers that
              bridges the gap between traditional shopping and smart technology.
              We aim to empower both buyers and sellers with tools that
              streamline their daily interactions.
            </p>
          </li>
          <li>
            <h1 className="headerof">Our Features (and growing!)</h1>
            <ul>
              <li>Barcode Scanning – Add items to your cart instantly

</li>
              <li>Auto Billing – Get instant totals without a cashier</li>
              <li>Ride-Sharing for Shopping – Share a ride with fellow shoppers</li>
              <li>Smart History – Keep track of your purchases</li>
              <li> Secure Profiles – Your data, safe and personalized</li>
            </ul>
          </li>
        
        </ul>
      </div>

      <div className="newletterLogin">
        <div className="mainNewsSync">
          <div className="imgNews">
            <img src="img.png" alt="" id="imgNewsSync" />
          </div>
          <div className="newsLogin">
            <h1 id="headingNews">Get the latest updates</h1>
            <p id="paraNews">Sign up for our newsletter</p>
            <div className="loginMainDiv">
              <input
                type="text"
                id="inputNews"
                placeholder="Type CONFIRM to join"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button id="newsButton" onClick={handleEmail}>
                Send
              </button>
            </div>
            <p id="headinFooter">
              By signing up to our Newsletter you agree to our
              <a href="#" id="anchorNews">
                {" "}
                Terms of Service{" "}
              </a>{" "}
              and
              <a href="#" id="anchorNews">
                {" "}
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
        <p className="footerabu">
          Built with ❤️ by passionate developers who believe in a smarter retail
          future.
        </p>
      </div>
      </div>
    </>
  );
};

export default AboutUs;
