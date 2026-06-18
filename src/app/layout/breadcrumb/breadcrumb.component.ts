import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { filter } from 'rxjs';

interface BreadcrumbItem {
  label: string;
  url: string;
  isLast: boolean;
}

const ROUTE_LABELS: Record<string, string> = {
  procurement: 'Procurement',
  dashboard:   'Dashboard',
  'purchase-requests': 'Purchase Requests',
  vendors:     'Vendors',
  new:         'New',
  edit:        'Edit',
  users:       'Users',
  roles:       'Roles',
  settings:    'Settings',
};

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink, NzBreadCrumbModule, NzIconModule],
  template: `
    @if (items.length > 1) {
      <nz-breadcrumb class="breadcrumb-nav" nzSeparator="/">
        @for (item of items; track item.url) {
          <nz-breadcrumb-item>
            @if (!item.isLast) {
              <a [routerLink]="item.url" class="breadcrumb-link">{{ item.label }}</a>
            } @else {
              <span class="breadcrumb-current">{{ item.label }}</span>
            }
          </nz-breadcrumb-item>
        }
      </nz-breadcrumb>
    }
  `,
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
  private readonly router = inject(Router);

  items: BreadcrumbItem[] = [];

  ngOnInit(): void {
    this.buildBreadcrumb(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.buildBreadcrumb(e.urlAfterRedirects));
  }

  private buildBreadcrumb(url: string): void {
    const segments = url.split('/').filter(Boolean);
    let accumulated = '';
    this.items = segments.map((seg, i) => {
      accumulated += '/' + seg;
      const isUuid = /^[0-9a-f-]{36}$/i.test(seg);
      return {
        label: isUuid ? 'Detail' : (ROUTE_LABELS[seg] ?? this.titleCase(seg)),
        url: accumulated,
        isLast: i === segments.length - 1,
      };
    });
  }

  private titleCase(s: string): string {
    return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
