import { useGlobalStateContext } from "../context/provider";
import Router from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Profile() {
  const [globalState, setGlobalState] = useGlobalStateContext();
  const [user, setUser] = useState();

  console.log("globalState :>> ", globalState);

  useEffect(() => {
    // if (!globalState) Router.push("/signup");
    if (!Cookies.get("token")) Router.push("/login");
    //   Cookies.get("token");
  }, []);

  return (
    <div>
      My Profile
      <div>{globalState?.name}</div>
    </div>
  );
}

// Profile.getInitialProps = ({ req }) => {
//   const cookies = parseCookies(req);
// };
