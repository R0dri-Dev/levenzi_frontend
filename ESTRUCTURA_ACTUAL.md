# Estructura actual (hasta ahora)

> Generado a partir de los archivos visibles y abiertos en tu workspace.

---

## Raíz
- `./.editorconfig`
- `./.gitignore`
- `./.postcssrc.json`
- `./.prettierrc`
- `./angular.json`
- `./backend.md`
- `./contexto.md`
- `./package-lock.json`
- `./package.json`
- `./README.md`
- `./tsconfig.app.json`
- `./tsconfig.json`
- `./tsconfig.spec.json`

## `public/`
- `./public/favicon.ico`

---

## `src/`
- `./src/index.html`
- `./src/main.ts`
- `./src/styles.css`

### `src/app/`
- `./src/app/app.css`
- `./src/app/app.html`
- `./src/app/app.routes.ts`
- `./src/app/app.ts`
- `./src/app/app.spec.ts`
- `./src/app/app.config.ts`

---

## `src/app/core/`
- `src/app/core/constants/`
- `src/app/core/enums/`
- `src/app/core/guards/`
  - `auth-guard.ts`
  - `guest-guard.ts`
  - `pending-changes-guard.ts`
  - `auth-guard.spec.ts`
  - `guest-guard.spec.ts`
  - `pending-changes-guard.ts`
- `src/app/core/interceptors/`
  - `auth-interceptor.ts`
  - `error-interceptor.ts`
  - `loading-interceptor.ts`
  - `.spec.ts` correspondientes
- `src/app/core/interfaces/`
- `src/app/core/models/`
- `src/app/core/services/`
  - `api.ts`
  - `auth.ts`
  - `token.ts`
  - `storage.ts`
  - `loading.ts`
  - `notification.ts`
  - `dialog.ts`
  - `permission.ts`
  - `.spec.ts` correspondientes
- `src/app/core/types/`
- `src/app/core/utils/`

---

## `src/app/features/`
- `src/app/features/auth/pages/forgot-password/`
- `src/app/features/auth/pages/login/`
- `src/app/features/auth/pages/register/`
- `src/app/features/brands/`
- `src/app/features/clientes/`
- `src/app/features/companias/`
- `src/app/features/dashboard/`
- `src/app/features/doctores/`
- `src/app/features/doctors/`
- `src/app/features/instalaciones/`
- `src/app/features/marcas/`
- `src/app/features/modulos/`
- `src/app/features/permisos/`
- `src/app/features/productos/`
- `src/app/features/roles/`
- `src/app/features/sedes/`
- `src/app/features/settings/`
- `src/app/features/usuarios/`
- `src/app/features/ventas/`

> Nota: en esta lista no se incluyen nombres de archivos dentro de cada feature porque en el resumen provisto solo se listaron rutas/dirs.

---

## `src/app/layouts/`
- `src/app/layouts/auth-layout/`
- `src/app/layouts/dashboard-layout/`
- `src/app/layouts/empty-layout/`
- `src/app/layouts/public-layout/`

> Nota: por el resumen provisto no se incluyen los archivos internos aquí, salvo que hayan sido listados en el dataset.

---

## `src/app/shared/`  ✅ (Design System)

### `src/app/shared/constants/`
- `src/app/shared/constants/api.ts`
- `src/app/shared/constants/icons.ts`
- `src/app/shared/constants/permissions.ts`
- `src/app/shared/constants/regex.ts`
- `src/app/shared/constants/routes.ts`
- `src/app/shared/constants/storage.ts`

### `src/app/shared/core/`
- `src/app/shared/core/icons/`
  - `icon.registry.ts`
  - `icon.types.ts`
  - `icons.ts`
  - `index.ts`

### `src/app/shared/directives/`
- `src/app/shared/directives/autofocus.ts`
- `src/app/shared/directives/debounce-click.ts`
- `src/app/shared/directives/permission.ts`
- `src/app/shared/directives/tooltip.ts`
- `.spec.ts` correspondientes

### `src/app/shared/interfaces/`
- `api-response.interface.ts`
- `button.interface.ts`
- `login.interface.ts`
- `option.interface.ts`
- `page-header.interface.ts`
- `pagination.interface.ts`
- `table.interface.ts`
- `user.interface.ts`

### `src/app/shared/pipes/`
- `safe-html-pipe.ts`
- `status-color-pipe.ts`
- `truncate-pipe.ts`
- `yes-no-pipe.ts`
- `.spec.ts` correspondientes

### `src/app/shared/theme/`
- `animations.ts`
- `badge.theme.ts`
- `breakpoints.ts`
- `button.theme.ts`
- `card.theme.ts`
- `colors.ts`
- `form.theme.ts`
- `icon.theme.ts`
- `input.theme.ts`
- `modal.theme.ts`
- `navbar.theme.ts`
- `page-header.theme.ts`
- `radius.ts`
- `shadows.ts`
- `sidebar.theme.ts`
- `spacing.ts`
- `table.theme.ts`
- `typography.ts`
- `z-index.ts`
- `index.ts`
- `alert.theme.ts`

### `src/app/shared/types/`
- `badge.types.ts`
- `button.types.ts`
- `input.types.ts`
- `modal.types.ts`
- `table.types.ts`
- `theme.types.ts`

### `src/app/shared/ui/`
- `src/app/shared/ui/icons/`
  - `icon/icon.ts`
  - `icon/icon.html`
  - `icon/icon.spec.ts`
- `src/app/shared/ui/atoms/`
  - `button/`
    - `button.ts`
    - `button.html`
  - `checkbox/`
    - `checkbox.ts`
    - `checkbox.html`
  - `input/`
    - `input.ts`
    - `input.html`
    - `input.spec.ts`
  - `label/`
    - `label.ts`
    - `label.html`
  - `password-input/`
    - `password-input.ts`
    - `password-input.html`
- (No se muestran otros componentes UI en el resumen provisto)

---

## `src/main.ts` y `src/app/app.ts`
- `src/main.ts`
- `src/app/app.ts`
  - `initFlowbite()` en `ngAfterViewInit`

---

# Archivo generado
`ESTRUCTURA_ACTUAL.md` queda en la raíz del proyecto: `levenzi_frontend/`.

