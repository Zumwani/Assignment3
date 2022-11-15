import React from 'react'
import ProductGrid from '../../components/ProductGrid';
import { useProducts } from '../../Utility/ProductUtility';

const Latest_BestSelling_TopReactedSection: React.FC = () => {

    const productContext = useProducts();
    if (productContext == null)
        return <></>;

    const {products} = productContext;

    return (
        <section className="main-layout2 container row p-0 text-start w-md-auto">

            <div className="col container gap-35 p-0 mt-4">
                <h5 className="mb-4 p-0">Latest Products</h5>
                <ProductGrid products={products.latest} itemClassName="small"/>
            </div>
            
            <div className="col container gap-35 p-0 mt-4">
                <h5 className="mb-4 p-0">Best Selling Products</h5>
                <ProductGrid products={products.bestSelling} itemClassName="small"/>
            </div>

            <div className="col container gap-35 p-0 mt-4">
                <h5 className="mb-4 p-0">Top Reacted Products</h5>
                <ProductGrid products={products.topReacted} itemClassName="small"/>
            </div>

        </section>
    )

}

export default Latest_BestSelling_TopReactedSection