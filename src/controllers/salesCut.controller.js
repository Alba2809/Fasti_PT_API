import { SaleModel } from "../models/sale.model.js";
import { SalesCutModel } from "../models/salesCut.model.js";
import { ShiftModel } from "../models/shift.model.js";

export const getAll = async (req, res) => {
  try {
    const salesCuts = await SalesCutModel.getAll();

    res.status(200).json(salesCuts);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los cortes de ventas."]);
  }
};

export const create = async (req, res) => {
  try {
    const { shiftId, date } = req.body;
    const userId = req.user.id;

    if ( !userId ) return res.status(400).json(["Autenticación requerida."]);

    // check if the shift exists
    const shift = await ShiftModel.getById(shiftId);

    if ( !shift ) return res.status(400).json(["Turno no encontrado."]);

    // get sales made by the shift, between the start and end time of the shift and the date
    const sales = await SaleModel.salesByShift({ start_time: shift.start_time, end_time: shift.end_time, date });

    // calculate the total sold
    const totalSold = sales.reduce((acc, sale) => acc + sale.total, 0);

    // create the sales cut
    const result = await SalesCutModel.create({
      userId,
      shiftId,
      totalSold,
      date
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(["Hubo un error al crear el corte de ventas."]);
  }
};