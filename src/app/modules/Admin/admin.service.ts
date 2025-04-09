import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getAllFromDB = async (query: any) => {
  const andCondition: Prisma.AdminWhereInput[] = [];
  const adminSearchableFields = ["name", "email"];
  if (query?.searchTerm) {
    andCondition.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: { contains: query.searchTerm, mode: "insensitive" },
      })),
    });
  }
  const whereCondition: Prisma.AdminWhereInput = {
    AND: andCondition,
  };
  const result = await prisma.admin.findMany({
    where: whereCondition,
  });
  return result;
};

export const adminService = {
  getAllFromDB,
};
