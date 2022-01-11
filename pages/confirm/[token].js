import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const CONFIRM_MAIL_MUTATION = gql`
  mutation confirmAccount($origin: String!, $token: String!) {
    validateToken(input: { origin: $origin, token: $token })
  }
`;

function Token() {
  const router = useRouter();
  const toast = useToast();
  const [confirmAccount, { loading }] = useMutation(CONFIRM_MAIL_MUTATION);

  useEffect(() => {
    async function getData() {
      let data = await confirmAccount({
        variables: {
          origin: "web",
          token: router.query.token,
        },
      });

      toast({
        title: data.validateToken
          ? "Thank you for confirming your mail!"
          : "Your email is already confirmed!",
        status: "info",
        duration: 5000,
        isClosable: true,
      });

      router.push("/login");
    }

    getData().catch((error) =>
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    );
  }, [router, confirmAccount]);

  if (loading) return <div>Loading...</div>;

  return <div>Please confirm your mail</div>;
}

export default Token;
