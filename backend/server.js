import 'dotenv/config';
import express from 'express';
import {connectDB} from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import hookahRoutes from './routes/hookahRoutes.js';
import cartRoutes from './routes/cartRoutes.js'
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import adminOrderRoutes from './routes/adminOrderRoutes.js'


const PORT = process.env.PORT || 5000;
const app =express();

//middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://fresh-mart-mern-qd88.vercel.app',
  credentials: true
}));
app.use(express.json());

//routes

app.get('/',(req,res)=>{
    res.send("serving chall gyaa")
})

app.use('/api/users',userRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/products',productRoutes);
app.use('/api/hookahs',hookahRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/address',addressRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/admin/orders',adminOrderRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exitCode = 1;
  }
};

startServer();