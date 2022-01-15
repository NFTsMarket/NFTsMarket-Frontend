import { Button, SimpleGrid, VisuallyHidden } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

function SocialButtons() {
  return (
    <SimpleGrid mt="6" columns={1} spacing="3">
      <Button color="currentColor" variant="outline">
        <VisuallyHidden>Sign up with Google</VisuallyHidden>
        <FaGoogle />
      </Button>
    </SimpleGrid>
  );
}

export default SocialButtons;
