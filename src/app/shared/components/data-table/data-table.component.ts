import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

export type ColumnType = 'text' | 'badge' | 'code' | 'date' | 'amount' | 'avatar-name' | 'custom' | 'view' | 'edit' | 'delete';

export interface TableColumn {
  key: string;
  label: string;
  field?: string;
  type?: ColumnType;
  width?: string;
  align?: 'left' | 'center' | 'right';
  currencyField?: string;
  dateFormat?: string;
  cellTemplate?: TemplateRef<{ $implicit: any }>;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule, DatePipe, DecimalPipe,
    NzTableModule, NzButtonModule, NzIconModule, NzPopconfirmModule, NzCheckboxModule,
    EmptyStateComponent, StatusBadgeComponent,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() emptyIcon = 'inbox';
  @Input() emptyTitle = 'Không có dữ liệu';
  @Input() emptyDescription = '';
  @Input() selectable = false;
  @Input() scrollY?: string;

  @Output() pageChange = new EventEmitter<number>();
  @Output() rowView = new EventEmitter<any>();
  @Output() rowEdit = new EventEmitter<any>();
  @Output() rowDelete = new EventEmitter<any>();
  @Output() selectedChange = new EventEmitter<any[]>();

  selected = new Set<any>();

  get allChecked(): boolean {
    return this.data.length > 0 && this.data.every((r) => this.selected.has(r));
  }

  get indeterminate(): boolean {
    return this.data.some((r) => this.selected.has(r)) && !this.allChecked;
  }

  toggleAll(checked: boolean): void {
    checked ? this.data.forEach((r) => this.selected.add(r)) : this.selected.clear();
    this.selectedChange.emit([...this.selected]);
  }

  toggleRow(row: any, checked: boolean): void {
    checked ? this.selected.add(row) : this.selected.delete(row);
    this.selectedChange.emit([...this.selected]);
  }

  get(row: any, field?: string): any {
    if (!field) return '';
    return field.split('.').reduce((o, k) => o?.[k], row) ?? '—';
  }
}
