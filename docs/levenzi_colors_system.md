# Levenzi Design System — Paleta de Colores

**Stack:** Angular 21 Standalone + Signals · Tailwind CSS v4 · Flowbite
**Modo:** Light mode únicamente
**Archivos fuente:**
- `src/app/shared/types/colors.types.ts`
- `src/app/shared/constants/theme.constants.ts`
- `src/app/shared/themes/levenzi.theme.css`

---

## 1. Filosofía de la paleta

Cada color tiene **un solo trabajo** en el sistema. No se mezclan variantes para "decorar" — el color comunica el estado o la jerarquía de lo que el usuario está viendo.

| Variante | Rol semántico | Cuándo usarla |
|---|---|---|
| `primary` | Marca / acción principal | Botones de acción primaria, links activos, elementos de marca |
| `secondary` | Acción secundaria / neutro de marca | Botones "cancelar", texto de apoyo, chrome de UI |
| `success` | Confirmación / estado positivo | Pedido entregado, validación OK, toasts de éxito |
| `danger` | Error / acción destructiva | Eliminar, errores de validación, stock agotado |
| `warning` | Advertencia / requiere atención | Stock bajo, pedido pendiente de aprobación |
| `info` | Información neutra | Tooltips, notas informativas, badges de estado "en tránsito" |
| `tertiary` | Acento / variedad en datos | Charts, tags adicionales, elementos decorativos puntuales |
| `neutral` | Estructura de UI (no es color de marca) | Bordes, fondos de tarjetas, texto secundario |

**Regla de oro:** si dos variantes se usan para lo mismo en dos pantallas distintas, algo está mal — la variante debe ser predecible en todo el sistema, no elegida "porque se veía bien" en ese componente puntual.

---

## 2. Paleta completa (hex)

### Primary — Violeta
| Shade | Hex |
|---|---|
| 50 | `#f5f3ff` |
| 100 | `#ede9fe` |
| 200 | `#ddd6fe` |
| 300 | `#c4b5fd` |
| 400 | `#a78bfa` |
| **500** | `#8b5cf6` |
| **600** | `#7c3aed` ← base |
| **700** | `#6d28d9` |
| 800 | `#5b21b6` |
| 900 | `#4c1d95` |

### Secondary — Stone (gris cálido)
| Shade | Hex |
|---|---|
| 50 | `#fafaf9` |
| 100 | `#f5f5f4` |
| 200 | `#e7e5e4` |
| 300 | `#d6d3d1` |
| 400 | `#a8a29e` |
| **500** | `#78716c` |
| **600** | `#57534e` ← base |
| **700** | `#44403c` |
| 800 | `#292524` |
| 900 | `#1c1917` |

### Success — Esmeralda
| Shade | Hex |
|---|---|
| 50 | `#ecfdf5` |
| **500** | `#10b981` |
| **600** | `#059669` ← base |
| **700** | `#047857` |
| 900 | `#064e3b` |

### Danger — Rose
| Shade | Hex |
|---|---|
| 50 | `#fff1f2` |
| **500** | `#f43f5e` |
| **600** | `#e11d48` ← base |
| **700** | `#be123c` |
| 900 | `#881337` |

### Warning — Ámbar
| Shade | Hex |
|---|---|
| 50 | `#fffbeb` |
| **500** | `#f59e0b` ← base |
| **600** | `#d97706` |
| **700** | `#b45309` |
| 900 | `#78350f` |

### Info — Cyan
| Shade | Hex |
|---|---|
| 50 | `#ecfeff` |
| **500** | `#06b6d4` |
| **600** | `#0891b2` ← base |
| **700** | `#0e7490` |
| 900 | `#164e63` |

### Tertiary — Naranja
| Shade | Hex |
|---|---|
| 50 | `#fff7ed` |
| **500** | `#f97316` |
| **600** | `#ea580c` ← base |
| **700** | `#c2410c` |
| 900 | `#7c2d12` |

