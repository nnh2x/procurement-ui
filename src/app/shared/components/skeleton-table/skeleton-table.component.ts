import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  imports: [CommonModule, NzSkeletonModule],
  template: `
    <div class="skeleton-table">
      <div class="skeleton-header">
        @for (col of cols; track $index) {
          <div
            class="skeleton-th"
            [style.width]="col.width ?? 'auto'"
            [style.flex]="col.width ? 'none' : '1'"
          >
            <nz-skeleton-element nzType="input" [nzActive]="true" nzSize="small" style="width: 80%"></nz-skeleton-element>
          </div>
        }
      </div>
      @for (row of rowsArray; track $index) {
        <div class="skeleton-row">
          @for (col of cols; track $index) {
            <div
              class="skeleton-cell"
              [style.width]="col.width ?? 'auto'"
              [style.flex]="col.width ? 'none' : '1'"
            >
              <nz-skeleton-element nzType="input" [nzActive]="true" nzSize="small" [style.width]="getCellWidth($index)"></nz-skeleton-element>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .skeleton-table {
      background: #fff;
      border-radius: 10px;
      border: 1px solid var(--color-border, #e4e8ef);
      overflow: hidden;
    }
    .skeleton-header {
      display: flex;
      padding: 10px 16px;
      background: #fafbfc;
      border-bottom: 1px solid var(--color-border, #e4e8ef);
      gap: 16px;
    }
    .skeleton-th { display: flex; align-items: center; }
    .skeleton-row {
      display: flex;
      padding: 13px 16px;
      border-bottom: 1px solid var(--color-border, #e4e8ef);
      gap: 16px;
    }
    .skeleton-row:last-child { border-bottom: none; }
    .skeleton-cell { display: flex; align-items: center; }
    ::ng-deep .skeleton-table .ant-skeleton-element { display: block; }
    ::ng-deep .skeleton-table .ant-skeleton-input { height: 14px !important; border-radius: 4px !important; }
  `],
})
export class SkeletonTableComponent {
  @Input() rows = 5;
  @Input() cols: Array<{ width?: string }> = Array(5).fill({});

  get rowsArray(): number[] {
    return Array(this.rows).fill(0);
  }

  getCellWidth(colIndex: number): string {
    const widths = ['75%', '90%', '60%', '80%', '50%'];
    return widths[colIndex % widths.length];
  }
}
