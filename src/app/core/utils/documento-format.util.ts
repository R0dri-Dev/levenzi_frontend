import { ConsultaDni, ConsultaRuc } from '../models/consulta-documento.model';

export function formatNombreDni(data: ConsultaDni): string {
  return [data.first_name, data.first_last_name, data.second_last_name]
    .filter(Boolean)
    .join(' ');
}

export function formatRazonSocialRuc(data: ConsultaRuc): string {
  return data.razon_social ?? '';
}
