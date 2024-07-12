import { HttpStatusCode } from 'axios';

import { LoginSuccessResponse } from '@/common/types/login-success-response.type';

export async function POST(request: Request) {
  const res = (await request.json()) as LoginSuccessResponse;
  const { accessToken, refreshToken } = res.data;

  if (!accessToken)
    return Response.json(
      { message: 'Access token not available.' },
      { status: HttpStatusCode.BadRequest },
    );

  return Response.json(
    { res },
    {
      status: HttpStatusCode.Ok,
      // @ts-ignore
      headers: {
        'Set-Cookie': [
          `accessToken=${accessToken}; Path=/; Secure; Max-Age=31536000; HttpOnly; SameSite=Lax`,
          `refreshToken=${refreshToken}; Path=/; Secure; Max-Age=31536000; HttpOnly; SameSite=Lax`,
        ],
      },
    },
  );
}
