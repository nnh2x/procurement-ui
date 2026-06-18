import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AsyncPipe } from '@angular/common';
import { PrStore } from '../pr.store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-pr-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, AsyncPipe,
    NzFormModule, NzInputModule, NzButtonModule, NzDatePickerModule,
    NzInputNumberModule, NzIconModule, NzDividerModule,
    PageHeaderComponent,
  ],
  templateUrl: './pr-form.component.html',
  styleUrl: './pr-form.component.scss',
  providers: [PrStore],
})
export class PrFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(PrStore);

  readonly loading$ = this.store.loading$;
  isEditMode = false;

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    department: [''],
    expectedDate: [null as Date | null],
    currency: ['VND'],
    items: this.fb.array([this.createItemGroup()]),
  });

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.store.loadOne(id);
    }
  }

  createItemGroup() {
    return this.fb.nonNullable.group({
      itemName: ['', Validators.required],
      quantity: [1, Validators.required],
      unit: [''],
      unitPrice: [0],
      notes: [''],
    });
  }

  addItem(): void {
    this.items.push(this.createItemGroup());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    this.store.createPr({
      data: {
        ...value,
        expectedDate: value.expectedDate ? (value.expectedDate as Date).toISOString() : undefined,
      },
      onSuccess: () => this.router.navigate(['/procurement/purchase-requests']),
    });
  }
}
