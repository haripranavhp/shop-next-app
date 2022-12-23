import React, { createContext, useState } from "react";
import { cartType, contextType, propsType, CartUpdate } from "../models/model";

export const CartContext = createContext<contextType | null>({
	cart: [],
	addToCart: (id: number) => {},
});

export const CartContextProvider = (props: propsType) => {
	const { children } = props;

	const [cart, setCart] = useState<cartType[]>([]);

	const updateItemInCart = (operation: CartUpdate, id: number) => {
		const cartItemIndex = cart.findIndex((item) => item.id === id);
		const countOfCartItem = cart[cartItemIndex]?.quantity;

		setCart((prevCartItems) => {
			const items = [...prevCartItems];
			if (operation === CartUpdate.ADD) {
				items[cartItemIndex].quantity = countOfCartItem + 1;
			}
			if (operation === CartUpdate.REMOVE) {
				items[cartItemIndex].quantity = countOfCartItem - 1;
			}
			return items;
		});
	};

	const addToCart = (id: number) => {
		let isItemNewToCart = true;

		if (cart?.find((ele) => ele.id === id)) {
			isItemNewToCart = false;
		}
		if (isItemNewToCart) {
			setCart((prevCartItems) => [
				...prevCartItems,
				{ id: id, quantity: 1 },
			]);
		} else {
			updateItemInCart(CartUpdate.ADD, id);
		}
	};

	const removeFromCart = (id: number) => {
		const item = cart?.find((item) => item.id === id);
		const countOfItemInCart = item?.quantity;

		if (countOfItemInCart === 1) {
			setCart((prevCartItems) =>
				prevCartItems.filter((item) => item?.id !== id)
			);
		}
		if (countOfItemInCart && countOfItemInCart > 1) {
			updateItemInCart(CartUpdate.REMOVE, id);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};
