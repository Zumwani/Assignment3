export interface Product extends CreateProduct {
    articleNumber: string,
}

export interface CreateProduct {
    name: string;
    imageName: string;
    rating: number;
    category: string;
    description?: string;
    price: number;
    tags?: string|undefined;
}

export const DefaultCreateProduct = () => {
    return { name: "test", imageName: "test", rating: 4, category: "test", description: "test", price: 10, tags: "" };
}
