import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await adminService.getAllFromDB();
  res.status(200).json({
    success: true,
    message: "Admin fetched successfully!",
    data: result,
  });
};
export const adminController = {
  getAllFromDB,
};
