
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import HandlingSignIn from "./component/HandlingSignIn";
import HomePage from "./component/HomePage";
import { userAction } from "./store/privacy";
function App() {
  const dispatch = useDispatch();
 
  const [signingIn, signup] = useState("SignUp");
  const [homepage, loginpage] = useState(0);
  const [userdetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());

        const userData = docSnap.data();
        dispatch(userAction.newName(userData.username));
      } else {
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
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
  async function AddData() {
    const customDocId = "24103152"; 

    const mallItem = {
      title: "FERORO ROCHER CHOCOLATE",
      description: "FERORO ROCHER CHOCOLATE VERY TASTY ICECREAM",
      discount: "15%",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgNrWuYlCbVVk9X-N4gIXSHXskM9QSVRRb_Q&s",
      newPrice: "₹579",
      price: "₹699",
    };

    await setDoc(doc(db, "Mallitems", customDocId), mallItem);
}
  AddData();
  return (
    <>
      {homepage === 1 ? (
        <HomePage loginTOhome={loginTOhome} homepage={homepage} />
      ) : (
        <HandlingSignIn
          signingIn={signingIn}
          signInToUp={signInToUp}
          loginTOhome={loginTOhome}
          homepage={homepage}
        />
      )}
    </>
  );
}

export default App;
