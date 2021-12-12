import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Divider,
    Image,
    Button,
  } from "@chakra-ui/react";
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  
  export default function Asset(props) {
    const ID = props.asset.id,
      URL = props.asset.url;
  
    return (
      <Center py={12}>
            <Image
              rounded={"lg"}
              height={390}
              width={300}
              objectFit={"cover"}
              src={URL}
              alt={""}
              _hover={{
                transform: "scale(1.03)",
              }}
              boxShadow={"2xl"}
            />
      </Center>
    );
  }