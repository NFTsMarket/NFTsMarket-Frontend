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

export default function ProductSimple(props) {
  const ID = props.id,
    TITLE = props.title,
    URL = props.url,
    PRICE = props.price;

  return (
    <Center py={12}>
      <Box
        role={"group"}
        marginTop={"10"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        _hover={{
          transform: "scale(1.03)",
        }}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          boxShadow={"rgba(0, 0, 0, 0.55) 0px 5px 15px;"}
          _groupHover={{
              boxShadow:"rgba(0, 0, 0, 0.65) 0px 5px 25px",
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={URL}
            alt={""}
          />
        </Box>
        <Stack pt={8} align={"center"}>
          {/* <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text> */}
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {TITLE}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {PRICE}
            </Text>
            {/* <Text textDecoration={'line-through'} color={'gray.600'}>
                $199
              </Text>  */}
          </Stack>
          <Divider h="4" borderColor="#d1d1e0" />
          <Stack spacing={4} direction="row" pt={5} align={"center"}>
            <Button
              leftIcon={<EditIcon />}
              colorScheme="purple"
              onClick={() => console.log("editar pulsado")}
            >
              Editar
            </Button>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="purple"
              variant="outline"
              onClick={() => console.log("borrar pulsado")}
            >
              Borrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
