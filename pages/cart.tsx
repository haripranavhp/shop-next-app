import React, { useCallback, useContext, useEffect, useState } from "react";
import CartItem from "../components/cartItem";
import { CartAction, CartModel } from "../models/model";
import { CartContext } from "../store/cartContext";
import { formatter } from "../utils/helper";

const Cart: React.FC = () => {
	const { cart, addToCart, removeFromCart } = useContext(CartContext);

	const [cartItems, setCartItems] = useState<CartModel[]>([]);

	const getCartDetails = async () => {
		const cartItemsPromises = cart.map(({ id }) =>
			fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
				res.json()
			)
		);

		const cartDetails = await Promise.all<Promise<CartModel>[]>(
			cartItemsPromises
		);
		setCartItems(cartDetails);
	};
	const updateQuantityHandler = useCallback(
		(id: number, action: CartAction) => {
			if (action === CartAction.ADD) {
				addToCart(id);
			} else if (action === CartAction.REMOVE) {
				removeFromCart(id);
			}
		},
		[]
	);
	useEffect(() => {
		getCartDetails();
	}, []);

	const totalCost = React.useMemo(() => {
		let total = 0;
		for (let i = 0; i < cartItems.length; i++) {
			total += cartItems[i].price * cart[i].quantity;
		}
		return total;
	}, [cartItems, cart]);

	return cartItems.length === 0 ? (
		<p className="text-center font-extrabold">Loading ...</p>
	) : (
		<section className="flex flex-col justify-around lg:flex-row">
			<div className="flex flex-col gap-3 mt-4 ml-4">
				{cartItems.map((item, index) => (
					<CartItem
						key={item.id}
						id={item.id}
						title={item.title}
						price={item.price}
						image={item.image}
						quantity={cart[index].quantity}
						updateQuantity={updateQuantityHandler}
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
