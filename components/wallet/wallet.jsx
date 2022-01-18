import {
    Box,
    Stack,
    Text,
    StackDivider,
    VStack,
    useColorModeValue,
    Button,
    SimpleGrid,
} from '@chakra-ui/react';
import { useRouter } from 'next/router'

export default function Wallet(props) {
    var fund = props.wallet.fund;
    const lastTransactions = props.wallet.lastTransactions;
    var temporalFund = [fund];
    const router = useRouter();
    
    const arrayInverse = lastTransactions.map(transaction => transaction).reverse();

    for (var i = 0; i < Math.min(3, lastTransactions.length); i++) {
        if (lastTransactions[i] >= 0) {
            temporalFund = [...temporalFund, temporalFund[i] - arrayInverse[i]];
        }
        else {
            temporalFund = [...temporalFund, temporalFund[i] + arrayInverse[i]];
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
                    {temporalFund.map((transaction, index) =>
                    
                        <SimpleGrid columns={2} spacing={10} key={index}>
                            <Text fontSize="2xl" pr='10'>
                                {arrayInverse[index]}€
                            </Text>
                            <Text fontSize="2xl" pl='20'>
                                {transaction}€   
                            </Text>
                        </SimpleGrid>,
                    )}
                </VStack>
            </Box>

        </Stack>

    </Box>

);
}