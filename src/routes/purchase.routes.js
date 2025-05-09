import { Router } from "express";
import { create, getAll } from "../controllers/purchase.controller.js";
import validateRol from "../middlewares/rol.middleware.js";
import authRequired from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createSchema } from "../schemas/purchase.schema.js";

// create a new router instance and mount the routes
const router = Router();

router.get("/", authRequired, validateRol("gerente"), getAll);
router.post(
  "/",
  authRequired,
  validateRol("gerente"),
  validateSchema(createSchema),
  create
);

export default router;
