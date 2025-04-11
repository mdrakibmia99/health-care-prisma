import { Admin, Prisma } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper } from "../../helpers/paginationHelper";
import prisma from "../../shared/prisma";




const getAllFromDB = async (query: any, options: any) => {
  const { searchTerm, ...filterData } = query;
  const {page, limit, skip ,sortBy, orderBy} =paginationHelper.calculatePagination(options);
  const andCondition: Prisma.AdminWhereInput[] = [];
  // const adminSearchableFields = ["name", "email"];
  console.log(filterData, "oi kire");
  if (query?.searchTerm) {
    andCondition.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: { contains: query.searchTerm, mode: "insensitive" },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
          // mode: "insensitive",
        },
      })),
    });
  }
  const whereCondition: Prisma.AdminWhereInput = {
    AND: andCondition,
  };
  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
// const total = await prisma.admin.count({
//     where: whereCondition,})
  return {
    meta: {
      page: page,
      limit: limit,
      total:result.length, 
    },
    data:result};
};
const getByIdFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
      where: {
          id,
          isDeleted: false
      }
  })

  return result;
};
export const adminService = {
  getAllFromDB,
  getByIdFromDB
};
