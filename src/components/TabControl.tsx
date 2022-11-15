import React, { useState } from 'react'
import Toggle from './Toggle';

type Params = {
    children: JSX.Element[]
}

type Tab = {
    id: string,
    header: string
}

const TabControl: React.FC<Params> = ({ children }) => {

    const [selectedTab, setSelectedTab] = useState(children[0].props?.id ?? "");

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
        <div className='tab-control'>
            <fieldset>
                {
                    children.map((tab) => {
                        const { id, header } = tab.props as Tab;
                        return <Toggle name="tab" key={id} id={id} text={header} onChange={() => onTabChange(id)} checked={selectedTab === id}/>
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