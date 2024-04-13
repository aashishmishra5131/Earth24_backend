const cartService=require("../services/cart.services.js")
const Address=require("../models/addresses.model.js");


async function createOrder(user,shippAddress){
    let address;

    if(shippAddress._id){
        let existAddress=await Address.findById(shippAddress._id);
        address=existAddress;

    }
    else{
        address=new Address(shippAddress);
        address.user=user;
        await address.save();
        user.Address.push(address);
        await user.save();
    }
    const cart=await cartService.findUserCart(user._id);
    const orderItems=[];
    for(const item of cart.cartItems){
        const orderItem=new orderItems({
            price:item.price,
            product:item.product,
            quantity:item.quantity,
            size:item.size,
            userId:item.userId,
            discountedPrice:item.discountedPrice,
        })
        const createdOrderItem=await orderItem.save();
        orderItems.push(createdOrderItem)
    }
    const createdOrder=new Order({
        user,
        orderItems,
        totalPrice:cart.totalPrice,
        totalDiscountedPrice:cart.totalDiscountedPrice,
        discounte:cart.discount,
        totalItem:cart.totalItem,
        shippAddress:address,
    })
    const savedOrder=await createOrder.save();
    return savedOrder;
}