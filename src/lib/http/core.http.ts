import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
} from 'axios';
import * as jose from 'jose';

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_ENDPOINT!,
    { headers, ...otherConfigs }: Omit<CreateAxiosDefaults, 'baseURL'> = {},
  ) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...otherConfigs,
    });

    this.axiosInstance.interceptors.request.use(async config => {
      if (config.headers.hasAuthorization(/Bearer (.*)/g)) {
        const accessToken = config.headers
          .getAuthorization(/Bearer (.*)/g)?.[0]
          .replaceAll('Bearer ', '');
        const jwtAccessSecret = new TextEncoder().encode(
          process.env['NEXT_PUBLIC_JWT_ACCESS_SECRET']!,
        );
        try {
          await jose.jwtVerify(accessToken!, jwtAccessSecret);
        } catch (accessTokenError) {
          console.log(window);
        }
      }
      return config;
    });
    this.axiosInstance.interceptors.response.use(response => response.data);
  }

  public setupRequestInterceptors(
    ...args: Parameters<typeof this.axiosInstance.interceptors.request.use>
  ) {
    this.axiosInstance.interceptors.request.use(...args);
  }

  public get<T, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this.axiosInstance.get<T, T, D>(url, config);
  }

  public post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    return this.axiosInstance.post<T, T, D>(url, data, config);
  }

  public patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    return this.axiosInstance.patch<T, T, D>(url, data, config);
  }

  public put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    return this.axiosInstance.put<T, T, D>(url, data, config);
  }

  public delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this.axiosInstance.delete<T, T, D>(url, config);
  }
}

const httpClient = new HttpClient();
export { httpClient, HttpClient };
