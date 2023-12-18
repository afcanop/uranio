export interface Visita {
  codigoVisitaPk: number;
  fecha: string;
  numeroIdentificacion: string;
  nombre: string;
  placa: string;
  estadoAutorizado: string;
  estadoCerrado: boolean;
  codigoIngreso: string;
  urlImagen?: string;
}

export interface RespuestaVisitaLista {
  error: boolean;
  errorMensaje?: string;
  visitas: Visita[];
}

export interface RespuestaVisitaNuevo {
  error: boolean;
  errorMensaje?: string;
  codigoIngreso: number;
  codigoVisita: number;
}

export interface RespuestaVisitaAutorizar {
  error: boolean;
  errorMensaje?: string;
}

