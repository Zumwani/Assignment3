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

export const DefaultCreateProduct = () => {
    return { name: "test", imageName: "test", rating: 4, category: "test", description: "test", price: 10  };
}