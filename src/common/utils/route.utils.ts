import { type NextRouter } from 'next/router';

import type { GoogleCallbackState } from '@/lib/validators';

type RedirectOptions =
  | {
      method: 'window';
    }
  | {
      method: 'useRouter';
      router: NextRouter;
      strategy: 'push' | 'replace' | 'prefetch';
    };

export class RouteUtils {
  public static redirect(
    to: string,
    options: RedirectOptions = { method: 'window' },
  ) {
    let url = new URL(to, window.location.origin);

    if (url.origin !== window.location.origin) {
      url = new URL('/', window.location.origin);
    }

    if (options.method === 'window') {
      window.location.href = url.toString();
      return;
    }

    options.router[options.strategy](url.toString());
  }

  public static redirectToGoogleLoginPage(
    state: GoogleCallbackState,
    options: RedirectOptions = { method: 'window' },
  ) {
    const url = new URL('https://accounts.google.com/o/oauth2/auth');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set(
      'client_id',
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    );
    url.searchParams.set('scope', 'openid email profile');
    url.searchParams.set(
      'redirect_uri',
      `${window.location.origin}/auth/google/callback`,
    );
    url.searchParams.set('state', btoa(JSON.stringify(state)));

    if (options.method === 'window') {
      window.location.href = url.toString();
      return;
    }

    options.router[options.strategy](url.toString());
  }
}
