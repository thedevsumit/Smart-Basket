import SignIn from "./SignIn";
import SignUp from "./SignUp";
const HandlingSignIn = ({ signingIn,signInToUp,loginTOhome,homepage }) => {
  
  return (
    <>
     
      {signingIn === "SignIn" && (
        <SignUp signInToUp={signInToUp} loginTOhome={loginTOhome} homepage={homepage}></SignUp>
      )}
      {signingIn === "SignUp" && (
        <SignIn
          signInToUp={signInToUp}
          loginTOhome={loginTOhome}
          homepage={homepage}
        ></SignIn>
      )}
    </>
  );
};
export default HandlingSignIn;
