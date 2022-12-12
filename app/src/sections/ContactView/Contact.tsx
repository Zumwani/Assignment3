import React, { useState } from 'react'
import ActionButton from '../../components/ActionButton';
import Input from '../../components/Contact/Input';
import TextArea from '../../components/Contact/TextArea';
import { ContactForm } from '../../models/ContactForm';
import { FormResult } from '../../models/FormResult';
import * as Form from '../../Utility/FormUtility';

const ContactSection = () => {
    
    const [contactForm, setContactForm] = useState<ContactForm>({name: "", email: "", comments: ""});
    const [formErrors, setFormErrors] = useState({name: "", email: "", comments: ""});
    const [canSubmit, setCanSubmit] = useState(false);
    const [result, setResult] = useState<FormResult|null>();
    
    const [, updateState] = React.useState();
    const ReRender = React.useCallback(() => updateState(undefined), []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {id, value} = e.target;
        setContactForm({...contactForm, [id]: value});
    };
    
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const id = (e.target as any).id;
        Form.validate(contactForm, formErrors, id, setFormErrors, setCanSubmit);
        ReRender();
    };

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        Form.validateAll(contactForm, formErrors, setFormErrors, setCanSubmit);
        ReRender();

        if (canSubmit) {

            let json = JSON.stringify(contactForm);
            setContactForm({name: "", email: "", comments: ""});
            setCanSubmit(false);

            Form.submit(
                "https://win22-webapi.azurewebsites.net/api/contactform", "post", json, 
                async r => setResult({ message: await r.text(), success: r.status === 200 }));

        }

    };
    
    return (
        <section className='contact-form'>
            <div className='container'>
                {
                    <>
                        {
                            !result ? null :
                            result.success
                            ?
                            <div role="alert" className='alert alert-success'>
                                <p>Thank you for your comment!</p>
                                <p>We will contact you as soon as possible!</p>
                            </div>
                            :
                            <div role="alert" className='alert alert-danger'>
                                <p>Something went wrong!</p>
                                <p>We weren't able to submit your comments right now, please try again in a moment!</p>
                            </div>
                        }

                        <h2>Come in contact with us</h2>
                        <form onSubmit={handleSubmit} noValidate>
                            <Input id='name' type='text'   placeholder='Your name' value={contactForm.name} errorMessage={formErrors.name} onChange={handleChange} onKeyUp={handleKeyUp}/>
                            <Input id='email' type='email' placeholder='example@domain.com' value={contactForm.email} errorMessage={formErrors.email} onChange={handleChange} onKeyUp={handleKeyUp}/>
                            <TextArea id='comments' placeholder='Your comment' containerClassName='textarea' value={contactForm.comments} errorMessage={formErrors.comments} onChange={handleChange} onKeyUp={handleKeyUp}/>
                            <ActionButton text="Post comment" simple={true} color="red"/>
                        </form>
                    </>
                }
            </div>
        </section>
    )

}

export default ContactSection