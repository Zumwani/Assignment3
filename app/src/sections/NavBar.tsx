import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../Utility/ShoppingCartUtility';
import { useWishlist } from '../Utility/WishlistUtility';
import IconButton from '../components/IconButton';
import { useUser } from '../Utility/UserUtility';
import UserPopup from '../views/UserPopup';

const NavBar: React.FC = () => {

  //Set color to transparent when scrollbar is at top
  const setTransparentWhenScrollbarIsAtTop = () => {
    const nav = document.querySelector("nav");
    nav?.classList?.toggle("top", window.scrollY === 0);
  }

  document.addEventListener('scroll', setTransparentWhenScrollbarIsAtTop);
  setTransparentWhenScrollbarIsAtTop();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const shoppingCartContext = useShoppingCart();
  const wishlistContext = useWishlist();
  const user = useUser();
  if (shoppingCartContext == null || wishlistContext == null || user == null)
    return <></>;

  const { cartQuantity } = shoppingCartContext;
  const { wishlistQuanitity } = wishlistContext;

  const onUserButtonClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  }
  
  return (
    <>
      <nav className="top">
        <div>
        
          <div className='w-100'>
            <NavLink end to="/" title="Fixxo" className="logo"/>
            <span className='position-absolute left-0'><NavLink to="/crud-test">Crud test</NavLink></span>
          </div>
          
          <div className="w-100 text-align-center d-none d-lg-block">
              <NavLink end to="/" className="main-link">Home</NavLink>
              <NavLink to="/categories" className="main-link">Categories</NavLink>
              <NavLink to="/products" className="main-link">Products</NavLink>
              <NavLink end to="/contact" className="main-link">Contact</NavLink>
          </div>
          
          <div className="w-100 justify-content-end mt-3 nav-bar d-flex flex-row">

              <NavLink end to="/search" className="d-none d-lg-inline"><IconButton icon="fa-search"/></NavLink>
              <NavLink end to="/compare" className="d-none d-lg-inline"><IconButton icon="fa-code-compare"/></NavLink>

              {<button className="button-icon sidebar fa fa-heart" data-badge={wishlistQuanitity ?? 0} type="button" data-bs-toggle="offcanvas" data-bs-target="#wishlist" aria-controls="wishlist"></button>}

              {/* The following buttons opens sidebar, first is large viewport, second is small */}
              <button className="button-icon sidebar d-none d-lg-inline fa fa-shopping-bag" data-badge={cartQuantity ?? 0} type="button" data-bs-toggle="offcanvas" data-bs-target="#shopping-cart" aria-controls="shopping-cart"></button>
              <button className="button-icon sidebar fa fa-bars d-inline d-lg-none" data-badge={cartQuantity ?? 0} type="button" data-bs-toggle="offcanvas" data-bs-target="#shopping-cart" aria-controls="shopping-cart"></button>

              <div>
                <button id='userPopupButton' className='button-icon fa fa-user' type="button" onClick={onUserButtonClick}></button>
                <UserPopup isOpen={isUserMenuOpen} button={() => document.querySelector("#userPopupButton")}/>
              </div>

          </div>

        </div>

      </nav>

  </>
  )
}



export default NavBar