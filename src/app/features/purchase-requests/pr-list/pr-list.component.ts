import { Component, OnInit, inject, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PrStore } from '../pr.store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { FilterBarComponent, FilterConfig } from '../../../shared/components/filter-bar/filter-bar.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pr-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NzButtonModule,
    NzIconModule,
    PageHeaderComponent,
    DataTableComponent,
    FilterBarComponent,
    RouterModule
  ],
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.scss'],
  providers: [PrStore],
})
export class PrListComponent implements OnInit, AfterViewInit {
  @ViewChild('actionsTpl') actionsTpl!: TemplateRef<any>;

  readonly store = inject(PrStore);
  readonly items$ = this.store.items$;
  readonly loading$ = this.store.loading$;
  readonly total$ = this.store.total$;
  
  columns: TableColumn[] = [];

  readonly filterConfigs: FilterConfig[] = [
    {
      key: 'status',
      label: 'Trạng thái',
      type: 'select',
      options: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Submitted', value: 'Submitted' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
      ],
      width: '150px',
    },
  ];

  ngOnInit(): void {
    this.store.loadList({ page: 1, limit: 10 });
  }

  ngAfterViewInit(): void {
    this.columns = [
      { key: 'code', label: 'Mã PR', field: 'code', type: 'code', width: '120px' },
      { key: 'title', label: 'Tiêu đề', field: 'title' },
      { key: 'status', label: 'Trạng thái', field: 'status', type: 'badge', width: '140px' },
      { key: 'department', label: 'Phòng ban', field: 'department', width: '140px' },
      { key: 'totalAmount', label: 'Tổng tiền', field: 'totalAmount', type: 'amount', width: '160px', align: 'right', currencyField: 'currency' },
      { key: 'createdAt', label: 'Ngày tạo', field: 'createdAt', type: 'date', width: '120px' },
      { key: 'actions', label: '', type: 'custom', width: '60px', align: 'center', cellTemplate: this.actionsTpl },
    ];
  }

  onFilterChange(filters: any): void {
    this.store.loadList({ page: 1, limit: 10, ...filters });
  }

  onPageChange(page: number): void {
    this.store.loadList({ page, limit: 10 });
  }
}
