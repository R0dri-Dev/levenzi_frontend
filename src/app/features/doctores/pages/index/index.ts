import { Component, computed, inject, signal } from '@angular/core';

import { Doctor } from '../../../../core/models/doctor.model';
import { DoctorService } from '../../../../core/services/doctores/doctor.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';

import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateDoctor } from '../create/create';
import { EditDoctor } from '../edit/edit';
import { DetailDoctor } from '../detail/detail';
import { LvYesNoPipe, LvEmptyPipe } from '../../../../shared/pipes';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvSearchBoxComponent, CreateDoctor, EditDoctor, DetailDoctor],

  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(DoctorService);
  private readonly yesNoPipe = new LvYesNoPipe();
  private readonly emptyPipe = new LvEmptyPipe();

  readonly doctores = signal<Doctor[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedDoctor = signal<Doctor | null>(null);

  readonly columns: TableColumn<Doctor>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    {
      key: 'especialidad',
      label: 'Especialidad',
      sortable: true,
      render: (item) => this.emptyPipe.transform(item.especialidad) as string,
    },
    {
      key: 'telefono',
      label: 'Teléfono',
      sortable: true,
      render: (item) => this.emptyPipe.transform(item.telefono) as string,
    },
    {
      key: 'activo',
      label: 'Estado',
      sortable: true,
      render: (item) => this.yesNoPipe.transform(item.activo, 'Activo', 'Inactivo'),
    },
  ];
  readonly tableActions: TableAction<Doctor>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarDoctor(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarDoctor(item), variant: 'danger' },
  ];

  readonly filteredDoctores = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.doctores();

    return this.doctores().filter((doctor) => [doctor.nombre, doctor.especialidad ?? '', doctor.telefono ?? '', doctor.email ?? '', doctor.activo ? 'activo' : 'inactivo'].some((field) => field.toLowerCase().includes(term)));
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Doctores' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.doctores.set(response.data);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  openCreateForm(): void {
    this.selectedDoctor.set(null);
    this.activeView.set('create');
  }

  verDetalle(doctor: Doctor): void {
    this.selectedDoctor.set(doctor);
    this.activeView.set('detail');
  }

  editarDoctor(doctor: Doctor): void {
    this.selectedDoctor.set(doctor);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedDoctor.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<Doctor>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.doctores.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<Doctor>): void {
    const doctor = this.selectedDoctor();
    if (!doctor?.id) {
      this.closeForm();
      return;
    }

    this.service.update(doctor.id, payload).subscribe({
      next: (updated) => {
        this.doctores.update((items) => items.map((item) => (item.id === doctor.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  eliminarDoctor(doctor: Doctor): void {
    this.service.delete(doctor.id).subscribe({
      next: () => {
        this.doctores.update((items) => items.filter((item) => item.id !== doctor.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
