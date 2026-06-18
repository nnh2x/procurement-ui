import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [NzIconModule],
  template: `
    <div class="empty-state">
      <div class="empty-icon">
        <span nz-icon [nzType]="icon" nzTheme="outline"></span>
      </div>
      <p class="empty-title">{{ title }}</p>
      @if (description) {
        <p class="empty-desc">{{ description }}</p>
      }
      <ng-content />
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 56px 24px;
      text-align: center;
    }
    .empty-icon {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: var(--color-bg, #f8fafc);
      border: 1px solid var(--color-border, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .empty-icon span { font-size: 28px; color: var(--color-text-muted, #94a3b8); }
    .empty-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--color-text, #0f172a);
      margin: 0 0 6px;
    }
    .empty-desc {
      font-size: 13px;
      color: var(--color-text-muted, #94a3b8);
      margin: 0 0 20px;
      max-width: 280px;
      line-height: 1.5;
    }
  `],
})
export class EmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title = 'Không có dữ liệu';
  @Input() description = '';
}
