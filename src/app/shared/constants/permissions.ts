// Permisos (genéricos) — ajustar si tu backend usa otra convención
export type PermissionKey = string;

export const LV_PERMISSIONS = {
  // Ejemplos típicos
  users: 'users:read',
  usersWrite: 'users:write',
  roles: 'roles:read',
  rolesWrite: 'roles:write',
} as const;

