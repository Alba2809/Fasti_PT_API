import { Router } from "express";
import { create, getAll } from "../controllers/sale.controller.js";
import { createSchema } from "../schemas/sale.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import validateRol from "../middlewares/rol.middleware.js";
import authRequired from "../middlewares/validateToken.js";

// create a new router instance and mount the routes
const router = Router();

router.post(
  "/",
  authRequired,
  validateRol(["gerente", "cajero"]),
  validateSchema(createSchema),
  create
);
router.get("/", authRequired, validateRol(["gerente", "cajero"]), getAll);

export default router;
