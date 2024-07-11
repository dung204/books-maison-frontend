class LocalStorageService {
  public set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T | null;
  public get<T>(key: string, fallbackValue: T): T;
  public get<T>(key: string, fallbackValue?: T): T | null {
    const data = localStorage.getItem(key);

    if (data !== null) return JSON.parse(data);

    if (fallbackValue) return fallbackValue;

    return null;
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}

const localStorageService = new LocalStorageService();

export default localStorageService;
