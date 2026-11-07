import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
     user: {
           type:mongoose.Schema.Types.ObjectId,
           required:true,
           ref:'User'
       },
       products:[{
        productModel:{
            type:String,
            enum:["Product","Hookah"],
            default:"Product"
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            refPath:'products.productModel',

        },
        quantity:{
            type:Number,
            default:1,
            required:true,
        },
        name:String,
        image:String,
        company:String,
        category:String,
        size:String,
        sellingPrice:Number,
        oldPrice:Number,
       },],
       address:{
        type:String,
        ref:"Address",
        required:true,
       },
       totalAmount:{
        type:Number,
        required:true,
       },
       paymentMethod:{
        type:String,
        enum:["COD","stripe","Online"],
        default:"COD",
       },
       paymentStatus:{
          type:String,
        enum:["Pending","Paid","Failed"],
        default:"Pending",
       },
       orderStatus:{
          type:String,
        enum:["Processing","On the way","Delivered","Cancelled"],
        default:"Processing",
       },
       stripeSessionId:{
    type:String,unique:true,sparse:true,
       },

},{timestamps:true},);

export default mongoose.model('Order', orderSchema);