import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, tap, catchError, EMPTY } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { ApiResponse } from '../../core/models/api-response.model';
import { AppUser, CreateUserDto, UpdateUserDto } from './user.model';

interface UserState {
  items: AppUser[];
  total: number;
  loading: boolean;
  error: string | null;
}

@Injectable()
export class UserStore extends ComponentStore<UserState> {
  private readonly api = inject(ApiService);

  constructor() {
    super({ items: [], total: 0, loading: false, error: null });
  }

  readonly items$ = this.select((s) => s.items);
  readonly total$ = this.select((s) => s.total);
  readonly loading$ = this.select((s) => s.loading);
  readonly error$ = this.select((s) => s.error);

  readonly loadList = this.effect<{ page?: number; limit?: number; search?: string; status?: string; role?: string }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap((params) =>
        this.api.getWithMeta<AppUser[]>('/users', params as Record<string, string | number>).pipe(
          tap((res: ApiResponse<AppUser[]>) => {
            this.patchState({ items: res.data, total: res.meta?.total ?? 0, loading: false });
          }),
          catchError((err: HttpErrorResponse) => {
            this.patchState({ error: err.message, loading: false });
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  readonly createUser = this.effect<{ data: CreateUserDto; onSuccess: () => void }>((req$) =>
    req$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(({ data, onSuccess }) =>
        this.api.post<AppUser>('/users', data).pipe(
          tap(() => {
            this.patchState({ loading: false });
            onSuccess();
          }),
          catchError((err: HttpErrorResponse) => {
            this.patchState({ error: err.message, loading: false });
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  readonly updateUser = this.effect<{ id: string; data: UpdateUserDto; onSuccess: () => void }>((req$) =>
    req$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(({ id, data, onSuccess }) =>
        this.api.put<AppUser>(`/users/${id}`, data).pipe(
          tap(() => {
            this.patchState({ loading: false });
            onSuccess();
          }),
          catchError((err: HttpErrorResponse) => {
            this.patchState({ error: err.message, loading: false });
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  readonly deleteUser = this.effect<{ id: string; onSuccess: () => void }>((req$) =>
    req$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(({ id, onSuccess }) =>
        this.api.delete<void>(`/users/${id}`).pipe(
          tap(() => {
            this.patchState({ loading: false });
            onSuccess();
          }),
          catchError((err: HttpErrorResponse) => {
            this.patchState({ error: err.message, loading: false });
            return EMPTY;
          }),
        ),
      ),
    ),
  );
}
