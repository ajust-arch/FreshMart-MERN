import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            // ✅ Capitalized "Bearer"
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- AUTH ROUTES ---
export const registerUser = (data) => API.post("/users/register", data);
export const verifyEmail = (data) => API.post("/users/verify-email", data);
export const resendOtp = (data) => API.post("/users/resend-otp", data); // ✅ Fixed casing (Otp)
export const loginUser = (data) => API.post("/users/login", data);
export const forgotPassword = (data) => API.post("/users/forgot-password", data);
export const resetPassword = (data) => API.post("/users/reset-password", data);
export const getProfile = () => API.get("/users/profile");

// --- PRODUCT & HOOKAH ROUTES ---
export const getCategories = () => API.get("/categories");
export const getProducts = (params) => API.get("/products", { params });
export const getHookahs = () => API.get("/hookahs");

// --- ADDRESS ROUTES ---
export const getAddresses = () => API.get("/address"); // ✅ lowercase 'a'
export const addAddress = (data) => API.post("/address/add", data); // ✅ lowercase 'a' (removed /add)
export const updateAddress = (id, data) => API.put(`/address/${id}`, data);
export const deleteAddress = (id) => API.delete(`/address/${id}`);

// --- ORDER ROUTES ---
export const placeOrder = (data) => API.post("/orders/place", data);
export const getMyOrders = () => API.get("/orders/my-orders");
export const cancelOrder = (id) => API.put(`/orders/${id}`, { orderStatus: "Cancelled" }); // ✅ Fixed casing (cancelOrder)

// --- PAYMENT ROUTES ---
export const createCheckoutSession = (order) => API.post("/payment/create-session", { order });
export const verifyPayment = (sessionId, order) => API.post("/payment/verify-payment", { sessionId, order });

export default API;