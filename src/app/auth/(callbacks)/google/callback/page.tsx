import { GoogleAuthContainer } from '@/containers/auth/google-auth.container';
import {
  googleCallbackStateValidatorSchema,
  googleCallbackValidatorSchema,
} from '@/lib/validators';

interface GoogleCallbackPageProps {
  searchParams: Promise<unknown>;
}

export default async function GoogleCallbackPage(
  props: GoogleCallbackPageProps,
) {
  const { code, state } = googleCallbackValidatorSchema.parse(
    await props.searchParams,
  );
  const { action, redirectUri } = googleCallbackStateValidatorSchema.parse(
    JSON.parse(atob(state)),
  );

  return (
    <GoogleAuthContainer
      code={code}
      action={action}
      redirectUri={redirectUri}
    />
  );
}
