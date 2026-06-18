import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, tap, catchError, EMPTY } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { PurchaseRequest, PrStatus, ApiResponse } from '../../core/models/api-response.model';

interface PrState {
  items: PurchaseRequest[];
  total: number;
  page: number;
  limit: number;
  selectedPr: PurchaseRequest | null;
  loading: boolean;
  error: string | null;
}

export interface ListPrParams {
  page?: number;
  limit?: number;
  status?: PrStatus;
}

@Injectable()
export class PrStore extends ComponentStore<PrState> {
  private readonly api = inject(ApiService);

  constructor() {
    super({ items: [], total: 0, page: 1, limit: 10, selectedPr: null, loading: false, error: null });
  }

  readonly items$ = this.select((s) => s.items);
  readonly total$ = this.select((s) => s.total);
  readonly loading$ = this.select((s) => s.loading);
  readonly selectedPr$ = this.select((s) => s.selectedPr);

  readonly loadList = this.effect<ListPrParams>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap((params) =>
        this.api.getWithMeta<PurchaseRequest[]>('/purchase-requests', params as Record<string, string | number>).pipe(
          tap((res: ApiResponse<PurchaseRequest[]>) =>
            this.patchState({
              items: res.data,
              total: res.meta?.total ?? 0,
              page: res.meta?.page ?? 1,
              loading: false,
            }),
          ),
          catchError((err: HttpErrorResponse) => {
            this.patchState({ error: err.message, loading: false });
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  readonly loadOne = this.effect<string>((id$) =>
    id$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap((id) =>
        this.api.get<PurchaseRequest>(`/purchase-requests/${id}`).pipe(
          tap((pr: PurchaseRequest) => this.patchState({ selectedPr: pr, loading: false })),
          catchError((err: HttpErrorResponse) => {
            this.patchState({ error: err.message, loading: false });
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  readonly createPr = this.effect<{ data: unknown; onSuccess: () => void }>((req$) =>
    req$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(({ data, onSuccess }) =>
        this.api.post<PurchaseRequest>('/purchase-requests', data).pipe(
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

  readonly submitPr = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.api.post<PurchaseRequest>(`/purchase-requests/${id}/submit`, {}).pipe(
          tap((pr: PurchaseRequest) => this.patchState({ selectedPr: pr })),
          catchError((err: HttpErrorResponse) => {
            this.patchState({ error: err.message });
            return EMPTY;
          }),
        ),
      ),
    ),
  );
}
