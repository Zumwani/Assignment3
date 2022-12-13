import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './utility/ProductUtility';
import { ShoppingCartProvider } from './utility/ShoppingCartUtility';
import { WishlistProvider } from './utility/WishlistUtility';
import { NavigationManager } from './utility/NavigationUtility';
import { UserProvider } from './utility/UserUtility';
import NavBar from './renderers/sections/NavBar';
import Footer from './renderers/sections/Footer';
import MainView from './renderers/views/Main';
import CategoriesView from './renderers/views/Categories';
import ProductsView from './renderers/views/ProductsView';
import ProductView from './renderers/views/ProductView';
import ContactView from './renderers/views/Contact';
import NotFoundView from './renderers/views/NotFound';
import CrudTest from './renderers/views/Crud-Test';
import './App.css';

//TODO: Reimplement reset endpoint on server
//TODO: Fix auth again

const App: React.FC = () =>
(
  <BrowserRouter>
    <UserProvider>
      <ProductProvider>
        <ShoppingCartProvider>
          <WishlistProvider>
              <NavigationManager>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<MainView/>}/>
                    <Route path="/Assignment3" element={<MainView/>}/>
                    <Route path='/product/:name' element={<ProductView/>}/>
                    <Route path="/categories" element={<CategoriesView/>}/>
                    <Route path='/products' element={<ProductsView/>}/>
                    <Route path='/products/:id' element={<ProductsView/>}/>
                    <Route path="/contact" element={<ContactView/>}/>
                    <Route path='/crud-test' element={<CrudTest/>}/>
                    <Route path="*" element={<NotFoundView/>}/>
                </Routes>
                <Footer/>
            </NavigationManager>
          </WishlistProvider>
        </ShoppingCartProvider>
      </ProductProvider>
    </UserProvider>
  </BrowserRouter>
);

export default App;
