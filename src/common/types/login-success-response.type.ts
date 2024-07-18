import { Role } from '@/common/types/role.type';
import { SuccessResponse } from '@/common/types/success-response.type';

export type LoginSuccessResponse = SuccessResponse<{
  id: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}>;
