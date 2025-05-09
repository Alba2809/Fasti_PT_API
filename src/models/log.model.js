import { pool } from "../db.js";

export class LogModel {
  static async getAll() {
    const [logs] = await pool.query(
      `
      SELECT l.id, l.userId, l.action, l.createdAt, u.username, u.roleId, r.name 
      FROM logs l 
      JOIN users u 
      ON l.userId = u.id
      JOIN roles r 
      ON u.roleId = r.id
      ORDER BY l.createdAt DESC
      `
    );

    const logsReestructured = logs.map((log) => {
      return {
        id: log.id,
        user: {
          id: log.userId,
          username: log.username,
          role: {
            id: log.roleId,
            name: log.name,
          },
        },
        action: log.action,
        createdAt: log.createdAt,
      };
    });

    return logsReestructured;
  }

  static async create(userId, action) {
    const [result] = await pool.query(
      "INSERT INTO logs (userId, action) VALUES (?, ?)",
      [userId, action]
    );

    return result;
  }
}
