import React, { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import ShoppingCart from "../views/ShoppingCart";

interface ShoppingCartContext {
    cartItems: CartItem[], 
    cartQuantity: number, 
    getItemQuantity: (product:Product) => number, 
    incrementQuantity: (item: Product|CartItem) => void, 
    decrementQuantity: (item: Product|CartItem) => void, 
    removeItem: (item: Product|CartItem) => void, 
    toCartItem: (product:Product) => CartItem
}

const ShoppingCartContext = createContext<ShoppingCartContext | null>(null);

export const useShoppingCart = () =>
    useContext(ShoppingCartContext);

type Param = {
    children: ReactNode
}

export const ShoppingCartProvider: React.FC<Param> = ({children}) => {
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems?.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

    const getItemQuantity = (product: Product) =>
        cartItems.find(item => item.articleNumber === product.articleNumber)?.quantity || 0;

    const decrementQuantity = (item: CartItem|Product, by = 1) => incrementQuantity(item, -by);
    const incrementQuantity = (item: CartItem|Product, by = 1) => {
        
        let product = item as Product ?? (item as CartItem)?.product ?? null;
        if (product == null)
            throw "Cannot increment since product is null";

        let { articleNumber } = product;

        if (getItemQuantity(product) + by < 1)
            removeItem(product);
        else
            setCartItems(items => {
                
                if (items.find(item => item.articleNumber === articleNumber) == null)
                    return [...items, { articleNumber, product, quantity: by }];
                else
                    return items.map(item => 
                        item.articleNumber === articleNumber && item.quantity + by >= 1
                        ? {...item, quantity: item.quantity + by}
                        : item);

            });

    }

    const removeItem = (product: Product|CartItem) =>
        setCartItems(items => items.filter(item => item.articleNumber !== product.articleNumber));

    const toCartItem = (product: Product) =>
        ({ articleNumber: product.articleNumber, product: product, quantity: 1 });

    return (
        <ShoppingCartContext.Provider value={{ cartItems, cartQuantity, getItemQuantity, incrementQuantity, decrementQuantity, removeItem, toCartItem }}>
            {children}
            <ShoppingCart/>
        </ShoppingCartContext.Provider>
    )
    
}