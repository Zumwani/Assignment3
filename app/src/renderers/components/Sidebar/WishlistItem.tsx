import React from 'react'
import { NavLink } from 'react-router-dom';
import { Product } from '../../../models/Product';
import { productURL } from '../../../utility/ProductUtility';
import { useWishlist } from '../../../utility/WishlistUtility';

type Params = {
    key: string,
    product: Product|null
}

const WishlistItem: React.FC<Params> = ({ product }) => {
    
    const wishlistContext = useWishlist();
    if (wishlistContext === null || product === null)
        throw new Error("Wishlist is not initialized or product is null.");

    const { toggleItem } = wishlistContext;

    return (
        <div className='shopping-cart-item d-flex flex-row'>
            <div className='item-image'>
                <NavLink to={productURL(product) ?? ""}>
                    <img src={product.imageName ?? ""} alt={product.name}/>
                </NavLink>
            </div>
            <div className='item-info w-100'>
                <NavLink to={productURL(product) ?? ""}>
                    <p>{product.name}</p>
                </NavLink>
            </div>
            <div className='price'>
                <button className='fa-regular fa-trash' onClick={() => toggleItem(product)}></button>
            </div>
        </div>
    )

}

export default WishlistItem