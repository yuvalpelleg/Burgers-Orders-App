// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// // ייבוא ראוטים

// import authRoutes from "./routes/authRoutes";

// const app = express();

// // Middleware
// app.use(cors()); // מאפשר בקשות ממקורות שונים
// app.use(express.json()); // מאפשר קריאת JSON מהבקשה

// // חיבור למסד הנתונים MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/burgerApp") // או מהקובץ .env
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // ראוטים
// app.use("/auth", authRoutes); // register / login
// // app.use("/products", productRoutes); // get / create products
// // app.use("/orders", orderRoutes); // get / create orders

// // Route לבדיקה בסיסית שהשרת עובד
// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// // הרצת השרת
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

// Load environment variables
dotenv.config();

// Import your routes
import authRoutes from "./routes/authRoutes";
// import productRoutes from "./routes/productRoutes";
// import orderRoutes from "./routes/orderRoutes"

const app = express();

// Connect to MongoDB using the db config
connectDB();

// Middleware
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse JSON body

// Routes
app.use("/auth", authRoutes);
// app.use("/products", productRoutes);
// app.use("/orders", orderRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("API is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
