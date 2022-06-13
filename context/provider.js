import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { getCookies } from "../helpers/cookies";
import { setBearerToken } from "../helpers/axiosHeaders";
import { getUserAPI } from "../services/users-api";

const Context = createContext();

export function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState("");

  useEffect(() => {
    Cookies.get("token") ? fetchUser() : setRoute(Router.pathname);
  }, []);

  useEffect(() => {
    switch (route) {
      case "/profile":
        !user && Router.replace("/login");
        break;
      case "/bill/edit":
        !user && Router.replace("/login");
        break;
      case "/bill/edit/[id]":
        !user && Router.replace("/login");
        break;
      case "/user/edit/[id]":
        !user && Router.replace("/login");
        break;
      case "/login":
        user && Router.replace("/profile");
        break;
      case "/signup":
        user && Router.replace("/profile");
        break;
      default:
        console.log("default :>> ");
        break;
    }
  }, [user, route]);

  const fetchUser = async () => {
    try {
      const token = await getCookies();
      // console.log("token :>> ", token);
      setBearerToken(token);
      const userData = await getUserAPI();
      // console.log("userData :>> ", userData);
      setUser(userData);
      setRoute(Router.pathname);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
