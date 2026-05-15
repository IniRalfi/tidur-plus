export function getPaginationParams(query: Record<string, string | undefined>) {
  const page  = Math.max(1, Number(query.page)  || 1)
  const limit = Math.min(100, Number(query.limit) || 10)
  const skip  = (page - 1) * limit
  return { page, limit, skip }
}
