import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [NzIconModule],
  template: `
    <div class="empty-state">
      <div class="empty-icon-wrap">
        <div class="empty-icon">
          <span nz-icon [nzType]="icon" nzTheme="outline"></span>
        </div>
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
      padding: 64px 24px;
      text-align: center;
    }
    .empty-icon-wrap {
      position: relative;
      margin-bottom: 20px;
    }
    .empty-icon-wrap::before {
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 24px;
      background: var(--color-primary-light, #eef2ff);
      opacity: 0.5;
    }
    .empty-icon {
      position: relative;
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: #fff;
      border: 1.5px solid var(--color-border, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .empty-icon span { font-size: 28px; color: var(--color-primary, #6366f1); opacity: 0.6; }
    .empty-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--color-text, #0f172a);
      margin: 0 0 8px;
    }
    .empty-desc {
      font-size: 13.5px;
      color: var(--color-text-muted, #94a3b8);
      margin: 0 0 24px;
      max-width: 280px;
      line-height: 1.6;
    }
  `],
})
export class EmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title = 'Chua co du lieu';
  @Input() description = '';
}
