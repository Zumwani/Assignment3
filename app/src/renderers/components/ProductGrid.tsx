import React from 'react'
import { Product } from '../../models/Product'
import ProductButton from './ProductButton'

type Params = {
    products: Product[],
    columns?: number,
    className?: string,
    innerClassName?: string,
    itemClassName?: string,
    createButtonCallback?: (item: Product, itemClassName: string|null) => React.ReactNode,
}

const ProductGrid: React.FC<Params> = ({ products, columns = 1, className, innerClassName, itemClassName, createButtonCallback = createProductButton }) =>
(
    <div className={'container ' + (className ?? "")}>
      <div className={'row w-100 g-30 ml-10 col-' + columns + ' ' + (innerClassName ?? '')}>
        {
          products === null || products.length === 0
          ? <p className='error'>An error occured when retrieving products, please try again in a moment.</p>
          : products.map(p => createButtonCallback(p, itemClassName ?? null))
        }
      </div>
    </div>
)

const createProductButton = (item: Product, itemClassName?: string|null) => {
  return item == null ? null : <ProductButton key={item.articleNumber} product={item} className={itemClassName}/>
} 

export default ProductGrid