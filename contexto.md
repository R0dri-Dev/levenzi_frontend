# 🏗️ LEVENZI — PROMPT MAESTRO DE ARQUITECTURA

> Este documento es el **contexto único y completo** que debe leer cualquier IA (Claude, GPT, Copilot, etc.) antes de escribir una sola línea de código para este proyecto. Contiene la arquitectura, las convenciones, el estado actual y las reglas no negociables. Si una IA propone algo que contradice este documento, el documento manda.

---

## 1. 🎯 QUÉ ES LEVENZI

Levenzi es un **ERP moderno** para Grobdi (empresa de formulaciones farmacéuticas pediátricas compuestas), construido con:

- **Angular 21** — Standalone Components, Signals, APIs modernas (sin NgModules)
- **Tailwind CSS v4** — sistema de utilidades (sin `tailwind.config.js`, todo vía `@import`/`@plugin`/`@source` en `styles.css`)
- **Flowbite 2+** — base visual de componentes (dropdowns, modals, etc.)
- **@lucide/angular** — iconos (ver sección 8, hay una migración pendiente desde `lucide-angular`)
- **Backend**: Laravel con `tymon/jwt-auth ^2.3` para autenticación JWT

### Filosofía principal (regla #1, innegociable)
> **Nunca escribir clases Tailwind directamente en páginas/features. Siempre usar componentes `lv-*`.**

```html
<!-- ❌ NUNCA en features/ -->
<button class="bg-blue-600 px-4 py-2 rounded-xl">Guardar</button>

<!-- ✅ SIEMPRE -->
<lv-button variant="primary">Guardar</lv-button>
```

Sigue **diseño atómico**: `icons` → `atoms` → `molecules` → `organisms` → `templates` → `layouts` → `features`.

---

## 2. 📁 ESTRUCTURA DE CARPETAS REAL (verificada, no idealizada)

