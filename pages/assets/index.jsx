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
import { useAuth } from "../../context/AuthContext";
import Router from 'next/router';

function Assets(props) {
    const {isAuthenticated} = useAuth();

    const [message, setMessage] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const [assetName, setAssetName] = useState(null);
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [imageUrl, setImageUrl]=useState(null);

    useEffect(()=>{
      if(image==null) return;
      var newImageURL=URL.createObjectURL(image);
      var reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        setImageBase64(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      setImageUrl(newImageURL);
    }, [image]);

    async function handleCreate(){
      try{
          const create = await UploadApi.postAsset(imageBase64,assetName);
          console.log(create)
          if(create){
            Router.push('/assets/'+create._id);
          }
      }catch(error){
        setMessage("Could not contact with the server");
      }
    }

    function onImageChange(e){
      setImage(e.target.files[0])
    }

    const [assets,setAssets] = useState([]);

    function onAlertClose() {
      setMessage(null);
    } 

    useEffect(()=> {
      async function getAssets(){
        if(isAuthenticated || localStorage.getItem("user")!=undefined){
          try{
            const assets = await UploadApi.getAllAssets();
            setAssets(assets);
          }catch(error){
            console.log(error);
            setMessage("Could not contact with the server");
          }
        }else{
          Router.push('/');
        }
      }
      getAssets();
    },[isAuthenticated])

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
            <b>Name:</b> <input type="text" style={{color:"black"}} defaultValue="" onChange={event => setAssetName(event.target.value)} required/>
            <input type="file" accept='image/*' onChange={onImageChange} required/>
            <img src={imageUrl} required alt="Image upload"/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3}  onClick={handleCreate} disabled={imageUrl==null || assetName==null}>
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