// import Header from "./component/Header";
// import DisplayCounter from "./component/DisplayCounter";
// import Modal from "./component/Modal";
// import Controls from "./component/Controls";
// import ErrorMess from "./component/ErrorMess";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";
import { useEffect, useState } from "react";
import HandlingSignIn from "./component/HandlingSignIn";
import HomePage from "./component/HomePage";
function App() {
  // const { currLoggedInUser } = useContext(SignIn);
  const [signingIn, signup] = useState("SignUp");
  const [homepage, loginpage] = useState(0);

  

  useEffect(() => {
    let storedUser = window.localStorage.getItem("currLoggedInUser");
    if (storedUser) {
      loginpage(1);
    }
  }, []); 
  const signInToUp = (val) => {
    signup(val);
  };

  const loginTOhome = (val) => {
    loginpage(val);
    if (val === 0) {
      window.localStorage.removeItem("currLoggedInUser");
    }
  };

  return (
    <>
       {homepage === 1 ? (
        <HomePage loginTOhome={loginTOhome} homepage={homepage} />
      ) : (
        <HandlingSignIn signingIn={signingIn} signInToUp={signInToUp} loginTOhome={loginTOhome} homepage={homepage} />
      )}
    </>
  );

}

export default App;
