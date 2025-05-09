import { z } from "zod";

// define the schema for the login request
export const loginSchema = z.object({
  username: z
    .string({
      required_error: "El usuario es requerido.",
    })
    .max(50, {
      message: "El usuario debe tener un máximo de 50 caracteres.",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(8, {
      message: "La contraseña debe de tener al menos 8 caracteres.",
    })
    .max(25, { message: "La contraseña debe tener un máximo 25 caracteres." }),
});
