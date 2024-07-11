import { type Pagination } from '@/common/types/pagination.type';

export interface SuccessResponse<T> {
  data: T;
  pagination?: Pagination;
}
