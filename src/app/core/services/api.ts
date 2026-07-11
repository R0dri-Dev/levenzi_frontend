import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  private resolveUrl(url: string): string {
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    if (url.startsWith('/api')) {
      return `${this.apiBaseUrl}${url}`;
    }

    const withoutLeadingSlash = url.startsWith('/') ? url.slice(1) : url;
    if (withoutLeadingSlash.startsWith('api/')) {
      return `${this.apiBaseUrl}/${withoutLeadingSlash}`;
    }

    if (withoutLeadingSlash.startsWith('auth/')) {
      return `${this.apiBaseUrl}/api/${withoutLeadingSlash}`;
    }

    const normalized = url.startsWith('/') ? url : `/${url}`;
    return `${this.apiBaseUrl}${normalized.replace(/^\/+/, '/')}`;

  }

  get<T>(url: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.get<T>(this.resolveUrl(url), options);
  }

  post<T>(url: string, body: unknown, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.post<T>(this.resolveUrl(url), body, options);
  }

  put<T>(url: string, body: unknown, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.put<T>(this.resolveUrl(url), body, options);
  }

  patch<T>(url: string, body: unknown, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.patch<T>(this.resolveUrl(url), body, options);
  }

  delete<T>(url: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.delete<T>(this.resolveUrl(url), options);
  }
}

