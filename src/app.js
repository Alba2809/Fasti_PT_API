import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL } from "./config.js";
import { createProducts, createUsers } from "./libs/initialSetup.js"
import authRoutes from "./routes/auth.routes.js";
import logRoutes from "./routes/log.routes.js";
import shiftRoutes from "./routes/shift.routes.js";
import salesCutRoutes from "./routes/salesCut.routes.js";
import productRoutes from "./routes/product.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import saleRoutes from "./routes/sale.routes.js";

// create the initial users
createUsers();
createProducts();

// create the express app
const app = express();

// enable cors
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// enable logging in development mode
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// mount the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/log", logRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/salesCut", salesCutRoutes);
app.use("/api/product", productRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sale", saleRoutes);

export default app;
