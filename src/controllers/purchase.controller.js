import { LogModel } from "../models/log.model.js";
import { ProductModel } from "../models/product.model.js";
import { PurchaseModel } from "../models/purchase.model.js";

export const create = async (req, res) => {
  try {
    const { productId, amount: amountInput, cost } = req.body;
    const userId = req.user.id;
    
    // check if the amount is a integer
    const amount = Number(amountInput);
    if (Number.isNaN(amount) || !Number.isInteger(amount)) {
      return res.status(400).json(["La cantidad no es un número entero."]);
    }

    // check if the product exists and if the amount + current_stock is less than the max_stock

    const productFound = await ProductModel.getById(productId);

    if (!productFound) return res.status(400).json(["Producto no encontrado."]);

    if (productFound.current_stock + amount > productFound.max_stock) {
      return res.status(400).json(["La cantidad no puede ser mayor al stock máximo."]);
    }

    const result = await PurchaseModel.create({
      userId,
      productId,
      amount,
      cost,
    });

    // if the insert is failed
    if (result.affectedRows === 0) return res.status(500).json(["Hubo un error al crear la compra."]);

    // update the product stock and entrances (+1)
    await ProductModel.addStock(productId, amount);

    // insert log in database
    await LogModel.create(userId, `Compra de ${amount} unidades de ${productFound.name}`);

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(["Hubo un error al crear la compra."]);
  }
};

export const getAll = async (req, res) => {
  try {
    const purchases = await PurchaseModel.getAll();

    return res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener las compras."]);
  }
};