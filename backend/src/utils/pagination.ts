export const getPagination = (page = 1, limit = 10) => {
  const take = limit;
  const skip = (page - 1) * limit;
  return { take, skip };
};

export const getTotalPages = (total: number, limit: number) =>
  Math.ceil(total / limit);

export const getPaginationMeta = (
  total: number,
  page: number,
  limit: number
) => ({
  total,
  page,
  limit,
  totalPages: getTotalPages(total, limit),
});