import { Checkout } from '@/common/types/api/checkout.type';

export interface Fine {
  id: string;
  checkout: Checkout;
  status: 'ISSUED' | 'CANCELLED' | 'PAID';
  createdTimestamp: string;
  amount: number;
}
