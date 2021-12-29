import Asset from '../../components/upload/asset.jsx';
import UploadAndDisplayImage from '../../components/upload/displayImage.jsx';
import { useState } from 'react';
import React from 'react';

import {
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Link as ChakraLink, 
  Container } from "@chakra-ui/react";
import Link from 'next/link';
import { useDisclosure } from '@chakra-ui/react'

function Assets(props) {

    const [message, setMessage] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const assets = [
      {
        id: "01",
        name: "first name",
        url: "https://media.istockphoto.com/photos/monkey-theatre-thailand-picture-id458114853?k=20&m=458114853&s=612x612&w=0&h=sUKBhhDrjp6z4mquT8SIqQqwWeb8fkHcfFXiNdV5a_A=",
        user: "01",
      },
      {
        id: "02",
        name: "second name",
        url: "https://i.natgeofe.com/n/82fddbcc-4cbb-4373-bf72-dbc30068be60/drill-monkey-01.jpg",
        user: "01",
      },
      {
        id: "03",
        name: "second name",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg",
        user: "01",
      },
      {
        id: "04",
        name: "second name",
        url: "https://cdn.mos.cms.futurecdn.net/dkwpRhNxxuNjekzGDyUYPf.jpg",
        user: "45,34$",
      },
      {
        id: "05",
        name: "second name",
        url: "https://i.natgeofe.com/n/db72a497-3194-4832-9034-50b94b6f5351/86716_4x3.jpg",
        user: "45,34$",
      },
    ]
   


    return (
      <div className="upload-main">
        <>
      <Button onClick={onOpen} float={"right"} margin={2}>Create asset</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Asset</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UploadAndDisplayImage></UploadAndDisplayImage>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
      <SimpleGrid minChildWidth="400px" spacing={5}>
      {assets.map((asset)=>      
          <Container key={asset.id}>
            <Link href={`/assets/${asset.id}`} passHref>
            <ChakraLink  >
            <Asset  asset={asset} />
          </ChakraLink>
          </Link>
          </Container>
          
      )}
      </SimpleGrid>
    </div>
    )
}

export default Assets;