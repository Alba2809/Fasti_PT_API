import { z } from "zod";

// define the schema for the create sale request
export const createSchema = z.object({
  productId: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number({
      required_error: "Se requiere el producto",
      invalid_type_error: "El producto no es válido",
    })
  ),
  amount: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number({
      required_error: "Se requiere la cantidad",
      invalid_type_error: "La cantidad no es un número entero",
    })
  )
});