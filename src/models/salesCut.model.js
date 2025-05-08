import { pool } from "../db.js";

export class SalesCutModel {
  static async getAll() {
    const [salesCuts] = await pool.query(
      `
            SELECT sc.id, sc.total_sold, sc.date, sc.createdAt, sc.userId, u.username, u.roleId, r.name, s.name AS shift_name
            FROM sales_cuts sc
            JOIN users u ON sc.userId = u.id
            JOIN roles r ON u.roleId = r.id
            JOIN shifts s ON sc.shiftId = s.id
            `
    );

    const salesCutsReestructured = salesCuts.map((salesCut) => {
      return {
        id: salesCut.id,
        totalSold: salesCut.total_sold,
        date: salesCut.date,
        createdAt: salesCut.createdAt,
        user: {
          id: salesCut.userId,
          username: salesCut.username,
          role: {
            id: salesCut.roleId,
            name: salesCut.name,
          },
        },
        shift: {
          id: salesCut.shiftId,
          name: salesCut.shift_name,
        },
      };
    });

    return salesCutsReestructured;
  }

  static async create({ userId, shiftId, totalSold, date }) {
    const [result] = await pool.query(
      "INSERT INTO sales_cuts (userId, shiftId, total_sold, date) VALUES (?, ?, ?, ?)",
      [userId, shiftId, totalSold, date]
    );

    return result;
  }

  static async getById(id) {
    const [salesCut] = await pool.query(
      `
      SELECT sc.id, sc.total_sold, sc.date, sc.createdAt, sc.userId, u.username, u.roleId, r.name, s.name AS shift_name 
      FROM sales_cuts sc
      JOIN users u ON sc.userId = u.id
      JOIN roles r ON u.roleId = r.id
      JOIN shifts s ON sc.shiftId = s.id
      WHERE sc.id = ?
      `,
      [id]
    );

    if (!salesCut) return null;

    const salesCutReestructured = {
      id: salesCut.id,
      totalSold: salesCut.total_sold,
      createdAt: salesCut.createdAt,
      user: {
        id: salesCut.userId,
        username: salesCut.username,
        role: {
          id: salesCut.roleId,
          name: salesCut.name,
        },
      },
      shift: {
        id: salesCut.shiftId,
        name: salesCut.shift_name,
      },
    };

    return salesCutReestructured;
  }
}
