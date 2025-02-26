import toast, {Toaster} from 'react-hot-toast';
import "../styles/globals.css";

import {TOKEN_ICO_Provider} from "../context/index";  
export default function App({ Component, pageProps }) {
  return (
    <>
      <TOKEN_ICO_Provider>
        <Component {...pageProps} />
        <Toaster />
      </TOKEN_ICO_Provider>

      <script src="assets/js/jquery-3.5.1.min.js"></script>
      <script src="assets/js/bootstrap.bundle.min.js"></script>
      <script src="assets/js/wow.min.js"></script>
      <script src="assets/js/appear.js"></script>
      <script src="assets/js/jquery.magnific-popup.min.js"></script>
      <script src="assets/js/metisMenu.min.js"></script>
      <script src="assets/js/jquery.marquee.min.js"></script>
      <script src="assets/js/parallax-scroll.js"></script>
      <script src="assets/js/countdown.js"></script>
      <script src="assets/js/easing.min.js"></script>
      <script src="assets/js/scrollspy.js"></script>
      <script src="assets/js/main.js"></script>
    </>
  );
}
