import React, { useEffect, useState } from 'react'
import Input from '../components/Contact/Input'
import TextArea from '../components/Contact/TextArea'
import Tab from '../components/Tab';
import TabControl from '../components/TabControl';
import { CreateProduct, DefaultCreateProduct, Product } from '../models/Product'
import { ProductContext, useProducts } from '../Utility/ProductUtility';

type SetTab = [string, React.Dispatch<React.SetStateAction<string>>]
type ReadForm = [string, React.Dispatch<React.SetStateAction<string>>]
type UpdateForm = [Product, React.Dispatch<React.SetStateAction<Product>>]
type DeleteForm = ReadForm;

const CrudTest: React.FC = () => {

    const crud = useProducts();

    const setTab: SetTab = useState<string>("list");
    const readForm: ReadForm = useState<string>("");
    const removeForm: DeleteForm = useState<string>("");
    const updateForm: UpdateForm = useState<Product>({ articleNumber: "", name: "", imageName: "", rating: 0, category: "", description: "", price: 0 });

    if (crud == null)
        return <></>

    return (
        <TabControl className='main-layout' tab={setTab}>
            {ListTab(crud, setTab, readForm, updateForm, removeForm)}
            {CreateTab(crud)}
            {ReadTab(crud, setTab, readForm)}
            {UpdateTab(crud, setTab, updateForm)}
            {DeleteTab(crud, setTab, removeForm)}
        </TabControl>
    );

}

const ListTab = (context: ProductContext, TabControl: SetTab, readForm: ReadForm, updateForm: UpdateForm, removeForm: DeleteForm) => {

    const [products, setProducts] = useState<Product[]>();
    
    const [articleNumberToRead, setarticleNumberToRead] = readForm;
    const [productToUpdate, setProductToUpdate] = updateForm;
    const [articleNumberToRemove, setArticleNumberToRemove] = removeForm;
    const [tab, setTab] = TabControl;

    const refresh = () => {
        context.getProducts().then(setProducts);
    };

    useEffect(refresh, [tab]);

    const onReadClick = (product: Product) => {
        setarticleNumberToRead(product.articleNumber);
        setTab("read");
    }

    const onUpdateClick = (product: Product) => {
        setProductToUpdate(product);
        setTab("update");
    }
    
    const onDeleteClick = (product: Product) => {
        setArticleNumberToRemove(product.articleNumber);
        setTab("delete");
    }

    return (
        <Tab id='list' header='List'>
            <button onClick={refresh} className="align-self-end my-5">Refresh</button>
            <table cellPadding={20}>
                <tr>
                    <th>Article Number</th>
                    <th>Name</th>
                    <th>category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Description</th>
                </tr>
                {
                    products?.length ?? 0 > 0
                    ? products?.map(p =>
                        <tr key={p.articleNumber}>
                            <td>{p.articleNumber}</td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>{p.price}</td>
                            <td>{p.rating}</td>
                            <td>{p.description}</td>
                            <button className='fas fa-download p-2 ms-4 mt-3' onClick={() => onReadClick(p)}></button>
                            <button className='fas fa-edit p-2 mt-3 mx-4' onClick={() => onUpdateClick(p)}></button>
                            <button className='fas fa-trash p-2 bg-red c-white' onClick={() => onDeleteClick(p)}></button>
                        </tr> 
                    )
                    : null
                }
            </table>
        </Tab>
    );

}

