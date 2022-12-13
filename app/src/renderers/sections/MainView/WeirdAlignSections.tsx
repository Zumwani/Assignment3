import React from 'react'
import ProductButton from '../../components/ProductButton'
import SaleButton from '../../components/SaleButton'
import { useProducts } from '../../../utility/ProductUtility'

const WeirdAlignSections: React.FC = () => {

    const productContext = useProducts();

    if (productContext == null)
        return <></>;

    const { cachedProducts } = productContext;

    return (
        <section className='weird-align main-layout s-align-center'>
            <SaleButton className="grid-area" title='' image="model7"/>
            <SaleButton className="grid-area" title='' image="model8"/>

            { cachedProducts.sale1.map(p => <ProductButton key={p.articleNumber} product={p}/>) }
            { cachedProducts.sale2.map(p => <ProductButton key={p.articleNumber} product={p}/>) }

        </section>
    )

}

export default WeirdAlignSections