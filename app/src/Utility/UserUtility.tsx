import { createContext, useContext, useState } from "react";
import { User } from "../models/User";

export interface UserContext {
    user: User|null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
}

const Context = createContext<UserContext | null>(null);

export const useUser = () => useContext(Context);

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [user, setUser] = useState<User|null>(null);

    const login = async (email: string, password: string) => {
        
       await fetch("http://localhost:5000/api/auth/signin", {
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        }).then(async response => {
            
            if (response.status !== 200)
                throw new Error((await response.json()).text);

            const { accessToken } = await response.json();
            setUser({ email, token: accessToken });
        
        }).catch(e => {
            throw e;
        });

    }

    const logout = () =>
        setUser(null);

    const register = async (email: string, password: string) => {

        await fetch("http://localhost:5000/api/auth/signup", {
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        }).then(async response => {

            console.log(response.statusText);
            if (response.status === 201)
                login(email, password);
            else
                throw new Error((await response.json()).text);

        }).catch(e => {
            throw e;
        });

    } 

    return <Context.Provider value={{ user, login, logout, register }}>
        {children}
    </Context.Provider>

}
