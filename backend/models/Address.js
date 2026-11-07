import mongoose from "mongoose";
const addressSchema =new mongoose.Schema({
    user: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        fullName:{
type:String,
required:true,
        },
        mobileNumber:{
            type:String,
            required:true,
            match:/^[0-9]{10}$/,

        },
        pinCode:{
           type:String,
            required:true,

        },
        city:{  type:String,
            required:true,
        },
        landMark:{  type:String,
            },addressType:{
                  type:String,
                  enum:["Home","Office","other"],
                  default:"Home",
        
            },
            address:{  type:String,
            required:true,},
},
{timestamps:true})
export default mongoose.model("Address",addressSchema);