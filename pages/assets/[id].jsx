import Asset from '../../components/upload/asset.jsx';
import { useState, useEffect } from 'react';
import { Text, SimpleGrid, Link, Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  useDisclosure,} from "@chakra-ui/react";
import {Link as ReachLink} from 'next/link';
import { useRouter} from 'next/router';
import React from 'react';
import UploadApi from '../../components/upload/UploadApi.js';
import Router from 'next/router';
import { useAuth } from "../../context/AuthContext";

function ShowAsset(props) {
    const {isAuthenticated} = useAuth();
    const [message, setMessage] = useState(null);

    const [asset,setAsset] = useState(null);
    const [assetName, setAssetName] = useState(null);
    const [assetFile, setAssetFile] = useState(null);
    const [assetUser, setAssetUser] = useState(null);
    const [editMode,setEditMode] = useState(false);
    const router = useRouter();
    const { id } = router.query?router.query:undefined;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef()
    const finalRef = React.useRef()

    async function handleDelete(){
      try{
        if(id!=undefined){
          const deletedAsset = await UploadApi.deleteAsset(id);
        }
      }catch(error){
        setMessage("Could not contact with the server");
      }
    }

    async function handleUpdate(){
      try{
        if(id!=undefined){
          const update = await UploadApi.updateAsset(id,assetFile,assetName,assetUser);
          const asset = await UploadApi.getAsset(id);
          setAsset(asset);
          setEditMode(false);
        }
      }catch(error){
        setMessage("Could not contact with the server");
      }
    }
    function toggleEditMode(){
      setEditMode(!editMode)
    }
    useEffect(()=> {
      
      async function getAsset(){
        if(isAuthenticated || localStorage.getItem("user")!=undefined){
        try{
          if(id!=undefined){
            const asset = await UploadApi.getAsset(id);
            setAsset(asset);
            setAssetFile(asset.file);
            setAssetUser(asset.user.id);
          }
        }catch(error){
          setMessage("Could not contact with the server");
        }
      }else{
        Router.push('/');
      }
      }

      getAsset();
    },[router.query, id,isAuthenticated])
    
 return !editMode?(<div className="upload-show">
 <SimpleGrid columns={3}>
    <Asset asset={asset}/>
    
    <Text py={12} width={700} style={{display:'block', verticalAlign: 'middle', marginTop: "25%"}} > <b>URL:</b> <Link as= {ReachLink} href={`${asset?.image?.baseUrl}`} isExternal>
    Image Link
    </Link>
    <br/>
    <b>User:</b> {asset?.user?.name}
    <br/>
    <b>Name:</b> {asset?.name}
    <br/>
    <b>Created at:</b> {asset?.createdAt}
    <br/>
    <b>Updated at:</b> {asset?.updatedAt}
    <br/>
    <br/>
    <div className="buttons" style={{display: "inline", margin: "0 auto"}}>
    <Button onClick={onOpen} colorScheme='red'>Delete asset</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Asset</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Are you sure you want to delete this asset?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='purple' onClick={handleDelete} mr={3}>
              Yes
            </Button>
            <Button colorScheme='red' onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    <div className="buttonUpdate" style={{display: "inline",marginLeft: "10%"}}>
    <Button colorScheme='purple' onClick={toggleEditMode}>Update asset</Button>
    </div>
    </div>
    </Text>
    
 </SimpleGrid>
</div>):(<div className="upload-show">
 <SimpleGrid columns={3}>
    <Asset asset={asset}/>
    <form>
    <Text py={12} width={700} style={{display:'block', verticalAlign: 'middle', marginTop: "25%"}} > <b>URL:</b> <Link as= {ReachLink} href={`${asset?.image?.baseUrl}`} isExternal>
    Image Link
    </Link>
    <br/>
    <b>User:</b> {asset?.user?.name}
    <br/>
    <b>Name:</b> <input type="text" style={{color:"black"}} defaultValue={asset?.name} onChange={event => setAssetName(event.target.value)}/>
    <br/>
    <b>Created at:</b> {asset?.createdAt}
    <br/>
    <b>Updated at:</b> {asset?.updatedAt}
    <br/>
    <br/>
    <div className="buttons" style={{display: "inline", margin: "0 auto"}}>
    <Button colorScheme='red' onClick={toggleEditMode}>Cancel</Button>
    <div className="buttonUpdate" style={{display: "inline",marginLeft: "10%"}}>
    <Button colorScheme='purple' onClick={handleUpdate}>Save</Button>
    </div>
    </div>
    </Text>
    </form>
 </SimpleGrid>
</div>);
}

export default ShowAsset;