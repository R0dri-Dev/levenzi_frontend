import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { LvStatus } from '../types';

export interface LvAlertOptions {
  title: string;
  message: string;
  status: LvStatus;
  confirmText?: string;
  showCancelButton?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LvAlertService {

  /** Convierte LvStatus a icono de SweetAlert2 */
  private mapStatusToSweetAlertIcon(status: LvStatus): 'success' | 'error' | 'warning' | 'info' | 'question' {
    const map: Record<LvStatus, 'success' | 'error' | 'warning' | 'info' | 'question'> = {
      idle: 'question',
      loading: 'info',
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    return map[status] || 'info';
  }

  /** Muestra un SweetAlert */
  showAlert(options: LvAlertOptions): Promise<any> {
    const {
      title,
      message,
      status,
      confirmText = 'Entendido',
      showCancelButton = false
    } = options;

    return Swal.fire({
      title,
      text: message,
      icon: this.mapStatusToSweetAlertIcon(status),
      confirmButtonText: confirmText,
      showCancelButton,
      background: '#ffffff',
      color: '#111827',
      confirmButtonColor: this.getStatusColor(status),
    });
  }

  /** Obtiene el color del botón según el estado */
  private getStatusColor(status: LvStatus): string {
    const colors: Record<LvStatus, string> = {
      idle: '#6b7280',
      loading: '#3b82f6',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#0ea5e9'
    };
    return colors[status] || '#3b82f6';
  }

  /** Alerta de confirmación */
  showConfirm(options: Omit<LvAlertOptions, 'status'> & { status?: LvStatus }): Promise<any> {
    return this.showAlert({
      ...options,
      status: options.status || 'warning',
      showCancelButton: true,
      confirmText: 'Confirmar',
    });
  }

  /** Alerta de éxito */
  showSuccess(title: string, message: string): Promise<any> {
    return this.showAlert({
      title,
      message,
      status: 'success'
    });
  }

  /** Alerta de error */
  showError(title: string, message: string): Promise<any> {
    return this.showAlert({
      title,
      message,
      status: 'error'
    });
  }

  /** Alerta de loading */
  showLoading(title: string = 'Cargando...', message: string = 'Por favor espera'): Promise<any> {
    return Swal.fire({
      title,
      text: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  /** Cierra el alert actual */
  close(): void {
    Swal.close();
  }
}
