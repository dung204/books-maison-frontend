import { TransactionMethod } from '@/common/types/api/transaction';
import type { User } from '@/common/types/api/user';

export interface Transaction {
  id: string;
  user: User;
  amount: number;
  method: TransactionMethod;
  createdTimestamp: string;
  purchaseUrl: string;
}
