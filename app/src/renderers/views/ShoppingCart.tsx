import React from 'react'
import { NavLink } from 'react-router-dom';
import { formatCurrency } from '../../utility/CurrencyUtility';
import { useShoppingCart } from '../../utility/ShoppingCartUtility'
import { CartItem } from '../../models/CartItem';
import ShoppingCartItem from '../components/Sidebar/ShoppingCartItem';

const ShoppingCartView: React.FC = () => {

    const cart = useShoppingCart();
    if (cart == null)
        return <></>;

    return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="shopping-cart" aria-labelledby="shopping-cart">
        <div className="offcanvas-header">
            <h5 id="shopping-cart-label"><i className='fa-regular fa-shopping-bag me-3'></i>Your shopping cart</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            
            <div className='scrollable flex-grow-1'>
            { 
                cart.cartItems.length === 0
                ? <p className='ms-5 mb-2'>No items in cart.</p>
                : cart.cartItems.map((item:CartItem) => (<ShoppingCartItem key={item._id} item={item}/>)) 
            }
            </div>

            <div className='position-relative flex-grow-0 flex-shrink-0 mb-2'>
                <p className='total-price'><b>{ "Price total: " + formatCurrency(cart.cartItems.reduce((partialSum:number, item:CartItem) => partialSum + (item.product.price * item.quantity), 0))}</b></p>
                <button className='checkout'>Checkout</button>
            </div>

            <div className='d-lg-none nav mb-4 flex-grow-0 flex-shrink-0'>
                <div className={"d-flex flex-column"}>
                    <NavLink end to="/" className="main-link">Home</NavLink>
                    <NavLink to="/categories" className="main-link">Categories</NavLink>
                    <NavLink to="/product" className="main-link">Products</NavLink>
                    <NavLink end to="/contact" className="main-link">Contact</NavLink>
                    <NavLink end to="/search">Search</NavLink>
                    <NavLink end to="/compare">Compare</NavLink>
                    <NavLink end to="/wishlist"><p /* badge={1} */>Wishlist</p></NavLink>
                </div>
            </div>

        </div>
    </div>
    )

}

export default ShoppingCartView