import express from "express";
import { getAll } from "../controllers/shift.controller.js";
import authRequired from "../middlewares/validateToken.js";

const router = express.Router();

router.get("/", authRequired, getAll);

export default router;