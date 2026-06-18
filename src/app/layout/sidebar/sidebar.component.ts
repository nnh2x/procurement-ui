import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    color: '#1890ff',
    items: [
      { path: '/procurement/dashboard', label: 'Dashboard', icon: 'dashboard' },
      { path: '/procurement/purchase-requests', label: 'Purchase Requests', icon: 'file-text' },
      { path: '/procurement/vendors', label: 'Vendors', icon: 'team' },
    ],
  },
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NzIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly router = inject(Router);

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
