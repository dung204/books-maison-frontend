import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import { Book } from '@/common/types/api/book/book.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { HttpClient } from '@/lib/http/core.http';

class FavouriteBookHttpClient extends HttpClient {
  constructor() {
    super();
  }

  getAllFavouriteBooksOfCurrentUser(
    accessToken: string,
    params: BookSearchParams,
  ) {
    return this.get<SuccessResponse<Book[]>>('/me/books/favourite', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public addBookToFavourite(accessToken: string, bookId: string) {
    return this.post<void>(`/me/books/favourite/${bookId}`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public removeBookFromFavourite(accessToken: string, bookId: string) {
    return this.delete<void>(`/me/books/favourite/${bookId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public checkHasFavoured(accessToken: string, bookId: string) {
    return this.get<SuccessResponse<boolean>>(
      `/favourite-books/check/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}

const favouriteBookHttpClient = new FavouriteBookHttpClient();
export { favouriteBookHttpClient, FavouriteBookHttpClient };
