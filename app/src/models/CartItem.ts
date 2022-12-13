import { Product } from "./Product";

export interface CartItem {
    _id: string,
    product: Product,
    quantity: number
}