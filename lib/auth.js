import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $name: String!, $password: String!) {
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
  mutation LogIn($email: String!, $password: String!) {
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
    console.log(email, password);
    console.log(signInData);

    if (signInData?.accessToken) {
      setAuthToken(signInData.accessToken);
      console.log(signInData.accessToken);
    }

    return { signInData, signInError, signInLoading };
  }

  const signOut = () => {
    setAuthToken(null);
  };

  return {
    authToken,
    setAuthToken,
    isSignedIn,
    signIn,
    signUp,
    signOut,
  };
}
