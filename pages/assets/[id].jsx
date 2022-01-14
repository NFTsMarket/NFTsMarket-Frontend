import Asset from '../../components/upload/asset.jsx';
import { useState, useEffect } from 'react';
import { Text, SimpleGrid, Link, Button, Container } from "@chakra-ui/react";
import {Link as ReachLink} from 'next/link';
import { useRouter } from 'next/router'
import UploadApi from '../../components/upload/UploadApi.js';

function ShowAsset(props) {
    const [message, setMessage] = useState(null);

    const [asset,setAsset] = useState(null);

    const router = useRouter();
    const { id } = router.query?router.query:undefined;

    useEffect(()=> {
      async function getAsset(){
        try{
          if(id!=undefined){
            const asset = await UploadApi.getAsset(id);
            setAsset(asset);
          }
        }catch(error){
          setMessage("Could not contact with the server");
        }
      }

      getAsset();
    },[router.query, id])
    
 return <div className="upload-show">
 <SimpleGrid columns={3}>
    <Asset asset={asset}/>
    
    <Text py={12} width={700} style={{display:'block', verticalAlign: 'middle', marginTop: "25%"}} > <b>URL:</b> <Link as= {ReachLink} href={`${asset?.image?.baseUrl}`} isExternal>
    Image Link
    </Link>
    <br/>
    <b>User:</b> {asset?.user?.name}
    <br/>
    <b>Created at:</b> {asset?.createdAt}
    <br/>
    <b>Updated at:</b> {asset?.updatedAt}
    <br/>
    <br/>
    <Button colorScheme='red' style={{display: "block", marginLeft: "auto", marginRight: "auto"}}>Delete asset</Button>
    </Text>
    
 </SimpleGrid>
</div>;
}

export default ShowAsset;