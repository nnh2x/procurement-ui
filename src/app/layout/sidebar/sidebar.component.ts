import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

interface ServiceNav {
  label: string;
  icon: string;
  color: string;
  items: MenuItem[];
}

const SERVICE_NAVS: Record<string, ServiceNav> = {
  procurement: {
    label: 'Procurement',
    icon: 'file-text',
    color: '#6366f1',
    items: [
      { path: '/procurement/dashboard',         label: 'Dashboard',         icon: 'dashboard' },
      { path: '/procurement/purchase-requests', label: 'Purchase Requests', icon: 'file-text' },
      { path: '/procurement/vendors',           label: 'Vendors',           icon: 'team' },
      { path: '/procurement/users',             label: 'Users',             icon: 'user' },
    ],
  },
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NzIconModule, NzButtonModule, NzToolTipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() collapsedChange = new EventEmitter<boolean>();

  private readonly router = inject(Router);

  collapsed = false;

  toggle(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  get serviceId(): string {
    const url = this.router.url;
    const match = url.match(/^\/([^/]+)/);
    return match?.[1] ?? '';
  }

  get serviceNav(): ServiceNav | null {
    return SERVICE_NAVS[this.serviceId] ?? null;
  }

  get menuItems(): MenuItem[] {
    return this.serviceNav?.items ?? [];
  }
}
