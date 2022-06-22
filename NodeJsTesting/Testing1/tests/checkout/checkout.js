module.exports = class Checkout{

    constructor(){
        this.prices= new Object();
        this.items=new Object();
        this.discounts = new Object();
    }

    addItemPrice(item,price) {
        this.prices[item]=price;;
    }

    addItem(item) {
        if(this.prices[item]==undefined){
            throw new Error("No price defined for item " + item);
        }
        if(this.items[item]===undefined){
            this.items[item]=1;
        }else{
            this.items[item]++;
        }
    }

    calculateTotal(){
        var total= 0;
        for(var item in this.items){
            var discount= this.discounts[item];
            if(discount){
                var nbrOfDiscounts = this.items[item] / discount.cnt;
                total += nbrOfDiscounts * discount.price
                var remainder = this.items[item] % discount.cnt;
                total += remainder* this.prices[item];
            }else{
                total += (this.prices[item] * this.items[item]);
            }
        }
        return total;
    }

    addDiscount(item,itemCnt,discountPrice) {
        this.discounts[item]= {cnt:itemCnt,price:discountPrice};
    }

}