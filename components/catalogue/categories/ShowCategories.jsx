import { useEffect, useState } from "react";
import { Center, HStack } from "@chakra-ui/react";
import CategoryTag from "./CategoryTag";

const ShowCategories = ({ categories }) => {
  return (
    <Center py={3}>
      <HStack spacing={4}>
        {categories.map((c) => (
          <CategoryTag key={c.id} category={c} />
        ))}
      </HStack>
    </Center>
  );
};

export default ShowCategories;
