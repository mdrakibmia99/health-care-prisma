import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { appointmentFilterableFields } from "./appointement.interface";
import { AppointmentService } from "./appointement.services";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, appointmentFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AppointmentService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Appointment retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const AppointmentController = {
    getAllFromDB,
}