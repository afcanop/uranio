export interface Reserva {
  codigoReservaPk: number;
  nombre: string;
  descripcion: string;
}

export interface ReservaDetalle {
  codigoReservaDetallePk: number;
  codigoReservaFk: number;
  fecha: string;
  comentario: string;
  reservaNombre: string;
  reservaDescripcion: string;
}

export interface respuestaReservaLista {
  error: boolean;
  errorMensaje?: string;
  reservas: Reserva[];
}

export interface respuestaReservaDetalle {
  error: boolean;
  errorMensaje?: string;
  reservaDetalles: ReservaDetalle[];
}

export interface respuestaReservaReserva {
  error: boolean;
  errorMensaje?: string;
  reservasDetalles: ReservaDetalle[];
}

export interface respuestaReservaNuevo {
  error: boolean;
  errorMensaje?: string;
  codigoReservaDetalle: number;
}
