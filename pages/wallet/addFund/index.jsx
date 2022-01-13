import Fund from '../../../components/wallet/addFund.jsx';
import { useState } from 'react';
import { Center, VStack, Heading, Text, SimpleGrid, Link, Button, Container } from "@chakra-ui/react";
import { Link as ReachLink } from 'next/link';

function MyFunds(props) {
    const [message, setMessage] = useState(null);
    const timestamp = Date.now();
    const wallet =
    {
        user: "Gideon",
        funds: 237.3,
        lastTransactions: [-10.2, -48, 27, 10.2],
        deleted: false,
        created_at: timestamp,
        updated_at: timestamp
    }
    const transactionsCorrected = wallet.lastTransactions.reverse();
    wallet.lastTransactions = transactionsCorrected;


    return <div className="my-wallet">
        <Center>
            <VStack py={8} spacing={2} textAlign="center">
                <Heading as="h1" fontSize="4xl">
                    My Wallet
                </Heading>
            </VStack>
        </Center>
            <Fund wallet={wallet} />
    </div>;
}

export default MyFunds;