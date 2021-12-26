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
  // * Consider replacing with useReducer
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState({});
  const [getUser] = useLazyQuery(GET_USER_DATA, {
    onCompleted: (data) => setUserData(data.self),
  });
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
    setUserData({});
    localStorage.removeItem("accessToken");
    router.replace("/");
  };

  return {
    getUser,
    userData,
    isLoggedIn,
    setIsLoggedIn,
    authToken,
    setAuthToken,
    signOut,
  };
}
