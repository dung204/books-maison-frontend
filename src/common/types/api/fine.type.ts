import { Checkout } from '@/common/types/api/checkout.type';
import { FineStatus } from '@/common/types/api/fine-status.type';

export interface Fine {
  id: string;
  checkout: Checkout;
  status: FineStatus;
  createdTimestamp: string;
  amount: number;
}
