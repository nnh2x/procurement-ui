import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, NzSelectModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppSelectComponent), multi: true }],
  template: `
    <nz-select
      [formControl]="control"
      [nzPlaceHolder]="placeholder"
      [nzAllowClear]="allowClear"
      [nzShowSearch]="showSearch"
      class="app-select"
    >
      @for (opt of options; track opt.value) {
        <nz-option [nzValue]="opt.value" [nzLabel]="opt.label" />
      }
    </nz-select>
  `,
  styles: [`
    :host { display: block; }
    .app-select { width: 100%; }
    ::ng-deep .app-select .ant-select-selector {
      border-radius: var(--radius-sm, 8px) !important;
      border-color: var(--color-border, #e2e8f0) !important;
      height: 36px !important;
      font-size: 13.5px !important;
    }
    ::ng-deep .app-select .ant-select-selector:hover {
      border-color: var(--color-primary, #6366f1) !important;
    }
    ::ng-deep .app-select.ant-select-focused .ant-select-selector {
      border-color: var(--color-primary, #6366f1) !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
    }
  `],
})
export class AppSelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Chọn...';
  @Input() allowClear = true;
  @Input() showSearch = false;

  readonly control = new FormControl(null);
  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.control.valueChanges.subscribe(v => this.onChange(v));
  }

  writeValue(v: any): void { this.control.setValue(v, { emitEvent: false }); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void {
    disabled ? this.control.disable() : this.control.enable();
  }
}
