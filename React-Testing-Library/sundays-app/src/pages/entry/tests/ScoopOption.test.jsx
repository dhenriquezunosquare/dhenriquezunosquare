
import { render, screen, fireEvent } from "../../../test-utils/testing-library-utilis";
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { ScoopOption } from "../ScoopOption";

test('should be invalid set negatives and more than 10',async()=>{
    render(<ScoopOption name="Vanilla" imagePath="" updateItemCount={jest.fn()} />,{wrapper: OrderDetailsProvider});

    const vanillaInput =  screen.getByRole('spinbutton');
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '11');

    expect(vanillaInput).toHaveClass('is-invalid');


})