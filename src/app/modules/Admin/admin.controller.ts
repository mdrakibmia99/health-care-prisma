import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await adminService.getAllFromDB(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin fetched successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin fetched successfully!",
    data: result,
  });
});
const updateIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.updateIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data updated!",
    data: result,
  });
});

const deleteFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await adminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: result,
    });
  }
);

const softDeleteFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await adminService.softDeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data deleted!",
    data: result,
  });
});
export const adminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
