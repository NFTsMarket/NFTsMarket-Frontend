import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";

const CONFIRM_MAIL_MUTATION = gql`
  mutation confirmAccount($origin: String!, $token: String!) {
    validateToken(input: { origin: $origin, token: $token })
  }
`;

function Token() {
  const router = useRouter();
  const [confirmAccount, { loading }] = useMutation(CONFIRM_MAIL_MUTATION);

  useEffect(() => {
    async function getData() {
      try {
        const {
          data: { validateToken },
        } = await confirmAccount({
          variables: {
            origin: "web",
            token: router.query.token,
          },
        });

        if (validateToken) {
          console.log(`Thank you for confirming your mail ${validateToken}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [router, confirmAccount]);

  if (loading) return <div>Loading...</div>;

  return <div>Please confirm your mail</div>;
}

export default Token;
