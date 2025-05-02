import prisma from "../../shared/prisma";

const insertIntoDB = async (user: any, payload: {
    scheduleIds: string[]
}) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });

    const doctorScheduleData = payload.scheduleIds.map(scheduleId => ({
        doctorId: doctorData.id,
        scheduleId
    }))

    const result = await prisma.doctorSchedules.createMany({
        data: doctorScheduleData
    });

    return result;const getByIdFromDB = async (id: string): Promise<Schedule | null> => {
        const result = await prisma.schedule.findUnique({
            where: {
                id,
            },
        });
        //console.log(result?.startDateTime.getHours() + ":" + result?.startDateTime.getMinutes())
        return result;
    };
};
const deleteFromDB = async (id: string): Promise<Schedule> => {
    const result = await prisma.schedule.delete({
        where: {
            id,
        },
    });
    return result;
};
export const DoctorScheduleService = {
    insertIntoDB,

}