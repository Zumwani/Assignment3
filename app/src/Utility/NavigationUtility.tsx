import React, { ReactNode, useEffect } from "react"
import { useLocation } from "react-router-dom";

type Param = {
    children: ReactNode
}

export const NavigationManager: React.FC<Param> = ({ children }) => {

    //Manages title and scrolls to top on page change

    const location = useLocation();

    const capitalize = (text:string | null) =>
        text?.replace(/(^\w|\s\w)(\S*)/g, (_,m1, m2) => m1.toUpperCase() + m2.toLowerCase());

    const setTitle = () => {

        var loc = location.pathname;
        if (loc.endsWith("/"))
            loc = loc.slice(0, -1);

        let title = loc;
        if (loc.endsWith("/"))
            title = loc.slice(0, -1) ?? "";
        title = title.split("/")?.slice(-1)?.pop()?.replaceAll("-", " ") ?? "";

        document.title = (title === "" ? "" : (capitalize(title ?? null) + " - ")) + "Fixxo";
        
    }

    const scrollToTop = () =>
        window.scroll(0, 0);

    useEffect(() => {
        setTitle();
        scrollToTop();
    }, [location, setTitle()]);

    return <>
        {children}
    </>

}