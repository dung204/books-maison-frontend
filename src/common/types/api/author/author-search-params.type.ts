import { CommonSearchParams } from '@/common/types/common-search-params.type';

export interface AuthorSearchParams extends CommonSearchParams {
  name?: string;
  yearOfBirthFrom?: string;
  yearOfBirthTo?: string;
  yearOfDeathFrom?: string;
  yearOfDeathTo?: string;
  nationality?: string;
}
