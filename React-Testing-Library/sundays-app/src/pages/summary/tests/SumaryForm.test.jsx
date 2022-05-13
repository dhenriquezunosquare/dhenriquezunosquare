import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { SummaryForm } from "../SummaryForm";

test("renders correctly and initial states", () => {
    render(<SummaryForm />);
    const button = screen.getByRole("button", { name: "Confirm order" });
    expect(button).toBeDisabled();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

});


test('first click should enable the button and second click should disable it', async() => {
    const user = userEvent.setup()

    render(<SummaryForm />);
    const button = screen.getByRole("button", { name: "Confirm order" });
    expect(button).toBeDisabled();

    const checkbox = screen.getByRole("checkbox",{name:'Terms and Conditions'});
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(button).toBeEnabled();
    await userEvent.click(checkbox);
    expect(button).toBeDisabled();
})


test('popover responses to hover', async() => {
    const user = userEvent.setup()

    render(<SummaryForm />);
    const checkbox = screen.getByText('Terms and Conditions');

    const popoverNotExist = screen.queryByText("No ice cream will actually be delivered");
    expect(popoverNotExist).not.toBeInTheDocument();

    await userEvent.hover(checkbox);

    const popoverExist= screen.getByText("No ice cream will actually be delivered");
    expect(popoverExist).toBeInTheDocument();

    await userEvent.unhover(checkbox);
    const popoverOut= screen.queryByText("No ice cream will actually be delivered");
    expect(popoverOut).not.toBeInTheDocument();



})