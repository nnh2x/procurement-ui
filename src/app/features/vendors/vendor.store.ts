import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, tap, catchError, EMPTY } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { Vendor, ApiResponse } from '../../core/models/api-response.model';

interface VendorState {
  items: Vendor[];
  total: number;
  loading: boolean;
  error: string | null;
}

@Injectable()
export class VendorStore extends ComponentStore<VendorState> {
  private readonly api = inject(ApiService);

  constructor() {
    super({ items: [], total: 0, loading: false, error: null });
  }

  readonly items$ = this.select((s) => s.items);
  readonly total$ = this.select((s) => s.total);
  readonly loading$ = this.select((s) => s.loading);

  readonly loadList = this.effect<{ page?: number; limit?: number }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap((params) =>
        this.api.getWithMeta<Vendor[]>('/vendors', params as Record<string, string | number>).pipe(
          tap((res: ApiResponse<Vendor[]>) => {
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

  readonly createVendor = this.effect<{ data: unknown; onSuccess: () => void }>((req$) =>
    req$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(({ data, onSuccess }) =>
        this.api.post<Vendor>('/vendors', data).pipe(
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
