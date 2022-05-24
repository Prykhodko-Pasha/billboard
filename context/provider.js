import { createContext, useContext, useState } from "react";

const Context = createContext();

export function Provider({ children }) {
  const [globalState, setGlobalState] = useState(null);
  return (
    <Context.Provider value={[globalState, setGlobalState]}>
      {children}
    </Context.Provider>
  );
}

export function useGlobalStateContext() {
  return useContext(Context);
}
