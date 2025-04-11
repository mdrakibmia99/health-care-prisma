import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await adminService.getAllFromDB(filter, options);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully!",
      data: result.data,
      meta: result.meta,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.getByIdFromDB(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};
export const adminController = {
  getAllFromDB,
  getByIdFromDB,
};
