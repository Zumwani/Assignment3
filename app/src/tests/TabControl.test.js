import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Tab from "../renderers/components/Tab";
import TabControl from "../renderers/components/TabControl";

const testTabControl = () =>
(
    <TabControl>
        <Tab header="Tab1" id="tab1">
            <p>Tab1</p>
        </Tab>
        <Tab header="Tab2" id="tab2">
            <p>Tab2</p>
        </Tab>
    </TabControl>
);

const tabHeader = ["Tab1", "Tab2"];

describe(TabControl, () => {

    it("TabControl: Renders tab header with correct amount of buttons and text.", () => {

        const { getByTestId } = render(testTabControl());
        const labels = getByTestId("tab-header").querySelectorAll("label");

        expect(labels.length).toEqual(2);
        expect(Array.from(Array.from(labels).map(l => l.textContent))).toEqual(tabHeader);

    });

    it("TabControl: Changes content when tab is selected", async () => {

        const { getByTestId } = render(testTabControl());
        const labels = getByTestId("tab-header").querySelectorAll("label");
        const tab1 = getByTestId("tab1");
        const tab2 = getByTestId("tab2");

        //Check default state: tab1 active, tab2 inactive
        expect(tab1.classList.contains("active")).toEqual(true);
        expect(tab2.classList.contains("active")).toEqual(false);
        
        //Change tab by clicking its tab header button
        await act(() => labels[1].click());
        
        //Check changed state: tab1 inactive, tab2 active
        expect(tab1.classList.contains("active")).toEqual(false);
        expect(tab2.classList.contains("active")).toEqual(true);

    });

});
