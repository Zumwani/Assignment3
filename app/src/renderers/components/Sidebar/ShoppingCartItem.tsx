import React from 'react'
import { NavLink } from 'react-router-dom';
import { CartItem } from '../../../models/CartItem';
import { formatCurrency } from '../../../utility/CurrencyUtility';
import { productURL } from '../../../utility/ProductUtility';
import { useShoppingCart } from '../../../utility/ShoppingCartUtility'
import UpDown from './../UpDown';

type Param = {
    key: string,
    item: CartItem
}

const ShoppingCartItem: React.FC<Param> = ({ item }) => {
    
    const shoppingCart = useShoppingCart();
    if (shoppingCart === null || item === null)
        throw new Error("Shopping cart is not initialized or item is null.");

    const { incrementQuantity, decrementQuantity, removeItem } = shoppingCart;
    
    return (
        <div className='shopping-cart-item d-flex flex-row'>
            <div className='item-image'>
                <NavLink to={productURL(item.product) ?? ""}>
                    <img src={item.product.imageName ?? ""} alt={item.product.name}/>
                </NavLink>
            </div>
            <div className='item-info w-100'>
                <NavLink to={productURL(item.product) ?? ""}>
                    <p>{item.product.name}</p>
                </NavLink>
                <UpDown count={item.quantity} onIncrement={() => incrementQuantity(item)} onDecrement={() => decrementQuantity(item)}/>
            </div>
            <div className='price'>
                <p>{ formatCurrency(item.product.price * item.quantity)}</p>
                <button className='fa-regular fa-trash remove-button' onClick={() => removeItem(item)}></button>
            </div>
        </div>
    )

}

export default ShoppingCartItem