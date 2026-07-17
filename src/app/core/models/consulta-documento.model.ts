export interface ConsultaDni {
  numero_documento: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo?: string;
}

export interface ConsultaRuc {
  numero_documento: string;
  razon_social: string;
  direccion?: string;
  estado?: string;
  condicion?: string;
}
