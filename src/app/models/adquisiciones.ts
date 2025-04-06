export interface Adquisiciones {
  id?: number;
  unidad_administrativa: string;
  tipo_bien: string;
  presupuesto: number;
  cantidad: number;
  valor_total: number;
  fecha_adquisicion: Date;
  proveedor: string;
  documentacion: string;
  activo: boolean;
}