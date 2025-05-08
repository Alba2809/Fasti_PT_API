import { pool } from "../db.js";

export class ProductModel {
  static async getAll() {
    const [productos] = await pool.query(
      "SELECT * FROM products"
    );

    return productos;
  }

  static async getById(id) {
    const [foundProducto] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    return foundProducto[0];
  }

  static async create(input) {
    const {
      name,
      current_stock,
      max_stock,
      entrances,
      exits,
      purchase_cost,
      sale_cost
    } = input;

    const [result] = await pool.query(
      "INSERT INTO products (name, current_stock, max_stock, entrances, exits, purchase_cost, sale_cost) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        current_stock,
        max_stock,
        entrances,
        exits,
        purchase_cost,
        sale_cost,
      ]
    );

    return result;
  }

  static async subtractStock(id, amount) {
    const [result] = await pool.query(
      "UPDATE products SET current_stock = current_stock - ?, exits = exits + 1 WHERE id = ?",
      [amount, id]
    );

    return result;

  }

  static async addStock(id, amount) {
    const [result] = await pool.query(
      "UPDATE products SET current_stock = current_stock + ?, entrances = entrances + 1 WHERE id = ?",
      [amount, id]
    );

    return result;
  }
}