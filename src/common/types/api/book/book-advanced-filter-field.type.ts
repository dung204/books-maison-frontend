import { BookAdvancedFilterData } from '@/common/types/api/book/book-advanced-filter-data.type';

export type BookAdvancedFilterField =
  | Exclude<
      keyof BookAdvancedFilterData,
      'publishedYearFrom' | 'publishedYearTo' | 'minPages' | 'maxPages'
    >
  | 'publishedYear'
  | 'pages';
