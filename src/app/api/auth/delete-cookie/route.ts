import { HttpStatusCode } from 'axios';

export async function DELETE(_: Request) {
  return new Response(null, {
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
