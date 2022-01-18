import { addFunds } from "./walletService"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {
    Box,
    Stack,
    InputGroup,
    InputRightAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    VStack,
    useColorModeValue,
    Button,
} from '@chakra-ui/react';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

export default function AddFund(props) {
    const router = useRouter();
    const [amount, setAmount] = useState(0)
    const currency = "EUR";
    const style = { "layout": "vertical" };

    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (<>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={amount <= 0}
                forceReRender={[amount, currency, style]}
                fundingSource={"paypal"}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        addFunds(amount, props.wallet._id).then((response) => {
                            router.reload()

                        }).catch((err) => {
                            console.log("ERROR", err);
                        });
                    });
                }}
            />
        </>
        );
    }

    var fund = props.wallet.fund;

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
                            € {fund}
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
                    bg='gray.200'
                    shadow="base"
                    borderWidth="3px"
                    alignSelf={{ base: 'center', lg: 'flex-start' }}
                    borderColor={useColorModeValue('black')}
                    rounded='md'>
                    <Box pt={10} px={12}>
                        <Text fontSize="4xl" fontWeight="900">
                            Amount to add:
                        </Text>
                    </Box>
                    <VStack
                        py={0}
                        borderBottomRadius={'xl'}>
                        <Box w="60%" pt={14}>
                            <InputGroup>
                                <NumberInput defaultValue={0} min={0} step={1.00} precision={2} bg="white" rounded='md' onChange={setAmount}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <InputRightAddon>
                                    <span>€</span>
                                </InputRightAddon>
                            </InputGroup>
                        </Box>
                        <Box h="120" w="60%" pt={14}>

                            <PayPalScriptProvider options={{ "client-id": "Ab34OfaRFegCTtPYoZqWC_x6nonl6pCi_JGr5YTuQw9G_EdeqxpbRr9XUf51U_YZkbqhgRGKOEDqX_7r", components: "buttons", currency: "EUR"}}>
                                <ButtonWrapper currency={currency} showSpinner={false} />
                            </PayPalScriptProvider>
                        </Box>
                    </VStack>
                </Box>

            </Stack>

        </Box>

    );
}