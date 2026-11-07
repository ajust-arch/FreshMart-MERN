import jwt from "jsonwebtoken";
import User from '../models/User.js';
export const authMiddleware =async (req,res,next)=>{
try {
    const authHeader= req.headers.authorization;
    if(!authHeader||!authHeader.toLowerCase().startsWith("bearer "))
        return res.status(401).json({success:false,message:"token missing"});
const token=authHeader.split(" ")[1];
const jwtSecret = process.env.JWT_SECRET || process.env.JWT_secret;
if (!jwtSecret)
    return res.status(500).json({success:false,message:"JWT secret is not configured"});
const decoded=jwt.verify(token,jwtSecret);
const user=await User.findById(decoded.id).select("-password");
if(!user)
    return res.status(404).json({success:false,message:"user not found"});
req.user =user;
next();
} catch (error) {   
    return res.status(401).json({success:false,message:"invalid token or expired token"});
 

}

}