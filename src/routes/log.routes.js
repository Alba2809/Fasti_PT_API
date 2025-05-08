import { Router } from "express";
import { getAll } from "../controllers/log.controller.js";
import validateRol from "../middlewares/rol.middleware.js";
import authRequired from "../middlewares/validateToken.js";

// create a new router instance and mount the routes
const router = Router();

router.get("/", authRequired, validateRol("gerente"), getAll);

export default router;
