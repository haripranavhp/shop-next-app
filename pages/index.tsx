import Head from "next/head";
import Products from "../components/products";
import { ProductModel } from "../models/model";

export default function Home(props: { allProducts: ProductModel[] }) {
	return (
		<>
			<Head>
				<title>Shop App</title>
			</Head>
			<Products products={props.allProducts} />
		</>
	);
}

export async function getStaticProps() {
	const allProducts = await fetch("https://fakestoreapi.com/products").then(
		(res) => res.json()
	);
	return {
		props: {
			allProducts,
		},
		revalidate: 3600,
	};
}
