import { useContext } from "react";
import styles from "./Sidebar.module.css";
// import { SignIn } from "../store/SignUp-store";
const Sidebar = ({ currLoggedInUser,changingSidebar,loginTOhome,homepage}) => {
  // const {signinData,SignOut} = useContext(SignIn)
  
  return (
    <>
      <div className={styles["parent-main-div"]}>
        <div
          className={`d-flex flex-column flex-shrink-0 p-3 text-bg-dark ${styles["sidebar-height"]}`}
          style={{ width: "200px" }}
        >
          
          <div className={styles["icon-cross"]}>
          {homepage === 1 && (<div className="dropdown">
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
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              
             
              <li>
                <a className="dropdown-item" href="#" onClick={()=>{
                  SignOut(currLoggedInUser)
                  loginTOhome(0)
                }}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>)}
            <img
              src="https://img.icons8.com/ios11/512/FFFFFF/menu.png"
              alt=""
              className={styles["icon-img"]}
              onClick={()=>{
                changingSidebar(0)
              }}
            />
          </div>
       
          
          <hr />
          <ul className={`nav nav-pills flex-column mb-auto`}>
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#home"></use>
                </svg>
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#speedometer2"></use>
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#table"></use>
                </svg>
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#grid"></use>
                </svg>
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#people-circle"></use>
                </svg>
                Customers
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
