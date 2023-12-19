export interface Votacion {
  codigoVotacionPk: number;
  fecha: string;
  fechaHasta: string;
  titulo: string;
  descripcion: string;
  cantidad: number;
  estadoCerrado: boolean;
  reunionNombre: string;
  voto: boolean;
  codigoVotacionDetalle: number;
  detalles: VotacionListaDetalle[];
}

export interface VotacionListaDetalle {
  codigoVotacionDetallePk: number;
  descripcion: string;
}

export interface RespuestaVotacionLista {
  error: boolean;
  errorMensaje?: string;
  votaciones: Votacion[];
}
