import type { Checkout } from '@/common/types/api/checkout';
import { FineStatus } from '@/common/types/api/fine';

export interface Fine {
  id: string;
  checkout: Checkout;
  status: FineStatus;
  createdTimestamp: string;
  amount: number;
}
