import { pool } from "../db.js";

export class ShiftModel {
  static async getAll() {
    const [shifts] = await pool.query(`SELECT * FROM shifts`);

    return shifts;
  }

  static async getById(id) {
    const [shift] = await pool.query(`SELECT * FROM shifts WHERE id = ?`, [id]);

    return shift;
  }
}
