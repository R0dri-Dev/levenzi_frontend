# TODO - Refactor de Themes y Types (Paso a paso)

## Etapa 1 (segura): preparar base y eliminar duplicación “estructural” sin tocar estilos
- [ ] Crear carpeta `src/app/shared/types/base/` con tipos reutilizables comunes (ej: `Colorable`, `Sizeable`, `ClassName`, etc.)
- [ ] Crear carpeta `src/app/shared/theme/base/` con utilidades y/o tipado reutilizable (ej: helpers para mapear `LV_COLORS` a clases)
- [ ] Actualizar exports desde `src/app/shared/types/index.ts` y `src/app/shared/theme/index.ts`
- [ ] Ajustar 1-2 componentes piloto (ej: `tag`, `badge` o `switch`) para que importen tipos base y usen `LV_COLORS/LV_SPACING` vía helpers (sin cambiar clases)

## Etapa 2 (agresiva): limpiar duplicaciones reales dentro de `*.theme.ts` y `*.types.ts`
- [ ] Identificar propiedades repetidas en varios `*.types.ts` y consolidarlas en tipos base
- [ ] Identificar repetición de strings/clases en `*.theme.ts` y consolidarlas en helpers
- [ ] Eliminar duplicados de forma incremental asegurando que compile y tests pasen

