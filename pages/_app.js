import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import { Container } from "react-bootstrap";

export default function Myapp({ Component, pageProps }) {
  return (
    <>
        <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
        crossOrigin="anonymous">
        </link>
        
      <Container>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Container>
    </>
  );
}
