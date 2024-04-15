const express=require("express")
const router=express.Router();

const reviewController=require("../controller/review.controller.js");
const { authenticate } = require("../middlewear/authenticate.js");

router.post("/",authenticate,reviewController.createReview);
router.get("/product/:productId",authenticate,reviewController.getAllReview);

module.exports=router;