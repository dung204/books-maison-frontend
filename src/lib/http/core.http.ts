import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';

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

    this.axiosInstance.interceptors.response.use(response => response.data);
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
