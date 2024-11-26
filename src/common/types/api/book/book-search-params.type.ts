import { CommonSearchParams } from '@/common/types';
import { BookAdvancedFilterData } from '@/common/types/api/book';

export type BookSearchParams = CommonSearchParams &
  Partial<Omit<BookAdvancedFilterData, 'categoryIds'>> & {
    title?: string;
    categoryId?: string | string[];
  };
