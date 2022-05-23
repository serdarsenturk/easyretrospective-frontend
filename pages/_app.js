import Head from "next/head";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import initAuth from '../utils/initAuth';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";


initAuth()

export default function Myapp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Easyretrospective</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>

    <link rel="icon" href="favicon.ico" />
    <link rel="shortcut icon" href="favicon.ico" />

    <Header />
    <Component {...pageProps} />
    <Footer />
    </>
  );
}