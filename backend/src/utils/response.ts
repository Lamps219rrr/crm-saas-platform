export const createSuccessResponse = (data: any, message: string = 'Success') => {
  return {
    status: 'success',
    message,
    data,
  }
}

export const createPaginatedResponse = (
  data: any[],
  page: number,
  limit: number,
  total: number,
) => {
  const totalPages = Math.ceil(total / limit)
  return {
    status: 'success',
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  }
}

export const formatError = (message: string, code?: string) => {
  return {
    status: 'error',
    message,
    code,
  }
}
