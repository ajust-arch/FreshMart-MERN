import Order from "../models/Order.js";
import Address from "../models/Address.js";

export const placeOrder = async (req, res) => {
    try {
        // ✅ Fixed .include to .includes
        if (["Online", "stripe"].includes(req.body.paymentMethod)) {
            return res.status(400).json({ success: false, message: "online orders are only created after successful payment" });
        }

        const address = await Address.findOne({ 
            _id: req.body.address,
            user: req.user._id 
        });

        if (!address) {
            return res.status(400).json({ success: false, message: "please add delivery address first." });
        }

        const order = await Order.create({
            user: req.user._id,
            ...req.body,
            paymentMethod: "COD",
            paymentStatus: "Pending",
        });

        res.status(201).json({ success: true, message: "order created successfully", order });
    } catch (error) {
        console.error("Order Error:", error); // Logs the real error to your terminal
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("products.product")
            .populate("address")
            .populate("user", "-password");
            
        if (!order) return res.status(404).json({ success: false, message: "order not found" });
        
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        // ✅ Fixed req.param to req.params
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
        if (!order) return res.status(404).json({ success: false, message: "order not found" });
        
        res.status(200).json({ success: true, message: "order updated successfully", order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        // ✅ Fixed req.param to req.params
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: "order not found" });
        
        res.status(200).json({ success: true, message: "order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const myOrders = async (req, res) => {
    try {
        // ✅ Fixed "Oder" to "Order" and "req.user_id" to "req.user._id"
        const orders = await Order.find({ user: req.user._id })
            .populate("products.product")
            .populate("address")
            .sort({ createdAt: -1 });
            
        res.status(200).json({ success: true, count: orders.length, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};