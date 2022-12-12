import { NavLink } from 'react-router-dom';
import { useProducts } from '../Utility/ProductUtility';
import { useWishlist } from '../Utility/WishlistUtility';
import WishlistItem from '../components/Sidebar/WishlistItem';

const WishlistView = () => {

    const wishlistContext = useWishlist();
    const productContext = useProducts();

    if (wishlistContext == null || productContext == null)
        return <></>;

    const { wishlistItems } = wishlistContext;
    const { getProduct } = productContext;

    return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="wishlist" aria-labelledby="wishlist">
        <div className="offcanvas-header">
            <h5 id="shopping-cart-label"><i className='fa-regular fa-shopping-bag me-3'></i>Your wishlist</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            
            <div className='scrollable flex-grow-1'>
            {
                wishlistItems === null || wishlistItems.length === 0
                ? <p className='ms-5 mb-2'>No items in wishlist.</p>
                : wishlistItems.map(articleNumber => (<WishlistItem key={articleNumber} product={getProduct(articleNumber) ?? null}/>)) 
            }
            </div>

            <div className='d-lg-none nav mb-4 flex-grow-0 flex-shrink-0'>
                <div className={"d-flex flex-column"}>
                    <NavLink end to="/" className="main-link">Home</NavLink>
                    <NavLink to="/categories" className="main-link">Categories</NavLink>
                    <NavLink to="/product" className="main-link">Products</NavLink>
                    <NavLink end to="/contact" className="main-link">Contact</NavLink>
                    <NavLink end to="/search">Search</NavLink>
                    <NavLink end to="/compare">Compare</NavLink>
                    <NavLink end to="/wishlist"><p /* badge="1" */>Wishlist</p></NavLink>
                </div>
            </div>

        </div>
    </div>
    )

}

export default WishlistView