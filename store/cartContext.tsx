import React, { createContext, useState } from "react";
import { cartType, contextType, propsType, CartUpdate } from "../models/model";

export const CartContext = createContext<contextType | null>({
	cart: [],
	addToCart: (id: number) => {},
	removeFromCart: (id: number) => {},
});

export const CartContextProvider = (props: propsType) => {
	const { children } = props;

	const [cart, setCart] = useState<cartType[]>([]);

	const updateItemInCart = (operation: CartUpdate, id: number) => {
		setCart((prevCartItems) => {
			const items = [...prevCartItems];
			const cartItemIndex = items.findIndex((item) => item.id === id);

			if (operation === CartUpdate.ADD) {
				items[cartItemIndex].quantity += 1;
			} else if (operation === CartUpdate.REMOVE) {
				items[cartItemIndex].quantity -= 1;
			}
			return items;
		});
	};

	const addToCart = (id: number) => {
		const item = cart.find((ele) => ele.id === id);
		if (!item) {
			setCart((prevCartItems) => [
				...prevCartItems,
				{ id: id, quantity: 1 },
			]);
		} else {
			updateItemInCart(CartUpdate.ADD, id);
		}
	};

	const removeFromCart = (id: number) => {
		const item = cart.find((item) => item.id === id);
		if (!item) return;

		const countOfItemInCart = item.quantity;

		if (countOfItemInCart === 1) {
			setCart((prevCartItems) =>
				prevCartItems.filter((item) => item?.id !== id)
			);
		} else if (countOfItemInCart > 1) {
			updateItemInCart(CartUpdate.REMOVE, id);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};
