import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function useProviderAuth() {
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage) {
      setAuthToken(window.localStorage.getItem("accessToken"));
    }
  }, []);

  const signOut = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
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
