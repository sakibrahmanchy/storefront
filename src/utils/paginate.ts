export function paginateResponse(data: any, page: number, limit: number) {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page === lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    success: true,
    data: [...result],
    total,
    current_page: page,
    next_page: nextPage,
    prev_page: prevPage,
    last_page: lastPage,
    total_pages: Math.ceil(total / limit),
  };
}
