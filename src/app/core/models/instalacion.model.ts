export interface Instalacion {
    id?: number;
    sede_id: number;
    nombre: string;
    tipo?: string | null;
    activo?: boolean;
}
