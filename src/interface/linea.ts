export interface RespuestaLineaLista {
  error: boolean;
  errorMensaje?: string;
  lineas: Linea[];
}

export interface Linea {
  codigoLineaPk: string;
  nombre: string;
  urlImagen: string;
}
