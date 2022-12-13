import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { formatCurrency } from '../../utility/CurrencyUtility';
import { useProducts } from '../../utility/ProductUtility';
import { useShoppingCart } from '../../utility/ShoppingCartUtility';
import ExternalLink from '../components/ExternalLink';
import Rating from '../components/Rating';
import UpDown from '../components/UpDown';
import ProductGrid from '../components/ProductGrid';
import TabControl from '../components/TabControl';
import Toggle from '../components/Toggle';
import Breadcrumb from '../sections/Breadcrumb';
import Tab from '../components/Tab';

const ProductView: React.FC = () => {

    const { name } = useParams();
    const productContext = useProducts();
    const shoppingCartContext = useShoppingCart();

    if (productContext == null || shoppingCartContext == null)
        return <></>;

    const { getProduct, cachedProducts } = productContext;
    const { incrementQuantity, decrementQuantity, getItemQuantity, removeItem } = shoppingCartContext;
    
    
    const product = getProduct(name ?? "");
    if (product == null)
        return <></>;

    const relatedProducts = cachedProducts.all.slice(0, 4);
    
    return (
        product == null
        ? <p className='error'>Could not retrieve product, please try again in a moment.</p>
        : <>

            <Breadcrumb currentPage={<NavLink to="/products/">Products</NavLink>} page2={product.name}/>

            <section className='main-layout2 d-flex flex-column flex-lg-row'>

                <div className='h-100 w-540 w-md-auto align-self-center mx-4 mx-lg-0'>
                    <img src={product.imageName} alt="" className="w-100"/>
                    <div className='container row flex-nowrap justify-content-evenly mt-4'>
                        <img src={product.imageName} alt="" className="w-100 h-100 w-min-0 flex-shrink-1"/>
                        <img src={product.imageName} alt="" className="w-100 h-100 w-min-0 flex-shrink-1"/>
                        <img src={product.imageName} alt="" className="w-100 h-100 w-min-0 flex-shrink-1"/>
                    </div>
                </div>

                <div className='w-100 text-start mx-5 mt-lg-0 mt-5 w-md-auto'>

                    <h5 className='mb-0 text-start'>{product.name}</h5>
                    <p className='c-gray'>{ "SKU: " + product.articleNumber}</p>
                    <p className='c-gray'>BRAND: The Northland</p>
                    <Rating count={product.rating}/>
                    <h6 className='m-2 ms-0'>{formatCurrency(product.price)}</h6>
                    <p className='c-gray me-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    
                    <div className='container ms-0 mt-4'>
                        <div className='row'>

                            <div className='col p-0 align-content-center d-flex flex-column'>
                                <p className='row h-40 align-items-center my-3'>Size:</p>
                                <p className='row h-40 align-items-center my-3'>Color:</p>
                                <p className='row h-40 align-items-center my-3'>Quantity:</p>
                                <p className='row h-40 align-items-center my-3'>Share:</p>
                            </div>

                            <div className='col p-0 d-flex flex-column'>
                                <fieldset className='row h-40 align-content-center my-3 justify-content-between me-5 flex-nowrap'>
                                    <Toggle id="size-s" name="size" text="S"/>
                                    <Toggle id="size-m" name="size" text="M"/>
                                    <Toggle id="size-l" name="size" text="L"/>
                                    <Toggle id="size-x" name="size" text="X"/>
                                </fieldset>
                                <select id='color' className='row h-40 align-content-center my-3'>
                                    <option>Black</option>
                                    <option>Blue</option>
                                    <option>Green</option>
                                    <option>White</option>
                                    <option>Red</option>
                                </select>
                                <div className='row h-40 align-content-center pt-2 my-3'>
                                    <UpDown count={getItemQuantity(product)}
                                        onIncrement={() => incrementQuantity(product)}
                                        onDecrement={() => decrementQuantity(product)}
                                        onRemove={() => removeItem(product)}/>
                                </div>
                                <div className='d-flex flex-rows h-40 align-items-center justify-content-between w-110 my-3'>
                                    <ExternalLink link="https://facebook.com" className="fa fa-facebook"></ExternalLink>
                                    <ExternalLink link="https://instagram.com" className="fab fa-instagram"></ExternalLink>
                                    <ExternalLink link="https://twitter.com" className="fab fa-twitter"></ExternalLink>
                                    <ExternalLink link="https://google.com" className="fab fa-google"></ExternalLink>
                                    <ExternalLink link="https://linkedin.com" className="fab fa-linkedin"></ExternalLink>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            <section className='main-layout2 w-100'>

                <TabControl>
                    <Tab id="tab-description" header="Description">
                        <article className='tab-description active text-start py-2'>
                            {product.description}
                         </article>
                     </Tab>
                     <Tab id="tab-additional" header="Additional">
                         <h5 className='mt-5'>Additional tab</h5>
                     </Tab>
                     <Tab id="tab-shopping-returns" header="Shopping & Returns">
                         <h5 className='mt-5'>Shopping & Returns tab</h5>
                     </Tab>
                     <Tab id="tab-reviews" header="Reviews">
                         <h5 className='mt-5'>Reviews tab</h5>
                     </Tab>
                </TabControl>

            </section>
            
            <section className='main-layout2 d-flex flex-column align-self-center'>
                <h5 className='text-center text-lg-start'>Related Products</h5>
                <ProductGrid products={relatedProducts} className="align-self-center"/>
            </section>
            
          </>
    )

}

export default ProductView