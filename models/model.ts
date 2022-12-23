export interface ProductModel {
    id: number;
    title: string;
    price: number;
    image: string;
}

export interface cartType {
    id: number;
    quantity: number;
}

export interface contextType {
    cart: cartType[] | [];
    updateCart: (id: number) => void;
}

export interface propsType {
    children: JSX.Element | JSX.Element[];
}
