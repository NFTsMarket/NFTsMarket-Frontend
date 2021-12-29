import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import { GraphQLProvider } from "../context/ApolloContext";
import { AuthProvider } from "../context/AuthContext";
import { ProductProvider } from "../context/ProductContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GraphQLProvider>
      <AuthProvider>
        <ProductProvider>
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </ProductProvider>
      </AuthProvider>
    </GraphQLProvider>
  );
}

export default MyApp;
