import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

const graphQLClient = new ApolloClient({
  uri: "https://api-gateway-bujosa.cloud.okteto.net/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={graphQLClient}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
