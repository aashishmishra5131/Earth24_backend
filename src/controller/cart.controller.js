const cartService=require("../services/cart.services.js");

const findUserCart=async(req,res)=>{
    const userId=req.user; 
    console.log("user:",userId._id);
    try {
        const cart=await cartService.findUserCart(userId._id);
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const addCartItem=async(req,res)=>{
    const user=req.user;
    try {
        const cartItem=await cartService.addCartItem(user._id,req.body);
        return res.status(200).send(cartItem);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    findUserCart,
    addCartItem
}