import React from 'react'
import { useProducts } from '../../../utility/ProductUtility';
import ProductGrid from '../../components/ProductGrid';

const FeaturedProductsSection: React.FC = () => {

    const productContext = useProducts();
    if (productContext == null)
        return <></>;

    const { cachedProducts } = productContext;

    return (
        <section className='mx-auto w-fit-content'>
            <h5 className='mb-5 mt-5'>Featured products</h5>
            <ProductGrid products={cachedProducts.featured} columns={10} innerClassName='justify-content-evenly'/>
        </section>
    )

}

export default FeaturedProductsSection