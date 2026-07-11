# TODO - Doctores (sin modales) + DynamicForm

- [ ] Quitar `<lv-modal>` de `src/app/features/doctores/pages/index/index.html` y renderizar create/edit/detail directo.
- [ ] Migrar `src/app/features/doctores/pages/create/create.ts` a construir `fields` y usar `LvDynamicFormComponent` (submit/cancel).
- [ ] Migrar `src/app/features/doctores/pages/create/create.html` a usar `<lv-page-header>` + `<lv-dynamic-form>` (sin contenedores extra).
- [ ] Migrar `src/app/features/doctores/pages/edit/edit.ts` a construir `fields` y usar `LvDynamicFormComponent`.
- [ ] Migrar `src/app/features/doctores/pages/edit/edit.html` a usar `<lv-page-header>` + `<lv-dynamic-form>` (sin contenedores extra).
- [ ] Extender `LvDynamicFormComponent` para soportar `select`:
  - [ ] Incluir `'select'` en `src/app/shared/types/input.types.ts`.
  - [ ] Actualizar `src/app/shared/ui/organisms/dynamic-form/dynamic-form.ts` (import de `LvSelectComponent`).
  - [ ] Actualizar `src/app/shared/ui/organisms/dynamic-form/dynamic-form.html` para renderizar `lv-select` con `field.options`.
- [ ] Ajustar/compilar para asegurar que `sede_id` se llena con las options y que validaciones siguen funcionando.
- [ ] Ejecutar build/test.

