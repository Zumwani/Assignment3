import React, { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import ShoppingCart from "../renderers/views/ShoppingCart";

interface ShoppingCartContext {
    cartItems: CartItem[], 
    cartQuantity: number, 
    getItemQuantity: (product:Product) => number, 
    incrementQuantity: (item: Product|CartItem) => void, 
    decrementQuantity: (item: Product|CartItem) => void, 
    removeItem: (item: Product|CartItem) => void, 
    toCartItem: (product:Product) => CartItem
}

const Context = createContext<ShoppingCartContext | null>(null);

export const useShoppingCart = () =>
    useContext(Context);

type Param = {
    children: ReactNode
}

export const ShoppingCartProvider: React.FC<Param> = ({children}) => {
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems?.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

    const getItemQuantity = (product: Product) =>
        cartItems.find(item => item._id === product._id)?.quantity || 0;

    const decrementQuantity = (item: CartItem|Product, by = 1) => incrementQuantity(item, -by);
    const incrementQuantity = (item: CartItem|Product, by = 1) => {
        
        let product = item as Product ?? (item as CartItem)?.product ?? null;
        if (product == null)
            return;

        let { _id } = product;

        if (getItemQuantity(product) + by < 1)
            removeItem(product);
        else
            setCartItems(items => {
                
                if (items.find(item => item._id === _id) == null)
                    return [...items, { _id, product, quantity: by }];
                else
                    return items.map(item => 
                        item._id === _id && item.quantity + by >= 1
                        ? {...item, quantity: item.quantity + by}
                        : item);

            });

    }

    const removeItem = (product: Product|CartItem) =>
        setCartItems(items => items.filter(item => item._id !== product._id));

    const toCartItem = (product: Product) =>
        ({ _id: product._id, product: product, quantity: 1 });

    return (
        <Context.Provider value={{ cartItems, cartQuantity, getItemQuantity, incrementQuantity, decrementQuantity, removeItem, toCartItem }}>
            {children}
            <ShoppingCart/>
        </Context.Provider>
    )
    
}