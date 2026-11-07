import cloudinary from "../config/cloudinary.js";
import fs from 'fs';
import path from 'path'; // 👈 Add this!

export const uploadImage = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ success: false, message: "pls select an image" });

        // 👈 Use absolute path just to be safe
        const absolutePath = path.resolve(req.file.path);

        const result = await cloudinary.uploader.upload(absolutePath, {
            folder: "freshMart_Images",
            resource_type: "image" // ✅ FIXED (singular)
        });

        try {
            if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
        } catch (cleanupError) {
            console.log("local upload cleanup failed", cleanupError.message);
        }

        res.status(200).json({
            success: true,
            message: "image uploaded successfully.",
            image: {
                url: result.secure_url,
                public_id: result.public_id
            }
        });
    } catch (error) {
        console.log(error);
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false, 
            message: error.message
        });
    }
};