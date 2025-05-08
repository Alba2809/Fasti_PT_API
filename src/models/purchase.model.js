import { pool } from "../db.js";

export class PurchaseModel {
  static async getAll() {
    const [purchases] = await pool.query(`
        SELECT pu.id, pu.amount, pu.cost, pu.createdAt, pu.userId, u.username, u.roleId, r.name, pu.productId, pr.name AS product_name 
        FROM purchases pu 
        JOIN users u 
        ON pu.userId = u.id 
        JOIN roles r 
        ON u.roleId = r.id 
        JOIN products pr 
        ON pu.productId = pr.id
        ORDER BY pu.createdAt DESC
        `);

    const purchasesReestructured = purchases.map((purchase) => {
      return {
        id: purchase.id,
        amount: purchase.amount,
        cost: purchase.cost,
        createdAt: purchase.createdAt,
        user: {
          id: purchase.userId,
          username: purchase.username,
          role: {
            id: purchase.roleId,
            name: purchase.name,
          },
        },
        product: {
          id: purchase.productId,
          name: purchase.product_name,
        },
      };
    });

    return purchasesReestructured;
  }

  static async create(input) {
    const { userId, productId, amount, cost } = input;

    const [result] = await pool.query(
      "INSERT INTO purchases (userId, productId, amount, cost) VALUES (?, ?, ?, ?)",
      [userId, productId, amount, cost]
    );

    return result;
  }
}
