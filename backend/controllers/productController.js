import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
export const addProduct=async(req,res)=>{
    try {
        const {image,name,company,sellingPrice,oldPrice,size,category}=req.body;
        if(!image?.url||!image?.public_id) return res.status(400).json({
            success:false,
            message:"product image required"
        });

        const product=await Product.create({
            image:{
                url:image.url,public_id:image.public_id
            },
            name,company,sellingPrice,oldPrice,size,category,

        });
        res.status(201).json({
            success:true,
            message:"product added successfully", product
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        });
        
    }
};

export const getProducts=async (req,res)=>{
    try {
        const {category}=req.query;
        const filter = category?{category}:{};
        const products=await Product.find(filter);
        res.status(200).json({
            success:true,
            count:products.length,
            products
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false, message: error.message
        });
    }
}

export const getProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            });
        }
        res.status(200).json({
            success:true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        });
    }
}

export const updateProduct=async(req,res)=>{
    try {
         const product=await Product.findById(req.params.id);
           if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            });
        }
     const {image,name,company,sellingPrice,oldPrice,size,category}=req.body;
let oldImagePublicId=null;
if(image?.url &&
    image?.public_id &&
    image.public_id!==product.image.public_id){

        oldImagePublicId=product.image.public_id;
        product.image={url:image.url,public_id:image.public_id};
    }
    if(name) product.name=name;
     if(company) product.company=company;
      if(sellingPrice!==undefined) product.sellingPrice=sellingPrice;
      if(oldPrice!==undefined) product.oldPrice=oldPrice;
if(size) product.size=size;
if(category) product.category=category;
await product.save();
if(oldImagePublicId){
    try {
        await cloudinary.uploader.destroy(oldImagePublicId)
    } catch (cleanUpError) {
        console.log("old product image cleanup failed", cleanUpError.message)
    }
}res.status(200).json({success:true, message:"product updated succesfully", product})
    } catch (error) {
          res.status(500).json({
            success: false, message: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        // ✅ FIXED: Capital 'P' in Product
        const product = await Product.findById(req.params.id); 
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        if (product.image?.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        // ✅ FIXED: Capital 'P' in Product
        await Product.findByIdAndDelete(req.params.id); 
        
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};