import { AuthorSearchParams } from '@/common/types/api/author/author-search-params.type';
import { Author } from '@/common/types/api/author/author.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { HttpClient } from '@/lib/http/core.http';

class AuthorHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getAllAuthors(params?: AuthorSearchParams) {
    return this.get<SuccessResponse<Author[]>>('/authors', {
      params,
    });
  }

  public getAuthorById(id: string) {
    return this.get<SuccessResponse<Author>>(`/authors/${id}`);
  }
}

const authorHttpClient = new AuthorHttpClient();
export { authorHttpClient, AuthorHttpClient };
