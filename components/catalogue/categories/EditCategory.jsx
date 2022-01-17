import {
  Text,
  SimpleGrid,
  Button,
  Center,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { putCategory } from "../catalogueResource";

export default function EditCategory({ category, onCancel, onSave }) {
  const toast = useToast();
  const [name, setName] = useState(category.name);
  const [loadingButton, setLoadingButton] = useState(false);

  function updateCategory() {
    if (name === "") {
      toast({
        title: "There was some error.",
        description: "Please, fill all required parameters.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return false;
    }
    setLoadingButton(true);

    const newCategory = {
      name: name,
    };

    putCategory(category.id, newCategory)
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Category updated succesfully.",
            description: "We've updated your category.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setLoadingButton(false);

          onSave(newCategory);
        } else {
          throw Error("Couldn't update category.", response.status);
        }
      })
      .catch((error) => {
        setLoadingButton(false);
        console.log(error);
        toast({
          title: "There was some error.",
          description: "Couldn't update category.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <div className="upload-show">
      <Center>
        <SimpleGrid
          m={10}
          p={10}
          rounded={"lg"}
          boxShadow={"2xl"}
          color={"#333 "}
        >
          <Flex>
            <Center w="700px" mx={5} px={5}>
              <Text center py={5} width={700}>
                <Text lineHeight={8} fontSize="lg">
                  <b>Name</b>
                </Text>
                <Input
                  lineHeight={8}
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <br />
              </Text>
            </Center>
          </Flex>
          <Center>
            <Button
              isLoading={loadingButton}
              style={{ marginRight: "20px" }}
              leftIcon={<CheckIcon />}
              colorScheme="purple"
              onClick={() => updateCategory()}
            >
              Save
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<ArrowBackIcon />}
              colorScheme="purple"
              variant="outline"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          </Center>
        </SimpleGrid>
      </Center>
    </div>
  );
}
