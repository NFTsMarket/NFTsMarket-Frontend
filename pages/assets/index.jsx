import Asset from '../../components/upload/asset.jsx';
import UploadAndDisplayImage from '../../components/upload/displayImage.jsx';
import { useState, useEffect } from 'react';
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
import UploadApi from '../../components/upload/UploadApi.js';
import Alert from '../../components/upload/Alert.js';

function Assets(props) {

    const [message, setMessage] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const [assets,setAssets] = useState([]);

    function onAlertClose() {
      setMessage(null);
    } 

    useEffect(()=> {
      async function getAssets(){
        try{
          const assets = await UploadApi.getAllAssets();
          setAssets(assets);
        }catch(error){
          console.log(error);
          setMessage("Could not contact with the server");
        }
      }

      getAssets();
    },[])

    return (
      <div className="upload-main">
        <>
      <Button onClick={onOpen} float={"right"} margin={2}>Create asset</Button>
      <Alert message={message} onClose={onAlertClose}/>
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
          <Container key={asset._id}>
            <Link href={`/assets/${asset._id}`} passHref>
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