import {
  Button, Container, FormControl, FormErrorMessage, FormLabel, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react';
import Head from "next/head";
import { useEffect, useState } from "react";
import BuyApi from '../components/buy/BuyApi.js';

export default function Purchases() {
  const today = new Date();
  const [purchases, setPurchases] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');
  const [lte, setLte] = useState('');
  const [gte, setGte] = useState('');
  const [state, setState] = useState('');

  async function updatePurchases() {
    setPurchases(null);

    let loadedPurchases;
    try {
      loadedPurchases = await BuyApi.getAllPurchases({
        before: before ? before + 'T00:00:00.000Z' : null,
        after: after ? after + 'T00:00:00.000Z' : null,
        amountGte: gte,
        amountLte: lte,
        state: state,
        buyer: JSON.parse(localStorage.getItem("user")).id
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

  useEffect(() => {
    updatePurchases();
  }, []);

  return <>
    <Head>
      <title>Purchases | NFTs Market</title>
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
            <FormControl>
              <FormLabel htmlFor='state'>State</FormLabel>
              <Select id='state' placeholder='---' value={state} onChange={e => setState(e.target.value)}>
                <option value='Pending'>Pending</option>
                <option value='Accepted'>Accepted</option>
              </Select>
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


    <Container maxW='container.md' mt={16} align='center'>
      <Button colorScheme='orange' onClick={onOpen}>Filter</Button>
      <Table size='sm' mt={8}>
        <Thead>
          <Tr>
            <Th>Asset</Th>
            <Th>Seller</Th>
            <Th isNumeric>Amount</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>

        <Tbody>
          {
            purchases && purchases.length > 0 ?
              purchases.map(purchase => {
                return <Tr key={purchase.id}>
                  <Td><Link href={`/assets/${encodeURIComponent(purchase.productId)}`}>{purchase.productId}</Link></Td>
                  <Td>{purchase.sellerId}</Td>
                  <Td isNumeric>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(purchase.amount)}</Td>
                  <Td>{new Intl.DateTimeFormat('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(purchase.createdAt)}</Td>
                  <Td style={{ 'font-weight': purchase.state == 'Pending' ? 'bold' : 'normal' }}>{purchase.state}</Td>
                </Tr>
              }) :
              <Tr>
                <Td colspan="5" style={{ 'text-align': 'center', 'font-style': 'italic' }}>{purchases ? 'No purchases found.' : 'Loading...'}</Td>
              </Tr>
          }
        </Tbody>
      </Table>
    </Container >
  </>;
}
