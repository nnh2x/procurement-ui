import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppUser } from '../user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges {
  @Input() user: AppUser | null = null;

  readonly departments = ['Engineering', 'Finance', 'Procurement', 'HR', 'Operations', 'Sales'];
  readonly roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'User', value: 'user' },
    { label: 'Viewer', value: 'viewer' },
  ];
  readonly statuses = ['Active', 'Inactive', 'Pending'];

  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      status: ['Active', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      if (this.user) {
        this.form.patchValue({
          username: this.user.username,
          email: this.user.email,
          fullName: this.user.fullName,
          department: this.user.department,
          role: this.user.role,
          status: this.user.status,
        });
        this.form.get('password')?.clearValidators();
        this.form.get('password')?.updateValueAndValidity();
      } else {
        this.form.reset({ status: 'Active' });
        this.form.get('password')?.setValidators(Validators.required);
        this.form.get('password')?.updateValueAndValidity();
      }
    }
  }

  getValue(): any {
    return this.form.value;
  }

  isValid(): boolean {
    this.form.markAllAsTouched();
    return this.form.valid;
  }
}
