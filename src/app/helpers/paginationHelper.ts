type IOptions={
    page?: number;
    limit?: number;
    orderBy?: string;
    sortBy?: string;
  }
  type IOptionResult={
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    orderBy: string;
  }
const calculatePagination = (options: IOptions):IOptionResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * Number(limit);
  const sortBy: string = options.sortBy || "createdAt";
  const orderBy: string = options.orderBy || "desc";
  return { page, limit, skip, sortBy, orderBy };
};
export const paginationHelper = {
    calculatePagination
}
