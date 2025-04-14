import { useContext, useState } from "react";
import styles from "./HomePage.module.css";
import Sidebar from "./Sidebar";
import ShoppingCart from "./ShoppingCart";
import MainShoppingPage from "./MainShoppingPage";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import HowToUse from "./HowToUse";
import { IoHomeSharp } from "react-icons/io5";

const HomePage = ({ loginTOhome, homepage }) => {
  const [sidebar, setsidebar] = useState(0);
  const { currentValue } = useSelector((store) => store.items);
  const { newItem } = useSelector((store) => store.items);


  const changingSidebar = (customVal) => {
    setsidebar(customVal);
  };
  const [shoppingVar, setshoppingVar] = useState(0);
  const [viewCart, setviewCart] = useState(0);
  const changingviewCart = (customVal) => {
    setviewCart(customVal);
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
          <button
            type="button"
            className={`btn position-relative ${styles.homeparent}`}
          >
            <IoHomeSharp
              size={21}
              className={`${styles.homeicon}`}
              onClick={() => {
                setshoppingVar(0);
                setviewCart(0);
              }}
            />
          </button>
          <button
            type="button"
            className={`${styles["div-badge"]} btn position-relative`}
          >
            <img
              className={styles["two-header-img"]}
              src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA="
              alt="cart"
              onClick={() => {
                if (viewCart === 0) {
                  setviewCart(1);
                  setshoppingVar(0);
                } else {
                  setviewCart(0);
                  setshoppingVar(1);
                }
              }}
            />
            <span
              className="position-absolute translate-middle badge rounded-pill bg-success"
              style={{
                top: "10%",
                left: "75%",
                transform: "translate(-50%, -50%)",
                fontSize: "0.75rem",
                padding: "5px 8px",
              }}
            >
              {newItem.length}
              <span className="visually-hidden">Check Orders</span>
            </span>
          </button>

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
          changingSidebar={changingSidebar}
          loginTOhome={loginTOhome}
          homepage={homepage}
        ></Sidebar>
      )}
      {viewCart === 1 && <ShoppingCart></ShoppingCart>}
      {!((shoppingVar === 0) ^ (viewCart === 0)) && (
        <div>
          <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div
                className={`col-10 col-sm-8 col-lg-6 ${styles.centeringimg}`}
              >
                <img
                  src="homeimage.png"
                  className={`d-block mx-lg-auto img-fluid `}
                  alt="Bootstrap Themes"
                  width="600"
                  height="700"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-6 ">
                <h1 className={`${styles.hpheading}`}>
                  Welcome to SmartBasket
                </h1>
                <p className="lead">
                  SmartBasket is an intelligent shopping solution designed to
                  enhance the retail experience by integrating barcode scanning,
                  automated cart management, and real-time product information.
                  It allows users to scan products using their smartphones, view
                  detailed product descriptions, manage their shopping cart, and
                  streamline the checkout process.
                </p>
                <div className={`${styles.buttons}`}>
                  <button type="button" className="buyitem">
                    CONNECTED MALLS
                  </button>
                  <button
                    type="button"
                    className="buyitem"
                    onClick={() => {
                      setshoppingVar(1);
                      setviewCart(0);
                    }}
                  >
                    START BUYING
                  </button>
                </div>
              </div>
            </div>
          </div>
          <HowToUse />
        </div>
      )}
      {shoppingVar === 1 && <MainShoppingPage></MainShoppingPage>}
      <Footer />
    </>
  );
};
export default HomePage;
