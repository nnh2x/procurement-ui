import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { VendorStore } from '../vendor.store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink, NzFormModule, NzInputModule, NzButtonModule, PageHeaderComponent],
  templateUrl: './vendor-form.component.html',
  styleUrl: './vendor-form.component.scss',
  providers: [VendorStore],
})
export class VendorFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly store = inject(VendorStore);

  readonly loading$ = this.store.loading$;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    taxCode: [''],
    contactName: [''],
    contactEmail: ['', Validators.email],
    phone: [''],
    address: [''],
  });

  submit(): void {
    if (this.form.invalid) return;
    this.store.createVendor({
      data: this.form.getRawValue(),
      onSuccess: () => this.router.navigate(['/procurement/vendors']),
    });
  }
}
