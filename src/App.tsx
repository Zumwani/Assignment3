import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
// import Footer from './components/Footer';
// import MainView from './views/MainView';
// import ContactView from './views/ContactView';
// import NotFoundView from './views/NotFoundView';
// import ProductView from './views/ProductView';
// import ProductsView from './views/ProductsView';
// import CategoriesView from './views/CategoriesView';
// import { ProductProvider } from './Utility/ProductUtility';
// import { ShoppingCartProvider } from './Utility/ShoppingCartUtility';
// import { WishlistProvider } from './Utility/WishlistUtility';
// import { NavigationManager } from './Utility/NavigationUtility';
import './App.css';

const App = () =>
(
  <BrowserRouter>
    {/* <ProductProvider> */}
      {/* <ShoppingCartProvider> */}
        {/* <WishlistProvider> */}
            <NavBar/>
            {/* <NavigationManager> */}
            {/* <Routes> */}
                {/* <Route path="/" element={<MainView/>} title="sak"/> */}
                {/* <Route path='/product/:name' element={<ProductView/>}/> */}
                {/* <Route path='/products' element={<ProductsView/>}/> */}
                {/* <Route path='/products/:id' element={<ProductsView/>}/> */}
                {/* <Route path="/contact" element={<ContactView/>}/> */}
                {/* <Route path="/categories" element={<CategoriesView/>}/> */}
                {/* <Route path="/categories/:category" element={<CategoriesView/>}/> */}
                {/* <Route path="*" element={<NotFoundView/>}/> */}
            {/* {</Routes>} */}
            {/* <Footer/> */}
          {/* </NavigationManager> */}
        {/* </WishlistProvider> */}
      {/* </ShoppingCartProvider> */}
    {/* </ProductProvider> */}
  </BrowserRouter>
);

export default App;
