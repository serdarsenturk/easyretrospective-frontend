import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
config.autoAddCss = false; 

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
