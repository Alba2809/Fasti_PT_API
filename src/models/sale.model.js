import { pool } from "../db.js";

export class SaleModel {
  static async getAll() {
    const [sales] = await pool.query(
      `SELECT 
      sa.id, sa.amount, sa.total, sa.createdAt, sa.userId, u.username, u.roleId, r.name, sa.productId, pr.name AS product_name 
      FROM sales sa 
      JOIN users u 
      ON sa.userId = u.id 
      JOIN roles r 
      ON u.roleId = r.id 
      JOIN products pr 
      ON sa.productId = pr.id
      `
    );

    const salesReestructured = sales.map((sale) => {
      return {
        id: sale.id,
        amount: sale.amount,
        total: sale.total,
        createdAt: sale.createdAt,
        user: {
          id: sale.userId,
          username: sale.username,
          role: {
            id: sale.roleId,
            name: sale.name,
          },
        },
        product: {
          id: sale.productId,
          name: sale.product_name,
        },
      };
    });

    return salesReestructured;
  }

  static async create(input) {
    const { userId, productId, amount, total } = input;

    const [result] = await pool.query(
      "INSERT INTO sales (userId, productId, amount, total) VALUES (?, ?, ?, ?)",
      [userId, productId, amount, total]
    );

    return result;
  }

  static async salesByShift({start_time, end_time, date}) {
    const [sales] = await pool.query(
      `
      SELECT 
      sa.id, sa.amount, sa.total, sa.createdAt, sa.userId, u.username, u.roleId, r.name, sa.productId, pr.name AS product_name 
      FROM sales sa 
      JOIN users u 
      ON sa.userId = u.id 
      JOIN roles r 
      ON u.roleId = r.id 
      JOIN products pr 
      ON sa.productId = pr.id
      WHERE TIME(sa.createdAt) BETWEEN ? AND ? 
      AND DATE(sa.createdAt) = ?
      `,
      [start_time, end_time, date]
    );

    const salesReestructured = sales.map((sale) => {
      return {
        id: sale.id,
        amount: sale.amount,
        cost: sale.cost,
        createdAt: sale.createdAt,
        user: {
          id: sale.userId,
          username: sale.username,
          role: {
            id: sale.roleId,
            name: sale.name,
          },
        },
        product: {
          id: sale.productId,
          name: sale.product_name,
        },
      };
    });

    return salesReestructured;
  }
}
