import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './Utility/ProductUtility';
import { ShoppingCartProvider } from './Utility/ShoppingCartUtility';
import { WishlistProvider } from './Utility/WishlistUtility';
import { NavigationManager } from './Utility/NavigationUtility';
import NavBar from './sections/NavBar';
import Footer from './sections/Footer';
import MainView from './views/Main';
import CategoriesView from './views/Categories';
import ProductsView from './views/ProductsView';
import ProductView from './views/ProductView';
import ContactView from './views/Contact';
import NotFoundView from './views/NotFound';
import CrudTest from './views/Crud-Test';
import './App.css';

const App: React.FC = () =>
(
  <BrowserRouter>
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
  </BrowserRouter>
);

export default App;
