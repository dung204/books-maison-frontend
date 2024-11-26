import type { Book } from '@/common/types/api/book';
import { CheckoutStatus } from '@/common/types/api/checkout';
import type { User } from '@/common/types/api/user';

export interface Checkout {
  id: string;
  user: User;
  book: Book;
  status: CheckoutStatus;
  createdTimestamp: string;
  dueTimestamp: string;
  returnedTimestamp: string | null;
  note: string | null;
}
