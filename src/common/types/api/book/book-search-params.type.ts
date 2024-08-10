import { BookAdvancedFilterData } from '@/common/types/api/book/book-advanced-filter-data.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';

export type BookSearchParams = CommonSearchParams &
  Partial<Omit<BookAdvancedFilterData, 'categoryIds'>> & {
    title?: string;
    categoryId?: string | string[];
  };
