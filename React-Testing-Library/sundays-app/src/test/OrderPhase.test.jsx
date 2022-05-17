import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../App";
import { OrderDetailsProvider } from "../contexts/OrderDetails";
import { rest } from 'msw'
import { server } from '../mocks/server'

test('Order Phases(Ruta Critica)', async () => {
    //Rnder App
    render(<App />)

    //Add Ice Cream Scoops and Topping
    const total = screen.getByText('Grand total', { exact: false });
    expect(total).toHaveTextContent('0.00');

    const VanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await userEvent.clear(VanillaInput);
    await userEvent.type(VanillaInput, '1');
    expect(total).toHaveTextContent('2.00');

    const cherryInput = await screen.findByRole('checkbox', { name: 'Cherries' });
    await userEvent.click(cherryInput);
    expect(total).toHaveTextContent('3.50');

    //Find and click order button

    const OrderButton = screen.getByRole("button", { name: "Order sundae" });
    await userEvent.click(OrderButton);

    //Check summary information based on order
    const Summary = screen.getByRole('heading', { name: 'Order Summary' });
    expect(Summary).toBeInTheDocument();

    const scoopsSumary = screen.getByRole('heading', { name: 'Scoops: $2.00' });
    expect(scoopsSumary).toBeInTheDocument();


    expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('Cherries')).toBeInTheDocument();


    //accept terms and conditions and click button to confir order
    const termsCheck = screen.getByRole("checkbox", { name: 'Terms and Conditions' });
    await userEvent.click(termsCheck);
    const confirmButton = screen.getByRole("button", { name: "Confirm order" });
    await userEvent.click(confirmButton);

    const loading= screen.getByText('Loading',{exact: false});
    expect(loading).toBeInTheDocument();

    //conform order number
    const thankYouHeader = await screen.findByRole("heading", { name: 'Thank You' });
    expect(thankYouHeader).toBeInTheDocument();

    expect(loading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText('order number',{exact: false});
    expect(orderNumber).toBeInTheDocument();

    // click new order button on confirmation page 
    const newButon = await screen.findByRole("button", { name: 'New Order' });
    await userEvent.click(newButon);
    //chek that scoops and tooping ssubtotals have been reset
    const scooptotal = screen.getByText('Scoops total', { exact: false });
    expect(scooptotal).toHaveTextContent('0.00');

    const toppingtotal = screen.getByText('Toppings total', { exact: false });
    expect(toppingtotal).toHaveTextContent('0.00');

    const newTotal = screen.getByText('Grand total', { exact: false });
    expect(newTotal).toHaveTextContent('0.00');

    // Wait for the item again
    await screen.findByRole('spinbutton',{name:'Vanilla'});
    await screen.findByRole('checkbox',{name:'Cherries'});

})


test('Toppings header is not on summary page if no toppings orderer',async()=>{
    render(<App />)
    const VanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await userEvent.clear(VanillaInput);
    await userEvent.type(VanillaInput, '1');

    const OrderButton = screen.getByRole("button", { name: "Order sundae" });
    await userEvent.click(OrderButton);

    const scoopsSumary = screen.getByRole('heading', { name: 'Scoops: $2.00' });
    expect(scoopsSumary).toBeInTheDocument();

    const toppingSumary = screen.queryByRole('heading', { name: /toppings/i });
    expect(toppingSumary).not.toBeInTheDocument();


})