### Neutral — Slate (UI/chrome, no es color de marca)
| Shade | Hex |
|---|---|
| 50 | `#f8fafc` |
| **500** | `#64748b` |
| **600** | `#475569` ← base |
| **700** | `#334155` |
| 900 | `#0f172a` |

> Los shades intermedios completos (100–900) están en `levenzi.theme.css`. Aquí solo se listan los que más se usan (`50`, `500`, `600`, `700`) que son los que expone `theme.constants.ts`.

---

## 3. Tres formas de usar el color — y cuándo usar cada una

El sistema tiene **tres capas**. No son intercambiables: cada una sirve para un contexto distinto.

### Capa A — Clases Tailwind directas vía `LV_COLOR_MAP` (uso normal en componentes `lv-*`)

Es la forma **por defecto**. Nunca escribas `bg-violet-600` a mano dentro de un componente — siempre pasa por el mapa.

```typescript
import { LV_COLOR_MAP, LvColorVariant } from '@shared/types/colors.types';

@Component({ /* ... */ })
export class LvButtonComponent {
  variant = input<LvColorVariant>('primary');

  classes = computed(() => {
    const c = LV_COLOR_MAP[this.variant()];
    return `${c.bg} ${c.bgHover} ${c.bgActive} ${c.textOnBg} ${c.ring}`;
  });
}
```

```html
<button [class]="classes()">Guardar pedido</button>
```

Cada variante expone estas propiedades — úsalas según el contexto visual:

| Propiedad | Uso |
|---|---|
| `bg` | Fondo sólido — botones primarios, badges rellenos |
| `bgHover` / `bgActive` | Estados de interacción |
| `bgLight` / `bgLightHover` | Fondo tenue — alerts, chips, banners suaves |
| `text` | Texto con el color de marca sobre fondo blanco |
| `textOnBg` | Texto que va SOBRE el fondo sólido (`text-white`) |
| `border` / `borderHover` | Bordes — inputs, outline buttons |
| `ring` | Anillo de foco — accesibilidad de teclado |

**Ejemplo — badge de estado de pedido:**

```html
<span [class]="LV_COLOR_MAP['warning'].bgLight + ' ' + LV_COLOR_MAP['warning'].text + ' px-2 py-1 rounded-full text-xs font-medium'">
  Pendiente de aprobación
</span>
```

---

### Capa B — CSS Custom Properties (`--color-*`) para casos fuera de componentes `lv-*`

Vive en `levenzi.theme.css`, cargado como `@theme` de Tailwind v4. Úsalo cuando necesites el color en:
- CSS/SCSS plano (fuera de clases utilitarias)
- Gradientes, `box-shadow` con color, `stroke`/`fill` de SVG
- Librerías de terceros que no leen clases Tailwind (ej. ApexCharts, un `<canvas>`)

```css
.pedido-card--urgente {
  border-left: 4px solid var(--color-danger-600);
  background: var(--color-danger-50);
}

.icono-pendiente {
  fill: var(--color-warning-500);
}
```

Como están declaradas dentro de `@theme`, Tailwind **también** genera las utilidades a partir de ellas automáticamente (`bg-danger-600`, `text-danger-600`, etc.) — es la misma fuente de verdad, solo dos formas de consumirla.

```html
<!-- Esto funciona directo porque @theme generó la utilidad -->
<div class="bg-danger-50 border-l-4 border-danger-600">...</div>
```

> Usa `bg-primary-600` (generado por `@theme`) o `bg-violet-600` (Tailwind nativo) indistintamente — apuntan al mismo hex. Se recomienda usar los **nombres semánticos** (`primary`, `danger`...) en vez de los nombres de Tailwind (`violet`, `rose`...) porque si mañana cambias la paleta, no tienes que tocar cada componente.

---

### Capa C — Hex crudo vía `theme.constants.ts` (TypeScript puro, sin DOM)

