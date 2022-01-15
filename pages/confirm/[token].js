import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CenteredText from "../../components/common/CenteredText";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const CONFIRM_MAIL_MUTATION = gql`
  mutation confirmAccount($token: String!) {
    validateToken(input: { origin: "web", token: $token })
  }
`;

function Token() {
  const router = useRouter();
  const toast = useToast();
  const [confirmAccount, { loading }] = useMutation(CONFIRM_MAIL_MUTATION);

  useEffect(() => {
    if (!router.isReady) return;

    async function getData() {
      try {
        const {
          data: { validateToken },
        } = await confirmAccount({
          variables: {
            token: router.query.token,
          },
        });

        toast({
          title: validateToken
            ? "Thank you for confirming your mail!"
            : "Your email is already confirmed!",
          description: "Redirecting you to the login page...",
          status: validateToken ? "success" : "warning",
          duration: 6000,
          isClosable: true,
        });

        setTimeout(() => router.push("/login"), 5000);
      } catch (error) {
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      }
    }
    getData();
  }, [router, confirmAccount, toast]);

  if (loading) return <LoadingSpinner />;

  return <CenteredText>Please confirm your mail!</CenteredText>;
}

export default Token;
