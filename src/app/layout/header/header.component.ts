import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AuthService } from '../../core/auth/auth.service';

export interface AppNotification {
  id: number;
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, RouterLink, NzButtonModule, NzIconModule, NzToolTipModule, NzDropDownModule, NzMenuModule, NzBadgeModule, NzDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly auth = inject(AuthService);
  readonly user$ = this.auth.user$;

  notifications: AppNotification[] = [
    { id: 1, icon: 'file-done', iconColor: '#6366f1', title: 'PR-2024-001 approved', desc: 'Purchase request was approved by manager', time: '5m ago', read: false },
    { id: 2, icon: 'shopping-cart', iconColor: '#16a34a', title: 'New vendor registered', desc: 'Acme Corp has completed onboarding', time: '1h ago', read: false },
    { id: 3, icon: 'warning', iconColor: '#ea580c', title: 'Budget limit approaching', desc: 'Q4 procurement budget at 85% utilization', time: '3h ago', read: true },
    { id: 4, icon: 'check-circle', iconColor: '#16a34a', title: 'Order #PO-5541 delivered', desc: 'Delivery confirmed by warehouse team', time: '1d ago', read: true },
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAllRead(): void {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
  }

  logout() {
    this.auth.logout();
  }
}
