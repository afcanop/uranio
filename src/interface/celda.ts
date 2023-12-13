export interface RespuestaCeldaLLave {
  error: boolean;
  errorMensaje?: string;
  correo: string;
}

export interface RespuestaCeldaAsignar {
  error: boolean;
  errorMensaje?: string;
  codigoCelda?: number;
  celda?: string;
}
