import Fund from '../../../components/wallet/addFund.jsx';
import { useState, useEffect } from 'react';
import { getWalletByUser } from '../../../components/wallet/walletService.js' 
import { Center, VStack, Heading, Text, SimpleGrid, Link, Button, Container } from "@chakra-ui/react";

function MyFunds(props) {
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
        {wallet && <Fund wallet={wallet} />}
    </div>;
}

export default MyFunds;