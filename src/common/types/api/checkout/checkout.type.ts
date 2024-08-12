import { Book } from '@/common/types/api/book/book.type';
import { CheckoutStatus } from '@/common/types/api/checkout/checkout-status.type';
import { User } from '@/common/types/api/user/user.type';

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
