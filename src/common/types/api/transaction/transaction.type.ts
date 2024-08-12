import { TransactionMethod } from '@/common/types/api/transaction/transaction-method.type';
import { User } from '@/common/types/api/user/user.type';

export interface Transaction {
  id: string;
  user: User;
  amount: number;
  method: TransactionMethod;
  createdTimestamp: string;
  purchaseUrl: string;
}
