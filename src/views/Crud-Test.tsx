import React, { useState } from 'react'
import Input from '../components/Contact/Input'
import TextArea from '../components/Contact/TextArea'
import { CreateProduct } from '../models/Product'
import { useProducts } from '../Utility/ProductUtility';

const CrudTest: React.FC = () => {

    const [form, setForm] = useState<CreateProduct>({ name: "", imageName: "", rating: 0, category: "", description: "", price: 0 });
    const crud = useProducts();
    if (crud == null)
        return <></>

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {id, value} = e.target;
        setForm({...form, [id]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        // Form.validateAll(contactForm, formErrors, setFormErrors, setCanSubmit);
        // ReRender();

        // if (canSubmit) {

            crud.createProduct(form);
            setForm({ name: "", imageName: "", rating: 0, category: "", description: "", price: 0 });
            // setCanSubmit(false);



        // }

    };
    
    return (
        <div className='container'>
            <div className='column'>
                <form>
                    <Input id="name" placeholder='name' errorMessage='' value={form?.name} onChange={handleChange} onKeyUp={() => {}}/>
                    <Input id="imageName" placeholder='imageName' errorMessage='' value={form?.imageName} onChange={handleChange} onKeyUp={() => {}}/>
                    <Input id="rating" type='number' placeholder='rating' errorMessage='' value={form?.rating.toString()} onChange={handleChange} onKeyUp={() => {}}/>
                    <Input id="category" placeholder='category' errorMessage='' value={form?.category} onChange={handleChange} onKeyUp={() => {}}/>
                    <TextArea id="description" placeholder='description' errorMessage='' value={form?.description ?? ""} onChange={handleChange} onKeyUp={() => {}}/>
                    <Input id="price"  type='number' placeholder='price' errorMessage='' value={form?.price.toString()} onChange={handleChange} onKeyUp={() => {}}/>
                    <button onClick={handleSubmit}>Post</button>
                </form>
            </div>
            <div className='column'>
                
            </div>
        </div>
    )

}

export default CrudTest