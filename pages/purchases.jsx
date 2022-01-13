import {
  Button, Container, FormControl, FormLabel, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react';
import Head from "next/head";
import { useState } from "react";

export default function Purchases() {
  const today = new Date();
  const purchases = [
    {
      "id": "string",
      "buyerId": "string",
      "sellerId": "string",
      "assetId": "string",
      "amount": 0,
      "state": "Pending",
      "createdAt": Date.now()
    },
    {
      "id": "string",
      "buyerId": "string",
      "sellerId": "string",
      "assetId": "string",
      "amount": 0,
      "state": "Pending",
      "createdAt": Date.now()
    },
    {
      "id": "string",
      "buyerId": "string",
      "sellerId": "string",
      "assetId": "string",
      "amount": 0,
      "state": "Pending",
      "createdAt": Date.now()
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');
  const [buyer, setBuyer] = useState('');
  const [seller, setSeller] = useState('');
  const [state, setState] = useState('');

  function onSearch() {
    onClose();
  }

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
              <FormLabel htmlFor='buyer'>Buyer</FormLabel>
              <Input id='buyer' type='text' value={buyer} onChange={e => setBuyer(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='seller'>Seller</FormLabel>
              <Input id='seller' type='text' value={seller} onChange={e => setSeller(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='state'>State</FormLabel>
              <Select id='state' placeholder='---' value={state} onChange={e => setState(e.target.value)}>
                <option value='Pending'>Pending</option>
                <option value='Accepted'>Accepted</option>
              </Select>
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
