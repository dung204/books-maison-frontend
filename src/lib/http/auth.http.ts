import { type AxiosError, HttpStatusCode } from 'axios';

import type {
  LoginSuccessResponse,
  RefreshSuccessResponse,
  SuccessResponse,
} from '@/common/types';
import type { User } from '@/common/types/api/user';
import { HttpClient } from '@/lib/http';
import type { LoginSchema, RegisterSchema } from '@/lib/validators';

class AuthHttpClient extends HttpClient {
  constructor() {
    super();
    this.axiosInstance.interceptors.response.clear();
    this.axiosInstance.interceptors.response.use(
      this.onResponseSuccess,
      this.onResponseFailed,
    );
  }

  protected async onResponseFailed(error: AxiosError) {
    await super.onResponseFailed(error);

    if (typeof window !== 'undefined') {
      const { toast } = await import('sonner');

      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          toast.error('Email or password is incorrect!');
          break;

        case HttpStatusCode.Conflict:
          toast.error('Email already taken!');
          break;
      }
    }
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
