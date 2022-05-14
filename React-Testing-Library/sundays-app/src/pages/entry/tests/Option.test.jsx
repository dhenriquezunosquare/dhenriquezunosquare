import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { Options } from "../Options";


test("should render images from server correctly", () => {
    render(<Options optionType="scoops" />)


    const scoopeImages = screen.getAllByRole('img', { name: /scoop$/i });
    expect(scoopeImages).toHaveLength(2);

    const altTexts = scoopeImages.map((element)=>element.alt)
    expect(altTexts).toEqual(['Vanilla','Chocolate'])
})