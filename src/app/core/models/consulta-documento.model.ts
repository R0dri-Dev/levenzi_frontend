export interface ConsultaDni {
  document_number: string;
  first_name: string;
  first_last_name: string;
  second_last_name: string;
  full_name: string;
}

export interface ConsultaRuc {
  document_number: string;
  razon_social: string;
  direccion?: string;
  estado?: string;
  condicion?: string;
}
