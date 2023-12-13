export interface Atencion {
  codigoAtencionPk: number;
  fecha: string;
  descripcion: string;
  estadoAtendido: boolean;
}

export interface RespuestaAtencionNuevo {
  error: boolean;
  errorMensaje?: string;
}

export interface RespuestaAtencionLista {
  error: boolean;
  errorMensaje?: string;
  atenciones: Atencion[];
}
