import "../styles/global.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { NoSSR } from "../components/NoSSR";

function App({ Component, pageProps }: AppProps) {
  return (
    <NoSSR>
      <Head>
        <title>Parking Lot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Component {...pageProps} />
    </NoSSR>
  );
}

export default App;
