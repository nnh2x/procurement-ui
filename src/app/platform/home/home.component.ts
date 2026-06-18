import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AuthService } from '../../core/auth/auth.service';

interface ServiceCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  status: 'active' | 'coming-soon';
  color: string;
  colorRgb: string;
}

@Component({
  selector: 'app-platform-home',
  standalone: true,
  imports: [AsyncPipe, TitleCasePipe, NzButtonModule, NzIconModule, NzToolTipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class PlatformHomeComponent {
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly user$ = this.auth.user$;

  readonly services: ServiceCard[] = [
    {
      id: 'procurement',
      name: 'Procurement',
      description: 'Quản lý yêu cầu mua hàng, nhà cung cấp và quy trình phê duyệt.',
      icon: 'file-text',
      route: '/procurement',
      status: 'active',
      color: '#6366f1',
      colorRgb: '99, 102, 241',
    },
    {
      id: 'hr',
      name: 'Human Resources',
      description: 'Quản lý nhân sự, chấm công và tuyển dụng nhân tài.',
      icon: 'team',
      route: '/hr',
      status: 'coming-soon',
      color: '#10b981',
      colorRgb: '16, 185, 129',
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Kế toán, báo cáo tài chính và quản lý ngân sách.',
      icon: 'bank',
      route: '/finance',
      status: 'coming-soon',
      color: '#f59e0b',
      colorRgb: '245, 158, 11',
    },
    {
      id: 'inventory',
      name: 'Inventory',
      description: 'Quản lý kho hàng, tồn kho và xuất nhập kho.',
      icon: 'inbox',
      route: '/inventory',
      status: 'coming-soon',
      color: '#ef4444',
      colorRgb: '239, 68, 68',
    },
  ];

  navigate(svc: ServiceCard): void {
    if (svc.status === 'active') {
      this.router.navigate([svc.route]);
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
