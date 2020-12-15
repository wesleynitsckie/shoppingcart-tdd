const request = require('supertest');
const ShoppingCart = require('../src/main');

describe('Shopping cart', () => {
	// Creating a new user to test login
	it('Add one product to a cart', async () => {
        const cart = new ShoppingCart();
        const item = {
            price: 34.23,
            name: 'Dove Soap'
        }
        cart.addToCart(item);
        const itemsInCart = 1;
        const list = cart.getShoppingList();
        expect(list.length).toEqual(itemsInCart);
    })

    it("The shopping cart has the correct total" , async() => {
        const price =  39.99;
        const itemName = 'Dove Soap';
        const item = {
            price: price,
            name:  itemName
        }
        const cart = new ShoppingCart();
        for(i=0; i<5;i++){
            cart.addToCart(item)
        }

        const endTotal = 199.95;
        const cartTotal = await cart.getTotal();
        expect(cartTotal).toEqual(endTotal)

        const allItems = cart.getShoppingList();
        allItems.map( item => {
            expect(item.name).toEqual(itemName);
            expect(item.price).toEqual(price);
        })

        expect(allItems.length).toEqual(5)

    })

    it("Should test adding additional items to cart", async() => {
        // Lets add the first 5
        const price =  39.99;
        const itemName = 'Dove Soap';
        const item = {
            price: price,
            name:  itemName
        }
        const cart = new ShoppingCart();
        for(i=0; i<5;i++){
            cart.addToCart(item)
        }

        // Then 3 more
        for(i=0; i<3;i++){
            cart.addToCart(item)
        }

        const endTotal = 319.92;
        const cartTotal = await cart.getTotal();
        expect(cartTotal).toEqual(endTotal)

        const allItems = cart.getShoppingList();
        allItems.map( item => {
            expect(item.name).toEqual(itemName);
            expect(item.price).toEqual(price);
        })

        expect(allItems.length).toEqual(8)

    })

    it("Should add sales tax ", async() => {
        const axe = {
            name: 'Axe Deo',
            price: 99.99
        };

        const dove = {
            price: 39.99,
            name:  'Dove'
        } 

        const cart = new ShoppingCart();
        for(i=0; i<2;i++){
            cart.addToCart(axe)
        }

        for(i=0; i<2;i++){
            cart.addToCart(dove)
        }

        const salesTax = await cart.getSalesTax();
        const totalWithTax = await cart.getTotalWithSalesTax();
        expect(salesTax).toEqual(35.00);
        expect(totalWithTax).toEqual(314.96);

        const allItems = cart.getShoppingList();
        expect(allItems.length).toEqual(4)
    })

})