```
levenzi_frontend/
├── angular.json
├── tsconfig.json / tsconfig.app.json / tsconfig.spec.json
├── package.json
│
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css                     # Tailwind v4 + Flowbite + fuente Inter
│   │
│   └── app/
│       ├── app.ts / app.html / app.css / app.routes.ts / app.config.ts
│       │
│       ├── core/                          # Lógica transversal de la app (NO design system)
│       │   ├── constants/
│       │   ├── enums/
│       │   ├── guards/                    # auth-guard.ts, guest-guard.ts, pending-changes-guard.ts
│       │   ├── interceptors/              # auth-interceptor.ts, error-interceptor.ts, loading-interceptor.ts
│       │   ├── interfaces/
│       │   ├── models/
│       │   ├── services/                  # api.ts, auth.ts, token.ts, storage.ts, loading.ts,
│       │   │                               # notification.ts, dialog.ts, permission.ts
│       │   ├── types/
│       │   └── utils/
│       │
│       ├── shared/                        # ⭐ DESIGN SYSTEM — todo lo visual/reutilizable vive aquí
│       │   ├── constants/                 # api.ts, icons.ts, permissions.ts, regex.ts, routes.ts, storage.ts
│       │   │
│       │   ├── core/                      # Núcleo técnico del design system (NO componentes visuales)
│       │   │   ├── icons/                 # icon.registry.ts, icon.types.ts, icons.ts, index.ts
│       │   │   ├── directives/            # (a veces también en shared/directives/, ver nota)
│       │   │   ├── interfaces/
│       │   │   └── types/
│       │   │
│       │   ├── directives/                # autofocus.ts, debounce-click.ts, permission.ts, tooltip.ts (+ .spec.ts)
│       │   ├── interfaces/                # api-response, button, login, option, page-header, pagination, table, user
│       │   ├── pipes/                     # safe-html-pipe.ts, status-color-pipe.ts, truncate-pipe.ts, yes-no-pipe.ts
│       │   │
│       │   ├── theme/                     # Tokens + clases Tailwind por componente
│       │   │   ├── colors.ts, radius.ts, shadows.ts, spacing.ts, typography.ts
│       │   │   ├── breakpoints.ts, z-index.ts, animations.ts
│       │   │   ├── icon.theme.ts, button.theme.ts, input.theme.ts, card.theme.ts
│       │   │   ├── table.theme.ts, modal.theme.ts, badge.theme.ts, alert.theme.ts
│       │   │   ├── navbar.theme.ts, sidebar.theme.ts, form.theme.ts, page-header.theme.ts
│       │   │   └── index.ts
│       │   │
│       │   ├── types/                     # badge.types.ts, button.types.ts, input.types.ts,
│       │   │                               # modal.types.ts, table.types.ts, theme.types.ts
│       │   │
│       │   └── ui/                        # Componentes visuales lv-* (esto SÍ se ve en pantalla)
│       │       ├── icons/icon/            # icon.ts, icon.html, icon.spec.ts
│       │       ├── atoms/
│       │       │   ├── button/            # button.ts, button.html (+ falta .css y .spec.ts)
│       │       │   ├── checkbox/          # checkbox.ts, checkbox.html
│       │       │   ├── input/             # input.ts, input.html, input.spec.ts
│       │       │   ├── label/             # label.ts, label.html (+ falta .css y .spec.ts)
│       │       │   ├── password-input/    # password-input.ts, password-input.html
│       │       │   └── (pendientes: textarea, select, icon-button, radio, switch, avatar,
│       │       │        badge, chip, tag, divider, card, heading, paragraph, link,
│       │       │        loading, spinner, skeleton, alert, tooltip, logo)
│       │       ├── molecules/             # (pendientes) form-field, password-field, form-error,
│       │       │                           # search-input, search-box, page-title, page-actions,
│       │       │                           # filter-bar, filter-select, filter-date, filter-chip,
│       │       │                           # user-menu, breadcrumb, pagination, stat-card,
│       │       │                           # empty-state, table-toolbar
│       │       ├── organisms/             # (pendientes) login-form, register-form, forgot-password-form,
│       │       │                           # app-sidebar, app-navbar, app-footer, profile-dropdown,
│       │       │                           # notifications-panel, page-header, page-filter, data-table,
│       │       │                           # data-filter, stats-panel, loading-screen, modal,
│       │       │                           # confirm-dialog, drawer, toast-container
│       │       └── templates/             # (pendientes) auth-template, dashboard-template, page-template,
│       │                                   # crud-template, form-template, error-template
│       │
│       ├── layouts/                       # auth-layout, dashboard-layout, empty-layout, public-layout
│       │
│       └── features/                      # Módulos de negocio (consumen shared/*, nunca al revés)
│           ├── auth/pages/{login, register, forgot-password}
│           ├── dashboard/, companias/, sedes/, clientes/, doctores/,
│           ├── marcas/, instalaciones/, usuarios/, roles/, permisos/,
│           └── modulos/, productos/, ventas/
```

### ⚠️ Nota sobre duplicidad `core/` — pendiente de decidir
Existen `shared/core/icons` **y** `shared/core/directives|interfaces|types` conviviendo con `shared/directives`, `shared/interfaces`, `shared/pipes` en la raíz de `shared/`. Mientras no se decida consolidar, **cualquier IA debe preguntar antes de asumir una ruta** cuando cree un archivo nuevo en `shared/`, en vez de adivinar entre `shared/core/X` o `shared/X`.

---

## 3. 🧩 REGLA DE LOS 4 ARCHIVOS POR COMPONENTE (obligatoria)

Todo componente `lv-*` vive en su propia carpeta con **exactamente 4 archivos**:

```
shared/ui/<capa>/<nombre>/
├── <nombre>.ts        # Lógica — SIEMPRE templateUrl + styleUrl, NUNCA template/styles inline
├── <nombre>.html       # Template
├── <nombre>.css        # Solo overrides puntuales — el estilo base va en shared/theme/<nombre>.theme.ts
└── <nombre>.spec.ts    # Tests
```

