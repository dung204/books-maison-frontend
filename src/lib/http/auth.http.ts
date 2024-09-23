import { User } from '@/common/types/api/user/user.type';
import { LoginSuccessResponse } from '@/common/types/login-success-response.type';
import { RefreshSuccessResponse } from '@/common/types/refresh-success-response.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { HttpClient } from '@/lib/http/core.http';
import { LoginSchema } from '@/lib/validators/login.validator';
import { RegisterSchema } from '@/lib/validators/register.validator';

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
