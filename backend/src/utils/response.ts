<<<<<<< HEAD
export function success<T>(data: T, message = 'OK') {
  return { success: true, message, data }
}

export function error(message: string, statusCode = 400) {
  return { success: false, message, statusCode }
}

export function paginated<T>(data: T[], total: number, page: number, limit: number) {
  return {
    success: true,
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  }
}
=======
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
>>>>>>> backend
