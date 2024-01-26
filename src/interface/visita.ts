export interface Visita {
  id: number;
  fecha: string;
  numeroIdentificacion: string;
  nombre: string;
  placa: string;
  estadoAutorizado: string;
  estadoCerrado: boolean;
  codigoIngreso: string;
  urlImagenIngreso?: string;
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

