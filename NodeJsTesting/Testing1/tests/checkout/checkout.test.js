const { expect } = require('chai');
const Checkout = require('./checkout');
var checkout;
beforeEach(() => {
    checkout = new Checkout();
    checkout.addItemPrice('a', 1);
    checkout.addItemPrice('b', 2);
})


it('Can Calculate current total', () => {
    checkout.addItem('a');
    expect(checkout.calculateTotal()).to.equal(1);
})


it('Can add multiple items and geet correct total', () => {

    checkout.addItem('a');
    checkout.addItem('b');
    expect(checkout.calculateTotal()).to.equal(3);
})


it('Can add discount rules', () => {
    checkout.addDiscount('a', 3, 2);
})

it('can apply discount rules to the total', () => {
    checkout.addDiscount('a', 3, 2);
    checkout.addItem('a');
    checkout.addItem('a');
    checkout.addItem('a');
    expect(checkout.calculateTotal()).to.equal(2);
})


it('Exceptions is thrown when item added without price', () => {
    expect(function () { checkout.addItem('c') }).to.throw();
})
