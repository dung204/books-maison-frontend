import { type Pagination } from '@/common/types/pagination.type';

export type SuccessResponse<T> = T extends any[]
  ? {
      data: T;
      pagination: Pagination;
    }
  : { data: T };
