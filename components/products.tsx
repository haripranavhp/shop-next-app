import React, { useEffect, useMemo, useState } from "react";
import Product from "./product";
import { ProductModel } from "../models/model";
import { getAllProducts } from "../service/api";

const Products: React.FC = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [input, setInput] = useState<string>("");

    const getProducts = async () => {
        try {
            const allProducts = await getAllProducts();
            setProducts(allProducts);
        } catch (e: any) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    let filteredProducts = products;

    useMemo(() => {
        filteredProducts = products.filter((val) =>
            val?.title?.toLowerCase().includes(input.toLowerCase())
        );
    }, [input]);

    return (
        <section className="flex flex-col">
            <input
                type="text"
                value={input}
                placeholder="Search..."
                onChange={(e) => {
                    setInput(e.target.value);
                }}
                className="self-center my-4 p-1 rounded-lg"
            />
            <div className="flex gap-4 flex-wrap justify-center">
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
