import { Product } from "./Product";

export interface CartItem {
    articleNumber: string,
    product: Product,
    quantity: number
}