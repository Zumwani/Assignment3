import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ActionButton from '../components/ActionButton';
import Input from '../components/Contact/Input';
import Tab from '../components/Tab';
import TabControl from '../components/TabControl';
import { CreateUser } from '../../models/User';
import { useUser } from '../../utility/UserUtility';

interface Params {
    isOpen: boolean;
    button: () => Element|null;
    onClickOutside?: () => void;
}

const UserPopup: React.FC<Params> = ({ isOpen, button, onClickOutside }) => {

    const [loginForm, setLoginForm] = useState<CreateUser>({ email: "", password: "" });
    const [registerForm, setRegisterForm] = useState<CreateUser>({ email: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const ref:any = useRef(null);

    //#region Close on focus lost

    const onClick = (e:any) => {
        if (onClickOutside && ref.current && !ref.current.contains(e.target))
            onClickOutside();
    }

    useEffect(() => {
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, []);

    //#endregion

    const user = useUser();
    if (user == null)
        return <></>

    //#region Position
    
    const setPosition = () => {
        
        if (!isOpen)
            return;
        
        const placementTarget = button();
        const popup = document.querySelector("#user-popup") as HTMLElement;
        
        if (!popup)
            return;
        
        if (!placementTarget) {
            popup.style.left = "unset";
            popup.style.right = "12px";
            return;
        }
        
        const buttonLeft = placementTarget.getBoundingClientRect().left
        const halfWidth = popup.getBoundingClientRect().width / 2;
        
        popup.style.left = (buttonLeft - halfWidth) + "px";
        popup.style.right = "unset";
        
        if (popup.getBoundingClientRect().right > window.innerWidth) {
            popup.style.left = "unset";
            popup.style.right = "12px";
        }
        
        popup.classList.remove("open");
        popup.classList.add("open");

    }
    
    setTimeout(setPosition, 1);
    setPosition();
    
    window.removeEventListener('resize', setPosition);      
    window.addEventListener('resize', setPosition);      
    
    //#endregion
    //#region Login
    
    const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { id, value } = e.target;
        setLoginForm({...loginForm, [id]: value});
    };
    
    const onKeyUpLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    };
    
    const onSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await user.login(loginForm.email, loginForm.password).catch(e => setLoginError(e.message));
        setLoginForm({ email: loginForm.email, password: "" });
    }
    
    //#endregion
    //#region Register
    
    const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { id, value } = e.target;
        setRegisterForm({...registerForm, [id]: value});
    };
    
    const onKeyUpRegister = (e: React.KeyboardEvent<HTMLInputElement>) => {
    };
    
    const onSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        user.register(registerForm.email, registerForm.password).catch(e => setRegisterError(e.message));
        setRegisterForm({ email: "", password: "" });
    }

    //#endregion
    
    return !isOpen ? null : (
        <div id="user-popup" ref={ref}>
            <div className="p-4">

                {
                    user.user
                    ? <div>
                        <p>You are logged in:</p>
                        <p>{user.user.email}</p>
                        <button onClick={user.logout}>Log out</button>
                    </div>
                    : <TabControl>

                        <Tab id='login' header='Log in'>
                            <form onSubmit={onSubmitLogin} noValidate className='pt-4'>

                                <Input id='email' placeholder='test@domain.com' value={loginForm.email} onChange={onChangeLogin} onKeyUp={onKeyUpLogin}/>
                                <Input id='password' type='password' containerClassName='mt-2' placeholder='********' value={loginForm.password} onChange={onChangeLogin} onKeyUp={onKeyUpLogin}/>

                                {
                                    loginError
                                    ? <p className='error'>{loginError}</p>
                                    : null
                                }

                                <ActionButton color='red' text='Log in' className='mt-4 mx-auto'/>

                            </form>
                        </Tab>
                        
                        <Tab id='signup' header='Register'>
                            <form onSubmit={onSubmitRegister} noValidate className='pt-4'>
                                <Input id='email' placeholder='test@domain.com' value={registerForm.email} onChange={onChangeRegister} onKeyUp={onKeyUpRegister}/>
                                <Input id='password' type='password' containerClassName='mt-2' placeholder='********' value={registerForm.password} onChange={onChangeRegister} onKeyUp={onKeyUpRegister}/>

                                {
                                    registerError
                                    ? <p className='error'>{registerError}</p>
                                    : null
                                }

                                <ActionButton color='red' text='Register' className='mt-4 mx-auto'/>

                            </form>
                        </Tab>

                    </TabControl>
                }

            </div>
        </div>
    )
}

export default UserPopup