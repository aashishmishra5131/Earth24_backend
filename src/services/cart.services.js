const Cart=require("../models/cart.model.js");
const CartItem=require("../models/cartItem.model.js")
const Product=require("../models/product.model.js")

async function createCart(user){
    try {
        const cart = new Cart({user});
        const createdCart=await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}
async function findUserCart(userId){
    try {
        let cart=await Cart.findOne({user:userId});
        let cartItems=await CartItem.find({cart:cart._id}).populate("product");
        cart.cartItems=cartItems;

        let totalPrice=0;
        let totalDiscountedPrice=0;
        let totalItem=0; 

        for (let cartItem of cart.cartItems) {
            const productPrice = cartItem.product.price;
            const discountedPrice = cartItem.product.discountedPrice !== undefined ? cartItem.product.discountedPrice : productPrice; // Check if discountedPrice exists, else fallback to original price
            const quantity = cartItem.quantity;

            totalPrice += productPrice * quantity;
            totalDiscountedPrice += discountedPrice * quantity;
            totalItem += quantity;
        }
        cart.totalPrice=totalPrice;
        cart.totalItem=totalItem;
        cart.discount=totalPrice-totalDiscountedPrice;
        cart.totalDiscountedPrice=totalDiscountedPrice;
        return cart;

    } catch (error) {
        throw new Error(error.message)
    }
}

async function addCartItem(userId,req){
    try {
        const cart=await Cart.findOne({user:userId});
        const product=await Product.findById(req.product);
        const isPresent=await CartItem.findOne({cart:cart._id,product:product._id,userId})

        if(!isPresent){
            const cartItem=new CartItem({
                product:product._id,
                cart:cart._id,
                quantity:1,
                userId,
                price:product.price,
                size:req.size,
                discountedPrice:product.discountPrice,
            })
            const createdCartItem=await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item added to cart";
        }
        if(isPresent){
            return "Item already added in cart"
        }
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports={createCart,findUserCart,addCartItem}