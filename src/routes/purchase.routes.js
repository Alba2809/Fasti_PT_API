import { Router } from "express";
import { create, getAll } from "../controllers/purchase.controller.js";
import validateRol from "../middlewares/rol.middleware.js";
import authRequired from "../middlewares/validateToken.js";

// create a new router instance and mount the routes
const router = Router();

router.post("/", authRequired, validateRol("gerente"), create);
router.get("/", authRequired, validateRol("gerente"), getAll);

export default router;