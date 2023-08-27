export function generatePagination<T>(data: T[], page: number, limit: number, total: number){
   return {
    data,
    pagination: {
        page,
        limit,
        total
    }
   }
}