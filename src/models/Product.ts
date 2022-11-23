export interface Product {
    articleNumber: string,
    name: string,
    imageName: string,
    rating: number,
    category: string,
    description?: string,
    price: number
}

export interface CreateProduct {
    name: string,
    imageName: string,
    rating: number,
    category: string,
    description?: string,
    price: number
}