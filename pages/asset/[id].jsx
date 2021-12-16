import Asset from '../../components/upload/asset.jsx';
import { useState } from 'react';
import { Text, SimpleGrid, Link, Button, Container } from "@chakra-ui/react";
import {Link as ReachLink} from 'next/link';

function ShowAsset(props) {
    const [message, setMessage] = useState(null);
    const timestamp = Date.now();
    const asset = 
      {
        id: "01",
        name: "first name",
        url: "https://i.natgeofe.com/n/82fddbcc-4cbb-4373-bf72-dbc30068be60/drill-monkey-01.jpg",
        user: "01",
        created_at: timestamp,
        updated_at: timestamp
      }
    const user =
    {
        name: "MonkeMan"
    }
    
 return <div className="upload-show">
 <SimpleGrid columns={3}>
    <Asset asset={asset}/>
    
    <Text center py={12} width={700} style={{display:'block', verticalAlign: 'middle', marginTop: "25%"}} > <b>URL:</b> <Link as= {ReachLink} href={`${asset.url}`} isExternal>
    {asset.url}
    </Link>
    <br/>
    <b>User:</b> {user.name}
    <br/>
    <b>Created at:</b> {new Intl.DateTimeFormat('es-ES',{year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(user.created_at)}
    <br/>
    <b>Updated at:</b> {new Intl.DateTimeFormat('es-ES',{year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(user.updated_at)}
    <br/>
    <br/>
    <Button colorScheme='red' style={{display: "block", marginLeft: "auto", marginRight: "auto"}}>Delete asset</Button>
    </Text>
    
 </SimpleGrid>
</div>;
}

export default ShowAsset;