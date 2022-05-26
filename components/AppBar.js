import { useEffect, useState } from "react";
import Router from "next/router";
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
  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    setActiveLink(Router.pathname);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Router.pathname === "/" ? setActiveLink("/") : setActiveLink("/profile");
      const userData = getCookies();
      setUser(userData);
      setBearerToken(userData.token);
    } else {
      setActiveLink("/login");
      setUser(null);
      unsetBearerToken();
      clearCookies();
    }
  }, [isLoggedIn]);

  return (
    <div className={s.app_bar}>
      <Navigation
        isLoggedIn={isLoggedIn}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
      {user ? (
        <UserMenu name={user.name} setActiveLink={setActiveLink} />
      ) : (
        <AuthNav activeLink={activeLink} setActiveLink={setActiveLink} />
      )}
    </div>
  );
}
