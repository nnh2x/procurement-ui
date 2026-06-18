export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface AppUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  department: string;
  role: string;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  fullName: string;
  department: string;
  role: string;
  status: UserStatus;
  password: string;
}

export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password'>>;
