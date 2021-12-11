import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import "../styles/catalogo.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
