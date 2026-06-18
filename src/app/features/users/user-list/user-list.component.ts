import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserStore } from '../user.store';
import { AppUser } from '../user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { FilterBarComponent, FilterConfig } from '../../../shared/components/filter-bar/filter-bar.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NzButtonModule, NzIconModule,
    PageHeaderComponent, DataTableComponent, FilterBarComponent,
    DrawerFormComponent, ConfirmDialogComponent,
    UserFormComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [UserStore],
})
export class UserListComponent implements OnInit {
  @ViewChild('userForm') userForm!: UserFormComponent;

  readonly store = inject(UserStore);
  readonly items$ = this.store.items$;
  readonly loading$ = this.store.loading$;
  readonly total$ = this.store.total$;

  drawerVisible = false;
  editingUser: AppUser | null = null;
  confirmVisible = false;
  deletingUser: AppUser | null = null;

  private currentPage = 1;
  private currentFilters: Record<string, any> = {};

  readonly columns: TableColumn[] = [
    { key: 'username', label: 'Username', field: 'username', type: 'code', width: '140px' },
    { key: 'fullName', label: 'Full Name', field: 'fullName', type: 'avatar-name' },
    { key: 'email', label: 'Email', field: 'email' },
    { key: 'department', label: 'Department', field: 'department', width: '140px' },
    { key: 'role', label: 'Role', field: 'role', type: 'badge', width: '120px' },
    { key: 'status', label: 'Status', field: 'status', type: 'badge', width: '100px' },
    { key: 'view', label: '', field: 'view', type: 'view', width: '50px', align: 'center' },
    { key: 'edit', label: '', field: 'edit', type: 'edit', width: '50px', align: 'center' },
    { key: 'delete', label: '', field: 'delete', type: 'delete', width: '50px', align: 'center' },
  ];

  readonly filterConfigs: FilterConfig[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Pending', value: 'Pending' },
      ],
      width: '140px',
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' },
        { label: 'User', value: 'user' },
        { label: 'Viewer', value: 'viewer' },
      ],
      width: '140px',
    },
  ];

  get drawerTitle(): string {
    return this.editingUser ? 'Edit User' : 'Add User';
  }

  ngOnInit(): void {
    this.store.loadList({ page: 1, limit: 10 });
  }

  openCreateDrawer(): void {
    this.editingUser = null;
    this.drawerVisible = true;
  }

  onFilterChange(filters: any): void {
    this.currentFilters = filters;
    this.currentPage = 1;
    this.store.loadList({ page: 1, limit: 10, ...filters });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.store.loadList({ page, limit: 10, ...this.currentFilters });
  }

  onRowView(user: AppUser): void {
    console.log('View user:', user);
  }

  onRowEdit(user: AppUser): void {
    this.editingUser = user;
    this.drawerVisible = true;
  }

  onRowDelete(user: AppUser): void {
    this.deletingUser = user;
    this.confirmVisible = true;
  }

  onDrawerSubmit(): void {
    if (!this.userForm?.isValid()) return;
    const value = this.userForm.getValue();

    if (this.editingUser) {
      this.store.updateUser({
        id: this.editingUser.id,
        data: value,
        onSuccess: () => {
          this.drawerVisible = false;
          this.store.loadList({ page: this.currentPage, limit: 10, ...this.currentFilters });
        },
      });
    } else {
      this.store.createUser({
        data: value,
        onSuccess: () => {
          this.drawerVisible = false;
          this.store.loadList({ page: 1, limit: 10, ...this.currentFilters });
        },
      });
    }
  }

  onDeleteConfirm(): void {
    if (!this.deletingUser) return;
    this.store.deleteUser({
      id: this.deletingUser.id,
      onSuccess: () => {
        this.confirmVisible = false;
        this.deletingUser = null;
        this.store.loadList({ page: this.currentPage, limit: 10, ...this.currentFilters });
      },
    });
  }
}
