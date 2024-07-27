import { Book } from '@/common/types/api/book.type';
import { CheckoutStatus } from '@/common/types/api/checkout-status.type';
import { User } from '@/common/types/api/user.type';

export interface Checkout {
  id: string;
  user: User;
  book: Book;
  status: 'RENTING' | 'RETURNED' | 'OVERDUE';
  createdTimestamp: string;
  dueTimestamp: string;
  returnedTimestamp: string | null;
  note: string | null;
}
