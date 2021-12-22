import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GET_USER_DATA = gql`
  query Self {
    self {
      id
      email
      name
    }
  }
`;

export function useProviderAuth() {
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [getUser, { data }] = useLazyQuery(GET_USER_DATA);
  const router = useRouter();

  useEffect(() => {
    if (localStorage?.getItem?.("accessToken")) {
      setIsLoggedIn(true);
      setAuthToken(localStorage.getItem("accessToken"));
    }

    getUser();
  }, [authToken]);

  const signOut = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    localStorage.removeItem("accessToken");
    router.replace("/");
  };

  return {
    data,
    isLoggedIn,
    setIsLoggedIn,
    authToken,
    setAuthToken,
    signOut,
  };
}
