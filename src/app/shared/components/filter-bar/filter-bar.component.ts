import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchInputComponent } from '../search-input/search-input.component';
import { AppSelectComponent, SelectOption } from '../app-select/app-select.component';

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select';
  options: SelectOption[];
  width?: string;
}

export interface FilterValues {
  search: string;
  [key: string]: any;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzIconModule, SearchInputComponent, AppSelectComponent],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent implements OnInit, OnDestroy {
  @Input() searchPlaceholder = 'Tìm kiếm...';
  @Input() filters: FilterConfig[] = [];
  @Output() filterChange = new EventEmitter<FilterValues>();

  form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controls: Record<string, any> = { search: [''] };
    this.filters.forEach(f => { controls[f.key] = [null]; });
    this.form = this.fb.group(controls);

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      this.filterChange.emit(v);
    });
  }

  hasActiveFilters(): boolean {
    const v = this.form.value;
    return !!v.search || this.filters.some(f => v[f.key] != null);
  }

  clearAll(): void {
    const reset: Record<string, any> = { search: '' };
    this.filters.forEach(f => { reset[f.key] = null; });
    this.form.reset(reset);
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
