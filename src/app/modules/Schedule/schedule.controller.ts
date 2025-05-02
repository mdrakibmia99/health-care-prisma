
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

const getAllFromDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ['startDate', 'endDate']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const user = req.user;
    const result = await ScheduleService.getAllFromDB(filters, options, user as IAuthUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule fetched successfully!",
        data: result
    });
});
const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.inserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});
export const DoctorScheduleController = {
    insertIntoDB,
    getAllFromDB
   
};