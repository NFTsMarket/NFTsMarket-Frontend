import { ReactNode } from 'react';
import {
    Box,
    Container,
    Stack,
    HStack,
    Flex,
    Illustration,
    Heading,
    Text,
    StackDivider,
    VStack,
    useColorModeValue,
    List,
    Divider,
    ListItem,
    ListIcon,
    Button,
    SimpleGrid,
    Center,
} from '@chakra-ui/react';
import { useRouter } from 'next/router'
import { FaCheckCircle } from 'react-icons/fa';

export default function Wallet(props) {
    var fund = props.wallet.fund;
    const lastTransactions = props.wallet.lastTransactions;
    var temporalFund = [fund];
    const router = useRouter();

    for (var i = 0; i < Math.min(3, lastTransactions.length); i++) {
        if (lastTransactions[i] >= 0) {
            temporalFund = [...temporalFund, temporalFund[i] +- lastTransactions[i]];
        }
        else {
            temporalFund = [...temporalFund, temporalFund[i] - lastTransactions[i]];
        }
    }

return (
    <Box py={12}>

        <Stack
            direction={{ base: 'column', md: 'row' }}
            textAlign="center"
            justify="center"
            spacing='400'
            py={10}>
            <Box
                w={400}
                h={350}
                mb={4}
                bg='gray.200'
                shadow="base"
                borderWidth="3px"
                alignSelf={{ base: 'center', lg: 'flex-start' }}
                borderColor={useColorModeValue('black')}
                rounded='md'>
                <Box pt={10} px={12}>
                    <Text fontSize="4xl" fontWeight="900">
                        Current funds:
                    </Text>
                </Box>
                <VStack
                    bg={useColorModeValue('gray.200', 'gray.700')}
                    py={4}
                    borderBottomRadius={'xl'}>
                    <Text fontSize="4xl" fontWeight="900">
                        {fund}€
                    </Text>
                    <Box h="120" w="60%" pt={14}>
                        <Button h="full" w="full" colorScheme='blue' variant="solid" onClick={() => router.push('/wallet/addFund')}>
                            <Text fontSize="2xl">
                                Add funds
                            </Text>
                        </Button>
                    </Box>
                </VStack>
            </Box>
            <Box
                w={500}
                h={350}
                mb={4}
                borderWidth="0px"
                alignSelf={{ base: 'center', lg: 'flex-start' }}
                borderColor={useColorModeValue('white')}
                rounded='md'>
                <Box pt={10} px={12}>
                    <Text fontSize="4xl" fontWeight="900">
                        Recent Transactions:
                    </Text>
                </Box>
                <VStack
                    py={4}
                    borderBottomRadius={'xl'}
                    divider={
                        <StackDivider
                            borderColor={useColorModeValue('gray.500', 'gray.600')}
                        />
                    }>
                    {lastTransactions.map((transaction, index) =>
                    
                        <SimpleGrid columns={2} spacing={10} key={index}>
                            <Text fontSize="2xl" pr='10'>
                                {transaction.toFixed(2)}€
                            </Text>
                            <Text fontSize="2xl" pl='20'>
                                {temporalFund[index].toFixed(2)}€
                            </Text>
                        </SimpleGrid>,
                    )}
                    <Box h="120" w="35%" pt={14}>
                        <Button h="full" w="full" bg='black' color='white' variant='solid' >
                            <Text fontSize="2xl">
                                See more
                            </Text>
                        </Button>
                    </Box>
                </VStack>
            </Box>

        </Stack>

    </Box>

);
}