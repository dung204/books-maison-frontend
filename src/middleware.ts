import axios from 'axios';
import { secondsToMilliseconds } from 'date-fns';
import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { pathToRegexp } from 'path-to-regexp';

import { RefreshSuccessResponse } from '@/common/types/refresh-success-response.type';

const privateRoutes = ['/me/:path', '/me'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const redirectUrl = request.nextUrl.clone();
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isAuthRoute = pathToRegexp('/auth/:path').test(pathname);
  const isPrivateRoute = privateRoutes.some(route =>
    pathToRegexp(route).test(pathname),
  );
  const jwtAccessSecret = new TextEncoder().encode(
    process.env['NEXT_PUBLIC_JWT_ACCESS_SECRET']!,
  );
  const jwtRefreshSecret = new TextEncoder().encode(
    process.env['NEXT_PUBLIC_JWT_REFRESH_SECRET']!,
  );

  if (accessToken && refreshToken) {
    if (isAuthRoute) {
      redirectUrl.pathname = '/';
      return NextResponse.redirect(redirectUrl);
    }

    try {
      await jose.jwtVerify(accessToken, jwtAccessSecret);
      const { exp } = jose.decodeJwt(accessToken);

      if (secondsToMilliseconds(exp!) < Date.now()) throw new Error();

      return NextResponse.next();
    } catch (accessTokenError) {
      try {
        await jose.jwtVerify(refreshToken, jwtRefreshSecret);
        const response = await axios.post<RefreshSuccessResponse>(
          `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/auth/refresh`,
          { refreshToken },
        );
        const { exp } = jose.decodeJwt(refreshToken);

        if (secondsToMilliseconds(exp!) < Date.now()) throw new Error();

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;
        return NextResponse.redirect(request.nextUrl, {
          // @ts-ignore
          headers: {
            'Set-Cookie': [
              `accessToken=${newAccessToken}; Path=/; Secure; Max-Age=31536000; HttpOnly; SameSite=Lax`,
              `refreshToken=${newRefreshToken}; Path=/; Secure; Max-Age=31536000; HttpOnly; SameSite=Lax`,
            ],
          },
        });
      } catch (refreshTokenError) {
        redirectUrl.pathname = '/auth/login';
        return NextResponse.redirect(redirectUrl, {
          // @ts-ignore
          headers: {
            'Set-Cookie': [
              `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
              `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
            ],
          },
        });
      }
    }
  }

  if (isPrivateRoute) {
    redirectUrl.pathname = '/auth/login';
    return NextResponse.redirect(redirectUrl, {
      // @ts-ignore
      headers: {
        'Set-Cookie': [
          `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
          `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        ],
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
