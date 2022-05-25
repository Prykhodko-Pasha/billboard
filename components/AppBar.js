import { useEffect, useState } from "react";
import Navigation from "./navigation";
import AuthNav from "./authNav";
import UserMenu from "./userMenu";
import s from "../styles/AppBar.module.css";
import { getCookies, clearCookies } from "../helpers/cookies";
import { useIsLoggedInContext } from "../context/provider";
import { setBearerToken, unsetBearerToken } from "../helpers/axiosHeaders";

export default function AppBar() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedInContext();

  useEffect(() => {
    if (isLoggedIn) {
      const userData = getCookies();
      setUser(userData);
      setBearerToken(userData.token);
    } else {
      setUser(null);
      unsetBearerToken();
      clearCookies();
    }
  }, [isLoggedIn]);

  return (
    <div className={s.app_bar}>
      <Navigation />
      {user ? <UserMenu name={user.name} /> : <AuthNav />}
    </div>
  );
}
