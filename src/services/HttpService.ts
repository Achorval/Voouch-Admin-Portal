// src/services/HttpService/index.ts
import LocalStorageUtil from '@/utilities/storage';
import { FetchOptions } from '../types/HttpTypes';

export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  data?: any;
}

class HttpService {
  private static BASE_URL = import.meta.env.VITE_API_URL;

  private static async getAuthToken(): Promise<string | null> {
    return await LocalStorageUtil.get<string>('@accessToken');
  }

  private static createUrl(path: string, options?: FetchOptions): string {
    const baseURL = options?.baseURL || this.BASE_URL;
    const url = new URL(path, baseURL);

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  private static async getHeaders(customHeaders?: Record<string, string>): Promise<Headers> {
    const headers = new Headers();
    const token = await this.getAuthToken();
    headers.set('Content-Type', 'application/json');
    // headers.set('Access-Control-Request-Headers', 'Authorization'); // Add this line

    // Add custom headers
    if (customHeaders) {
      Object.entries(customHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    // Add auth token if available
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Handles the response and ensures correct data structure.
   */
  private static async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    let data: T;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else if (contentType?.includes('text/plain')) {
      data = await response.text() as unknown as T;
    } else {
      data = {} as T;
    }

    // Handle errors if not a successful response
    if (!response.ok) {
      const error = new Error(response.statusText) as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      error.data = data;
      throw error;
    }

    return data; // Return raw response data (not wrapped in ApiResponse)
  }

  /**
   * General request method that handles GET, POST, PUT, PATCH, DELETE.
   */
  static async request<T>(path: string, options?: FetchOptions): Promise<T> {
    try {
      const url = this.createUrl(path, options);
      const headers = await this.getHeaders(options?.headers as Record<string, string>);

      let fetchOptions: RequestInit = {
        ...options,
        headers,
      };

      // Check if the request body is a FormData object
      if (options?.body instanceof FormData) {
        fetchOptions = {
          ...fetchOptions,
          body: options.body,
          headers: {
            ...fetchOptions.headers,
            'Authorization': `Bearer ${await this.getAuthToken()}`,
          },
        };
      } else {
        fetchOptions = {
          ...fetchOptions,
          body: options?.body ? JSON.stringify(options.body) : undefined,
        };
      }

      const response = await fetch(url, fetchOptions);
      return await this.handleResponse<T>(response); // Return raw response data here
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network request failed');
    }
  }

  // Other request methods (get, post, put, patch, delete) remain the same
  /**
   * Sends a GET request.
   */
  static async get<T>(path: string, options?: Omit<FetchOptions, 'body' | 'method'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  /**
   * Sends a POST request.
   */
  static async post<T>(
    path: string,
    data?: any,
    options?: Omit<FetchOptions, 'body' | 'method'>
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: data,
    });
  }

  /**
   * Sends a PUT request.
   */
  static async put<T>(
    path: string,
    data?: any,
    options?: Omit<FetchOptions, 'body' | 'method'>
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: data,
    });
  }

  /**
   * Sends a PATCH request.
   */
  static async patch<T>(
    path: string,
    data?: any,
    options?: Omit<FetchOptions, 'body' | 'method'>
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: data,
    });
  }

  /**
   * Sends a DELETE request.
   */
  static async delete<T>(path: string, options?: Omit<FetchOptions, 'body' | 'method'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export default HttpService;







// import LocalStorageUtil from '@/utilities/storage';

// interface FetchOptions {
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
//   headers?: HeadersInit;
//   body?: any;
//   params?: Record<string, string | number | boolean | null>;
// }

// class HttpClient {
//   private static BASE_URL = import.meta.env.VITE_API_URL;

//   static async request<T>(url: string, options?: FetchOptions): Promise<T> {
//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     headers.set('Access-Control-Request-Headers', 'Authorization');

//     // Add auth token if available
//     const token = await LocalStorageUtil.get<string>('@accessToken');
//     if (token) {
//       headers.append('Authorization', `Bearer ${token}`);
//     }

//     // Prepend BASE_URL to the URL if it’s a relative path
//     let fullUrl = url.startsWith('http') ? url : `${this.BASE_URL}${url}`;

//     // Append query params if available
//     if (options?.params) {
//       const urlObj = new URL(fullUrl);
//       Object.entries(options.params).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) {
//           urlObj.searchParams.append(key, String(value));
//         }
//       });
//       fullUrl = urlObj.toString();
//     }

//     const fetchOptions: RequestInit = {
//       method: options?.method || 'GET',
//       headers,
//       body: options?.body instanceof FormData ? options.body : (options?.body ? JSON.stringify(options?.body) : undefined),
//     };

//     try {
//       const response = await fetch(fullUrl,   fetchOptions);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.log(error)
//       console.error('Error fetching data:', error);
//       throw error; // Re-throw the error to be handled by the caller
//     }
//   }

//   static async get<T>(url: string, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
//     return this.request<T>(url, { ...options, method: 'GET' });
//   }

//   static async post<T>(url: string, data?: any, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
//     return this.request<T>(url, { ...options, method: 'POST', body: data });
//   }

//   static async put<T>(url: string, data?: any, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
//     return this.request<T>(url, { ...options, method: 'PUT', body: data });
//   }

//   static async delete<T>(url: string, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
//     return this.request<T>(url, { ...options, method: 'DELETE' });
//   }

//   static async patch<T>(url: string, data?: any, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
//     return this.request<T>(url, { ...options, method: 'PATCH', body: data });
//   }
// }

// export default HttpClient;