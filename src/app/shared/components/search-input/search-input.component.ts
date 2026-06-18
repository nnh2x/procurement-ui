import { Component, Input, Output, EventEmitter, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ReactiveFormsModule, NzInputModule, NzIconModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchInputComponent), multi: true }],
  template: `
    <nz-input-group [nzPrefix]="prefixIcon" [nzSuffix]="control.value ? clearIcon : undefined" class="search-group">
      <input nz-input [formControl]="control" [placeholder]="placeholder" class="search-input" />
    </nz-input-group>
    <ng-template #prefixIcon>
      <span nz-icon nzType="search" class="search-icon"></span>
    </ng-template>
    <ng-template #clearIcon>
      <span nz-icon nzType="close-circle" class="clear-icon" (click)="clear()"></span>
    </ng-template>
  `,
  styles: [`
    :host { display: block; }
    .search-group { width: 100%; }
    .search-input { font-size: 13.5px !important; }
    .search-icon { color: var(--color-text-muted, #94a3b8); font-size: 14px; }
    .clear-icon { color: var(--color-text-muted, #94a3b8); cursor: pointer; font-size: 13px; }
    .clear-icon:hover { color: var(--color-text-secondary, #64748b); }
    ::ng-deep .search-group .ant-input-affix-wrapper {
      border-radius: var(--radius-sm, 8px) !important;
      border-color: var(--color-border, #e4e8ef) !important;
      height: 34px !important;
      background: var(--color-surface, #fff) !important;
      transition: border-color 150ms ease, box-shadow 150ms ease !important;
    }
    ::ng-deep .search-group .ant-input-affix-wrapper:hover {
      border-color: var(--color-border-hover, #c7cdd8) !important;
    }
    ::ng-deep .search-group .ant-input-affix-wrapper:focus-within {
      border-color: var(--color-primary, #6366f1) !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12) !important;
    }
  `],
})
export class SearchInputComponent implements ControlValueAccessor, OnDestroy {
  @Input() placeholder = 'Tìm kiếm...';
  @Input() debounce = 300;
  @Output() search = new EventEmitter<string>();

  readonly control = new FormControl('');
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};
  private destroy$ = new Subject<void>();

  constructor() {
    this.control.valueChanges.pipe(
      debounceTime(this.debounce),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(v => {
      const val = v ?? '';
      this.onChange(val);
      this.search.emit(val);
    });
  }

  clear(): void { this.control.setValue(''); }

  writeValue(v: string): void { this.control.setValue(v, { emitEvent: false }); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void {
    disabled ? this.control.disable() : this.control.enable();
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
