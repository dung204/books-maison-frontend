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
    return this.get<SuccessResponse<Book[]>>('/me/favourite-books', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public addBookToFavourite(accessToken: string, bookId: string) {
    return this.post<void>(`/favourite-books/add/${bookId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public removeBookFromFavourite(accessToken: string, bookId: string) {
    return this.delete<void>(`/favourite-books/delete/${bookId}`, {
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
