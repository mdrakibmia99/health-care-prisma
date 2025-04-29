import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { DoctorService } from "./doctor.service";
import pick from "../../shared/pick";
import { doctorFilterableFields } from "./doctor.constant";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, doctorFilterableFields);

    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await DoctorService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Doctors retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Doctor retrieval successfully',
        data: result,
    });
});
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await DoctorService.updateIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor data updated!",
        data: result
    })
});

export const DoctorController = {
    updateIntoDB,
    getAllFromDB,
    getByIdFromDB

}