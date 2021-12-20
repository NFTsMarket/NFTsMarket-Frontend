import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function useProviderAuth() {
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage?.getItem?.("accessToken")) {
      setIsLoggedIn(true);
      setAuthToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const signOut = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    localStorage.removeItem("accessToken");
    router.replace("/");
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    authToken,
    setAuthToken,
    signOut,
  };
}
