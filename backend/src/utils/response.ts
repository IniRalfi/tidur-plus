export const successResponse = (data: unknown, message = "Berhasil") => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message = "Terjadi kesalahan", code = 500) => ({
  success: false,
  message,
  code,
});

export const paginatedResponse = (
  data: unknown,
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  },
  message = "Berhasil"
) => ({
  success: true,
  message,
  data,
  meta,
});
