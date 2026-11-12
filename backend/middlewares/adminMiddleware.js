export const adminMiddleware = (req, res, next) => { 
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

        next(); 
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};