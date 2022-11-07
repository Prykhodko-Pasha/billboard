import { useEffect, useState } from "react";
import Router from "next/router";
import Navigation from "./navigation";
import AuthNav from "./authNav";
import UserMenu from "./userMenu";
import s from "../styles/AppBar.module.css";
import { useUserContext } from "../context/provider";

export default function AppBar() {
  const [user, setUser] = useUserContext();
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    if (user) {
      Router.pathname === "/" ? setActiveLink("/") : setActiveLink("/profile");
    } else {
      Router.pathname === "/profile"
        ? setActiveLink("/login")
        : setActiveLink(Router.pathname);
    }
  }, [user]);

  return (
    <div className={s.app_bar}>
      <Navigation
        user={user}
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
