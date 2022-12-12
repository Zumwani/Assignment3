import React from 'react'
import ProductGrid from '../components/ProductGrid';
import BreadcrumbSection from '../sections/Breadcrumb';
import { useProducts } from '../Utility/ProductUtility';
import { NavLink, useParams } from 'react-router-dom';
import { ProductList } from '../models/ProductList';

const ProductsView: React.FC = () => {

    const { id } = useParams();

    const productContext = useProducts();
    if (productContext == null)
        return <></>;
    
    const { cachedProducts } = productContext;

    return (
        <>
            <BreadcrumbSection currentPage={<NavLink to="/products/">Products</NavLink>} page2={id}/>
            <ProductGrid products={getProducts(id ?? null, cachedProducts)} innerClassName="justify-content-center" className="main-layout2"/>
        </>
    )

}

const getProducts = (id:string|null, products: ProductList) =>
    products.all.find(p => p !== null && p.category.toLowerCase() === id)
    ? products.all.filter(p => p.category.toLowerCase() === id)
    : products.all;

export default ProductsView