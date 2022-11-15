export interface ShoppingCart {
    increment: (articleNumber:string) => void,
    decrement: (articleNumber:string) => void,
    remove: (articleNumber:string) => void,
    totalAmount: () => number,
    totalQuantity: () => number
}