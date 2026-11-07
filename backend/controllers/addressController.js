import Address from "../models/Address.js";

const handle = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (error) {
        console.log("Address Controller Error:", error); // 👈 Added log so you can see crashes
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addAddress = handle(async (req, res) => {
    console.log("Incoming Address:", req.body); // 👈 Helps debug if frontend sends bad data
    const address = await Address.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, message: "address added successfully", address });
});

export const getAddresses = handle(async (req, res) => {
    // ✅ FIXED: Changed .create() to .find()
    const addresses = await Address.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: addresses.length, addresses });
});

export const updateAddress = handle(async (req, res) => {
    // ✅ FIXED: Changed findByOneAndUpdate to findOneAndUpdate
    const address = await Address.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { returnDocument: "after" }
    );
    if (!address) return res.status(404).json({ success: false, message: "address not found" });
    res.status(200).json({ success: true, message: "address updated successfully", address });
});

export const deleteAddress = handle(async (req, res) => {
    // ✅ FIXED: Changed findByOneAndDelete to findOneAndDelete
    const address = await Address.findOneAndDelete({ 
        _id: req.params.id, 
        user: req.user._id 
    });
    if (!address) return res.status(404).json({ success: false, message: "address not found" });
    res.status(200).json({ success: true, message: "address deleted successfully" });
});