Componentes ya creados (`button`, `checkbox`, `input`, `label`, `password-input`) están incompletos: les falta `.css` y/o `.spec.ts`. **Prioridad: completarlos antes de crear componentes nuevos.**

---

## 4. 🎨 SISTEMA DE THEME

Cada componente visual con estilos propios tiene su `<nombre>.theme.ts` en `shared/theme/`, con **constantes separadas** (no un objeto único anidado):

```typescript
// shared/theme/button.theme.ts — patrón real de referencia
export const LV_BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

export const LV_BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
};

export const LV_BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300',
  secondary: 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-300',
  success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-300',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-300',
  info: 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-300',
  outline: 'border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 focus:ring-gray-300',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300'
};
```

Reglas de estilo globales (innegociables):
- **Border radius**: siempre `rounded-xl`. Nunca mezclar con `rounded`, `rounded-md`, `rounded-lg`, `rounded-2xl`, `rounded-3xl`.
- **Sombras**: solo `shadow-sm` (elementos pequeños) o `shadow-lg` (elementos grandes).
- **Espaciado**: siempre múltiplos de 4 (`p-4`, `gap-6`, `m-8`...).
- **Transiciones**: `transition-all duration-200`.
- **Tipografía**: `Inter` como única fuente.
- Estados `disabled`/`loading` deben resolverse dentro del propio `_BASE` del theme vía el atributo HTML `disabled` (`disabled:opacity-60 disabled:cursor-not-allowed`), **no** recalculados a mano dentro del `computed()` del componente.

---

## 5. 🏷️ TIPOS (`shared/types/`)

Un archivo `<nombre>.types.ts` por componente que lo necesite (variants, sizes, uniones propias):

```typescript
// shared/types/button.types.ts (ejemplo del patrón)
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
```

---

## 6. 🔤 CONVENCIONES DE NOMENCLATURA

| Elemento | Regla | Ejemplo |
|---|---|---|
| Selector de componente | `lv-nombre` | `lv-button` |
| Clase de componente | `Lv` + PascalCase + `Component` | `LvButtonComponent` (NUNCA `ButtonComponent` a secas) |
| Archivo de componente | `nombre.ts` (sin sufijo `.component`) | `button.ts` |
| Servicios | Clase `NombreService`, archivo `nombre.service.ts` | `AuthService` |
| Interfaces | Prefijo `I` | `IUser`, `IApiResponse` |
| Enums | Prefijo `E` | `EStatus`, `ERole` |
| Tipos | Prefijo `T` cuando es alias suelto | `TUserId`, `TStatus` |
| Constantes de theme/config | Prefijo `LV_` | `LV_ICONS`, `LV_COLORS`, `LV_BUTTON_BASE` |

### Orden de imports (obligatorio en todo archivo `.ts`)

```typescript
import { Component } from '@angular/core';           // 1. Angular
import { CommonModule } from '@angular/common';       // 2. Módulos Angular
import { RouterModule } from '@angular/router';       // 3. Módulos de rutas
import { Observable } from 'rxjs';                    // 4. Librerías externas
import { LvButtonComponent } from '@shared/ui';       // 5. Componentes de shared
import { AuthService } from '@core/services';         // 6. Servicios de core
import { IUser } from '@core/interfaces';             // 7. Interfaces
import { EStatus } from '@core/enums';                // 8. Enums
```

> ⚠️ **Estado real de los alias**: aún no se ha confirmado que `@shared/*` y `@core/*` estén mapeados en `tsconfig.app.json`. Hasta confirmarlo, cualquier IA debe usar **rutas relativas** (`../../../theme/button.theme`) para no romper la compilación, y solo migrar a alias cuando el usuario confirme el `tsconfig`.

---

## 7. 📦 BARREL EXPORTS (obligatorio en cada carpeta)

