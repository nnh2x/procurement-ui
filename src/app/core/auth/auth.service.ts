import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, AuthTokens } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly currentUser$ = new BehaviorSubject<User | null>(this.loadUser());

  readonly user$ = this.currentUser$.asObservable();
  readonly isLoggedIn$ = this.user$.pipe(map((u) => !!u));

  login(email: string, password: string): Observable<AuthTokens> {
    return this.http
      .post<{ data: AuthTokens & { accountId: string; tenantId: string; email: string; planCode?: string } }>(
        `${environment.authBackendUrl}/auth/login`,
        { email, password },
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.data.accessToken);
          localStorage.setItem('refresh_token', res.data.refreshToken);
          this.currentUser$.next({
            id: res.data.accountId,
            email: res.data.email,
            tenantId: res.data.tenantId,
            planCode: res.data.planCode ?? '',
          });
        }),
        map((res) => res.data),
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  refresh(): Observable<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http
      .post<{ data: { accessToken: string } }>(`${environment.authBackendUrl}/auth/refresh`, { token: refreshToken })
      .pipe(
        tap((res) => localStorage.setItem('access_token', res.data.accessToken)),
        map((res) => res.data.accessToken),
      );
  }

  private loadUser(): User | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { id: payload.sub, email: payload.email, tenantId: payload.tenant_id, planCode: payload.planCode ?? '' };
    } catch {
      return null;
    }
  }
}
