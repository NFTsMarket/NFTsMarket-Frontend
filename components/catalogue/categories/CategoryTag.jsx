import { useEffect, useState } from "react";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";
import Link from "next/link";

const CategoryTag = ({ category }) => {
  return (
    <Link href={`/categories/${category.id}`} passHref>
      <Tag
        key={category.id}
        borderRadius="full"
        colorScheme="purple"
      >
        <TagLabel style={{ cursor: "pointer" }}>{category.name}</TagLabel>
      </Tag>
    </Link>
  );
};

export default CategoryTag;
