import {
  Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react';
import Head from "next/head";
import Router from 'next/router';
import { useEffect, useState } from "react";
import BuyApi from '../components/buy/BuyApi.js';

export default function Sales() {
  const today = new Date();
  const [purchases, setPurchases] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');
  const [lte, setLte] = useState('');
  const [gte, setGte] = useState('');

  async function updatePurchases() {
    setPurchases(null);

    let loadedPurchases;
    try {
      loadedPurchases = await BuyApi.getAllPurchases({
        before: before ? before + 'T00:00:00.000Z' : null,
        after: after ? after + 'T00:00:00.000Z' : null,
        amountGte: gte,
        amountLte: lte,
        state: "Pending",
        seller: JSON.parse(localStorage.getItem("user")).id
      });
    } catch (error) {
      console.log(error);
    }

    setPurchases(loadedPurchases || []);
  }

  function onSearch() {
    updatePurchases();
    onClose();
  }

  async function onAccept(purchaseId) {
    if (confirm("Do you want to accept the purchase?")) {
      try {
        await BuyApi.accceptPurchase(purchaseId);
        updatePurchases();
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function onDelete(purchaseId) {
    if (confirm("Do you want to reject the purchase?")) {
      try {
        await BuyApi.deletePurchase(purchaseId);
        updatePurchases();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user"))
      updatePurchases();
    else
      Router.push('/');
  }, []);

  return <>
    <Head>
      <title>Pending | NFTs Market</title>
    </Head>
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter purchases</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel htmlFor='before'>Before</FormLabel>
              <Input id='before' type='date' max={new Intl.DateTimeFormat('en-CA').format(today)} value={before} onChange={e => setBefore(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='after'>After</FormLabel>
              <Input id='after' type='date' max={new Intl.DateTimeFormat('en-CA').format(today)} value={after} onChange={e => setAfter(e.target.value)} />
            </FormControl>
            <FormControl isInvalid={parseFloat(lte) < 0}>
              <FormLabel htmlFor='lte'>Cost lower than or equal to</FormLabel>
              <NumberInput id='lte' min="0" precision="2" value={lte} onChange={e => setLte(e)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>Must be greater than 0.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={parseFloat(gte) < 0}>
              <FormLabel htmlFor='gte'>Cost greater than or equal to</FormLabel>
              <NumberInput id='gte' min="0" precision="2" value={gte} onChange={e => setGte(e)} >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>Must be greater than 0.</FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose} mr={3}>Close</Button>
          <Button colorScheme='blue' onClick={onSearch}>
            Search
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>


    <Container maxW='container.xl' mt={16} align='center'>
      <Heading textAlign="center" size="lg" mb={3} fontWeight="extrabold">
        Pending sales
      </Heading>
      <Button colorScheme='orange' onClick={onOpen}>Filter</Button>
      <Table size='md' mt={8}>
        <Thead>
          <Tr>
            <Th>Asset</Th>
            <Th>Buyer</Th>
            <Th isNumeric>Amount</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th> </Th>
            <Th> </Th>
          </Tr>
        </Thead>

        <Tbody>
          {
            purchases && purchases.length > 0 ?
              purchases.map(purchase => {
                return <Tr key={purchase.id}>
                  <Td><Link href={`/assets/${encodeURIComponent(purchase.productId)}`}><Image boxSize='120px' borderRadius='full' src={purchase.imageUrl} alt='Image' /></Link></Td>
                  <Td>{purchase.buyerId}</Td>
                  <Td isNumeric>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(purchase.amount)}</Td>
                  <Td>{new Intl.DateTimeFormat('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(purchase.createdAt)}</Td>
                  <Td style={{ 'font-weight': purchase.state == 'Pending' ? 'bold' : 'normal' }}>{purchase.state}</Td>
                  <Td><Button colorScheme='green' size="sm" onClick={() => onAccept(purchase.id)}>Accept</Button></Td>
                  <Td><Button colorScheme='red' size="sm" onClick={() => onDelete(purchase.id)}>Reject</Button></Td>
                </Tr>
              }) :
              <Tr>
                <Td colspan="7" style={{ 'text-align': 'center', 'font-style': 'italic' }}>{purchases ? 'No purchases found.' : 'Loading...'}</Td>
              </Tr>
          }
        </Tbody>
      </Table>
    </Container >
  </>;
}
