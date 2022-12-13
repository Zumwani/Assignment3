import React, { useEffect, useState } from 'react'
import Toggle from './Toggle';

type Params = {
    children: JSX.Element[];
    className?: string;
    tab?: [string, React.Dispatch<React.SetStateAction<string>>];
    onTabChanged?: (tab: string) => void
}

type Tab = {
    id: string;
    header: string;
}

const TabControl: React.FC<Params> = ({ children, className, tab, onTabChanged }) => {

    const [externalSelectedTab, setExternalSelectedTab] = tab ?? [];
    const [selectedTab, setSelectedTab] = useState(children[0].props?.id ?? "");
    const [isSettingTab, setIsSettingTab] = useState(false);

    //#region Allow selected tab override

    //When tab changes externally, set local
    useEffect(() => {
        
        if (isSettingTab) {
            setIsSettingTab(false);
            return;
        }
        
        if (!tab)
            return;
        setIsSettingTab(true);
        setSelectedTab(externalSelectedTab);
        
    }, [externalSelectedTab]);
    
    //When tab changes locally, set external
    useEffect(() => {
        
        if (isSettingTab) {
            setIsSettingTab(false);
            return;
        }
        
        setIsSettingTab(true);
        if (setExternalSelectedTab)
            setExternalSelectedTab(selectedTab);
    
        if (onTabChanged)
            onTabChanged(selectedTab);

    }, [selectedTab]);
    
    //Reset isSettingTab after 100 ms, since it can't be set externally first time otherwise
    useEffect(() => {

        if (isSettingTab)
            setTimeout(() => {
                setIsSettingTab(false);
            }, 100);

    }, [isSettingTab])

    //#endregion

    if (children == null)
        return <></>;

    if (!children.every(c => c.props as Tab)) {
        console.error("One or more items in TabControl was invalid.");
        return <></>;
    }

    const onTabChange = (id: string) => {
        setSelectedTab(id);
    }

    return (
        <div className={ 'tab-control ' + (className ?? "") }>
            <fieldset>
                {
                    children.map((tab) => {
                        const { id, header } = tab.props as Tab;
                        return <Toggle name="tab" id={id} text={header} onChange={() => onTabChange(id)} checked={selectedTab === id} key={Math.random() /* Prevents tab header from getting stuck */ }/>
                    })
                }
            </fieldset>
            {
                children.map((tab) => {
                    const { id } = tab.props as Tab;
                    return <div key={id} className={ "tab" + (selectedTab === id ? " active" : "") }>{tab}</div>;
                })
            }
        </div>
    )

}

export default TabControl