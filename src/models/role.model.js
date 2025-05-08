import { pool } from "../db.js";

export class RoleModel {
  static async getAll() {
    const [roles] = await pool.query("SELECT * FROM roles");

    return roles
  }

  static async getById(id) {
     const [foundRol] = await pool.query("SELECT * FROM roles WHERE id = ?", [
        id,
      ]);

    return foundRol[0];
  }

  static async create(name) {
    const [result] = await pool.query("INSERT INTO roles (name) VALUES (?)", [name]);

    return result;
  }
}
