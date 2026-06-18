import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '../auth/permission.service';

export const permissionGuard: CanActivateFn = (route) => {
  const required = route.data['permission'] as string | string[] | undefined;
  if (!required) return true;
  const permService = inject(PermissionService);
  const router = inject(Router);
  const permissions = Array.isArray(required) ? required : [required];
  if (permService.hasAnyPermission(permissions)) return true;
  return router.createUrlTree(['/']);
};
