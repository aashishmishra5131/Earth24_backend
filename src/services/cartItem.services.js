const userServices = require("../services/user.services.js");
const CartItem=require("../models/cartItem.model.js")

async function updateCartItem(userId, cartItemId, cartItemsData) {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("cart items not found: ", cartItemId);
    }
    const user = await userServices.findUserById(userId);
    if (!user) {
      throw new Error("User not found : ", userId);
    }
   
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemsData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("You can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  console.log(cartItemId,userId,"cartItemId")
  const cartItem = await findCartItemById(cartItemId);
  const user = await userServices.findUserById(userId);

  if (user._id.toString() === cartItem.userId.toString()) {
   return await CartItem.findByIdAndDelete(cartItemId);
  }
  throw new Error("You can't remove another user's item");
}

async function findCartItemById(cartItemId) {
  console.log("cartItem hai yei",cartItemId);
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("Cart item not found with id ", cartItemId);
  }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById };
