import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $name: String!, $password: String!) {
    signUpUser(input: { email: $email, name: $name, password: $password }) {
      user {
        name
      }
    }
  }
`;

export const LOG_IN_MUTATION = gql`
  mutation logIn($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
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

export const SOCIAL_SIGN_IN_MUTATION = gql`
  mutation socialSignIn($token: String!) {
    socialSignIn(input: { token: $token }) {
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

export const VALIDATE_TOKEN_MUTATION = gql`
  mutation validateAuthToken($token: String!, $password: String) {
    validateToken(input: { origin: "web", token: $token, password: $password })
  }
`;

export const RESET_USER_PASSWORD_MUTATION = gql`
  mutation resetPW($email: String!) {
    resetUserPassword(input: { origin: "web", email: $email })
  }
`;

export const RESET_SELF_PASSWORD_MUTATION = gql`
  mutation updatePassword($oldPassword: String!, $oldPassword: String!) {
    updateSelfPassword(input: { origin: "web", token: $token })
  }
`;
