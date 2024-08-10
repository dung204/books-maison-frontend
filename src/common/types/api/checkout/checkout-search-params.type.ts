import { CheckoutStatus } from '@/common/types/api/checkout/checkout-status.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';

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
