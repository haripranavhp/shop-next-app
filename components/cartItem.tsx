import Image from "next/image";
import React from "react";
import { CartAction, CartModel } from "../models/model";
import { formatter } from "../utils/helper";

interface cartProps extends CartModel {
	updateQuantity: (id: number, action: CartAction) => void;
}

const CartItem: React.FC<cartProps> = (props) => {
	const { id, image: src, price, title, quantity, updateQuantity } = props;

	return (
		<div className="flex gap-2 max-full mr-2 p-2 border-2 rounded-sm shadow-md lg:max-w-sm">
			<Image
				loader={() => src}
				src={src}
				alt="bag"
				width="60"
				height="150"
				className="object-contain self-center"
			/>
			<div className="flex flex-col justify-evenly w-full">
				<p className="font-medium">{title}</p>
				<div className="flex justify-between items-center">
					<span className="text-base">{formatter.format(price)}</span>
					<span className="text-sm mr-4">quantity: {quantity}</span>
				</div>
				<p className="">Total: {formatter.format(price * quantity)}</p>
				<button onClick={() => updateQuantity(id, CartAction.ADD)}>
					+
				</button>
				<button onClick={() => updateQuantity(id, CartAction.REMOVE)}>
					-
				</button>
			</div>
		</div>
	);
};

export default React.memo(CartItem);
