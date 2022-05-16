import { render, screen, fireEvent } from "../../../test-utils/testing-library-utilis";
import userEvent from '@testing-library/user-event'
import { OrderEntry } from "../OrderEntry";
import { rest } from 'msw'
import { server } from '../../../mocks/server'


test('handles error for scoops and topping routes', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
    );
    render(<OrderEntry/>);
    const alerts =await  screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
})

test.skip('testing a test',()=>{
    
})