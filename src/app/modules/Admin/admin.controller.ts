import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

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
const updateIntoDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
      const result = await adminService.updateIntoDB(id, req.body);
      sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Admin data updated!",
          data: result
      })
  }
  catch (err) {
      next(err)
  }
};


const deleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
      const result = await adminService.deleteFromDB(id);
      sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Admin data deleted!",
          data: result
      })
  }
  catch (err) {
      next(err)
  }
};

const softDeleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
      const result = await adminService.softDeleteFromDB(id);
      sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Admin data deleted!",
          data: result
      })
  }
  catch (err) {
      next(err)
  }
};
export const adminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB
};
