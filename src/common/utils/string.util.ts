export class StringUtils {
  public static getFirstLettersUpperCase(str: string) {
    return (str.match(/\b[a-zA-Z]/g) || []).map(s => s.toUpperCase()).join('');
  }
}
