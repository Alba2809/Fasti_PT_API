import { UserModel } from "../models/user.model.js";

// middleware function to validate the user's role, if the user is authenticated and the role is authorized then proceed to the next middleware function, otherwise return a 401 Unauthorized error
const validateRol = (rolAuth) => async (req, res, next) => {
  try {
    const userFound = await UserModel.getById(req.user.id);

    if (Array.isArray(rolAuth)) {
      if (!rolAuth.includes(userFound.role.name)) {
        return res.status(401).json(["Not found"]);
      }
    } else {
      if (rolAuth !== userFound.role.name)
        return res.status(401).json(["Not found"]);
    }
    next();
  } catch (error) {
    return res.status(400).json(["Error en el servidor."]);
  }
};

export default validateRol;