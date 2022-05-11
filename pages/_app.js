import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import { Container } from "react-bootstrap";
import initAuth from '../utils/initAuth'

initAuth()

export default function Myapp({ Component, pageProps }) {
  return (
    <>    
    <Container>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Container>
    </>
  );
}