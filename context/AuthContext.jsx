import { createContext, useContext } from "react";
import { useProviderAuth } from "../utils/auth";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
