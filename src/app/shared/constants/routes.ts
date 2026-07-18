export const LV_ROUTES = {
  // Auth
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',

  // App
  dashboard: '/dashboard',
  usuarios: '/usuarios',
  sedes: '/sedes',
  companias: '/companias',
  company: '/company',
  clientes: '/clientes',
  doctores: '/doctores',
  marcas: '/marcas',
  instalaciones: '/instalaciones',
  productos: '/productos',
  ventas: '/ventas',
  roles: '/roles',
  permisos: '/permisos',
  modulos: '/modulos',

  // Nuevos módulos
  familias: '/familias',
  unidadesMedida: '/unidades-medida',
  tiposUnidadMedida: '/tipos-unidad-medida',
  productoConversiones: '/producto-conversiones',

  // Fallback
  notFound: '/404',
} as const;