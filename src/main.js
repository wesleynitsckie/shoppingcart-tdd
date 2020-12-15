

module.exports = class ShoppingCart {
    shoppingCart = [];

    addToCart = (item) => {
        this.shoppingCart.push(item)
    }

    getTotal = async () => {
        let total = 0;
        this.shoppingCart.map( item => {
            total = total +  item.price
        })
       
        const stringVal = total.toFixed(2)
        return parseFloat(stringVal)
    }

    getShoppingList = () => { return this.shoppingCart}

    getTotalWithSalesTax  = async () => {
        const total = await this.getTotal() + await this.getSalesTax();
        return  total;
    }

    getSalesTax = async () => {
        const total = await this.getTotal();
        const tax = Math.round(total * 0.125);
        return  parseFloat(tax.toFixed(2))
    }
}



