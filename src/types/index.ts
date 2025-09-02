export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    id_category: number;
}

export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
    note?: string;
}