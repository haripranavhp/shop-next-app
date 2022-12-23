import Link from "next/link";
import React, { useContext } from "react";
import { cartType } from "../models/model";
import CartIcon from "../public/icons/Cart";
import { CartContext } from "../store/cartContext";

const Navbar: React.FC = () => {
	const cartCtx = useContext(CartContext);

	const cart: cartType[] | undefined = cartCtx?.cart;
	const totalItems = cart?.reduce(
		(acc: number, item: cartType) => acc + item.quantity,
		0
	);

	return (
		<nav className="h-16 bg-slate-300">
			<ul className="flex items-center justify-between">
				<li className="p-5 ml-3 underline text-lg">
					<Link href="/">Shop</Link>
				</li>
				<li className="p-5 mr-3 text-lg">
					<Link
						href="/cart"
						className="flex gap-1 justify-center items-center py-1 px-3 bg-purple-300 rounded-md hover:bg-purple-400 border border-purple-400">
						<CartIcon />
						<span className="px-1">{totalItems}</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
