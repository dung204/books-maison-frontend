import { User } from '@/common/types/api/user/user.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { HttpClient } from '@/lib/http/core.http';
import { ChangePasswordSchema } from '@/lib/validators/change-password.validator';
import { UpdateProfileSchema } from '@/lib/validators/update-profile.validator';

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
