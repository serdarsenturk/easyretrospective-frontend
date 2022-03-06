import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import Header from "./layouts/header";
import Footer from "./layouts/footer";

export default function Myapp({ Component, pageProps }) {
  return (
    <>
      <div>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </>
  );
}
