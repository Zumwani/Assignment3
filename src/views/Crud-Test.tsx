import { stat } from 'fs';
import React, { useEffect, useState } from 'react'
import Input from '../components/Contact/Input'
import TextArea from '../components/Contact/TextArea'
import Tab from '../components/Tab';
import TabControl from '../components/TabControl';
import { CreateProduct, DefaultCreateProduct, Product } from '../models/Product'
import { ProductContext, useProducts } from '../Utility/ProductUtility';

interface TabParam {

    context: ProductContext;

    setIsBusy: () => void;
    setError:(message:string) => void;
    setSuccess: (message:string) => void;

    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;

    readForm: string;
    setReadForm: React.Dispatch<React.SetStateAction<string>>;

    updateForm: Product;
    setUpdateForm: React.Dispatch<React.SetStateAction<Product>>;

    deleteForm: string;
    setDeleteForm: React.Dispatch<React.SetStateAction<string>>;

}

type Status = {
    isBusy: boolean;
    isError: boolean;
    message: string;
}

const CrudTest: React.FC = () => {

    const context = useProducts();

    const [status, setStatus] = useState<Status>({ isBusy: false, isError: false, message: "" });

    const [selectedTab, setSelectedTab] = useState<string>("list");
    const [readForm, setReadForm] = useState<string>("");
    const [updateForm, setUpdateForm] = useState<Product>({ articleNumber: "", name: "", imageName: "", rating: 0, category: "", description: "", price: 0 });
    const [deleteForm, setDeleteForm] = useState<string>("");

    const setIsBusy = () => setStatus({ isBusy: true, isError: false, message: "" });
    const setSuccess = (message:string) => setStatus({ isBusy: false, isError: false, message: message });

    const setError = (error: any) => {
        if (typeof(error) === "string")
            setStatus({ isBusy: false, isError: true, message: error });
        else if (error instanceof Error)
            setStatus({ isBusy: false, isError: true, message: error.message });
    };

    if (context == null)
        return <></>

    const param: TabParam = { context, setIsBusy, setError, setSuccess, selectedTab, setSelectedTab, readForm, setReadForm, updateForm, setUpdateForm, deleteForm, setDeleteForm }

    const onTabChanged = (tab: string) =>
        setStatus({ isBusy: false, isError: false, message: "" });

    return (
        <div className='main-layout'>
            
            {

                status?.isBusy ?
                <p>Sending request...</p>
                : null

            }

            {

                status?.message && status.isError ?
                (<div className='status error'>
                    <h5>Error:</h5>
                    <p>{status.message}</p>
                </div>)
                : null

            }
            
            {

                status?.message && !status.isError ?
                (<div className='status success'>
                    <h5>Success:</h5>
                    <p>{status.message}</p>
                </div>)
                : null

            }

            <TabControl tab={[selectedTab, setSelectedTab]} onTabChanged={onTabChanged}>
                {ListTab(param)}
                {CreateTab(param)}
                {ReadTab(param)}
                {UpdateTab(param)}
                {DeleteTab(param)}
            </TabControl>

        </div>
    );

}

