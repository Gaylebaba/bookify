import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { createAdminIfNotExists } from "./controllers/authController.js";

dotenv.config();

// Connect Database
connectdb();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Auto-create admin if not exists
  await createAdminIfNotExists();
});