import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ConfusionApiService {
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  async request<T = any>(
    method: Method,
    url: string,
    params?: any,
    extraParams?: AxiosRequestConfig,
  ): Promise<T> {
    const token = this.getToken();
    const config: AxiosRequestConfig = {
      method,
      url: environment.apiBaseUrl + url,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...extraParams,
    };

    if (method === 'GET') {
      config.params = params;
    } else {
      config.data = params;
    }

    try {
      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
}
//example: this.confusionApiService.request('GET', '/api/some-endpoint', { id: 1 })
