import { pool } from "../db.js";
import bcrypt from "bcryptjs";

// create a model class for users, with methods for CRUD operations on the users table
export class UserModel {
  static async getAll() {
    const [users] = await pool.query(
      `
      SELECT users.id, users.username, users.roleId, roles.name 
      FROM users 
      JOIN roles 
      ON users.roleId = roles.id
      `);

    const usersReestructured = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: {
          id: user.roleId,
          name: user.name,
        },
      };
    });

    return usersReestructured;
  }

  static async getById(id) {
    const [userFound] = await pool.query(
      `
      SELECT users.id, users.username, users.roleId, roles.name 
      FROM users 
      JOIN roles 
      ON users.roleId = roles.id 
      WHERE users.id = ?
      `, 
      [id]
    );

    if (!userFound[0]) return null;

    const userReestructured = {
      id: userFound[0].id,
      username: userFound[0].username,
      role: {
        id: userFound[0].roleId,
        name: userFound[0].name,
      },
    };

    return userReestructured;
  }

  static async getByUsername(username) {
    const [userFound] = await pool.query(
      `
      SELECT users.id, users.username, users.roleId, users.password, roles.name 
      FROM users 
      JOIN roles 
      ON users.roleId = roles.id 
      WHERE users.username = ?
      `, 
      [username]
    );

    if (!userFound[0]) return null;

    const userReestructured = {
      id: userFound[0].id,
      username: userFound[0].username,
      password: userFound[0].password,
      role: {
        id: userFound[0].roleId,
        name: userFound[0].name,
      },
    };

    return userReestructured;
  }

  static async create(input) {
    const {
      username,
      password,
      role,
    } = input;

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (username, password, roleId) VALUES (?, ?, ?)", [username, passwordHash, role]
    );
    
    return result;
  }
}
