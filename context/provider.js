import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const Context = createContext();

export function Provider({ children }) {
  const intialState = Cookies.get("user") ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(intialState);
  return (
    <Context.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </Context.Provider>
  );
}

export function useIsLoggedInContext() {
  return useContext(Context);
}
