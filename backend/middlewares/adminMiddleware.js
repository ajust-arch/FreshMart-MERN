export const adminMiddleware = (req, res, next) => { // ✅ Added 'next' here!
    try {
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, user not found"
            });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied, admin only!"
            });
        }

        next(); // ✅ Now Express knows what to do!
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};