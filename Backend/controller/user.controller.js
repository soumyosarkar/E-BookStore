import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
export const signup = async(req,res)=>{
    try{
        const {fullname,email,password}=req.body;
        const user= await User.findOne({email});
        if(user){
            return  res.status(400).json({message:"User already Exists"})
        }
        const hashPass=await bcryptjs.hash(password,10)
        const createUser = new User ({
            fullname:fullname,
            email:email,
            password:hashPass,
        })
        await createUser.save()
        res.status(201).json({message:"user Created successfully",user:{
            _id:user._id,
            fullname: user.fullname,
            email:user.email
        }})
    }catch(error){
        console.log("Error:" +error.message)
        res.status(500).json({Message:"Internal server error"})
    }
}

export const login= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email});
        const isMatch=await bcryptjs.compare(password, user.password)
        if(!user||!isMatch){
            return  res.status(400).json({message:"Invalid username or pass"})
        }
        else{
            res.status(200).json({message:"logged in ",
                user:{
                    _id:user._id,
                    fullname: user.fullname,
                    email:user.email
                }
            })
        }
    } catch (error) {
        console.log("Error:" +error.message)
        res.status(500).json({Message:"Internal server error"})
    }
}