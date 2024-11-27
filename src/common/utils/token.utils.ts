export class TokenUtils {
  private static readonly textEncoder = new TextEncoder();

  public static getJwtAccessSecret() {
    return this.textEncoder.encode(
      process.env['NEXT_PUBLIC_JWT_ACCESS_SECRET']!,
    );
  }

  public static getJwtRefreshSecret() {
    return this.textEncoder.encode(
      process.env['NEXT_PUBLIC_JWT_REFRESH_SECRET']!,
    );
  }
}
