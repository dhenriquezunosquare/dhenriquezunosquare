import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { Options } from "../Options";
import { OrderEntry } from "../OrderEntry";



test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});


test('update toopings subtotal when toopings change', async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingSubtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  const MMInput = await screen.findByRole('checkbox', { name: 'M&Ms' });
  await userEvent.click(MMInput);
  expect(toppingSubtotal).toHaveTextContent('1.50');

  await userEvent.click(MMInput);
  expect(toppingSubtotal).toHaveTextContent('0.00');


  const CherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });
  await userEvent.click(CherriesInput);
  expect(toppingSubtotal).toHaveTextContent('1.50');


  const hotFudgeInput = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  await userEvent.click(hotFudgeInput)
  expect(toppingSubtotal).toHaveTextContent('3.00');


  await userEvent.click(CherriesInput);
  expect(toppingSubtotal).toHaveTextContent('$1.50');


})



describe('Grand Total', () => {


  test('Grand Total start at $0.00', async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const total = screen.getByText('Grand total: $', { exact: false });
    expect(total).toHaveTextContent('0.00');

  })

  test('grandTotal updates properly if scoops adds first', async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const total = screen.getByText('Grand total: $', { exact: false });
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(total).toHaveTextContent('2.00');

    const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });
    await userEvent.click(cherriesInput);
    expect(total).toHaveTextContent('3.50')

  })

  test('grandTotal updates properly if topping adds first', async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const total = screen.getByText('Grand total: $', { exact: false });

    const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });
    await userEvent.click(cherriesInput);
    expect(total).toHaveTextContent('1.50')

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(total).toHaveTextContent('3.50');

  })


  test('grandTotal updates properly if item is removed', async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const total = screen.getByText('Grand total: $', { exact: false });

    const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });
    await userEvent.click(cherriesInput);
    expect(total).toHaveTextContent('1.50')

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(total).toHaveTextContent('3.50');

    await userEvent.click(cherriesInput);
    expect(total).toHaveTextContent('2.00');

  })

})

