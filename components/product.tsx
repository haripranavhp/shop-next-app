import Image from "next/image";
import React, { useContext } from "react";
import { formatter } from "../utils/helper";
import { ProductModel } from "../models/model";
import { CartContext } from "../store/cartContext";

const Product: React.FC<ProductModel> = (props) => {
    const { id, image: src, price, title } = props;

    const cartCtx = useContext(CartContext);

    const addToCartHandler = () => {
        cartCtx?.updateCart(id);
    };
    return (
        <div className="w-64 border bottom-2 rounded-md shadow-md p-8 flex flex-col justify-between">
            <Image
                loader={() => src}
                src={src}
                alt="bag"
                width="120"
                height="275"
                className="object-contain self-center"
            />
            <div className="flex flex-col">
                <div className="h-28">
                    <p
                        className="text-lg font-bold leading-tight mt-3 text-center"
                        title={title}
                    >
                        {title.length > 84
                            ? title.substring(0, 84) + "..."
                            : title}
                    </p>
                </div>
                <div className="flex justify-between items-center mt-4 ">
                    <p className="text-purple-700 font-medium">
                        {formatter.format(price)}
                    </p>
                    <button
                        className="p-2 bg-purple-300 hover:bg-purple-400 font-medium rounded-md"
                        onClick={addToCartHandler}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Product;
