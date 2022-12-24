import Image from "next/image";
import { useContext, useMemo } from "react";
import { ProductModel } from "../models/model";
import { CartContext } from "../store/cartContext";
import { formatter } from "../utils/helper";

const CartItem: React.FC<ProductModel> = (props) => {
	const { id, image: src, price, title } = props;

	const cartCtx = useContext(CartContext);

	const cartItem = useMemo(() => {
		return cartCtx?.cart?.find((item) => item.id === id);
	}, [cartCtx?.cart, id]);

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
					<span className="text-sm mr-4">
						quantity: {cartItem!.quantity}
					</span>
				</div>
				<p className="">
					Total: {formatter.format(price * cartItem!.quantity)}
				</p>
			</div>
		</div>
	);
};

export default CartItem;
