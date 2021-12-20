import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import { GraphQLProvider } from "../context/ApolloContext";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GraphQLProvider>
      <AuthProvider>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AuthProvider>
    </GraphQLProvider>
  );
}

export default MyApp;
