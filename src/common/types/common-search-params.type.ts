import { PaginationSearchParams } from '@/common/types/pagination-search-params.type';
import { SortingSearchParams } from '@/common/types/sorting-search-params.type';

export interface CommonSearchParams
  extends PaginationSearchParams,
    SortingSearchParams {}
