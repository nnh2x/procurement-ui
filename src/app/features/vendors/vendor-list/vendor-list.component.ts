import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { VendorStore } from '../vendor.store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { FilterBarComponent, FilterConfig } from '../../../shared/components/filter-bar/filter-bar.component';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [
    AsyncPipe, RouterLink,
    NzButtonModule, NzIconModule,
    PageHeaderComponent, DataTableComponent, FilterBarComponent,
  ],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.scss',
  providers: [VendorStore],
})
export class VendorListComponent implements OnInit {
  readonly store = inject(VendorStore);
  readonly items$ = this.store.items$;
  readonly loading$ = this.store.loading$;
  readonly total$ = this.store.total$;

  readonly columns: TableColumn[] = [
    { key: 'name', label: 'Tên nhà cung cấp', field: 'name', width: '200px' },
    { key: 'taxCode', label: 'Mã số thuế', field: 'taxCode', type: 'code', width: '140px' },
    { key: 'contactName', label: 'Liên hệ', field: 'contactName', width: '160px' },
    { key: 'contactEmail', label: 'Email', field: 'contactEmail' },
    { key: 'phone', label: 'Điện thoại', field: 'phone', width: '130px' },
    { key: 'status', label: 'Trạng thái', field: 'status', type: 'badge', width: '120px' },
    { key: 'edit', label: 'Chỉnh sửa', field: 'edit', type: 'view', width: '120px' },
  ];

  readonly filterConfigs: FilterConfig[] = [
    {
      key: 'status',
      label: 'Trạng thái',
      type: 'select',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
      ],
      width: '150px',
    },
  ];

  ngOnInit(): void {
    this.store.loadList({ page: 1, limit: 10 });
  }

  onFilterChange(filters: any): void {
    this.store.loadList({ page: 1, limit: 10, ...filters });
  }

  onPageChange(page: number): void {
    this.store.loadList({ page, limit: 10 });
  }
}
