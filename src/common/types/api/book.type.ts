import { Author } from '@/common/types/api/author.type';
import { Category } from '@/common/types/api/category.type';

export interface Book {
  id: string;
  isbn: string | null;
  title: string;
  categories: Category[];
  authors: Author[];
  publishedYear: number | null;
  publisher: string | null;
  language: string | null;
  numberOfPages: number | null;
  imageUrl: string | null;
  description: string | null;
  quantity: number;
  createdTimestamp: string;
}
