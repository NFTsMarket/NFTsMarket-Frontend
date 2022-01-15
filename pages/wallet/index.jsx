import Wallet from '../../components/wallet/wallet.jsx';
import { Center, VStack, Heading, Text, SimpleGrid, Link, Button, Container } from "@chakra-ui/react";
import { getWalletByUser } from '../../components/wallet/walletService.js' 
import { useState, useEffect } from 'react';

function MyWallet(props) {
    const [wallet, setWallet] = useState(null)

    useEffect(() => {
        async function getWallet() {
            let response = await getWalletByUser()
            response = await response.json()
            setWallet(response)
        }

        getWallet()
    }, [])

    return <div className="my-wallet">
        <Center>
            <VStack py={8} spacing={2} textAlign="center">
                <Heading as="h1" fontSize="4xl">
                    My Wallet
                </Heading>
            </VStack>
        </Center>
        {wallet && <Wallet wallet={wallet} />}
    </div>;
}

export default MyWallet;