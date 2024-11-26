export class PaginationUtils {
  public static readonly DEFAULT_PAGE = 1;
  public static readonly DEFAULT_PAGE_SIZE = 10;

  public static isValidPageNumber(page: string) {
    return /^\d+$/g.test(page) && +page >= 1;
  }

  public static isValidPageSize(pageSize: string) {
    return /^\d+$/g.test(pageSize) && +pageSize >= 1;
  }
}
