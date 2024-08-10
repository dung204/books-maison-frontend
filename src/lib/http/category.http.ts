import { CategorySearchParams } from '@/common/types/api/category/category-search-params.type';
import { Category } from '@/common/types/api/category/category.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { HttpClient } from '@/lib/http/core.http';

class CategoryHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getAllCategories(params?: CategorySearchParams) {
    return this.get<SuccessResponse<Category[]>>('/categories', {
      params,
    });
  }

  public getCategoryById(id: string) {
    return this.get<SuccessResponse<Category>>(`/categories/${id}`);
  }
}

const categoryHttpClient = new CategoryHttpClient();
export { CategoryHttpClient, categoryHttpClient };
