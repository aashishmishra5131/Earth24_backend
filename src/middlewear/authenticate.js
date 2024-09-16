// const jwtProvider=require("../config/jwtProvider.js");
// const userService=require("../services/user.services.js");

// const authenticate=async(req,res,next)=>{
//     try {
//         const token=req.headers.authorization?.split(" ")[1];
//         if(!token){
//            return res.status(404).send({error:"token not found..."});
//         }
//         console.log("Token:",token);
//         const userId=jwtProvider.getUserIdFromToken(token);
//         const user= await userService.findUserById(userId);
//       //  console.log("User:", user);
//         req.user=user;
//     } catch (error) {
//         return res.status(500).send({error:error.message});
//     }
//     next();
// }

// module.exports= {authenticate};


const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../services/user.services.js");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    const userId = jwtProvider.getUserIdFromToken(token); // Make sure this validates the JWT
    if (!userId) {
      return res.status(401).send({ error: "Invalid token" });
    }

    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { authenticate };
