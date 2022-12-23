import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { CartContextProvider } from "../store/cartContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartContextProvider>
            <Navbar />
            <Component {...pageProps} />
        </CartContextProvider>
    );
}
