import React from 'react'
import { NavLink } from 'react-router-dom';
import { useProducts } from '../../utility/ProductUtility'
import CategoryButton from '../components/CategoryButton';
import ProductGrid from '../components/ProductGrid';
import Breadcrumb from '../sections/Breadcrumb';

//Checks if variable is not null.
//.filter(p => p != null) will still return null, unless we do it this way
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

const CategoriesView: React.FC = () => {

    const productContext = useProducts();
    if (productContext == null)
        return <></>;

    const { cachedProducts } = productContext;

    const categories = new Set(cachedProducts.all.map(p => p.category));
    const items = Array.from(categories).map(c => cachedProducts.all.find(p => p.category === c) ?? null).filter(notEmpty);

    const getImage = (category:string) =>
    cachedProducts.all.find(p => p.category === category)?.imageName ?? null;

    const createCategoryButton = (category:string) =>
        <NavLink key={category} to={ "/products/" + category.replaceAll(" ", "-").toLowerCase() }><CategoryButton categoryName={category} image={getImage(category) ?? ""}/></NavLink>;

    return (
        <>
            <Breadcrumb currentPage='Categories'/>
            <ProductGrid products={items} createButtonCallback={(item, _) => createCategoryButton(item.category)} innerClassName="justify-content-center items-w-fit-content" className="main-layout"></ProductGrid>
        </>
        )

}

export default CategoriesView