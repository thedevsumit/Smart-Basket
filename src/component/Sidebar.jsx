import React from "react";
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // includes Popper.js for dropdowns
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { GrCart } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import { GoCodeOfConduct } from "react-icons/go";
import { FaLink } from "react-icons/fa";
const Sidebar = ({
  changingSidebar,
  showProfile,
  profile,
  handleSettingsClick,
  handleCartClick,
  handleTeamClick,
}) => {
  const { username } = useSelector((store) => store.userName);

  let currLoggedInUser = username;

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
            {currLoggedInUser && (
              <div className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  <strong>{currLoggedInUser}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => showProfile(profile ^ 1)}
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={SignOut}>
                      Sign out
                    </a>
                  </li>
                </ul>
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
              <a href="#" className="nav-link text-white sidebart spec1">
                <GoCodeOfConduct size={20} />
                Terms
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white sidebart">
                <FaExternalLinkAlt size={20} />
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white sidebart spec2" onClick={handleTeamClick}>
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
          </ul>

          <hr />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
