import { ShiftModel } from "../models/shift.model.js";

export const getAll = async (req, res) => {
  try {
    const shifts = await ShiftModel.getAll();

    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los turnos."]);
  }
};