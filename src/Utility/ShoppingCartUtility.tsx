import React, { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
// import ShoppingCart from "../views/ShoppingCartView";

const ShoppingCartContext = createContext(null);

export const useShoppingCart = () =>
    useContext(ShoppingCartContext);

type Param = {
    children: ReactNode
}

export const ShoppingCartProvider: React.FC<Param> = ({ children }) => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems?.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

    const getItemQuantity = (articleNumber: string) =>
        cartItems.find(item => item.articleNumber === articleNumber)?.quantity || 0;

    const decrementQuantity = (cartItem: Product|CartItem, by = 1) => incrementQuantity(cartItem, -by);
    const incrementQuantity = (cartItem: Product|CartItem, by = 1) => {
        
        if (cartItem == null || cartItem.articleNumber == null)
            return;
        
        let { articleNumber } = cartItem;
        let product = cartItem as Product ?? (cartItem as CartItem).product;

        if (getItemQuantity(product.articleNumber) + by < 1)
            removeItem(product.articleNumber);
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

    const removeItem = (articleNumber: string) =>
        setCartItems(items => items.filter(item => item.articleNumber !== articleNumber));

    const toCartItem = (product: Product) =>
        ({ articleNumber: product.articleNumber, product: product, quantity: 1 });

    return (
        <ShoppingCartContext.Provider value={{ cartItems, cartQuantity, getItemQuantity, incrementQuantity, decrementQuantity, removeItem, toCartItem } as any}>
            {children}
            {/* <ShoppingCart/> */}
        </ShoppingCartContext.Provider>
    )
    
}