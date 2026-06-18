import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DashboardStore } from './dashboard.store';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NzGridModule, StatCardComponent, PageHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardStore],
})
export class DashboardComponent implements OnInit {
  readonly store = inject(DashboardStore);
  readonly summary$ = this.store.summary$;
  readonly loading$ = this.store.loading$;

  ngOnInit(): void {
    this.store.load();
  }
}
