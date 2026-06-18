import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'draft' | 'submitted' | 'approved' | 'rejected' | 'active' | 'inactive' | 'default';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="'badge--' + variant">
      <i class="badge-dot"></i>
      {{ label }}
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11.5px;
      font-weight: 600;
      white-space: nowrap;
    }
    .badge-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
    }
    .badge--draft     { background: #f1f5f9; color: #64748b; }
    .badge--submitted { background: #eff6ff; color: #3b82f6; }
    .badge--approved  { background: #ecfdf5; color: #059669; }
    .badge--rejected  { background: #fef2f2; color: #ef4444; }
    .badge--active    { background: #ecfdf5; color: #059669; }
    .badge--inactive  { background: #fef2f2; color: #ef4444; }
    .badge--default   { background: #f1f5f9; color: #64748b; }
  `],
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  get variant(): BadgeVariant {
    const map: Record<string, BadgeVariant> = {
      Draft: 'draft',
      Submitted: 'submitted',
      Approved: 'approved',
      Rejected: 'rejected',
      Active: 'active',
      Inactive: 'inactive',
    };
    return map[this.status] ?? 'default';
  }

  get label(): string {
    return this.status || '-';
  }
}
