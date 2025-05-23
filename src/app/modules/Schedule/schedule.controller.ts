import { Request, RequestHandler, Response } from "express";

import { IAuthUser } from "../../interfaces/common";
import catchAsync from "../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import pick from "../../shared/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.insertIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: RequestHandler & { user?: IAuthUser } & any, res: Response) => {
    const filters = pick(req.query, ['startDate', 'endDate']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const user = req.user;
    const result = await ScheduleService.getAllFromDB(filters, options, user as IAuthUser);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Schedule fetched successfully!",
        data: result
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Schedule retrieval successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Schedule deleted successfully',
        data: result,
    });
});


export const ScheduleController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB
};