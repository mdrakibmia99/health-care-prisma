
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";
import { IAuthUser } from "../../interfaces/common";
import { StatusCodes } from "http-status-codes";

const insertIntoDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;
    const result = await DoctorScheduleService.insertIntoDB(user, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor Schedule created successfully!",
        data: result
    });
});
export const DoctorScheduleController = {
    insertIntoDB,
   
};