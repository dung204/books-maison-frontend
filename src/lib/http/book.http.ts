import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import { Book } from '@/common/types/api/book/book.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { HttpClient } from '@/lib/http/core.http';

class BookHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getAllBooks(params?: BookSearchParams, accessToken?: string) {
    return this.get<SuccessResponse<Book[]>>('/books', {
      params,
      headers: {
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    });
  }

  public getBookById(id: string, accessToken?: string) {
    return this.get<SuccessResponse<Book>>(`/books/${id}`, {
      headers: {
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    });
  }
}

const bookHttpClient = new BookHttpClient();
export { BookHttpClient, bookHttpClient };
