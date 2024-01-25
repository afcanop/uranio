export type EntregaEstadoAutorizado = 'N' | 'S' | 'P';

export interface Entrega {
  id: number;
  celda: number;
  fechaIngreso: string;
  descripcion: any;
  entregaTipoId: number;
  entregaTipoNombre: string;
  estadoAutorizado: EntregaEstadoAutorizado;
  estadoCerrado: boolean;
  urlImagen?: string;
  urlImagenIngreso: string;
}


export interface RespuestaEntregaLista {
  error: boolean;
  errorMensaje?: string;
  entregas: Entrega[];
}

export interface RespuestaEntregaDetalle {
  error: boolean;
  errorMensaje?: string;
  entregas: Entrega;
}
