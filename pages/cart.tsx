import { useContext, useEffect, useState } from "react";
import CartItem from "../components/cartItem";
import { ProductModel } from "../models/model";
import { CartContext } from "../store/cartContext";
import { formatter } from "../utils/helper";

const Cart: React.FC = () => {
	const cartCtx = useContext(CartContext);

	const [cartItems, setCartItems] = useState<ProductModel[]>([]);

	const getCartDetails = async () => {
		const cartItemsIds = cartCtx?.cart.map((item) => item.id);
		const cartItemsPromises = cartItemsIds?.map((id) =>
			fetch(`https://fakestoreapi.com/products/${id}`)
				.then((res) => res.json())
				.then((json) => json)
		);
		const cartDetails = await Promise.all<Promise<any>[] | any>(
			cartItemsPromises
		);

		setCartItems(cartDetails);
	};

	useEffect(() => {
		getCartDetails();
	}, []);

	let totalCost = 0;
	for (let i = 0; i < cartItems.length; i++) {
		totalCost = totalCost + cartItems[i].price * cartCtx!.cart[i].quantity;
	}

	return cartItems.length === 0 ? (
		<p className="text-center font-extrabold">Loading ...</p>
	) : (
		<section className="flex flex-col justify-around lg:flex-row">
			<div className="flex flex-col gap-3 mt-4 ml-4">
				{cartItems.map((item) => (
					<CartItem
						key={item.id}
						id={item.id}
						title={item.title}
						price={item.price}
						image={item.image}
					/>
				))}
			</div>
			<div className="m-16 border-4 max-w-2xl lg:w-full">
				<div className="flex justify-between items-center p-4 rounded-md border-2">
					<p className="font-bold">Sub Total</p>
					<p>{formatter.format(totalCost)}</p>
				</div>
				<div className="flex justify-between items-center p-4 rounded-md border-2">
					<p className="font-bold">Shipping</p>
					<p>Free</p>
				</div>
				<button className="bg-purple-300 hover:bg-purple-400 transition-all rounded-md w-full p-2 font-semibold">
					Checkout
				</button>
			</div>
		</section>
	);
};

export default Cart;
