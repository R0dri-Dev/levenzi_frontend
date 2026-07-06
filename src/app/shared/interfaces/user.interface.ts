export interface User {
  id: number | string;
  name: string;
  email: string;

  /**
   * Campo opcional para roles/permisos.
   * Mantenerlo flexible para que los módulos del ERP lo especialicen.
   */
  role?: string;
  permissions?: string[];
}

