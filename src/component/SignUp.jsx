import { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import styles from "./SignUp.module.css";
import Swal from "sweetalert2";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Spinner from "./Spinner";
import { db } from "../firebaseConfig";
// import { firebaseConfig, db } from "../firebaseConfig";
import emailjs from "@emailjs/browser";
// import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { userAction } from "../store/privacy";
const SignUp = ({ signInToUp, homepage, loginTOhome }) => {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [otpyes, setotpyes] = useState(0);
  const [sending, setsending] = useState(0);
  const [final, setfinal] = useState(0);
  const dispatch = useDispatch();
  const UserNameElement = useRef();
  const emailElement = useRef();
  const passwordElement = useRef();

  const [spinnerval, setspinnerval] = useState(0);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [generatedOtpExpiry, setGeneratedOtpExpiry] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const sendEmail = (email, user_name) => {

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry
    setGeneratedOtp(otp.toString());
    setGeneratedOtpExpiry(expiry);

    const templateParams = {
      email,
      user_name,
      otp,
      expiry_time: expiry.toLocaleTimeString(),
    };
setspinnerval(1)
    emailjs
      .send(
        "service_2bir0fc",
        "template_bkhs2ke",
        templateParams,
        "SvdB5ZoOGJGZYa3Qb"
      )
      .then(() => {
        Swal.fire("Sent!", "OTP sent to your email ✅", "success");
        setsending(1)
        setspinnerval(0)
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        Swal.fire("Error", "Failed to send OTP ❌", "error");
        setspinnerval(0)
      });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const username = UserNameElement.current.value;
    const email = emailElement.current.value;
    if (!username || !email) {
      showAlert("error", "Missing Info", "Enter username and email first");
      return;
    }
    sendEmail(email, username);
  };

  const verifyOtp = () => {
    const currentTime = new Date().getTime();
    const otpExpiryTime = new Date(generatedOtpExpiry).getTime();

    if (currentTime > otpExpiryTime) {
      Swal.fire(
        "Expired OTP ❌",
        "OTP expired. Please request a new one.",
        "error"
      );
    } else if (enteredOtp === generatedOtp) {
      setOtpVerified(true);
      setfinal(1)
      setsending(0)
      Swal.fire("Verified ✅", "OTP matched successfully", "success");
    } else {
      Swal.fire("Invalid OTP ❌", "OTP does not match", "error");
      
    }
    setEnteredOtp("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!otpVerified) {
      showAlert("error", "Verify OTP", "Please verify the OTP first");
      return;
    }

    const username = UserNameElement.current.value;
    const email = emailElement.current.value;
    const password = passwordElement.current.value;

    if (!username || !email || !password) {
      showAlert("error", "Missing Info", "Fill all fields");
      return;
    } else if (password.length < 8) {
      showAlert("error", "Weak Password", "Password must have 8 characters");
      return;
    }

    const avatarURL = `https://ui-avatars.com/api/?name=${username
      .charAt(0)
      .toUpperCase()}&length=1&background=4CAF50&color=fff&bold=true`;

    try {
      document.querySelector(".main-container").style.opacity = "0.6";
      setspinnerval(1);
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await setDoc(doc(db, "Users", user.uid), {
        username,
        email,
        avatarURL,
      });

      dispatch(userAction.newName(username));
      localStorage.setItem("currLoggedInUser", email);

      setspinnerval(0);
      document.querySelector(".main-container").style.opacity = "1";
      showAlert("success", "Success", "Account created successfully!");
      loginTOhome(1);
    } catch (error) {
      setspinnerval(0);
      document.querySelector(".main-container").style.opacity = "1";
      showAlert("error", "Error", error.message);
    }
  };

  const showAlert = (icon, title, message) => {
    Swal.fire({
      title,
      text: message,
      icon,
      confirmButtonText: "OK",
      background: "#f8f9fa",
      color: "#000",
      timer: 3000,
    });
  };
  const [sidebar, setsidebar] = useState(0);
  // const { currLoggedInUser } = useContext(SignIn);
  const changingSidebar = (customVal) => {
    setsidebar(customVal);
  };
  return (
    <>
      <div className={styles["main-header"]}>
        <div className={styles["one-header"]}>
          <img
            className={styles["one-header-img-smartbasket"]}
            src="https://cdn-icons-png.flaticon.com/512/6783/6783480.png"
            alt="SmartBasket"
          />
          <span className={styles["one-header-smartbasket"]}>SmartBasket</span>
        </div>
        <div className={styles["two-header"]}>
          <img
            className={styles["two-header-img"]}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatOVRDENelIbuzdGYva7nrItNTvPd_pdamQ&s"
            alt="User"
            onClick={() => {
              changingSidebar(1);
            }}
          />
        </div>
      </div>
      {sidebar === 1 && (
        <Sidebar
          homepage={homepage}
          // currLoggedInUser={currLoggedInUser}
          changingSidebar={changingSidebar}
        ></Sidebar>
      )}

      <div className={`main-container ${styles["main-login-div"]}`}>
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
            <h1 className={` ${styles["h1-color"]} h3 mb-3 fw-normal`}>
              Create Account
            </h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingUsername"
                placeholder="UserName"
                ref={UserNameElement}
              />
              <label htmlFor="floatingUsername">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                ref={passwordElement}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                ref={emailElement}
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>

           {sending === 0 && <button
              style={{ marginTop: "15px" }}
              className="btn btn-primary w-100 py-2"
              onClick={handleSendOtp}
              type="button"
            >
              Send OTP
            </button>}
            {otpyes === 0 && (
              <div>
               {sending === 1 &&  <div style={{ marginTop: "20px" }} className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                  <label htmlFor="floatingEmail">Enter OTP</label>
                </div>}
                {sending === 1 && <button
                  className="button btn btn-primary w-100 py-2"
                  style={{ marginTop: "20px" }}
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>}
               {final === 1 && <div
                  className={styles["signin-color"]}
                  onClick={() => {
                    signInToUp("SignUp");
                  }}
                >
                  Sign In
                </div>}
              { final === 1 &&  <button
                  className="btn btn-primary w-100 py-2"
                  type="submit"
                  disabled={!otpVerified}
                >
                  Create Account
                </button>}
              </div>
            )}
          </form>
        </main>
        <hr className="hr1" />
        <div className="divgoogle">
          {" "}
          <div className="googleicon">
            <FcGoogle size={25} />
          </div>
          <button
            className="google"
            onClick={() => {
              setspinnerval(1);
              signInWithPopup(auth, provider).then(async (result) => {
                const user = result.user;
                setspinnerval(0);
                showAlert("success", "Success", "Login successfully!");
                const username = user.displayName;
                const email = user.email;
                const avatarURL = user.photoURL;
                await setDoc(doc(db, "Users", user.uid), {
                  username,
                  email,
                  avatarURL,
                });
                localStorage.setItem("currLoggedInUser", email);
                
                loginTOhome(1);
              });
            }}
          >
            Continue with Google
          </button>
        </div>

        {spinnerval === 1 && <Spinner />}
        <div className={`container ${styles["footer-margin"]}`}>
          <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Terms
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="mailto:84kumarsumit@gmail.com"
                  className="nav-link px-2 text-body-secondary"
                >
                  Contact
                </a>
              </li>
            </ul>
            <p className="text-center text-body-secondary">
              © 2025 SmartBasket, Team
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};
export default SignUp;
