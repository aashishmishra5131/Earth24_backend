const express=require("express")
const router=express.Router();


const cartController=require("../controller/cart.controller.js");
const { authenticate } = require("../middlewear/authenticate.js");
router.get("/",authenticate,cartController.findUserCart);
router.get("/add",authenticate,cartController.addItemToCart);

module.exports=router;

