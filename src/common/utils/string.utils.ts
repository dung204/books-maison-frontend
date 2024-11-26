export class StringUtils {
  public static getFirstLettersUpperCase(str: string) {
    return (str.match(/^[A-Za-z]|(?<=\s)[A-Za-z]/g) || [])
      .map(s => s.toUpperCase())
      .join('');
  }

  public static toProperCase(str: string) {
    return str
      .toLowerCase()
      .replaceAll(/\b[a-z]/g, letter => letter.toUpperCase());
  }
}
