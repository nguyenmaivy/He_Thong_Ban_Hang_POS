// src/types/index.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
    note?: string;
}