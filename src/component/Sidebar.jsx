import React from "react";
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // includes Popper.js for dropdowns
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { GrCart } from "react-icons/gr";
import { RiAdminFill, RiTeamFill } from "react-icons/ri";
import { GoCodeOfConduct } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { FaLink } from "react-icons/fa";
import { MdContactSupport, MdReviews } from "react-icons/md";

const Sidebar = ({
  changingSidebar,
  showProfile,
  profile,
  homepage,
  handleSettingsClick,
  handleCartClick,
  handleAboutClick,
  handleTeamClick,
  handleReviewsClick,
  handleTermsClick,
  handleContactClick,
  handleAdminClick,
}) => {
  const { username } = useSelector((store) => store.userName);

  let currLoggedInUser = username;
let displayName = currLoggedInUser;
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
  if (!homepage) {
    displayName = "Login";
  }
  const SignOut = () => {
    localStorage.removeItem("currLoggedInUser");
    showAlert("success", "Success", "Logged out successfully");
  };
  const copyLink = () => {
    const link = "https://smart-basket-hazel.vercel.app";
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link successfully copied!");
    });
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className={styles["parent-main-div"]}>
        <div
          className={`d-flex flex-column flex-shrink-0 p-3 text-bg-dark ${styles["sidebar-height"]}`}
          style={{ width: "200px" }}
        >
          <div className={styles["icon-cross"]}>
            {displayName && (
              <div className="headersidebar">
                <p className="headertext">
                  Hi <span>{displayName?.split(" ")[0]}</span>
                </p>
              </div>
            )}

            <img
              src="https://img.icons8.com/ios11/512/FFFFFF/menu.png"
              alt=""
              className={styles["icon-img"]}
              onClick={() => changingSidebar(0)}
            />
          </div>

          <hr />
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart"
                onClick={() => {
                  showProfile(profile ^ 1);

                  changingSidebar(0);
                }}
              >
                <CgProfile size={23} />
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart"
                onClick={handleCartClick}
              >
                <GrCart size={20} />
                My Basket
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart spec"
                onClick={handleSettingsClick}
              >
                <IoSettingsOutline size={20} />
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart spec1"
                onClick={handleTermsClick}
              >
                <GoCodeOfConduct size={20} />
                Terms
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart"
                onClick={handleAboutClick}
              >
                <FaExternalLinkAlt size={20} />
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart spec2"
                onClick={handleTeamClick}
              >
                <RiTeamFill size={20} />
                Team
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart spec2"
                onClick={copyLink}
              >
                <FaLink size={20} />
                SmartBasket
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart"
                onClick={handleContactClick}
              >
                <MdContactSupport size={24} />
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart"
                onClick={handleReviewsClick}
              >
                <MdReviews size={24} />
               Reviews
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white sidebart"
                onClick={handleAdminClick}
              >
                <RiAdminFill size={24} />
               Admin
              </a>
            </li>
          </ul>

          <hr />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
