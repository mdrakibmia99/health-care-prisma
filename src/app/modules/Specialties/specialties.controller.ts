import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { SpecialtiesService } from "./specialties.service";
import { Request, Response } from "express";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await SpecialtiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});
export const SpecialtiesController = {
  insertIntoDB,
};
