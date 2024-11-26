import { SuccessResponse } from '@/common/types';
import { Category, CategorySearchParams } from '@/common/types/api/category';
import { HttpClient } from '@/lib/http';

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
