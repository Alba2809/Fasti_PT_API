import { LogModel } from "../models/log.model.js";
import { ProductModel } from "../models/product.model.js";
import { SaleModel } from "../models/sale.model.js";

export const create = async (req, res) => {
  try {
    const { productId, amount: amountInput } = req.body;
    const userId = req.user.id;

    // check if the amount is a integer
    const amount = Number(amountInput);
    if (Number.isNaN(amount) || !Number.isInteger(amount)) {
      return res.status(400).json(["La cantidad no es un número entero."]);
    }

    // check if the product exists and if the product has enough stock
    const productFound = await ProductModel.getById(productId);

    if (!productFound) return res.status(400).json(["Producto no encontrado."]);

    if (productFound.current_stock < amount)
      return res.status(400).json(["No hay suficiente stock."]);

    const result = await SaleModel.create({
      userId,
      productId,
      amount,
      total: amount * productFound.sale_cost,
    });

    // if the insert is failed
    if (result.affectedRows === 0)
      return res.status(500).json(["Hubo un error al crear la venta."]);

    // update the product stock and exits (+1)
    await ProductModel.subtractStock(productId, amount);

    // insert log in database
    await LogModel.create(
      userId,
      `Venta de ${amount} unidades de ${productFound.name}`
    );

    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json(["Hubo un error al crear la venta."]);
  }
};

export const getAll = async (req, res) => {
  try {
    const sales = await SaleModel.getAll();

    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener las ventas."]);
  }
};
