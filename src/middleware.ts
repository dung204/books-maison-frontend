import axios from 'axios';
import { millisecondsToSeconds } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { pathToRegexp } from 'path-to-regexp';

import { RefreshSuccessResponse } from '@/common/types/refresh-success-response.type';

const privateRoutes = ['/me'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const redirectUrl = request.nextUrl.clone();
  const accessToken = request.cookies.get('accessToken')?.value;
  const isAuthRoute = pathname.startsWith('/auth');
  const isPrivateRoute = privateRoutes.some(route =>
    pathToRegexp(route).test(pathname),
  );

  if (isAuthRoute && accessToken) {
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  if (isPrivateRoute && !accessToken) {
    redirectUrl.pathname = '/auth/login';
    return NextResponse.redirect(redirectUrl);
  }

  if (isPrivateRoute && accessToken) {
    try {
      const { exp } = jwtDecode(accessToken);
      if (exp! < millisecondsToSeconds(Date.now())) {
        const refreshToken = request.cookies.get('refreshToken')?.value;
        if (refreshToken) {
          const res = await axios.post<RefreshSuccessResponse>(
            `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/api/v1/auth/refresh`,
            { refreshToken },
          );

          await axios.post('/api/auth/set-cookie', res.data);
          return NextResponse.next();
        }
        redirectUrl.pathname = '/auth/login';
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      redirectUrl.pathname = '/auth/login';
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: ['/auth/(.*)', '/me'],
};