const ListTab = (param: TabParam) => {

    const { setIsBusy, setError, setSuccess, selectedTab, setSelectedTab, context, setReadForm, setUpdateForm, setDeleteForm } = param;

    const [products, setProducts] = useState<Product[]>();

    const refresh = () => {

        if (selectedTab !== "list")
            return;

        setIsBusy();
        context.getProducts().
        then(products => {
            setSuccess(products.length + " products retrieved.");
            setProducts(products);
        }).catch((e) => {
            setError(e);
            setProducts([]);
        });

    };

    useEffect(refresh, [selectedTab]);

    const onReadClick = (product: Product) => {
        setReadForm(product.articleNumber);
        setSelectedTab("read");
    }

    const onUpdateClick = (product: Product) => {
        setUpdateForm(product);
        setSelectedTab("update");
    }
    
    const onDeleteClick = (product: Product) => {
        setDeleteForm(product.articleNumber);
        setSelectedTab("delete");
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

const CreateTab = (param: TabParam) => {

    const { setIsBusy, setError, setSuccess, context } = param;
    const [product, setProduct] = useState<CreateProduct>(DefaultCreateProduct());

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {id, value} = e.target;
        setProduct({...product, [id]: value});
    };

    const onSubmit = (e: React.FormEvent) => {
        
        e.preventDefault();
    
        setIsBusy();

        context.createProduct(product).
        then((product) => setSuccess("Product '" + product.articleNumber + "' created.")).
        catch(setError);

        //Reset to default values
        setProduct(DefaultCreateProduct());

    };

    return (
        <Tab id='create' header='Create'>
            <div>

                <form>
                    <table cellPadding={10} className="no-border mt-5 mx-auto">
                        <tr>
                            <td>Name:</td>
                            <td><Input id="name" placeholder='Name' value={product?.name} onChange={onChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Image:</td>
                            <td><Input id="imageName" placeholder='Image' value={product?.imageName} onChange={onChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td><Input id="category" placeholder='Category' value={product?.category} onChange={onChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td><Input id="price"  type='number' value={product?.price.toString()} onChange={onChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Rating:</td>
                            <td><Input id="rating" type='number' value={product?.rating.toString()} onChange={onChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td><TextArea id="description" placeholder='Description' value={product?.description ?? ""} onChange={onChange} onKeyUp={() => {}}/></td>
                        </tr>
                    </table>
                </form>

                <button onClick={onSubmit} className="mt-4">Post</button>

            </div>
        </Tab>
    );

}

const ReadTab = (param: TabParam) => {

    const { setIsBusy, setError, setSuccess, selectedTab, readForm, setReadForm, context } = param;

    const [product, setProduct] = useState<Product|null>();

    useEffect(() => {
        setProduct(null);
    }, [selectedTab]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setReadForm(value);
    };

    const onSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        
        setIsBusy();
        context.readProduct(readForm).
        then((product) => {
            setProduct(product);
            setSuccess("Retrieved product '" + product.articleNumber + "'.");
        }).
        catch(e => { setError(e); setProduct(null); });
        
    };
    
    return (
        <Tab id='read' header='Read'>
            <div>

                <form>
                    <table cellPadding={10} className="no-border mt-5 mx-auto">
                        <tr>
                            <td>Article Number:</td>
                            <td><Input id="articleNumber" placeholder='Article Number' value={readForm} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                    </table>
                </form>

                <button onClick={onSubmit} className="mt-4">Read</button>

                {
                    product == undefined ? null : (
                        <table cellPadding={10} className="mt-5 mx-auto">
                                <tr>
                                    <td>Article Number:</td>
                                    <td>{product?.articleNumber}</td>
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
                                    <td>{product?.price?.toString()}</td>
                                </tr>
                                <tr>
                                    <td>Rating:</td>
                                    <td>{product?.rating?.toString()}</td>
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

const UpdateTab = (param: TabParam) => {

    const { setIsBusy, setError, setSuccess, updateForm, setUpdateForm, setSelectedTab, context } = param;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {id, value} = e.target;
        setUpdateForm({...updateForm, [id]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        setIsBusy();
        context.updateProduct(updateForm).
        then(() => {
            setTimeout(() => setSelectedTab("list"), 1000);
            setUpdateForm({ articleNumber: "", name: "", imageName: "", rating: 0, category: "", description: "", price: 0 });
            return setSuccess("Product '" + updateForm.articleNumber + "' updated. Returning to list tab...");
        }).
        catch(setError);

    };

    return (
        <Tab id='update' header='Update'>
            <div>

                <form>
                    <table cellPadding={10} className="no-border mt-5 mx-auto">
                        <tr>
                            <td>Article Number:</td>
                            <td><Input id="articleNumber" placeholder='Article Number' value={updateForm?.articleNumber} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td><Input id="name" placeholder='Name' value={updateForm?.name} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Image:</td>
                            <td><Input id="imageName" placeholder='Image' value={updateForm?.imageName} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td><Input id="category" placeholder='Category' value={updateForm?.category} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td><Input id="price"  type='number' value={updateForm?.price.toString()} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Rating:</td>
                            <td><Input id="rating" type='number' value={updateForm?.rating.toString()} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td><TextArea id="description" placeholder='Description' value={updateForm?.description ?? ""} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                    </table>
                </form>

                <button onClick={handleSubmit} className="mt-4">Put</button>

            </div>
        </Tab>
    );

}

const DeleteTab = (param: TabParam) => {

    const { setIsBusy, setError, setSuccess, deleteForm, setDeleteForm, setSelectedTab, context } = param;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setDeleteForm(value);
    };

    const onSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        setIsBusy();
        context.deleteProduct(deleteForm).
        then(() => {
            setDeleteForm("");
            setTimeout(() => setSelectedTab("list"), 1000);
            return setSuccess("Product '" + deleteForm + "' deleted. Returning to list tab...");
        }).
        catch(setError);

    };
    
    return (
        <Tab id='delete' header='Delete'>
            <div>

                <form>
                    <table cellPadding={10} className="no-border mt-5 mx-auto">
                        <tr>
                            <td>Article Number:</td>
                            <td><Input id="articleNumber" placeholder='Article Number' value={deleteForm ?? ""} onChange={handleChange} onKeyUp={() => {}}/></td>
                        </tr>
                    </table>
                </form>

                <button onClick={onSubmit} className="mt-4">Delete</button>

            </div>
        </Tab>
    );

}

export default CrudTest