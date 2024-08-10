import { Checkout } from '@/common/types/api/checkout/checkout.type';
import { FineStatus } from '@/common/types/api/fine/fine-status.type';

export interface Fine {
  id: string;
  checkout: Checkout;
  status: FineStatus;
  createdTimestamp: string;
  amount: number;
}
