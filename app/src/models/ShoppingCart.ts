export interface ShoppingCart {
    increment: (_id:string) => void,
    decrement: (_id:string) => void,
    remove: (_id:string) => void,
    totalAmount: () => number,
    totalQuantity: () => number
}