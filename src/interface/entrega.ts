export interface Entrega {
  codigoEntregaPk: number;
  fechaIngreso: string;
  descripcion: any;
  codigoEntregaTipoFk: string;
  estadoAutorizado: 'N' | 'S' | 'P';
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
