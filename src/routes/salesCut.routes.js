import express from "express"
import { create, getAll } from "../controllers/salesCut.controller.js";
import authRequired from "../middlewares/validateToken.js";

const router = express.Router();

router.get("/", authRequired, getAll);
router.post("/", authRequired, create);

export default router;