import { Request, Response } from "express";
import { adminService } from "./admin.service";
const pick=(obj,keys)=>{

}
const getAllFromDB = async (req: Request, res: Response) => {
  try {
    pick(req.query, ["searchTerm", "name", "email"]);
    const result = await adminService.getAllFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully!",
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};
export const adminController = {
  getAllFromDB,
};
