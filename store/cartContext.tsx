import React, { createContext, useState } from "react";
import { cartType, contextType, propsType } from "../models/model";

export const CartContext = createContext<contextType | null>({
    cart: [],
    updateCart: (id: number) => {},
});

export const CartContextProvider = (props: propsType) => {
    const { children } = props;

    const [cart, setCart] = useState<cartType[]>([]);

    const updateCart = (id: number) => {
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
            const cartItemIndex = cart.findIndex((item) => item.id === id);
            const countOfCartItem = cart[cartItemIndex]?.quantity;

            setCart((prevCartItems) => {
                const items = [...prevCartItems];
                items[cartItemIndex].quantity = countOfCartItem + 1;
                return items;
            });
        }
    };
    return (
        <CartContext.Provider
            value={{
                cart,
                updateCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
