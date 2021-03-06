import { useEffect, useState } from "react";
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
import { InfoIcon } from "@chakra-ui/icons";
import Link from "next/link";
import UploadApi from "../upload/UploadApi";

export default function Product({ product, displayButton }) {
  const { id, title, price } = product;
  const [picture, setPicture] = useState(product.picture);

  useEffect(async () => {
    try {
      UploadApi.getAsset(
        picture._id,
        null,
        process.env.NEXT_PUBLIC_JWT_TOKEN
      ).then((data) => {

        const file = data.image.baseUrl;
        setPicture({
          _id: picture._id,
          file: file,
        });
      });

    } catch (error) {

    }
  }, [product]);
  return (
    <Center py={12}>
      <Box
        role={"group"}
        marginTop={"10"}
        p={6}
        maxW={"264px"}
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
          height={"184px"}
          boxShadow={"rgba(0, 0, 0, 0.55) 0px 5px 15px;"}
          _groupHover={{
            boxShadow: "rgba(0, 0, 0, 0.65) 0px 5px 25px",
          }}
        >
          <Image
            rounded={"lg"}
            height={184}
            width={225}
            objectFit={"cover"}
            src={picture.file}
            alt={""}
          />
        </Box>
        <Stack pt={8} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {title}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              € {price}
            </Text>
          </Stack>

          {displayButton && (
            <div>
              <Divider h="4" borderColor="#d1d1e0" />
              <Stack spacing={2} direction="row" pt={5} align={"center"}>
                <Link href={`/products/${id}`} passHref>
                  <Button leftIcon={<InfoIcon />} colorScheme="purple">
                    View details
                  </Button>
                </Link>
              </Stack>
            </div>
          )}
        </Stack>
      </Box>
    </Center>
  );
}
