import { render, fireEvent } from "@testing-library/react";
import UpDown from "../renderers/components/UpDown";

describe(UpDown, () => {

    it("UpDown: Initial value is 0", () => {

        const { getByTestId } = render(<UpDown count={0}/>);
        const value = Number(getByTestId("count").textContent);
       
        expect(value).toEqual(0);

    });

    it("UpDown: onIncrement is called when + button is pressed", () => {

        let i = 0;
        const { getByRole } = render(<UpDown count={i} onIncrement={() => i += 1}/>);
        const button = getByRole("button", {name: "+"});

        fireEvent.click(button);

        expect(i).toEqual(1);

    })

    it("UpDown: onDecrement is called when - button is pressed", () => {

        let i = 2;
        const { getByRole } = render(<UpDown count={i} onDecrement={() => i -= 1}/>);
        const button = getByRole("button", {name: "-"});

        fireEvent.click(button);

        expect(i).toEqual(1);

    })

    it("UpDown: onDecrement should not be called when count < 2", () => {

        let i = 1;
        const { getByRole } = render(<UpDown count={i} onDecrement={() => i -= 1}/>);
        const button = getByRole("button", {name: "-"});

        fireEvent.click(button);

        expect(i).toEqual(1);

    })

    it("UpDown: onRemove should be called, instead of onDecrement, when count < 2, when - button is pressed", () => {

        let i = 1;
        let didRemove = false;

        const { getByRole } = render(<UpDown count={i} onDecrement={() => i -= 1} onRemove={() => didRemove = true}/>);
        const button = getByRole("button", {name: "-"});

        fireEvent.click(button);

        expect(i).toEqual(1);
        expect(didRemove).toEqual(true);

    })

});
