export type PermissionAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

export interface Permission {
  module: string;
  actions: PermissionAction[];
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  permissions: Permission[];
}

export const MODULES = {
  DASHBOARD: 'DASHBOARD',
  PURCHASE_REQUEST: 'PURCHASE_REQUEST',
  VENDOR: 'VENDOR',
  USER: 'USER',
  ROLE: 'ROLE',
  SETTINGS: 'SETTINGS',
} as const;

export type ModuleKey = keyof typeof MODULES;
