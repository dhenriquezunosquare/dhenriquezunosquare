import { render, screen, fireEvent } from "../../../test-utils/testing-library-utilis";
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { Options } from "../Options";


test("should render images from server correctly", async () => {
    render(<Options optionType="scoops" />)


    const scoopeImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopeImages).toHaveLength(2);

    const altTexts = scoopeImages.map((element)=>element.alt)
    expect(altTexts).toEqual(['Vanilla scoop','Chocolate scoop'])
})


test('should render images for toppings correctly', async()=> { 
    render(<Options optionType="toppings" />,{wrapper:OrderDetailsProvider})
    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i})
    expect(toppingImages).toHaveLength(3);

    const altTexts = toppingImages.map((element)=>element.alt);
    expect(altTexts).toEqual(['Cherries topping','M&Ms topping','Hot fudge topping'])

})