Úsalo solo cuando **no** hay DOM/CSS de por medio — librerías de gráficos, exportación a PDF/Excel, `canvas`, o donde necesitas el string hex literal.

```typescript
import { LV_THEME_COLOR_HEX, LV_CHART_PALETTE } from '@shared/constants/theme.constants';

// Un solo color de marca en un lugar sin Tailwind (ej: config de un chart)
const chartOptions = {
  colors: LV_CHART_PALETTE, // ['#7c3aed', '#ea580c', '#059669', '#e11d48', '#0891b2', ...]
};

// Color puntual
const colorPrimario = LV_THEME_COLOR_HEX.primary; // '#7c3aed'
```

**No uses esta capa para estilos de componentes normales** — si te encuentras escribiendo `style="background: ${LV_THEME_COLOR_HEX.primary}"` en un componente `lv-*`, es señal de que deberías estar en la Capa A.

---

## 4. ¿Cuál capa uso? — Tabla de decisión

| Contexto | Capa a usar |
|---|---|
| Botón, badge, alert, input dentro de un componente `lv-*` | **A** — `LV_COLOR_MAP` |
| Clase Tailwind escrita directo en un template (`.html`) | **B** — `bg-primary-600` |
| CSS/SCSS plano, SVG, gradiente, sombra con color | **B** — `var(--color-primary-600)` |
| Config de librería de charts (ApexCharts, Chart.js, ngx-charts) | **C** — `LV_CHART_PALETTE` / `LV_THEME_COLOR_HEX` |
| Exportar PDF/Excel con color de marca | **C** — hex directo |

---

## 5. Accesibilidad (contraste)

Todos los pares `bg-{variant}-600` + `text-white` cumplen **WCAG AA** (contraste ≥ 4.5:1) para texto normal. Reglas prácticas:

- Texto sobre fondo sólido (`600`/`700`) → siempre `textOnBg` (blanco).
- Texto de color sobre fondo blanco → usa `text` (shade `600`), nunca `500` (más claro, contraste más bajo en texto pequeño).
- Fondos suaves (`bgLight`, shade `50`) → el texto encima siempre debe ser el shade `600` o `700` de la misma variante, nunca blanco.
- `warning` es la variante más delicada: su `500` es el más oscuro que mantiene buen contraste sobre blanco; evita texto ámbar más claro que `600`.

---

## 6. Ejemplos rápidos por componente

**Botón primario:**
```html
<button class="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-4 py-2 rounded-lg">
  Registrar pedido
</button>
```

**Botón outline secundario:**
```html
<button class="border border-secondary-600 text-secondary-600 hover:bg-secondary-50 px-4 py-2 rounded-lg">
  Cancelar
</button>
```

**Alert de éxito:**
```html
<div class="bg-success-50 text-success-700 border border-success-200 rounded-lg p-3">
  Pedido entregado correctamente.
</div>
```

**Badge de estado (tránsito → info):**
```html
<span class="bg-info-50 text-info-700 px-2 py-1 rounded-full text-xs font-medium">
  En tránsito
</span>
```

**Tag decorativo / dato adicional (tertiary):**
```html
<span class="bg-tertiary-50 text-tertiary-700 px-2 py-1 rounded-full text-xs font-medium">
  Promoción
</span>
```

---

## 7. Checklist antes de agregar un color nuevo "a mano"

Antes de escribir un hex o una clase Tailwind fuera de este sistema, pregúntate:

1. ¿Ya existe una variante semántica que cubra este caso? → Úsala.
2. ¿Es un color puramente decorativo sin significado de estado? → Considera si de verdad lo necesitas, o si `tertiary`/`neutral` ya alcanza.
3. ¿Vas a repetir este color en más de un componente? → Si sí, no lo hardcodees: agrégalo como variante nueva en `colors.types.ts` + `theme.constants.ts` + `levenzi.theme.css` (los 3 archivos, siempre juntos) en vez de copiarlo suelto.
