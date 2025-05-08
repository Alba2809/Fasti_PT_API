import { LogModel } from "../models/log.model.js";

export const getAll = async (req, res) => {
  try {
    const logs = await LogModel.getAll();

    return res.status(200).json(logs);
  } catch (error) {
    console.log(error)
    res.status(500).json(["Hubo un error al obtener los registros."]);
  }
};
