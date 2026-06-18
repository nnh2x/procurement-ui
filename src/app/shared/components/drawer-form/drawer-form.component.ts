import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer-form',
  standalone: true,
  imports: [CommonModule, NzDrawerModule, NzButtonModule, NzIconModule],
  template: `
    <nz-drawer
      [nzVisible]="visible"
      [nzTitle]="title"
      [nzWidth]="width"
      [nzClosable]="true"
      [nzMaskClosable]="false"
      (nzOnClose)="onClose()"
    >
      <ng-container *nzDrawerContent>
        <div class="drawer-body">
          <ng-content />
        </div>
        <div class="drawer-footer">
          <button nz-button nzType="default" (click)="onClose()">Huy</button>
          <button nz-button nzType="primary" [nzLoading]="loading" (click)="onSubmit()">
            {{ submitText }}
          </button>
        </div>
      </ng-container>
    </nz-drawer>
  `,
  styles: [`
    .drawer-body { padding: 8px 0 80px; }
    .drawer-footer {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      padding: 14px 24px;
      background: #fff;
      border-top: 1px solid var(--color-border, #e4e8ef);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `],
})
export class DrawerFormComponent {
  @Input() visible = false;
  @Input() title = 'Form';
  @Input() width = 520;
  @Input() loading = false;
  @Input() submitText = 'Luu';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  onClose(): void {
    this.visibleChange.emit(false);
    this.closed.emit();
  }

  onSubmit(): void {
    this.submitted.emit();
  }
}
