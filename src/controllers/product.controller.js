import { ProductModel } from "../models/product.model.js";

export const getAll = async (req, res) => {
  try {
    const products = await ProductModel.getAll();

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los productos."]);
  }
};
