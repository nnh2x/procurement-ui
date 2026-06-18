import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, tap, catchError, EMPTY } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { DashboardSummary } from '../../core/models/api-response.model';

interface DashboardState {
  summary: DashboardSummary | null;
  loading: boolean;
  error: string | null;
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  private readonly api = inject(ApiService);

  constructor() {
    super({ summary: null, loading: false, error: null });
  }

  readonly summary$ = this.select((s) => s.summary);
  readonly loading$ = this.select((s) => s.loading);
  readonly planUsage$ = this.select((s) => s.summary?.planUsage ?? null);

  readonly load = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap(() =>
        this.api.get<DashboardSummary>('/dashboard/summary').pipe(
          tap((summary: DashboardSummary) => this.patchState({ summary, loading: false })),
          catchError((err: HttpErrorResponse) => {
            this.patchState({ error: err.message, loading: false });
            return EMPTY;
          }),
        ),
      ),
    ),
  );
}
