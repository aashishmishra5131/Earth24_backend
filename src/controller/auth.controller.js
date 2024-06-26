const userService=require("../services/user.services.js")
const jwtProvider=require("../config/jwtProvider.js")
const bcrypt=require("bcrypt")
const cartService=require("../services/cart.services.js")

const register=async(req,res)=>{
     try {
        const user=await userService.createUser(req.body);
        const jwt=jwtProvider.generateToken(user._id);
        await cartService.createCart(user);

        return res.status(200).send({jwt,message:"register success"})

     } catch (error) {
        return res.status(500).send({error:error.message});
     }
}
     const login=async(req,res)=>{
        const {password,email}=req.body;
        try {
            const user=await userService.getUserByEmail(email);
            if(!user){
                return res.status(404).send({message:"user not found with email : ",email})

            }
         const isPasswordVaild= await bcrypt.compare(password,user.password);
         if(!isPasswordVaild){
            return res.status(401).send({message:"Invaild Password..."})
         }
          
         const jwt=jwtProvider.generateToken(user._id);
         return res.status(200).send({jwt,message:"Login success"});
        } catch (error) {
            return res.status(500).send({error:error.message});
        }
     }

     module.exports={register,login}
