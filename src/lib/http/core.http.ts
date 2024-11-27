import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  HttpStatusCode,
} from 'axios';
import * as jose from 'jose';

import { TokenUtils } from '@/common/utils';

class HttpClient {
  protected axiosInstance: AxiosInstance;

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

    this.axiosInstance.interceptors.response.use(
      this.onResponseSuccess,
      this.onResponseFailed,
    );
  }

  public setupRequestInterceptors(
    ...args: Parameters<typeof this.axiosInstance.interceptors.request.use>
  ) {
    this.axiosInstance.interceptors.request.use(...args);
  }

  protected onResponseSuccess(response: AxiosResponse) {
    return response.data;
  }

  protected async onResponseFailed(error: AxiosError) {
    if (
      (!error.status || error.status === HttpStatusCode.InternalServerError) &&
      typeof window !== 'undefined'
    ) {
      const { toast } = await import('sonner');
      toast.error('Unexpected error happened!');
      console.error(error);
    }
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
