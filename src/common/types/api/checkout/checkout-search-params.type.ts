import { CommonSearchParams } from '@/common/types';
import { CheckoutStatus } from '@/common/types/api/checkout';

export interface CheckoutSearchParams extends CommonSearchParams {
  bookId?: string;
  status?: CheckoutStatus;
  fromCreatedTimestamp?: string;
  toCreatedTimestamp?: string;
  fromDueTimestamp?: string;
  toDueTimestamp?: string;
  fromReturnedTimestamp?: string;
  toReturnedTimestamp?: string;
}
