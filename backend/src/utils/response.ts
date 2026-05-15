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
