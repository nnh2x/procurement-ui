import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'draft' | 'submitted' | 'approved' | 'rejected' | 'active' | 'inactive' | 'pending' | 'default';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="'badge--' + variant">
      <i class="badge-dot"></i>{{ label }}
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 8px 2px 7px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      font-family: 'Inter', sans-serif;
      letter-spacing: -0.01em;
      border: 1px solid transparent;
    }
    .badge-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
      opacity: 0.8;
    }
    .badge--draft     { background: #f1f5f9; color: #64748b; border-color: #e2e8f0; }
    .badge--submitted { background: #eff6ff; color: #3b82f6; border-color: #dbeafe; }
    .badge--approved  { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
    .badge--rejected  { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
    .badge--active    { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
    .badge--inactive  { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
    .badge--pending   { background: #fff7ed; color: #ea580c; border-color: #fed7aa; }
    .badge--default   { background: #f8fafc; color: #94a3b8; border-color: #e4e8ef; }
  `],
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  get variant(): BadgeVariant {
    const map: Record<string, BadgeVariant> = {
      Draft: 'draft', draft: 'draft',
      Submitted: 'submitted', submitted: 'submitted',
      Approved: 'approved', approved: 'approved',
      Rejected: 'rejected', rejected: 'rejected',
      Active: 'active', active: 'active',
      Inactive: 'inactive', inactive: 'inactive',
      Pending: 'pending', pending: 'pending',
    };
    return map[this.status] ?? 'default';
  }

  get label(): string { return this.status || '—'; }
}
