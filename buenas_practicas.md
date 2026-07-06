# 🧩 GUÍA DE ESTRUCTURA — Componentes `lv-*` (Levenzi Design System)

> Prompt/checklist a seguir **siempre** que se cree o modifique un componente del design system. Úsalo como referencia para pedir nuevos componentes de forma consistente.

---

## 1. Estructura de archivos (obligatoria: 4 archivos)

Cada componente vive en su propia carpeta, con exactamente estos 4 archivos:

```
shared/ui/atoms/<nombre>/
├── <nombre>.ts        # Lógica del componente
├── <nombre>.html      # Template
├── <nombre>.css       # Solo overrides puntuales (NO estilos base, esos van en theme/)
└── <nombre>.spec.ts   # Tests
```

Nunca usar `template:` inline ni `styles:` inline — siempre `templateUrl` y `styleUrl`.

---

## 2. Orden de capas que participan en un componente

Antes de escribir el `.ts`, identifica qué capas necesitas tocar:

| Capa | Ruta | Cuándo se usa |
|---|---|---|
| **Types** | `shared/types/<nombre>.types.ts` | Variants, sizes, y cualquier union type propio del componente |
| **Theme** | `shared/theme/<nombre>.theme.ts` | Clases Tailwind: `LV_<NOMBRE>_BASE`, `LV_<NOMBRE>_SIZES`, `LV_<NOMBRE>_VARIANTS` (constantes separadas, no un objeto único — así está tu código real) |
| **Icons** | `shared/core/icons/icons.ts` | Si el componente usa iconos, tipar con `IconKeys` (no `IconName`) |
| **Directives** | `shared/core/directives/` | Si necesita comportamiento reutilizable (autofocus, click-outside, tooltip, debounce-click, permission) — nunca reimplementar esa lógica dentro del componente |
| **Pipes** | `shared/core/pipes/` | Si necesita transformar data para mostrar (truncate, yes-no, status-color, safe-html) |
| **Services** | `core/services/` | Solo si el componente necesita estado/lógica de negocio (ej. `NotificationService`, `DialogService`) — los átomos y moléculas puras NO deberían depender de services, eso es más típico de organisms |
| **Component** | `shared/ui/<capa>/<nombre>/` | El componente en sí (atoms → molecules → organisms → templates) |

**Regla de oro:** si una lógica se repite en 2+ componentes (validación, formateo, comportamiento de foco/click), sube esa lógica a `directives/`, `pipes/` o `utils/` — nunca la dupliques dentro del componente.

---

## 3. Plantilla de `.ts`

```typescript
import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Theme (clases Tailwind)
import { LV_<NOMBRE>_BASE, LV_<NOMBRE>_SIZES, LV_<NOMBRE>_VARIANTS } from '../../../theme/<nombre>.theme';
// 2. Sub-componentes que use (ej. lv-icon)
import { LvIconComponent } from '../../icons/icon/icon';
// 3. Tipos
import type { IconKeys } from '../../../core/icons/icons';
import type { <Nombre>Variant, <Nombre>Size } from '../../../types/<nombre>.types';

@Component({
  selector: 'lv-<nombre>',
  standalone: true,
  imports: [CommonModule /*, LvIconComponent, directivas, pipes */],
  templateUrl: './<nombre>.html',
  styleUrl: './<nombre>.css',
})
export class Lv<Nombre>Component {
  // Inputs (signals)
  readonly variant = input<<Nombre>Variant>('primary');
  readonly size = input<<Nombre>Size>('md');
  readonly disabled = input(false);

  // Outputs
  readonly onChange = output<...>();

  // Computed (SIEMPRE arma las clases aquí, nunca en el template)
  readonly classes = computed(() => {
    const base = LV_<NOMBRE>_BASE;
    const variant = LV_<NOMBRE>_VARIANTS[this.variant()];
    const size = LV_<NOMBRE>_SIZES[this.size()];
    return [base, variant, size].filter(Boolean).join(' ');
  });
}
```

---

## 4. Imports — orden obligatorio

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

> Mientras no confirmemos los alias `@shared/*` y `@core/*` en tu `tsconfig.app.json`, usa rutas relativas (`../../../theme/...`) para evitar errores de compilación. Cuando lo confirmemos, migramos todo de una vez.

---

## 5. Reglas de estilo (heredadas de tu contexto)

- Un solo radius: `rounded-xl` (ya viene en tus `_BASE` de theme, no lo repitas suelto en el componente).
- Sombras: solo `shadow-sm` o `shadow-lg`.
- Espaciado: siempre múltiplos de 4 (`p-4`, `gap-6`, etc).
- Transiciones: `transition-all duration-200` (ya en tus `_BASE`).
- Nunca clases Tailwind sueltas en `features/` — todo pasa por `lv-*`.
- Estados `disabled`/`loading`: que el propio `_BASE` del theme maneje `disabled:opacity-* disabled:cursor-not-allowed` vía el atributo HTML `disabled`, no lo agregues manualmente en el `computed()` (evita duplicar lógica, como corregimos en `lv-button`).

---

## 6. Barrel exports (obligatorio en cada nivel)

```typescript
// shared/ui/atoms/index.ts
export * from './<nombre>/<nombre>';

// shared/theme/index.ts
export * from './<nombre>.theme';

// shared/types/index.ts (si aplica)
export * from './<nombre>.types';
```

---

## 7. Plantilla de `.spec.ts`

Todo componente debe testear como mínimo:
1. Se crea correctamente.
2. Inputs por defecto tienen el valor esperado.
3. Outputs se emiten en la interacción esperada (click, change, etc).
4. Outputs **no** se emiten si `disabled`/`loading` es `true`.
5. Las clases computadas cambian según `variant`/`size`/`fullWidth`.
6. Accesibilidad básica: atributos `aria-*` presentes cuando aplica.

---

## 8. Checklist antes de dar por terminado un componente

- [ ] ¿Existen ya un `directive`, `pipe` o `util` que resuelva parte de esta lógica? (revisar antes de escribir código nuevo)
- [ ] ¿El theme usa constantes separadas (`_BASE`, `_SIZES`, `_VARIANTS`) consistentes con los demás `.theme.ts`?
- [ ] ¿Los tipos están en `shared/types/`, no inline en el componente?
- [ ] ¿El selector es `lv-<nombre>` y la clase `Lv<Nombre>Component`?
- [ ] ¿Se agregó el export en el `index.ts` correspondiente?
- [ ] ¿El `.spec.ts` cubre outputs, disabled/loading y clases computadas?
- [ ] ¿Ningún estilo Tailwind hardcodeado fuera de `theme/`?

---

## 9. Cómo pedirme el siguiente componente

Formato sugerido para que continuemos rápido y sin reprocesos:

> "Continua con `lv-<nombre>`. Aquí está mi `<nombre>.theme.ts` (si existe) y mi `<nombre>.types.ts` (si existe). Sigue LV_COMPONENT_GUIDE.md."

Si el `.theme.ts` o `.types.ts` **no existen aún**, dilo explícitamente y te los propongo yo, siguiendo el mismo patrón de `button.theme.ts`.
