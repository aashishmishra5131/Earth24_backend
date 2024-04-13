const userServices = require("../services/user.services.js");
const cartItem=require("../models/cartItem.model.js")

async function updateCartItem(userId, cartItemId, cartItemsData) {
  try {
    const item = await findcartItemById(cartItemId);
    if (!item) {
      throw new Error("cart items not found: ", cartItemId);
    }
    const user = await userServices.findUserById(item.userId);
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
  const cartItem = await findcartItemById(cartItemId);
  const user = await userServices.findUserById(userId);

  if (user._id.toString() === cartItem.userId.toString()) {
    await cartItem.findUserByIdAndDelete(cartItemId);
  }
  throw new Error("You can't remove another user's item");
}

async function findcartItemById(cartItemId) {
  const cartItem = await findcartItemById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("Cart item not found with id ", cartItemId);
  }
}

module.exports = { updateCartItem, removeCartItem, findcartItemById };
