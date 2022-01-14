import {
  Button, Container, FormControl, FormLabel, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react';
import Head from "next/head";
import { useEffect, useState } from "react";
import BuyApi from '../components/buy/BuyApi.js';

export default function Purchases() {
  const today = new Date();
  const [purchases, setPurchases] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');
  const [lte, setLte] = useState('');
  const [gte, setGte] = useState('');
  const [state, setState] = useState('');

  async function updatePurchases() {
    let purchases;
    try {
      purchases = await BuyApi.getAllPurchases({
        before: before ? before + 'T00:00:00.000Z' : null,
        after: after ? after + 'T00:00:00.000Z' : null,
        amountGte: gte,
        amountLte: lte,
        buyer: JSON.parse(localStorage.getItem("user")).id
      });
    } catch (error) {
      console.log(error);
    }

    setPurchases(purchases || []);
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
            <FormControl>
              <FormLabel htmlFor='lte'>Cost lower than or equal to</FormLabel>
              <Input id='after' type='number' min='' step='0.01' value={lte} onChange={e => setLte(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='gte'>Cost greater than or equal to</FormLabel>
              <Input id='after' type='number' min='' step='0.01' value={gte} onChange={e => setGte(e.target.value)} />
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
          </Tr>
        </Thead>

        <Tbody>
          {
            purchases.map(purchase => {
              return <Tr key={purchase.id}>
                <Td><Link href={`/assets/${encodeURIComponent(purchase.assetId)}`}>{purchase.assetId}</Link></Td>
                <Td>{purchase.assetId}</Td>
                <Td isNumeric>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(purchase.amount)}</Td>
                <Td>{new Intl.DateTimeFormat('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(purchase.createdAt)}</Td>
              </Tr>
            })
          }
        </Tbody>
      </Table>
    </Container >
  </>;
}
