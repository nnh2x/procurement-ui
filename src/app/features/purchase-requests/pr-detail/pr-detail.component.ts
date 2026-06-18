import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PrStore } from '../pr.store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-pr-detail',
  standalone: true,
  imports: [
    AsyncPipe, DatePipe, DecimalPipe, RouterLink,
    NzDescriptionsModule, NzButtonModule, NzTableModule, NzDividerModule, NzSpinModule,
    PageHeaderComponent, StatusBadgeComponent,
  ],
  templateUrl: './pr-detail.component.html',
  styleUrl: './pr-detail.component.scss',
  providers: [PrStore],
})
export class PrDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(PrStore);

  readonly pr$ = this.store.selectedPr$;
  readonly loading$ = this.store.loading$;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.loadOne(id);
  }

  submit(id: string): void {
    this.store.submitPr(id);
  }
}
