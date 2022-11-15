import React from 'react'
import ActionButton from '../components/ActionButton'
import Rating from './Rating'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../Utility/ShoppingCartUtility'
import { formatCurrency } from '../Utility/CurrencyUtility'
import { useWishlist } from '../Utility/WishlistUtility'
import { categoryURL, productURL } from '../Utility/ProductUtility'
import { Product } from '../models/Product'

type Params = {
    product: Product,
    className?: string|null
}

const ProductButton: React.FC<Params> = ({ product, className }) => {

    const shoppingCartContext = useShoppingCart();
    const wishlistContext = useWishlist();

    if (shoppingCartContext == null || wishlistContext == null)
        return <></>;

    const { incrementQuantity } = shoppingCartContext;
    const { toggleItem, isWishlisted } = wishlistContext;

    if (product == null)
        return null;

    let productUrl = productURL(product);
    let categoryUrl = categoryURL(product);

    return (
        <div className={ "button-product container" + (className == null ? "" : " " + className)}>

        <img className="sm-row" src={product.imageName} title={product.name} alt={product.name}></img>
        <div className='info'>
            <NavLink to={categoryUrl ?? ""}><p className='mt-3'>{product.category ?? "Category"}</p></NavLink>
            <NavLink to={productUrl ?? ""}><b>{product.name}</b></NavLink>
            <Rating count={product.rating ?? 0}/>
            <p>{formatCurrency(product.price)}</p>
        </div>

        <div className="hover-box">
            <NavLink to={productUrl ?? ""}><ActionButton text="Quick View" color="red"/></NavLink>
            <div className="icon-buttons d-flex flex-sm-column">
                <button className={'row button-icon fa fa-heart' + (isWishlisted(product) ? " active" : "")} onClick={() => toggleItem(product)}/>
                <button className='row button-icon fa fa-code-compare' onClick={() => {}}/>
                <button className='row button-icon fa fa-bag-shopping' onClick={() => incrementQuantity(product)}/>
            </div>
        </div>

        </div>
    )

}

export default ProductButton