export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  GUEST = 'guest',
}

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'danger',
  [UserRole.MANAGER]: 'warning',
  [UserRole.USER]: 'primary',
  [UserRole.GUEST]: 'neutral',
};
