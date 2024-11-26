import { SuccessResponse } from '@/common/types';
import { User } from '@/common/types/api/user';
import { HttpClient } from '@/lib/http';
import { ChangePasswordSchema, UpdateProfileSchema } from '@/lib/validators';

class UserHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getUserProfile(accessToken: string) {
    return this.get<SuccessResponse<User>>('/me/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public updateProfile(accessToken: string, data: UpdateProfileSchema) {
    return this.patch<SuccessResponse<User>>('/me/profile', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public changePassword(
    accessToken: string,
    data: Omit<ChangePasswordSchema, 'confirmPassword'>,
  ) {
    return this.patch('/me/password', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

const userHttpClient = new UserHttpClient();
export { UserHttpClient, userHttpClient };
