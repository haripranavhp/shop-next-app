export interface ProductModel {
	id: number;
	title: string;
	price: number;
	image: string;
}
export interface CartModel extends ProductModel {
	quantity: number;
}
export interface cartType {
	id: number;
	quantity: number;
}

export interface contextType {
	cart: cartType[];
	addToCart: (id: number) => void;
	removeFromCart: (id: number) => void;
}

export interface propsType {
	children: JSX.Element | JSX.Element[];
}

export enum CartAction {
	ADD,
	REMOVE,
}
