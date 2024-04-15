const express=require("express")
const router=express.Router();

const cartItemsController=require("../controller/cartItem.controller.js");
const { authenticate } = require("../middlewear/authenticate.js");

router.put("/:id",authenticate,cartItemsController.updateCartItem);
router.delete("/:id",authenticate,cartItemsController.removeCartItem);

module.exports=cartItemsController;