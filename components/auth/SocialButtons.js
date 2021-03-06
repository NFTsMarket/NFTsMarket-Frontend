import { useMutation } from "@apollo/client";
import { Button, SimpleGrid, useToast, VisuallyHidden } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { auth, provider } from "../../lib/firebase";
import { SOCIAL_SIGN_IN_MUTATION } from "../../utils/gqlMutations";
import LoadingSpinner from "../common/LoadingSpinner";

function SocialButtons() {
  const router = useRouter();
  const toast = useToast();
  const { dispatch } = useAuth();
  const [socialSignIn, { loading }] = useMutation(SOCIAL_SIGN_IN_MUTATION);

  const handleSocial = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { data } = await socialSignIn({
          variables: {
            token: result.user.accessToken,
          },
        });

        router.push("/");

        dispatch({
          type: "LOGIN",
          payload: {
            token: data.socialSignIn.accessToken,
            user: data.socialSignIn.user,
          },
        });
      })
      .catch((error) => {
        toast({
          title: error.graphQLErrors
            ? error.graphQLErrors[0].message
            : error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
      <SimpleGrid mt="6" columns={1} spacing="3">
        <Button color="currentColor" variant="outline" onClick={handleSocial}>
          <VisuallyHidden>Sign up with Google</VisuallyHidden>
          <FaGoogle />
        </Button>
      </SimpleGrid>
    </>
  );
}

export default SocialButtons;
