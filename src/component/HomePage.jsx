import { useContext, useState } from "react";
import styles from "./HomePage.module.css";
import Sidebar from "./Sidebar";
import ShoppingCart from "./ShoppingCart";
import MainShoppingPage from "./MainShoppingPage";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import HowToUse from "./HowToUse";
import { IoHomeSharp } from "react-icons/io5";
import Profile from "./Profile";
import Settings from "./Settings";
import Team from "./Team";
import AboutUs from "./About";
import Terms from "./Terms";
import Contact from "./Contact";


const HomePage = ({ loginTOhome, homepage }) => {
  const [sidebar, setSidebar] = useState(0);
  const [shoppingVar, setShoppingVar] = useState(0);
  const [viewCart, setViewCart] = useState(0);
  const [profile, setProfile] = useState(0);
  const [settings, setSettings] = useState(0);
  const [team, setTeam] = useState(0);
  const [about, setAbout] = useState(0);
  const [terms, setTerms] = useState(0);
  const [contact, setContact] = useState(0);

  const { newItem } = useSelector((store) => store.items);

  const resetAllViews = () => {
    setShoppingVar(0);
    setViewCart(0);
    setProfile(0);
    setSettings(0);
    setTeam(0);
    setSidebar(0);
    setAbout(0);
    setTerms(0);y
    
    setContact(0);
  };

  const handleHomeClick = () => {
    resetAllViews();
  };

  const handleCartClick = () => {
    resetAllViews();
    setViewCart(1);
  };
  const handleContactClick = () => {
    resetAllViews();
    setContact(1);
  };
  const handleAboutClick = () => {
    resetAllViews();
    setAbout(1);
  };

  const handleProfileClick = () => {
    resetAllViews();
    setProfile(1);
  };

  const handleTeamClick = () => {
    resetAllViews();
    setTeam(1);
  };

  const handleTermsClick = () => {
    resetAllViews();
    setTerms(1);
  };

  const handleSettingsClick = () => {
    resetAllViews();
    setSettings(1);
  };
  const toggleSidebar = (val) => {
    setSidebar(val);
  };

  return (
    <>
      <div
        className={styles["main-header"]}
        onClick={() => {
          if (sidebar === 1) {
            setSidebar(0);
          }
        }}
      >
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
              className={styles.homeicon}
              onClick={handleHomeClick}
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
              onClick={handleCartClick}
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
            onClick={() => toggleSidebar(1)}
          />
        </div>
      </div>

      {sidebar === 1 && (
        <Sidebar
          profile={profile}
          showProfile={setProfile}
          changingSidebar={toggleSidebar}
          loginTOhome={loginTOhome}
          homepage={homepage}
          handleCartClick={handleCartClick}
          handleSettingsClick={handleSettingsClick}
          handleTeamClick={handleTeamClick}
          handleAboutClick={handleAboutClick}
          handleTermsClick={handleTermsClick}
          handleContactClick={handleContactClick}
        />
      )}

      {profile === 1 ? (
        <Profile
          loginTOhome={loginTOhome}
          sidebar={sidebar}
          setSidebar={setSidebar}
        />
      ) : settings === 1 ? (
        <Settings sidebar={sidebar} setSidebar={setSidebar} />
      ) : about === 1 ? (
        <AboutUs sidebar={sidebar} setSidebar={setSidebar} />
      ) : terms === 1 ? (
        <Terms sidebar={sidebar} setSidebar={setSidebar} />
      ) : contact === 1 ? (
        <Contact sidebar={sidebar} setSidebar={setSidebar} />
      ) : viewCart === 1 ? (
        <ShoppingCart sidebar={sidebar} setSidebar={setSidebar} />
      ) : shoppingVar === 1 ? (
        <MainShoppingPage sidebar={sidebar} setSidebar={setSidebar} />
      ) : team === 1 ? (
        <Team sidebar={sidebar} setSidebar={setSidebar} />
      ) : (
        <div
          onClick={() => {
            if (sidebar === 1) {
              setSidebar(0);
            }
          }}
        >
          <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div
                className={`col-10 col-sm-8 col-lg-6 ${styles.centeringimg}`}
              >
                <img
                  src="homeimage.png"
                  className="d-block mx-lg-auto img-fluid"
                  alt="Bootstrap Themes"
                  width="600"
                  height="700"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-6">
                <h1 className={styles.hpheading}>Welcome to SmartBasket</h1>
                <p className="lead">
                  SmartBasket is an intelligent shopping solution designed to
                  enhance the retail experience by integrating barcode scanning,
                  automated cart management, and real-time product information.
                </p>
                <div className={styles.buttons}>
                  <button type="button" className="buyitem">
                    CONNECTED MALLS
                  </button>
                  <button
                    type="button"
                    className="buyitem"
                    onClick={() => {
                      setShoppingVar(1);
                      setViewCart(0);
                      setProfile(0);
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
    
      <Footer
        sidebar={sidebar}
        setSidebar={setSidebar}
        handleAboutClick={handleAboutClick}
        handleTermsClick={handleTermsClick}
        handleContactClick={handleContactClick}
      />
    </>
  );
};

export default HomePage;
