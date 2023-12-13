export interface Contenido {
  codigoContenidoPk: number;
  nombre: string;
  nombreArchivo: string;
  url: string;
}

export interface RespuestaContenidoLista {
  error: boolean;
  errorMensaje?: string;
  contenidos: Contenido[];
}
