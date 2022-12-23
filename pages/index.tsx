import Head from "next/head";
import Products from "../components/products";

export default function Home() {
    return (
        <>
            <Head>
                <title>Shop App</title>
            </Head>
            <Products />
        </>
    );
}
