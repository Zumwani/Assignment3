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
    tag?: string|undefined;
}

export const DefaultCreateProduct = (): CreateProduct => {
    return { name: "test", imageName: "test", rating: 4, category: "test", description: "test", price: 10, tag: "" };
}
