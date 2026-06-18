import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, NzModalModule, NzButtonModule, NzIconModule],
  template: `
    <nz-modal
      [nzVisible]="visible"
      [nzTitle]="title"
      [nzOkText]="okText"
      [nzCancelText]="cancelText"
      [nzOkLoading]="loading"
      [nzOkDanger]="danger"
      (nzOnOk)="onConfirm()"
      (nzOnCancel)="onCancel()"
      (nzVisibleChange)="visibleChange.emit($event)"
      nzWidth="420px"
    >
      <ng-container *nzModalContent>
        <div class="confirm-body">
          <div class="confirm-icon" [class.confirm-icon--danger]="danger">
            <span nz-icon [nzType]="danger ? 'exclamation-circle' : 'question-circle'" nzTheme="fill"></span>
          </div>
          <div class="confirm-text">
            <p class="confirm-message">{{ message }}</p>
            @if (description) {
              <p class="confirm-description">{{ description }}</p>
            }
          </div>
        </div>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .confirm-body { display: flex; align-items: flex-start; gap: 14px; padding: 4px 0; }
    .confirm-icon { font-size: 22px; line-height: 1; color: var(--color-primary, #6366f1); margin-top: 2px; flex-shrink: 0; }
    .confirm-icon--danger { color: #dc2626; }
    .confirm-message { font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 6px; }
    .confirm-description { font-size: 13.5px; color: #6b7280; margin: 0; line-height: 1.5; }
  `],
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() title = 'Xac nhan';
  @Input() message = 'Ban co chac chan muon thuc hien?';
  @Input() description = '';
  @Input() okText = 'Xac nhan';
  @Input() cancelText = 'Huy';
  @Input() loading = false;
  @Input() danger = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
    this.visibleChange.emit(false);
  }

  onCancel(): void {
    this.cancelled.emit();
    this.visibleChange.emit(false);
  }
}
