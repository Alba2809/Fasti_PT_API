import { createAccessToken } from "../libs/jwt.js";
import { NODE_ENV, TOKEN_SECRET } from "../config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { LogModel } from "../models/log.model.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // find the user by username and check if the password matches
    const userFound = await UserModel.getByUsername(username);

    if (!userFound)
      return res.status(400).json(["¡Usuario o contraseña incorrectos!"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json(["¡Usuario o contraseña incorrectos!"]);

    // create a new access token for the user
    const token = await createAccessToken({ id: userFound.id });

    // set the access token cookie with the token and other options
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
    });

    // insert log in database
    await LogModel.create(userFound.id, "Inicio de sesión");

    res.json({
      ...userFound,
      token,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al iniciar sesión."]);
    console.log(error);
  }
};

export const logout = (req, res) => {
  // clear the access token cookie
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const getUser = async (req, res) => {
  try {
    const userFound = await UserModel.getById(req.user.id);

    if (!userFound) return res.status(400).json(["Usuario no encontrado."]);

    res.json(userFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los datos del usuario."]);
  }
};

export const verifyToken = async (req, res) => {
  // verify the access token in the request cookies
  const { token } = req.cookies;

  if (!token) return res.status(401).json(["Unauthorized"]);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["Unauthorized"]);

    const userFound = await UserModel.getById(user.id);

    if (!userFound) return res.status(401).json(["Unauthorized"]);

    return res.json(userFound);
  });
};
