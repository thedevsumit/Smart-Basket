// import Header from "./component/Header";
// import DisplayCounter from "./component/DisplayCounter";
// import Modal from "./component/Modal";
// import Controls from "./component/Controls";
// import ErrorMess from "./component/ErrorMess";
import { useDispatch, useSelector } from "react-redux";
import { doc,getDoc } from "firebase/firestore";
import { auth,db } from "./firebaseConfig";
// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";
import { useEffect, useState } from "react";
import HandlingSignIn from "./component/HandlingSignIn";
import HomePage from "./component/HomePage";
import { userAction } from "./store/privacy";
function App() {
  const dispatch = useDispatch();
  // const { currLoggedInUser } = useContext(SignIn);
  const [signingIn, signup] = useState("SignUp");
  const [homepage, loginpage] = useState(0);
  const [userdetails, setUserDetails] = useState(null);
  const fetchUserData = async () => { 
  auth.onAuthStateChanged(async (user) => {
  
  const docRef = doc(db,"Users",user.uid);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    setUserDetails(docSnap.data())
    
    const userData = docSnap.data();
    dispatch(userAction.newName(userData.username))
  }else{
    
  }
      });
    }
useEffect(() => {fetchUserData()},[])
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
