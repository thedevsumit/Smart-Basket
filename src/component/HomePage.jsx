import { useContext, useState } from "react";
import styles from "./HomePage.module.css";
import Sidebar from "./Sidebar";
import ShoppingCart from "./ShoppingCart";
import MainShoppingPage from "./MainShoppingPage";
import { useSelector } from "react-redux";
// import { SignIn } from "../store/SignUp-store";
// import MainShoppingPage from "./MainShoppingPage";
// import ShoppingCart from "./ShoppingCart";
const HomePage = ({ loginTOhome, homepage }) => {
  const [sidebar, setsidebar] = useState(0);
const {currentValue} = useSelector((store) => store.items);
  // const { itemList } = useContext(SignIn);
  // const { currLoggedInUser } = useContext(SignIn);
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
          {shoppingVar === 1 && (
            <button
              type="button"
              className={`${styles["div-badge"]} btn position-relative`}
            >
              <img
                className={styles["two-header-img"]}
                src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA="
                alt="cart"
                onClick={() => {
                  setviewCart(1);
                  setshoppingVar(0);
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
                {currentValue.length}
                <span className="visually-hidden">Check Orders</span>
              </span>
            </button>
          )}
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
          // currLoggedInUser={currLoggedInUser}
          changingSidebar={changingSidebar}
          loginTOhome={loginTOhome}
          homepage={homepage}
        ></Sidebar>
      )}
        {viewCart === 1 && <ShoppingCart></ShoppingCart>}
      {shoppingVar === 0 && (
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setshoppingVar(1);
            setviewCart(0)
          }}
        >
          Buy Items
        </button>
      )}
      {shoppingVar === 1 && <MainShoppingPage></MainShoppingPage>}
    </>
  );
};
export default HomePage;