```typescript
// shared/ui/atoms/index.ts
export * from './button/button';
export * from './label/label';
// ...

// shared/theme/index.ts
export * from './button.theme';
export * from './icon.theme';
// ...

// shared/types/index.ts
export * from './button.types';
// ...
```

---

## 8. 🎯 SISTEMA DE ICONOS — estado y advertencia crítica

**Decisión tomada**: usar Lucide para iconos, envuelto en `lv-icon` para que ningún feature dependa directamente de la librería.

**⚠️ Advertencia importante para cualquier IA que continúe este proyecto:**
El paquete `lucide-angular` (con `LucideAngularModule`, `<lucide-angular [img]="icon()">`) **está deprecado por su propio autor**, que recomienda migrar a `@lucide/angular`. La nueva librería cambia el modelo por completo:
- Ya no hay `NgModule`; los iconos estáticos se importan como componentes standalone (`import { LucideFileText } from '@lucide/angular'`, uso: `<svg lucideFileText>`).
- Para iconos **dinámicos** (resolver `name` en runtime, que es el caso de `lv-icon`), se usa el componente `LucideIcon` con `<svg [lucideIcon]="expr">`, y el registro se hace con `provideLucideIcons(...)` en `app.config.ts`, no con `LucideAngularModule.pick(...)`.

**Antes de tocar `icon.ts` / `icons.ts` de nuevo**, cualquier IA debe:
1. Preguntar qué paquete está realmente instalado (`npm list @lucide/angular` vs `npm list lucide-angular`).
2. No asumir que el código ya escrito compila — puede estar usando la API vieja.
3. Si se decide migrar, actualizar `icons.ts`, `icon.ts`, `icon.html` y el `app.config.ts` (registro de providers) en el mismo cambio, nunca a medias.

**Estructura de iconos ya decidida** (no negociable, ya implementada):

```
shared/core/icons/
├── icons.ts          # Registro LV_ICONS (o icon.registry.ts, ya existe con ese nombre)
├── icon.types.ts     # IconSize, IconStroke, IconConfig, IconKeys (tipo derivado de LV_ICONS)
└── index.ts
```

`icon.theme.ts` vive en `shared/theme/` (NO dentro de `shared/core/icons/`), porque es un tema visual, no lógica de iconos:

```typescript
// shared/theme/icon.theme.ts
export const LV_ICON_THEME = {
  base: 'inline-flex items-center justify-center shrink-0',
  sizes: {
    xs: { class: 'size-3', pixels: 12 },
    sm: { class: 'size-4', pixels: 16 },
    md: { class: 'size-5', pixels: 20 },
    lg: { class: 'size-6', pixels: 24 },
    xl: { class: 'size-8', pixels: 32 }
  }
} as const;
```

El tipo para nombres de icono se llama **`IconKeys`** (NO `IconName`), definido en `icons.ts`/`icon.registry.ts` y re-exportado desde `icon.types.ts`. Cualquier componente que reciba un icono (`leftIcon`, `rightIcon`, etc.) debe tiparlo como `IconKeys`.

---

## 9. 🎨 FLOWBITE — integración correcta con Angular

Ya resuelto y verificado, no volver a discutirlo salvo error nuevo:

**`styles.css`** (correcto tal cual está):
```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import "flowbite/src/themes/default";
@plugin "flowbite/plugin";
@source "../node_modules/flowbite";
```

**`app.ts`**: `initFlowbite()` **nunca** se llama a nivel de módulo (fuera del ciclo de vida). Debe ejecutarse en `ngAfterViewInit`, y además re-ejecutarse tras cada `NavigationEnd` del router (porque Angular no recarga el DOM completo al navegar, y Flowbite necesita volver a "descubrir" los elementos nuevos):

```typescript
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => initFlowbite()));
  }
}
```

---

## 10. 🔐 BACKEND / AUTENTICACIÓN

