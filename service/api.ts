import { cartType } from "./../models/model";

export const getAllProducts = async () => {
    try {
        const allProducts = await fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => json);

        return allProducts;
    } catch (err: any) {
        console.error(err.message);
        throw err;
    }
};

export const getAllCartDetails = async (cart: cartType[]) => {
    try {
        const cartItemsIds = cart.map((item) => item.id);
        const cartItemsPromises = cartItemsIds?.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((res) => res.json())
                .then((json) => json)
        );
        return await Promise.all(cartItemsPromises);
    } catch (err: any) {
        console.error(err.message);
        throw err;
    }
};
