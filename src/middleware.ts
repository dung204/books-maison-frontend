import { HttpStatusCode } from 'axios';
import * as jose from 'jose';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';
import { pathToRegexp } from 'path-to-regexp';

import type { RefreshSuccessResponse } from '@/common/types';

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
    try {
      await jose.jwtVerify(accessToken, jwtAccessSecret);

      if (isAuthRoute) {
        redirectUrl.pathname = '/';
        return NextResponse.redirect(redirectUrl);
      }

      return NextResponse.next();
    } catch (accessTokenError) {
      try {
        await jose.jwtVerify(refreshToken, jwtRefreshSecret);

        const {
          data: { refreshToken: newRefreshToken, accessToken: newAccessToken },
        } = await handleRefreshToken(refreshToken);

        if (isAuthRoute) {
          redirectUrl.pathname = '/';
          return NextResponse.redirect(redirectUrl);
        }

        return setTokens(request.nextUrl, newAccessToken, newRefreshToken);
      } catch (refreshTokenError) {
        if (isPrivateRoute) {
          redirectUrl.pathname = '/auth/login';

          return deleteTokens(redirectUrl);
        }

        return deleteTokens(request.nextUrl);
      }
    }
  }

  if (isPrivateRoute) {
    redirectUrl.pathname = '/auth/login';
    return deleteTokens(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

async function handleRefreshToken(refreshToken: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refreshToken`,
    {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    },
  );
  return res.json() as Promise<RefreshSuccessResponse>;
}

function setTokens(url: NextURL, accessToken: string, refreshToken: string) {
  return NextResponse.redirect(url, {
    status: HttpStatusCode.Ok,
    // @ts-expect-error
    headers: {
      'Set-Cookie': [
        `accessToken=${accessToken}; Path=/; Secure; Max-Age=31536000; HttpOnly; SameSite=Lax`,
        `refreshToken=${refreshToken}; Path=/; Secure; Max-Age=31536000; HttpOnly; SameSite=Lax`,
      ],
    },
  });
}

function deleteTokens(url: NextURL) {
  return NextResponse.redirect(url, {
    status: HttpStatusCode.NoContent,
    // @ts-expect-error
    headers: {
      'Set-Cookie': [
        `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      ],
    },
  });
}
