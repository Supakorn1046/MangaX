import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // 👈 (คุณ Import มาถูกแล้ว)
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
connectDB();

const app = express();


// URL ของ Vercel (Frontend) 
const allowedOrigins = [
  'https://manga-x-six.vercel.app', 
  'http://localhost:5173',          
  'http://localhost:3000'           
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};


app.use(cors(corsOptions));


app.use(bodyParser.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));