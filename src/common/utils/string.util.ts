export class StringUtils {
  public static getFirstLettersUpperCase(str: string) {
    return (str.match(/^[A-Za-z]|(?<=\s)[A-Za-z]/g) || [])
      .map(s => s.toUpperCase())
      .join('');
  }
}
