import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// GraphQL mutations
const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $name: String!, $password: String!) {
    signUpUser(input: { email: $email, name: $name, password: $password }) {
      accessToken
      user {
        id
        email
        name
        profilePicture
      }
    }
  }
`;
const LOG_IN_MUTATION = gql`
  mutation logIn($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

// Auth Custom Hook
export function useProviderAuth() {
  const [authToken, setAuthToken] = useState(null);
  const [
    signUpUser,
    { data: signUpData, error: signUpError, loading: signUpLoading },
  ] = useMutation(SIGN_UP_MUTATION);
  const [
    signInUser,
    { data: signInData, error: signInError, loading: signInLoading },
  ] = useMutation(LOG_IN_MUTATION);

  const isSignedIn = () => !!authToken;

  function signUp({ email, name, password }) {
    signUpUser({
      variables: {
        email,
        name,
        password,
      },
    });

    return { signUpData, signUpError, signUpLoading };
  }

  function signIn({ email, password }) {
    signInUser({
      variables: {
        email,
        password,
      },
    });

    if (signInData?.accessToken) {
      setAuthToken(signInData.accessToken);
      localStorage.setItem("accessToken", authToken);
    }

    return { signInData, signInError, signInLoading };
  }

  const signOut = () => {
    setAuthToken(null);
    localStorage.removeItem("accessToken");
  };

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signUp,
    signOut,
  };
}
