import React, { useMemo, useState } from "react";
import Product from "./product";
import { ProductModel } from "../models/model";

const Products: React.FC<{ products: ProductModel[] }> = (props) => {
	const { products } = props;
	const [input, setInput] = useState<string>("");

	const filteredProducts = useMemo(() => {
		return products.filter((val) =>
			val?.title?.toLowerCase().includes(input.toLowerCase())
		);
	}, [input, products]);

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	return (
		<section className="flex flex-col">
			<input
				type="text"
				value={input}
				placeholder="Search..."
				onChange={inputChangeHandler}
				className="self-center my-4 p-1 rounded-lg"
			/>
			<div className="flex gap-4 flex-wrap justify-center mb-10">
				{filteredProducts.map((prod) => (
					<Product
						key={prod.id}
						id={prod.id}
						title={prod.title}
						image={prod.image}
						price={prod.price}
					/>
				))}
			</div>
		</section>
	);
};

export default Products;
