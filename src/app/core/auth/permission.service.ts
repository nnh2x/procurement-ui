import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly auth = inject(AuthService);

  /** permission format: 'MODULE.ACTION' e.g. 'USER.CREATE', or just 'MODULE' */
  hasPermission(permission: string): boolean {
    const user = this.auth.getCurrentUser();
    if (!user) return false;
    if (user.role === 'admin') return true;
    const [module, action] = permission.split('.');
    if (!module) return false;
    if (!action) {
      return user.permissions?.some((p) => p.module === module) ?? false;
    }
    return (
      user.permissions?.some(
        (p) => p.module === module && p.actions?.includes(action),
      ) ?? false
    );
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some((p) => this.hasPermission(p));
  }

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every((p) => this.hasPermission(p));
  }
}
