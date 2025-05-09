import bcrypt from "bcryptjs";
import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";
import { ProductModel } from "../models/product.model.js";

// insert the initial roles, users, and products into the database

export const createRoles = async () => {
  try {
    const roles = await RoleModel.getAll();
    const count = roles.length;

    if (count > 0) return;

    await Promise.all([
      RoleModel.create("gerente"),
      RoleModel.create("cajero"),
    ]);

    console.log("Roles de prueba insertados");
  } catch (error) {
    console.log(error);
  }
};

export const createUsers = async () => {
  try {
    const users = await UserModel.getAll();
    const roles = await RoleModel.getAll();
    const count = users.length;

    if (+count > 0) return;

    await Promise.all([
      UserModel.create({
        username: "gerente",
        password: await bcrypt.hash("gerente123", 10),
        role: roles.find((role) => role.name === "gerente").id,
      }),
      UserModel.create({
        username: "cajero1",
        password: await bcrypt.hash("cajero123", 10),
        role: roles.find((role) => role.name === "cajero").id,
      }),
      UserModel.create({
        username: "cajero2",
        password: await bcrypt.hash("cajero123", 10),
        role: roles.find((role) => role.name === "cajero").id,
      }),
    ]);

    console.log("Usuarios de prueba insertados");
  } catch (error) {
    console.log(error);
  }
};

export const createProducts = async () => {
  try {
    const products = await ProductModel.getAll();

    if (products.length > 0) return;
    
    await Promise.all([
      ProductModel.create({
        name: "Galletas",
        current_stock: 10,
        max_stock: 20,
        entrances: 0,
        exits: 0,
        purchase_cost: 10,
        sale_cost: 15,
      }),

      ProductModel.create({
        name: "Chocolates",
        current_stock: 5,
        max_stock: 30,
        entrances: 0,
        exits: 0,
        purchase_cost: 12,
        sale_cost: 18,
      }),

      ProductModel.create({
        name: "Jugos",
        current_stock: 8,
        max_stock: 50,
        entrances: 0,
        exits: 0,
        purchase_cost: 5,
        sale_cost: 8,
      }),

      ProductModel.create({
        name: "Pan",
        current_stock: 15,
        max_stock: 40,
        entrances: 0,
        exits: 0,
        purchase_cost: 3,
        sale_cost: 5,
      }),

      ProductModel.create({
        name: "Leche",
        current_stock: 20,
        max_stock: 50,
        entrances: 0,
        exits: 0,
        purchase_cost: 7,
        sale_cost: 10,
      }),

      ProductModel.create({
        name: "Cereal",
        current_stock: 12,
        max_stock: 30,
        entrances: 0,
        exits: 0,
        purchase_cost: 8,
        sale_cost: 12,
      }),

      ProductModel.create({
        name: "Café",
        current_stock: 25,
        max_stock: 60,
        entrances: 0,
        exits: 0,
        purchase_cost: 6,
        sale_cost: 9,
      }),

      ProductModel.create({
        name: "Yogur",
        current_stock: 18,
        max_stock: 40,
        entrances: 0,
        exits: 0,
        purchase_cost: 4,
        sale_cost: 6,
      }),

      ProductModel.create({
        name: "Frutas",
        current_stock: 30,
        max_stock: 100,
        entrances: 0,
        exits: 0,
        purchase_cost: 2,
        sale_cost: 4,
      }),

      ProductModel.create({
        name: "Verduras",
        current_stock: 22,
        max_stock: 60,
        entrances: 0,
        exits: 0,
        purchase_cost: 3,
        sale_cost: 5,
      }),
    ]);

    console.log("Productos de prueba insertados");
  } catch (error) {
    console.log("Error al insertar los productos: " + error);
  }
};