- Backend Laravel con `tymon/jwt-auth ^2.3`.
- El frontend necesita: `AuthService`, `TokenService`, `auth.interceptor.ts` (adjuntar JWT), `error.interceptor.ts` (manejar 401/419 y refresco/logout), `auth.guard.ts` / `guest.guard.ts` ya existen como archivos pero falta confirmar su implementación real antes de construir sobre ellos.
- Objetivo pendiente: `lv-login-form` (organism) + `auth-template` + `auth-layout` + página de login real, consumiendo JWT contra Laravel.

---

## 11. 📋 ORDEN DE DESARROLLO (roadmap oficial)

**Fase 1 — Base del Design System**
- ✅ `lv-icon`
- ✅ `lv-button` (falta `.css` y `.spec.ts`)
- 🔶 `lv-label` (existe `.ts`/`.html`, falta `.css`/`.spec.ts` — **en progreso ahora**)
- 🔶 `lv-input` (existe `.ts`/`.html`/`.spec.ts`, falta `.css`)
- 🔶 `lv-password-input` (existe `.ts`/`.html`, falta `.css`/`.spec.ts`)
- 🔶 `lv-checkbox` (existe `.ts`/`.html`, falta `.css`/`.spec.ts`)
- ⬜ `lv-form-error`
- ⬜ `lv-form-field`
- ⬜ `lv-logo`

**Fase 2 — Autenticación**
- ⬜ `lv-login-form` (organism)
- ⬜ `auth-template`
- ⬜ `auth-layout`
- ⬜ Página de login real conectada a `tymon/jwt-auth`

**Fase 3 — Componentes de UI**
- ⬜ `lv-page-header`, `lv-page-filter`, `lv-data-table`, `lv-modal`, `lv-drawer`, `lv-toast`

**Fase 4 — Layouts y Navegación**
- ⬜ `lv-app-sidebar`, `lv-app-navbar`, `lv-breadcrumb`, `lv-pagination`, `dashboard-layout`

**Fase 5 — Features del negocio**
- ⬜ CRUDs por módulo, dashboard con estadísticas, reportes/exportaciones

---

## 12. ✅ CHECKLIST QUE CUALQUIER IA DEBE SEGUIR ANTES DE ESCRIBIR CÓDIGO

1. **Preguntar antes de asumir**: si un archivo (`theme`, `types`) podría ya existir, pedir su contenido en vez de inventar uno que choque con el real.
2. Confirmar en qué carpeta exacta va algo cuando hay ambigüedad `shared/core/X` vs `shared/X` (ver sección 2).
3. Usar rutas **relativas**, no alias `@shared/*`, hasta que se confirme el `tsconfig.app.json`.
4. Todo componente: 4 archivos (`.ts`, `.html`, `.css`, `.spec.ts`), `templateUrl`/`styleUrl`, nunca inline.
5. Theme en constantes separadas (`_BASE`, `_SIZES`, `_VARIANTS`), no un objeto anidado único.
6. Tipos siempre en `shared/types/<nombre>.types.ts`, nunca inline en el componente.
7. Selector `lv-nombre`, clase `LvNombreComponent`.
8. Iconos: tipar con `IconKeys` (no `IconName`), y no tocar la librería Lucide sin confirmar qué paquete real está instalado.
9. `disabled`/`loading` resueltos vía el atributo HTML nativo + clases del `_BASE`, no duplicados a mano.
10. Export en el `index.ts` correspondiente al terminar.
11. `.spec.ts` cubre mínimo: creación, valores por defecto, emisión de outputs, no-emisión si disabled/loading, cambio de clases según inputs.
12. Nunca clases Tailwind sueltas dentro de `features/` — todo pasa por `lv-*`.

---

## 13. 🗣️ CÓMO PEDIR EL SIGUIENTE PASO (formato recomendado)

> "Continúa con `lv-<nombre>`. Aquí está mi `<nombre>.ts` y `<nombre>.html` actuales (si existen). Sigue LEVENZI_ARCHITECTURE_PROMPT.md."

Si el componente no existe aún, decirlo explícitamente para que se proponga desde cero siguiendo este documento completo.
