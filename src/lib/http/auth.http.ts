import {
  LoginSuccessResponse,
  RefreshSuccessResponse,
  SuccessResponse,
} from '@/common/types';
import { User } from '@/common/types/api/user';
import { HttpClient } from '@/lib/http';
import { LoginSchema, RegisterSchema } from '@/lib/validators';

class AuthHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public login(data: LoginSchema) {
    return this.post<LoginSuccessResponse>('/auth/login', data);
  }

  public register(data: RegisterSchema) {
    return this.post<SuccessResponse<User>>('/auth/register', data);
  }

  public logout(accessToken: string) {
    return this.delete('/auth/logout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public refreshToken(refreshToken: string) {
    return this.post<RefreshSuccessResponse>('/auth/refresh', {
      refreshToken,
    });
  }
}

const authHttpClient = new AuthHttpClient();
export { authHttpClient, AuthHttpClient };