const CreateTab = (context: ProductContext) => {

    const [product, setProduct] = useState<CreateProduct>(DefaultCreateProduct());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {id, value} = e.target;
        setProduct({...product, [id]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        context.createProduct(product);
        setProduct(DefaultCreateProduct());
    };

    return (
        <Tab id='create' header='Create'>
            <div>

                <form>
                    <table cellPadding={10} className="no-border mt-5 mx-auto">
                        <tr>
                            <td>Name:</td>
                            <td><Input id="name" placeholder='Name' value={product?.name} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Image:</td>
                            <td><Input id="imageName" placeholder='Image' value={product?.imageName} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td><Input id="category" placeholder='Category' value={product?.category} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td><Input id="price"  type='number' value={product?.price.toString()} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Rating:</td>
                            <td><Input id="rating" type='number' value={product?.rating.toString()} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td><TextArea id="description" placeholder='Description' value={product?.description ?? ""} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                    </table>
                </form>

                <button onClick={handleSubmit} className="mt-4">Post</button>

            </div>
        </Tab>
    );

}

const ReadTab = (context: ProductContext, TabControl: SetTab, form: ReadForm) => {
    
    const [articleNumber, setArticleNumber] = form;
    const [product, setProduct] = useState<Product|null>();
    const [tab, setTab] = TabControl;

    useEffect(() => {
        setProduct(null);
    }, TabControl);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setArticleNumber(value);
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProduct(await context.readProduct(articleNumber));
    };
    
    return (
        <Tab id='read' header='Read'>
            <div>

                <form>
                    <table cellPadding={10} className="no-border mt-5 mx-auto">
                        <tr>
                            <td>Article Number:</td>
                            <td><Input id="articleNumber" placeholder='Article Number' value={articleNumber} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                    </table>
                </form>

                <button onClick={handleCreateSubmit} className="mt-4">Read</button>

                {
                    product == undefined ? null : (
                        <table cellPadding={10} className="mt-5 mx-auto">
                                <tr>
                                    <td>Article Number:</td>
                                    <td>{product.articleNumber}</td>
                                </tr>
                                <tr>
                                    <td>Name:</td>
                                    <td>{product?.name}</td>
                                </tr>
                                <tr>
                                    <td>Image:</td>
                                    <td>{product?.imageName}</td>
                                </tr>
                                <tr>
                                    <td>Category:</td>
                                    <td>{product?.category}</td>
                                </tr>
                                <tr>
                                    <td>Price:</td>
                                    <td>{product?.price.toString()}</td>
                                </tr>
                                <tr>
                                    <td>Rating:</td>
                                    <td>{product?.rating.toString()}</td>
                                </tr>
                                <tr>
                                    <td>Description:</td>
                                    <td>{product?.description ?? ""}</td>
                                </tr>
                            </table>
                        )
                    }

            </div>
        </Tab>
    );

}

const UpdateTab = (context: ProductContext, TabControl: SetTab, form: UpdateForm) => {

    const [product, setProduct] = form;
    const [tab, setTab] = TabControl;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {id, value} = e.target;
        setProduct({...product, [id]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        context.updateProduct(product);
        setProduct({ articleNumber: "", name: "", imageName: "", rating: 0, category: "", description: "", price: 0 });
        setTab("list");
    };

    return (
        <Tab id='update' header='Update'>
            <div>

                <form>
                    <table cellPadding={10} className="no-border mt-5 mx-auto">
                        <tr>
                            <td>Article Number:</td>
                            <td><Input id="articleNumber" placeholder='Article Number' value={product?.articleNumber} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td><Input id="name" placeholder='Name' value={product?.name} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Image:</td>
                            <td><Input id="imageName" placeholder='Image' value={product?.imageName} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td><Input id="category" placeholder='Category' value={product?.category} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td><Input id="price"  type='number' value={product?.price.toString()} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Rating:</td>
                            <td><Input id="rating" type='number' value={product?.rating.toString()} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td><TextArea id="description" placeholder='Description' value={product?.description ?? ""} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                    </table>
                </form>

                <button onClick={handleSubmit} className="mt-4">Put</button>

            </div>
        </Tab>
    );

}

const DeleteTab = (context: ProductContext, TabControl: SetTab, form: DeleteForm) => {

    const [articleNumber, setArticleNumber] = form;
    const [tab, setTab] = TabControl;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setArticleNumber(value);
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        context.deleteProduct(articleNumber);
        setArticleNumber("");
        setTab("list");
    };
    
    return (
        <Tab id='delete' header='Delete'>
            <div>

                <form>
                    <table cellPadding={10} className="no-border mt-5 mx-auto">
                        <tr>
                            <td>Article Number:</td>
                            <td><Input id="articleNumber" placeholder='Article Number' value={articleNumber} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                    </table>
                </form>

                <button onClick={handleCreateSubmit} className="mt-4">Delete</button>

            </div>
        </Tab>
    );

}

export default CrudTest